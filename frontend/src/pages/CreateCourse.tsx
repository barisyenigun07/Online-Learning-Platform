import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const CreateCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/course", {
            method: "POST",
            body: JSON.stringify({title: title, description: description}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.ok) {
            const respData = await response.json();
            navigate(`/create/section/course/${respData?.id}`);
        }
    }
  return (
    <div className="flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold">Create Course</h3>
        <form className="flex flex-col w-1/3 p-2" onSubmit={handleCreate}>
            <div>
                <label htmlFor="title">Title</label>
                <input className="w-full h-8 border-2 rounded-full border-slate-700 p-3" type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mt-5">
                <label htmlFor="desc">Description</label>
                <input className="w-full h-8 border-2 rounded-full border-slate-700 p-3" type="text" name="descirption" id="desc" onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="flex justify-center mt-5">
                <button type="submit" className="bg-red-700 w-1/3 rounded-full p-2 text-white">
                    Create
                </button>
            </div>
        </form>
    </div>
  )
}

export default CreateCourse