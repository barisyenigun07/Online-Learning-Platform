import React from 'react'
import { Course } from '../models/Course'
import { useNavigate } from 'react-router'

const CourseCard = ({course}: {course: Course}) => {
  const navigate = useNavigate();
  return (
    <div className="shadow-xl rounded-2xl w-72 p-2">
        <p className="text-2xl font-semibold ml-2 mr-2 mb-1">{course.title}</p>
        <p className="text-xl opacity-55 ml-2">{course.user.name}</p>
        <button onClick={() => navigate(`/course/${course.id}/detail`)} className="w-full h-10 bg-red-600 shadow-xl hover:bg-red-900 rounded-full text-white">Details</button>
    </div>
  )
}

export default CourseCard