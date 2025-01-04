import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { User } from '../models/User';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CourseCard from '../components/CourseCard';
import { Course } from '../models/Course';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [user, setUser] = useState<User>();
    const [createdCourses, setCreatedCourses] = useState<Course[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

    const getUser = async () => {
        const response = await fetch(`http://localhost:8080/user/${id}`);
        const data = await response.json();
        setUser(data);
    }

    const getCreatedCourses = async () => {
        const response = await fetch(`http://localhost:8080/course/instructor/${id}`);
        const data = await response.json();
        setCreatedCourses(data);
    }

    const getEnrolledCourses = async () => {
        const response = await fetch(`http://localhost:8080/enroll/student/${id}`);
        const data = await response.json();
        setEnrolledCourses(data);
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            if (user.role === "STUDENT") {
                getEnrolledCourses();
            } else if (user.role === "INSTRUCTOR") {
                getCreatedCourses();
            }
        }
    }, [user]);

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="flex-col items-center shadow-2xl rounded-2xl w-1/3 mt-10 text-center p-1">
            <p className="text-3xl font-bold">{user?.name}</p>
            <p className="text-2xl font-semibold mt-2">{user?.email}</p>
            <p className="text-xl mt-1">{user?.role}</p>
        </div>
        <div className="mt-10">
            {authUser.id === user?.id && authUser.role === "INSTRUCTOR" ? 
            <button onClick={() => navigate("/create/course")} className="w-44 rounded-full p-2 bg-red-700 hover:bg-red-900 text-white">
                Create Course
            </button> : null}
        </div>
        {user?.role === "STUDENT" ? (
            <div>
                <h3 className="text-4xl text-center">Enrolled Courses</h3>
                <div className="grid grid-cols-4 gap-10 mt-10">
                    {enrolledCourses.map((course) => (
                        <CourseCard key={course.id} course={course}/>
                    ))}
                </div>
            </div>
        ) : user?.role === "INSTRUCTOR" ? (
            <div className="mt-7">
                <h3 className="text-4xl text-center">Created Courses</h3>
                <div className="grid grid-cols-4 gap-10 mt-10">
                    {createdCourses.map((course) => (
                        <CourseCard key={course.id} course={course}/>
                    ))}
                </div>
            </div>
        ) : null}
    </div>
  )
}

export default UserProfile