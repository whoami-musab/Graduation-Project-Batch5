import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const express_url = process.env.NEXT_PUBLIC_BACKEND_EXPRESS_URL
const fastapi_url = process.env.NEXT_PUBLIC_BACKEND_AI_URL

// ===================== Make Exam =======================
export const make_exam = createAsyncThunk(
    'exam/makeExam',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${fastapi_url}/make_exam`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || 'Failed to make exam');
        }
    }
)

// ===================== Submit Exam =======================
export const submit_exam = createAsyncThunk(
    'exam/submitExam',
    async (_, thunkAPI) => {
        console.log(fastapi_url)
        try {
            const state = thunkAPI.getState();
            const { questions, studentAnswer } = state.exam;
            // const endTime = new Date().toISOString();

            const payload = questions.map((question, index) => ({
                question: question.question,
                std_answer: studentAnswer[index] || '',
                type: question.type
            }))

            const response = await fetch(`${fastapi_url}/submit_exam`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || 'Failed to submit exam');
        }
    }
)

// ===================== Save Exam to Database =======================
export const save_exam = createAsyncThunk(
    'exam/saveExam',
    async (examResult, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const { startTime } = state.exam;
            const { token } = state.auth;
            console.log(token)
            const endTime = new Date().toISOString();

            if (!examResult) return thunkAPI.rejectWithValue('No exam data to save');

            const payload = {
                questions: [],
                startTime,
                endTime,
                level: examResult.level,
            };

            Object.values(examResult.scores).forEach((section) => {
                section.details.forEach((q) => {
                    payload.questions.push({
                        question: q.question,
                        correctAnswer: q.correct_answer,
                        userAnswer: q.student_answer,
                        isCorrect: q.correct
                    });
                });
            });

            const res = await fetch(`${express_url}/exam/saveExam`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) {
                return thunkAPI.rejectWithValue(data.message || 'Unknown error occurred. Please try again');
            }
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || 'Failed to save exam data');
        }
    }
);

// ===================== Get Exams =======================
export const get_exams = createAsyncThunk(
    'exam/getExams',
    async (_, thunkAPI) => {
        try {
            const { token } = thunkAPI.getState().auth;
            if(!token) return thunkAPI.rejectWithValue('Not authenticated.')

            const response = await fetch(`${express_url}/exam/getExams`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if(!response.ok) return thunkAPI.rejectWithValue(data?.message || 'Failed to get exams')

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || 'Failed to get exams');
        }
    }
);

// ===================== Get Exam Details =======================
export const get_exam_details = createAsyncThunk(
    'exam/getExamDetails',
    async (examId, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const { token } = state.auth;

            const response = await fetch(`${express_url}/exam/getExam/${examId}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || 'Failed to get exam details');
        }
    }
);

const examSlice = createSlice({
    name: 'exam',
    initialState: {
        getExamDetails: null,
        oldExams: [],
        examData: null,
        userId: null,
        questions: [],
        currentIndex: 0,
        studentAnswer: [],
        maxReachedIndex: 0,
        startTime: null,
        started: false,
        loading: false,
        error: null
    },
    reducers: {
        nextQuestion: (state) => {
            if (state.currentIndex < state.questions.length - 1) {
                state.currentIndex += 1;
                if(state.currentIndex > state.maxReachedIndex){
                    state.maxReachedIndex = state.currentIndex;
                }
            }
        },
        previousQuestion: (state) => {
            if (state.currentIndex > state.maxReachedIndex - 1 && state.currentIndex > 0) {
                state.currentIndex = state.maxReachedIndex - 1;
            }
        },
        saveAnswer: (state, action) => {
            state.studentAnswer[action.payload.index] = action.payload.answer;
        },
        startExam: (state) => {
        state.started = true;
        state.startTime = new Date().toISOString();
        },
        resetExam: (state) => {
            state.examData = null;
            state.questions = [];
            state.currentIndex = 0;
            state.studentAnswer = [];
            state.maxReachedIndex = 0;
            state.startTime = null;
            state.started = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // ===================== Make Exam =======================
            .addCase(make_exam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(make_exam.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload
            })
            .addCase(make_exam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ===================== Submit Exam =======================
            .addCase(submit_exam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submit_exam.fulfilled, (state, action) => {
                state.loading = false;
                state.examData = action.payload;
            })
            .addCase(submit_exam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ===================== Save Exam =======================
            .addCase(save_exam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(save_exam.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(save_exam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ===================== Get Exams =======================
            .addCase(get_exams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_exams.fulfilled, (state, action) => {
                state.loading = false;
                state.oldExams = action.payload.exams || [];
            })
            .addCase(get_exams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ===================== Get Exam Details =======================
            .addCase(get_exam_details.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_exam_details.fulfilled, (state, action) => {
                state.loading = false;
                state.getExamDetails = action.payload.exam;
            })
            .addCase(get_exam_details.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { 
    nextQuestion,
    previousQuestion,
    saveAnswer,
    startExam,
    resetExam
} = examSlice.actions;
export default examSlice.reducer