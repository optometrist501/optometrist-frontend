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
import { ToastContainer } from 'react-toastify';
import DashBlog from './components/dashboard/blog/DashBlog';
import DashEvents from './components/dashboard/events/DashEvents';
import DashGallery from './components/dashboard/gallery/DashGallery';
import DashPublications from './components/dashboard/publications/DashPublications';
import PanelBoard from './components/controllPanel/panelboard/PanelBoard';
import PanelBlog from './components/controllPanel/panelBlog/PanelBlog';
import PanelEvent from './components/controllPanel/PanelEvent/PanelEvent';
import PanelGallery from './components/controllPanel/PanelGallery/PanelGallery';
import PanelPublication from './components/controllPanel/PanelPublication/PanelPublication';
import MemberLogin from './components/logingRegistration/memberLogin/MemberLogin';
import RequireMember from './Varification/RequireMember';
import RequireAdmin from './Varification/RequireAdmin';
import RequireProfile from './Varification/RequireProfile';
import PanelMember from './components/controllPanel/PanelMember/PanelMember';
import PanelRequests from './components/controllPanel/PanelRequests/PanelRequests';





function App() {



  const [darkmode, setDarkmode] = useState(false);
  return (
    <div className="App">
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} ></Navbar>
      <ToastContainer style={{ marginTop: '100px' }} />
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
        <Route path='/myProfile'
          element={
            <RequireProfile>
              <MyProfile darkmode={darkmode}></MyProfile>
            </RequireProfile>
          }
        />
        <Route path='/login' element={<Login darkmode={darkmode}></Login>} />
        <Route path='/memberLogin' element={<MemberLogin darkmode={darkmode}></MemberLogin>} />
        <Route path='/dashboard'
          element={
            <RequireMember>
              <Dashboard></Dashboard>
            </RequireMember>}
        >
          <Route index to='' element={<DashBlog></DashBlog>}></Route>
          <Route path='event' element={<DashEvents></DashEvents>}></Route>
          <Route path='gallery' element={<DashGallery></DashGallery>}></Route>
          <Route path='publication' element={<DashPublications></DashPublications>}></Route>
        </Route>

        <Route path='/panelBoard'
          element={
            <RequireAdmin>
              <PanelBoard></PanelBoard>
            </RequireAdmin>
          }
        >
          <Route index to='' element={<PanelBlog></PanelBlog>}></Route>
          <Route path='event' element={<PanelEvent></PanelEvent>}></Route>
          <Route path='gallery' element={<PanelGallery></PanelGallery>}></Route>
          <Route path='publication' element={<PanelPublication></PanelPublication>}></Route>
          <Route path='panelMember' element={<PanelMember></PanelMember>}></Route>
          <Route path='panelRequest' element={<PanelRequests></PanelRequests>}></Route>
        </Route>
      </Routes>

      {/* <div className='w-full h-80 flex items-center justify-center'>
        <p className='text-red-500'>website is under development...</p>
      </div> */}

    </div>
  );
}

export default App;


// github email: optometrist501@gmail.compact
// password: qMAux5QvPDFt@e5

/* 
 optometrist501@gmail.com
  optometRist_501@#
*/
