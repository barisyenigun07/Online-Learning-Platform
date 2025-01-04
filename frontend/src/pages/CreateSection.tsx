import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Section } from '../models/Section';

const CreateSection = () => {
    const { id } = useParams();

    const [sections, setSections] = useState<Section[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const getSectionsOfCourse = async () => {
        const response = await fetch(`http://localhost:8080/section/course/${id}`);
        const data = await response.json();
        setSections(data);
    }

    useEffect(() => {
        getSectionsOfCourse();
    }, []);

  return (
    <div>
        {sections.length === 0 ? 
        <div className="flex flex-col justify-center items-center mt-16">
            <p>There are no sections for this course!</p>
        </div> : 
        <div>
            {sections.map((section) => (
                <div key={section.id}>
                    <p>{section.title}</p>
                </div>
            ))}
        </div>
        }
        <div className="flex justify-center">
            <button className="bg-red-600 w-44 p-2 text-white rounded-full">Create Section</button>
        </div>
    </div>
  )
}

export default CreateSection