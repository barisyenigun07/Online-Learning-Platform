import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Course } from '../models/Course';
import SectionAccordion from '../components/SectionAccordion';

const CourseDetail = () => {
  const { id } = useParams();

  const [course, setCourse] = useState<Course>();

  const getCourse = async () => {
    try {
      const response = await fetch(`http://localhost:8080/course/${id}`);
      const data = await response.json();
      setCourse(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCourse();
  }, [])

  return (
    <div>
        <div className="flex flex-col justify-center items-center mt-12">
          <h3 className="text-4xl font-bold">{course?.title}</h3>
          <p className="text-xl mt-5">{course?.description}</p>
        </div>
        <div className="mt-10">
          {course ? <SectionAccordion sections={course.sections}/> : null}
        </div>
    </div>
  )
}

export default CourseDetail