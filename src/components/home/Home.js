import Banner from '../banner/Banner';
import About from '../about/About';
import TypeWritterEffect from '../typeWritter/TypeWritterEffect';
import Gallery from '../gallery/Gallery';
import BlogHome from '../blogHome/BlogHome';
import MemberCart from '../memberCart/MemberCart';
import Footer from '../footer/Footer';
import Advertise from '../advertise/Advertise';
import AboutAll from '../aboutAll/AboutAll';
import { Link } from 'react-router-dom';


const Home = ({ darkmode }) => {
    console.log()
    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${darkmode ? 'bg-black' : 'bg-white'}`} >
            <br />
            <About darkmode={darkmode}></About>
            <Advertise darkmode={darkmode}></Advertise>
            <AboutAll></AboutAll>
            <Banner darkmode={darkmode}></Banner>
            <TypeWritterEffect></TypeWritterEffect>
            <Gallery darkmode={darkmode}></Gallery>
            <BlogHome darkmode={darkmode}></BlogHome>
            <MemberCart darkmode={darkmode}></MemberCart>
            <div style={{ width: '150px', height: '150px' }} className=" flex items-center justify-center mx-auto">
                <Link to='/members'><button className='btn btn-primary '>view all</button></Link>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;