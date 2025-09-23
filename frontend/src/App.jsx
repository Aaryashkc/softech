import React, { useEffect } from 'react'
import Header from './Component/Header'
import Footer from './Component/Footer'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import ContactUs from './Pages/ContactUs'
import Blogs from './Pages/Blogs'
import Courses from './Pages/Courses'
import CourseDetails from './Pages/CourseDetails'
import BlogDetails from './Pages/BlogDetails'
import EnquiryForm from './Pages/EnquiryForm'
import AdminDashboard from './admin/pages/Dashboard'
import { useAuthStore } from './store/useAuthStore'
import LoginPage from './admin/pages/LoginPage'
import { LoaderCircle } from 'lucide-react'

function App() {

    const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const {
    authUser,
    checkAuth,
    isCheckingAuth
  } = useAuthStore();
  
  const protectedRoutes = [
    "/admin/login",
  ];

  const isProtectedRoute = protectedRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (isProtectedRoute) {
      checkAuth();
    }
  }, [checkAuth, isProtectedRoute]);

  if (isProtectedRoute && isCheckingAuth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <LoaderCircle className='size-20 animate-spin text-red-700' />
      </div>
    );
  }
  return (
    <> 
    <div>
         {!isAdminRoute && <Header />}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/coursedetails/:id' element={<CourseDetails/>}/>
        <Route path='/blogdetails/:slug' element={<BlogDetails/>}/>
        <Route path='/inquiryform' element={<EnquiryForm/>}/>

            {/* admin routes */}
          <Route path="/admin/login" element={!authUser ? <LoginPage /> : <Navigate to="/admin" />} />
          <Route path="/admin" element={authUser? <AdminDashboard /> :<Navigate to="/admin/login" />} />


      </Routes> 
      {!isAdminRoute &&  <Footer/>}
   
    </div>
    </>
  )
}

export default App
