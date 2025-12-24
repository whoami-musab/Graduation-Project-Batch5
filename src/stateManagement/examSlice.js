import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const make_exam = createAsyncThunk(
    'exam/makeExam',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:8000/make_exam', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to make exam');
        }
    }
)

export const submit_exam = createAsyncThunk(
    'exam/submitExam',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:8000/ai_analyze', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(studentAnswer)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to submit exam');
        }
    }
)

const examSlice = createSlice({
    name: 'exam',
    initialState: {
        examData: null,
        userID: null,
        questions: [],
        currentIndex: 0,
        studentAnswer: [],
        maxReachedIndex: 0,
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
    },
    },
    extraReducers: (builder) => {
        builder
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
            });
    }
})

export const { nextQuestion, previousQuestion, saveAnswer, startExam } = examSlice.actions;
export default examSlice.reducer