import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router';

const CreateSection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");

    const handleSectionCreate = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const response = await fetch(`http://localhost:8080/section/course/${id}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({title: title})
          });
  
          if (response.ok) {
              navigate(`/course/${id}/edit`);
          }
      }  
  return (
    <div className="flex flex-col justify-center items-center mt-10">
        <h3 className="text-4xl font-semibold">Create Section</h3>
        <form className="w-1/3 flex flex-col gap-3" onSubmit={handleSectionCreate}>
            <label htmlFor="title">Title</label>
            <input className="border-2 border-slate-600 rounded-xl p-2" type="text" id='title' onChange={(e) => setTitle(e.target.value)}/>
            <button type="submit" className="bg-red-700 hover:bg-red-900 rounded-full p-2 text-white">Create</button>
        </form>
    </div>
  )
}

export default CreateSection