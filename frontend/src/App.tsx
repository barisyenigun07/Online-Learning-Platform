import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import AppBar from './components/AppBar'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import CourseDetail from './pages/CourseDetail'
import CreateCourse from './pages/CreateCourse'
import CreateSection from './pages/CreateSection'
import CreateContent from './pages/CreateContent'

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
          <Route path='/course/:id' element={<CourseDetail/>}/>
          <Route path='/create/course' element={<CreateCourse/>}/>
          <Route path='/create/section/course/:id' element={<CreateSection/>}/>
          <Route path='/create/content/section/:id' element={<CreateContent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
