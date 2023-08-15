import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import useMemberData from '../../customHooks/useMemberSectionHook';
import useBlogData from '../../customHooks/useBlogSectionHook';
import useGalleryData from '../../customHooks/useGallerySectionHook';
import useEventData from '../../customHooks/useEventSectionHook';
import Loading from '../../Loading/Loading';
const Dashboard = ({ darkmode }) => {
    const [positionSlide, setPositionSlide] = useState(50);
    const [heighlight, setHighlight] = useState(1)
    const [user] = useAuthState(auth);

    const [memberData] = useMemberData();
    const [blogData] = useBlogData();
    const [galleryData] = useGalleryData();
    const [eventData] = useEventData();


    const pageLocation = useLocation();

    useEffect(() => {
        document.title = `oabd-${pageLocation?.pathname?.slice(1)}`;
    }, [pageLocation]);


    if (blogData?.data?.statusCode !== 200 || galleryData?.data?.statusCode !== 200 || eventData?.data?.statusCode !== 200 || memberData?.data?.statusCode !== 200) {
        return <Loading></Loading>
    }

    return (
        <div className='dashboard_main'>
            <div className="dashboard">

                <div className={`${darkmode ? 'bg-gray-600 sidebar text-white' : 'sidebar sidebar_background'}`}>

                    <br />
                    <br />
                    <div className="sidebarContainer">
                        <p title={user?.displayName} style={{ fontSize: '12px' }} className='text-center font-bold mt-3 uppercase'>{user?.displayName?.length > 20 ? user?.displayName?.slice(0, 20) + '...' : user?.displayName}
                        </p>
                        <hr style={{ marginTop: '22px' }} />
                        <br />
                        <div className="sidebarDetailpart">
                            <ul>
                                <li onClick={() => setHighlight(1)} className={heighlight === 1 && 'text-blue-500'} > <Link to=''><i class="uil uil-file-edit-alt text-xl"></i>  BLOG</Link> </li>
                                <li onClick={() => setHighlight(2)} className={heighlight === 2 && 'text-blue-500'}> <Link to='gallery'><i class="uil uil-image text-xl"></i> GALLERY</Link> </li>
                                <li onClick={() => setHighlight(3)} className={heighlight === 3 && 'text-blue-500'}> <Link to='event'><i class="uil uil-calendar-alt text-xl"></i> EVENT</Link></li>
                                <li onClick={() => setHighlight(4)} className={heighlight === 4 && 'text-blue-500'} > <Link to='publication'>  <i class="uil uil-newspaper text-xl"></i> PUBLICATIONS</Link></li>
                                <li >
                                    <details>
                                        <summary>
                                            <i class="uil uil-transaction text-xl mr-1"></i>
                                            TRANSECTION
                                        </summary>
                                        <br />
                                        <ul className="p-2">
                                            <li onClick={() => setHighlight(8)} className={heighlight === 8 && 'text-blue-500'}>
                                                <Link to='dashTransection'>
                                                    PAYMENT
                                                </Link>
                                            </li>
                                            <li onClick={() => setHighlight(9)} className={heighlight === 9 && 'text-blue-500'}>
                                                <Link to='dashPaymentHistory'>
                                                    HISTORY
                                                </Link>
                                            </li>

                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div onMouseLeave={() => setPositionSlide(50)} style={{ position: 'fixed', left: `${-positionSlide}%`, transition: '.5s ease', zIndex: '5' }} className="hiddenSidebar">
                    <div className="sidebarContainerHidden">
                        <div onClick={() => setPositionSlide(50)} style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px' }}>
                            <i class="uil uil-times cursor-pointer mr-2 "></i>
                        </div>
                        <p title={user?.displayName} style={{ fontSize: '12px' }} className='text-center font-bold mt-3 uppercase'>{user?.displayName?.length > 23 ? user?.displayName?.slice(0, 23) + '...' : user?.displayName}
                        </p>
                        <br />
                        <hr />
                        <br />
                        <div className="sidebarDetailPartHidden">
                            <ul>
                                <li onClick={() => setHighlight(1)} className={heighlight === 1 && 'text-blue-500'}> <Link to=''> <i class="uil uil-file-edit-alt text-xl"></i> BLOG</Link></li>
                                <li onClick={() => setHighlight(2)} className={heighlight === 2 && 'text-blue-500'}> <Link to='gallery'> <i class="uil uil-image text-xl"></i> GALLERY</Link> </li>
                                <li onClick={() => setHighlight(3)} className={heighlight === 3 && 'text-blue-500'}> <Link to='event'> <i class="uil uil-calendar-alt text-xl"></i> EVENT</Link> </li>
                                <li onClick={() => setHighlight(4)} className={heighlight === 4 && 'text-blue-500'}> <Link to='publication'> <i class="uil uil-newspaper text-xl"></i> PUBLICATIONS</Link> </li>
                                <li >
                                    <details>
                                        <summary>
                                            <i class="uil uil-transaction text-xl mr-1"></i>
                                            TRANSECTION
                                        </summary>
                                        <br />
                                        <ul className="p-2">
                                            <li onClick={() => setHighlight(8)} className={heighlight === 8 && 'text-blue-500'}>
                                                <Link to='dashTransection'>
                                                    PAYMENT
                                                </Link>
                                            </li>
                                            <li onClick={() => setHighlight(9)} className={heighlight === 9 && 'text-blue-500'}>
                                                <Link to='dashPaymentHistory'>
                                                    HISTORY
                                                </Link>
                                            </li>

                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="main-content">

                    <div className="main-content-container">
                        <div className="firstBar">
                            <p onClick={() => setPositionSlide(0)} className='dashboardBargerIcon'>  <i class="uil uil-bars cursor-pointer"></i></p>
                        </div>
                        <div className={`${darkmode ? 'bg-black' : 'bg-white'} main-content-detailpart`}>
                            <div className='dashboard-title-container'>
                                <div className={`${darkmode ? 'bg-black text-white ' : 'bg-white'} dashboard-title`}>
                                    <h1>DASHBOARD</h1>
                                </div>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <div className="fakeNavBackground">

            </div>
        </div>

    );
};

export default Dashboard;