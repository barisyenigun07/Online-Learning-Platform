import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Course } from '../models/Course';
import SectionAccordion from '../components/SectionAccordion';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const CourseDetail = () => {
  const { id } = useParams();
  const { isLoggedIn, authUser } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

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

  const handleEnroll = async () => {
    try {
      const response = await fetch(`http://localhost:8080/enroll/course/${id}`);
      if (response.ok) {
        navigate("/");
      }
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
        {isLoggedIn && authUser.role === "STUDENT" ? 
          <div className="flex justify-center mt-5">
            <button onClick={handleEnroll} className="w-1/3 bg-red-700 hover:bg-red-900 p-2 rounded-full text-white">Enroll</button>
          </div> 
        : isLoggedIn && authUser.role === "INSTRUCTOR" && authUser.id === course?.user.id ? 
          <div className="flex justify-center mt-5">
            <button onClick={() => navigate(`/create/section/course/${course.id}`)} className="w-1/3 bg-red-700 hover:bg-red-900 p-2 rounded-full text-white">Edit</button>
          </div>
          : null
        }
        <hr className="mt-5"/>
        <div className="mt-10">
          {course ? <SectionAccordion sections={course.sections}/> : null}
        </div>
    </div>
  )
}

export default CourseDetail