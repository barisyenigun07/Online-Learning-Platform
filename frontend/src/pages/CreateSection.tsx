import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Section } from '../models/Section';
import SectionAccordion from '../components/SectionAccordion';

const CreateSection = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [sections, setSections] = useState<Section[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");

    const getSectionsOfCourse = async () => {
        const response = await fetch(`http://localhost:8080/section/course/${id}`);
        const data = await response.json();
        setSections(data);
    }

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
            const data = await response.json();
            navigate(`/create/content/section/${data.id}`);
        }
    }

    useEffect(() => {
        getSectionsOfCourse();
    }, []);

  return (
    <div>
        <div className="flex justify-between mt-10 mb-2">
            <div></div>
            <div className="ml-36">
                <h3 className="text-4xl">Sections</h3>
            </div>
            <div className="mr-5">
                <button onClick={() => setIsOpen(!isOpen)} className="w-44 p-2 bg-red-700 rounded-lg text-white">Create Section</button>
            </div>
        </div>
        <hr />
        {sections.length === 0 ? 
        <div className="flex flex-col justify-center items-center mt-16">
            <p>There are no sections for this course!</p>
        </div> : 
        <div className="flex justify-center mt-10">
            <SectionAccordion sections={sections}/>
        </div>
        }
        {isOpen ? 
            <div className="m-auto shadow-2xl rounded-2xl w-2/3 mt-10 p-5">
                <form className="flex flex-col gap-3" onSubmit={handleSectionCreate}>
                    <label htmlFor="title">Title</label>
                    <input className="border-2 border-slate-600 w-1/3 rounded-xl p-2" type="text" id='title' onChange={(e) => setTitle(e.target.value)}/>
                    <button className="bg-red-700 w-1/3 rounded-full p-2 text-white">Create</button>
                </form>
            </div>
        : null}
    </div>
  )
}

export default CreateSection