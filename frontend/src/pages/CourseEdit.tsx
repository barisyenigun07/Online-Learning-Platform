import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Section } from '../models/Section';
import SectionAccordion from '../components/SectionAccordion';

const CourseEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [sections, setSections] = useState<Section[]>([]);

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
        <div className="flex justify-between mt-10 mb-2">
            <div></div>
            <div className="ml-36">
                <h3 className="text-4xl">Sections</h3>
            </div>
            <div className="mr-5">
                <button onClick={() => navigate(`/create/section/course/${id}`)} className="w-44 p-2 bg-red-700 rounded-lg text-white">Create Section</button>
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
    </div>
  )
}

export default CourseEdit