import Banner from '../banner/Banner';
import About from '../about/About';
import TypeWritterEffect from '../typeWritter/TypeWritterEffect';
import Gallery from '../gallery/Gallery';
import BlogHome from '../blogHome/BlogHome';
import Footer from '../footer/Footer';
import Advertise from '../advertise/Advertise';
import AboutAll from '../aboutAll/AboutAll';
import { Link, useLocation } from 'react-router-dom';
import Hero from '../Hero/Hero';
import MemberCartHome from '../memberCart/MemberCartHome';
import { useEffect } from 'react';
import useAboutData from '../../customHooks/useAboutSectionHook';
import useAdvertiseData from '../../customHooks/useAdvertiseSectionHook';
import useBannerData from '../../customHooks/useBannerSectionHook';
import useGalleryData from '../../customHooks/useGallerySectionHook';
import useBlogData from '../../customHooks/useBlogSectionHook';
import useMemberData from '../../customHooks/useMemberSectionHook';
import LoadingHome from '../../Loading/LoadingHome';

const Home = ({ darkmode, setNavScroll }) => {

    const [aboutData] = useAboutData();
    const [advertiseData] = useAdvertiseData();
    const [bannerData] = useBannerData();
    const [galleryData] = useGalleryData();
    const [blogData] = useBlogData();
    const [memberData] = useMemberData();

    const pageLocation = useLocation();


    useEffect(() => {
        document.title = 'oabd';

    }, [pageLocation]);



    useEffect(() => {
        const ChangeBackground = () => {
            if (window.scrollY >= 100) {
                setNavScroll(true)
            } else {
                setNavScroll(false)
            }
        }
        window?.addEventListener('scroll', ChangeBackground)

    }, [setNavScroll]);

    if (aboutData?.data?.statusCode !== 200 || advertiseData?.data?.statusCode !== 200 || bannerData?.data?.statusCode !== 200 || galleryData?.data?.statusCode !== 200 || blogData?.data?.statusCode !== 200 || memberData?.data?.statusCode !== 200) {
        return <LoadingHome></LoadingHome>
    }


    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${darkmode ? 'bg-black' : 'bg-white'}`} >
            <Hero></Hero>
            <About darkmode={darkmode}></About>
            <Advertise darkmode={darkmode}></Advertise>
            <AboutAll></AboutAll>
            <Banner darkmode={darkmode}></Banner>
            <TypeWritterEffect></TypeWritterEffect>
            <Gallery darkmode={darkmode}></Gallery>
            <BlogHome darkmode={darkmode}></BlogHome>
            <MemberCartHome darkmode={darkmode}></MemberCartHome>
            <div style={{ width: '150px', height: '150px' }} className=" flex items-center justify-center mx-auto">
                <Link to='/members'><button className='btn btn-primary '>view all</button></Link>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;