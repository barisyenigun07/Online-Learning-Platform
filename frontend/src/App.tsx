import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import AppBar from './components/AppBar'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import CourseDetail from './pages/CourseDetail'
import CreateCourse from './pages/CreateCourse'
import CreateContent from './pages/CreateContent'
import Course from './pages/Course'
import CourseEdit from './pages/CourseEdit'
import CreateSection from './pages/CreateSection'

function App() {

  return (
    <>
      <BrowserRouter>
        <AppBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/user/:id' element={<UserProfile/>}/>
          <Route path='/course/:id/detail' element={<CourseDetail/>}/>
          <Route path='/course/:id' element={<Course/>}/>
          <Route path='/create/course' element={<CreateCourse/>}/>
          <Route path='/course/:id/edit' element={<CourseEdit/>}/>
          <Route path='/create/section/course/:id' element={<CreateSection/>}/>
          <Route path='/create/content/section/:id' element={<CreateContent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
