'use client'
import React, { useRef, useState } from 'react'

function RecordAudio() {
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const [recording, setRecording] = useState(false)

  const expectedText = "hello how are you" // النص المعروض للطالب

  const startRec = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    chunksRef.current = []

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data)
    }

    mediaRecorder.start()
    setRecording(true)
  }

  const stopRecAndSend = async () => {
    if (!mediaRecorderRef.current) return

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })

      const fd = new FormData()
      fd.append("expected_text", expectedText)
      fd.append("language", "en")
      fd.append("focus_word", "hello")
      fd.append("audio", blob, "student.webm")

      const res = await fetch("http://localhost:8000/grade", {
        method: "POST",
        body: fd,
      })

      const data = await res.json()
      console.log("RESULT:", data)
    }

    mediaRecorderRef.current.stop()
    setRecording(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {!recording ? (
        <button onClick={startRec}>
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecAndSend}>
          Stop & Send
        </button>
      )}
    </div>
  )
}

export default RecordAudio
