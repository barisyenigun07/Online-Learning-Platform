import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [userType, setUserType] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            userType: userType
        };

        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            navigate("/login");
        }
    }
  return (
    <div className="flex flex-col justify-center items-center mt-10">
        <h3 className="text-4xl">Register</h3>
        <form className="flex flex-col items-center gap-7 w-5/6 mt-5" onSubmit={handleRegister}>
            <input className="border-2 border-slate-700 w-2/3 p-2 rounded-3xl" type="text" name="name" id="name" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
            <input className="border-2 border-slate-700 w-2/3 p-2 rounded-3xl" type="email" name="email" id="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            <input className="border-2 border-slate-700 w-2/3 p-2 rounded-3xl" type="password" name="password" id="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <input className="border-2 border-slate-700 w-2/3 p-2 rounded-3xl" type="password" name="passwordConfirm" id="passwordConfirm" placeholder='Password Confirm' onChange={(e) => setPasswordConfirm(e.target.value)}/>
            <select className="border-2 border-slate-700 w-2/3 p-3 rounded-3xl" name="userType" id="userType" onChange={(e) => setUserType(e.target.value)}>
                <option value="-" disabled>-</option>
                <option value="STUDENT">Student</option>
                <option value="INSTRUCTOR">Instructor</option>
            </select>
            <button type="submit" className="bg-red-700 text-white w-44 h-12 shadow-xl hover:bg-red-900 rounded-3xl">Register</button>
        </form>
    </div>
  )
}

export default Register