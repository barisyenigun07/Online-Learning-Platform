import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Course } from '../models/Course'
import CourseCard from '../components/CourseCard'

const Home = () => {
  const { authUser, isLoggedIn } = useSelector((state: RootState) => state.auth)
  const [courses, setCourses] = useState<Course[]>([]);

  const getCourses = async () => {
    const response = await fetch("http://localhost:8080/course");
    const data = await response.json();
    setCourses(data);
  }

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
        <h3 className="text-6xl font-bold ml-10">
          {isLoggedIn ? `Welcome, ${authUser.name}!` : ""}
        </h3>
        <div className="mt-10">
          <h3 className="text-4xl font-semibold">Available Courses</h3>
        </div>
        <hr />
        <div className="grid grid-cols-5 gap-20 mt-10 p-5">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course}/>
            ))}
        </div>
    </div>
  )
}

export default Home