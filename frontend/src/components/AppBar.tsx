import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store';
import { authActions } from '../redux/authSlice';
import { useNavigate } from 'react-router';

const AppBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, authUser } = useSelector((state: RootState) => state.auth);
  return (
    <nav className="w-full bg-red-700 h-20 flex justify-between items-center text-white shadow-2xl">
        <a className="text-5xl ml-10" href="/">OLP</a>
        {isLoggedIn ? (
          <div className="flex gap-5 mr-10">
            <button onClick={() => {
              dispatch(authActions.logout())
              navigate("/login");
            }}>Logout</button>
            <button onClick={() => {
              navigate(`/user/${authUser.id}`)
            }}>{authUser.name}</button>
          </div>
        ) : (
          <div className="flex gap-5 mr-10">
            <a href="/register">Register</a>
            <a href="/login">Login</a>
          </div>
        )}
    </nav>
  )
}

export default AppBar