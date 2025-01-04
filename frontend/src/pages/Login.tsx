import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLogin } from '../redux/authActions';
import { AppDispatch } from '../redux/store';

const Login = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            email: email,
            password: password
        };

        try {
            dispatch(userLogin(body)).unwrap();
            navigate("/");
        }
        catch (err) {
            console.error(err);
        }

        console.log(body);
    }
  return (
    <div className="flex flex-col justify-center items-center mt-10">
        <h3 className="text-4xl">Login</h3>
        <form className="flex flex-col items-center gap-7 w-5/6 mt-5" onSubmit={handleLogin}>
            <input className="border-2 border-slate-700 w-2/3 p-2 rounded-3xl" type="email" name="email" id="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            <input className="border-2 border-slate-700 w-2/3 p-2 rounded-3xl" type="password" name="password" id="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" className="bg-red-700 text-white w-44 h-12 shadow-xl hover:bg-red-900 rounded-3xl">Login</button>
        </form>
    </div>
  )
}

export default Login