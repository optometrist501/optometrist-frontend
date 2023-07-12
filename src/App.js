import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Blogs from './components/blogs/Blogs';
import About from './components/about/About';
import Navbar from './components/navbar/Navbar';
import { useState } from 'react';
import GalleryMain from './components/gallery-main/GalleryMain';
import Events from './components/events/Events';
import Publication from './components/publications/Publication';
import OurWorks from './components/ourWroks/OurWorks';
import OurPartners from './components/ourPartners/OurPartners';
import MemberCart from './components/memberCart/MemberCart';
import MyProfile from './components/myProfile/MyProfile';
import Login from './components/logingRegistration/login/Login';
import Dashboard from './components/dashboard/Dashboard';





function App() {



  const [darkmode, setDarkmode] = useState(false);
  return (
    <div className="App">
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} ></Navbar>
      <Routes>
        <Route path='/' element={<Home darkmode={darkmode}></Home>} />
        <Route path='/blogs' element={<Blogs darkmode={darkmode} ></Blogs>} />
        <Route path='/gallery' element={<GalleryMain darkmode={darkmode}></GalleryMain>} />
        <Route path='/events' element={<Events darkmode={darkmode}></Events>} />
        <Route path='/about' element={<About></About>} />
        <Route path='/publication' element={<Publication></Publication>} />
        <Route path='/works' element={<OurWorks darkmode={darkmode}></OurWorks>} />
        <Route path='/partners' element={<OurPartners darkmode={darkmode}></OurPartners>} />
        <Route path='/members' element={<MemberCart darkmode={darkmode}></MemberCart>} />
        <Route path='/myProfile' element={<MyProfile darkmode={darkmode}></MyProfile>} />
        <Route path='/login' element={<Login darkmode={darkmode}></Login>} />
        <Route path='/dashboard' element={<Dashboard></Dashboard>} />
      </Routes>

    </div>
  );
}

export default App;
