import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

const CreateContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("-");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<Blob | undefined>();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctOption: "" },
  ])

  const handleQuestionChange = (index: number, key: string, value: string) => {
    const updatedQuestions = questions.map((q, qIndex) =>
      qIndex === index ? { ...q, [key]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updatedQuestions = questions.map((q, qIndex) => {
      if (qIndex === qIndex) {
        const updatedOptions = [...q.options];
        updatedOptions[oIndex] = value;
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleQuestionNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num = Number(e.target.value);
    setQuestionNumber(num);

    // Create new independent questions for the new number
    const newQuestions = Array.from({ length: num }, () => ({
      text: "",
      options: ["", "", "", ""],
      correctOption: "",
    }));
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (contentType) {
      case "video": {
        if (file) {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("file", file);

          const response = await fetch(`http://localhost:8080/content/video/section/${id}`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
          });

          if (response.ok) {
            navigate("/");
          }
        }
        break;
      }
      case "quiz": {
        const response = await fetch(`http://localhost:8080/content/quiz/section/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({title: title, type: "quiz", questions: questions})
        });
        if (response.ok) {
          navigate("/");
        }
        break;
      }
      case "assignment": {
        const response = await fetch(`http://localhost:8080/content/assignment/section/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({title: title, type: "assignment", description: description})
        })

        if (response.ok) {
          navigate("/");
        }
        break;
      }
      default:
        alert("Invalid content type!");
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
        <h3 className="text-5xl">Create Content</h3>
        <form className="flex flex-col gap-2 mt-5 w-1/3" onSubmit={handleSubmit}>
            <label htmlFor="type">Content Type</label>
            <select value={contentType} className="border-2 border-slate-600 rounded-full p-1" name="content-type" id="type" onChange={(e) => setContentType(e.target.value)}>
              <option value="-">Select an option</option>
              <option value="video">Video</option>
              <option value="quiz">Quiz</option>
              <option value="assignment">Assignment</option>
            </select>
            <label htmlFor="title">Title</label>
            <input className="border-2 border-slate-600 rounded-full p-1" type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)}/>
            {contentType === "video" ? (
              <div>
                <div className="bg-red-600 w-full rounded-full p-1 text-white text-center mt-3" onClick={handleClick}>
                  <input ref={fileInputRef} hidden type="file" accept="video/*" onChange={handleFileChange}/>
                  Upload Video
                </div>
                {file ? 
                <div className="flex justify-center mt-2">
                  <video src={URL.createObjectURL(file)} width={700} height={550} controls></video>
                </div> : null}
              </div>
            ) : contentType === "quiz" ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="questionNum">Question Number</label>
                <select className="border-2 border-slate-700 p-1 rounded-full" name="qNumber" id="questionNum" onChange={handleQuestionNumberChange}>
                {[...Array(5)].map((_, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {idx + 1}
                  </option>
                ))}
                </select>
                {questions.map((q, qIndex) => (
                <div key={qIndex} className="border p-4 rounded-lg">
                  <div className="mb-2">
                    <label htmlFor={`questionText-${qIndex}`}>Question {qIndex + 1}</label>
                    <input
                      id={`questionText-${qIndex}`}
                      className="border-2 border-slate-700 p-1 w-full rounded"
                      type="text"
                      placeholder={`Enter question ${qIndex + 1}`}
                      value={q.text}
                      onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label>Options</label>
                    {q.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-2 mb-1">
                        <span>{oIndex + 1}.</span>
                        <input
                          className="border-2 border-slate-700 p-1 w-full rounded"
                          type="text"
                          placeholder={`Option ${oIndex + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor={`correctOption-${qIndex}`}>Correct Option</label>
                    <input
                      id={`correctOption-${qIndex}`}
                      className="border-2 border-slate-700 p-1 w-full rounded"
                      type="text"
                      placeholder="Enter the correct option (e.g., Option 1, Option 2)"
                      value={q.correctOption}
                      onChange={(e) => handleQuestionChange(qIndex, "correctOption", e.target.value)}
                    />
                  </div>
                </div>
              ))}
              </div>
            ): contentType === "assignment" ? (
              <div className="flex flex-col gap-2">
                  <label htmlFor="desc">Description</label>
                  <input className="border-2 border-slate-600 rounded-full p-1" type="text" name="description" id="desc" onChange={(e) => setDescription(e.target.value)} />
              </div>
            ): null}
            <div className="flex justify-center mt-5">
              <button disabled={contentType === "-"} type="submit" className="w-1/3 bg-red-700 hover:bg-red-900 p-2 text-white rounded-full">
                Create Content
              </button>
            </div>
        </form>
    </div>
  )
}

export default CreateContent