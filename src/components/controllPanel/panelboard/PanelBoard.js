import React, { useEffect, useState } from 'react';
import './panelBoard.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import { Link, Outlet } from 'react-router-dom';
import useMemberData from '../../../customHooks/useMemberSectionHook';
import useBlogData from '../../../customHooks/useBlogSectionHook';
import useGalleryData from '../../../customHooks/useGallerySectionHook';
import useEventData from '../../../customHooks/useEventSectionHook';
import Loading from '../../../Loading/Loading';

const PanelBoard = () => {

    const [positionSlide, setPositionSlide] = useState(50);
    const [heighlight, setHighlight] = useState(1)
    const [user] = useAuthState(auth);
    const [second, setSecond] = useState();
    const [minute, setMinute] = useState();
    const remaining = 60 - second;

    const [memberData] = useMemberData();
    const [blogData] = useBlogData();
    const [galleryData] = useGalleryData();
    const [eventData] = useEventData();
    const allBlogs = blogData?.data?.data?.data;
    const allMembers = memberData?.data?.data?.data;
    const allGallery = galleryData?.data?.data?.data;
    const allEventData = eventData?.data?.data?.data;


    const findPendings = allMembers?.filter(f => {
        return f?.approval === false;
    })

    const findPendingBlogs = allBlogs?.filter(f => {
        return f?.approval === false
    })

    const findPendingGallery = allGallery?.filter(f => {
        return f?.approval === false
    })

    const findPendingEvents = allEventData?.filter(f => {
        return f?.approval === false
    })


    useEffect(() => {
        setInterval(() => {
            const todaySecond = new Date().getSeconds();
            setSecond(todaySecond);
            const todayMinute = new Date().getMinutes();
            setMinute(todayMinute);
        }, 1000)
    }, [second, minute]);


    if (blogData?.data?.statusCode !== 200 || galleryData?.data?.statusCode !== 200 || eventData?.data?.statusCode !== 200 || memberData?.data?.statusCode !== 200) {
        return <Loading></Loading>
    }

    return (
        <div className='dashboard_main'>
            <div className="dashboard">

                <div className="sidebar-panel">
                    <div className="sidebarContainer">
                        <p title={user?.displayName} style={{ fontSize: '12px' }} className='text-center font-bold mt-3 uppercase'>{user?.displayName?.length > 20 ? user?.displayName?.slice(0, 20) + '...' : user?.displayName}
                        </p>
                        <hr style={{ marginTop: '22px' }} />
                        <br />
                        <div className="sidebarDetailpart">
                            <ul>
                                <li onClick={() => setHighlight(1)} className={heighlight === 1 && 'text-orange-500'} >
                                    <Link style={{ width: '90px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} to=''>
                                        <div>
                                            <i class="uil uil-file-edit-alt text-xl"></i>  BLOG
                                        </div>

                                        {findPendingBlogs?.length > 0 &&
                                            <div
                                                style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '3px 5px', fontSize: '12px', marginLeft: '3px' }}>
                                                {findPendingBlogs?.length}
                                            </div>
                                        }
                                    </Link>
                                </li>
                                <li onClick={() => setHighlight(2)} className={heighlight === 2 && 'text-orange-500'}>
                                    <Link style={{ width: '115px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} to='gallery'>
                                        <div>
                                            <i class="uil uil-file-edit-alt text-xl"></i>  GALLERY
                                        </div>

                                        {findPendingGallery?.length > 0 &&
                                            <div
                                                style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '3px 5px', fontSize: '12px', marginLeft: '3px' }}>
                                                {findPendingGallery?.length}
                                            </div>
                                        }
                                    </Link>
                                </li>
                                <li onClick={() => setHighlight(3)} className={heighlight === 3 && 'text-orange-500'}>
                                    <Link style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} to='event'>
                                        <div>
                                            <i class="uil uil-file-edit-alt text-xl"></i>  EVENT
                                        </div>

                                        {findPendingEvents?.length > 0 &&
                                            <div
                                                style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '3px 5px', fontSize: '12px', marginLeft: '3px' }}>
                                                {findPendingEvents?.length}
                                            </div>
                                        }
                                    </Link>
                                </li>
                                <li onClick={() => setHighlight(4)} className={heighlight === 4 && 'text-orange-500'} > <Link to='publication'>  <i class="uil uil-newspaper text-xl"></i> PUBLICATIONS</Link></li>
                                <li onClick={() => setHighlight(5)} className={heighlight === 5 && 'text-orange-500'} > <Link to='panelMember'>  <i class="uil uil-user text-xl"></i> MEMBERS</Link></li>
                                <li onClick={() => setHighlight(6)} className={`${heighlight === 6 && 'text-orange-500'} `} >

                                    <Link style={{ width: '125px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} to='panelRequest'>
                                        <div>
                                            <i class="uil uil-user-exclamation text-xl"></i> REQUESTS
                                        </div>
                                        {findPendings?.length > 0 &&
                                            <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '3px 5px', fontSize: '12px', marginLeft: '3px' }}>{findPendings?.length}</div>
                                        }
                                    </Link>
                                </li>

                                <li onClick={() => setHighlight(8)} className={heighlight === 8 && 'text-orange-500'} > <Link to='panelTransection'>  <i class="uil uil-transaction text-xl"></i> TRANSACTION</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div onMouseLeave={() => setPositionSlide(50)} style={{ position: 'fixed', left: `${-positionSlide}%`, transition: '.5s ease', zIndex: '5' }} className="hiddenSidebar-panel">
                    <div className="sidebarContainerHidden">
                        <div onClick={() => setPositionSlide(50)} style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px', paddingTop: '12px' }}>
                            <i class="uil uil-times cursor-pointer mr-2 "></i>
                        </div>
                        <p title={user?.displayName} style={{ fontSize: '12px' }} className='text-center font-bold mt-3 uppercase'>{user?.displayName?.length > 23 ? user?.displayName?.slice(0, 23) + '...' : user?.displayName}
                        </p>
                        <br />
                        <hr />
                        <br />
                        <div className="sidebarDetailPartHidden">
                            <ul>
                                <li onClick={() => setHighlight(1)} className={heighlight === 1 && 'text-orange-500'} >
                                    <Link style={{ width: '90px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} to=''>
                                        <div>
                                            <i class="uil uil-file-edit-alt text-xl"></i>  BLOG
                                        </div>

                                        {findPendingBlogs?.length > 0 &&
                                            <div
                                                style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '3px 5px', fontSize: '12px', marginLeft: '3px' }}>
                                                {findPendingBlogs?.length}
                                            </div>
                                        }
                                    </Link>
                                </li>
                                <li onClick={() => setHighlight(2)} className={heighlight === 2 && 'text-orange-500'}>
                                    <Link style={{ width: '115px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} to='gallery'>
                                        <div>
                                            <i class="uil uil-file-edit-alt text-xl"></i>  GALLERY
                                        </div>

                                        {findPendingGallery?.length > 0 &&
                                            <div
                                                style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '3px 5px', fontSize: '12px', marginLeft: '3px' }}>
                                                {findPendingGallery?.length}
                                            </div>
                                        }
                                    </Link>
                                </li>
                                <li onClick={() => setHighlight(3)} className={heighlight === 3 && 'text-orange-500'}>
                                    <Link style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} to='event'>
                                        <div>
                                            <i class="uil uil-file-edit-alt text-xl"></i>  EVENT
                                        </div>

                                        {findPendingEvents?.length > 0 &&
                                            <div
                                                style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '3px 5px', fontSize: '12px', marginLeft: '3px' }}>
                                                {findPendingEvents?.length}
                                            </div>
                                        }
                                    </Link>
                                </li>
                                <li onClick={() => setHighlight(4)} className={heighlight === 4 && 'text-orange-500'} > <Link to='publication'>  <i class="uil uil-newspaper text-xl"></i> PUBLICATIONS</Link></li>
                                <li onClick={() => setHighlight(5)} className={heighlight === 5 && 'text-orange-500'} > <Link to='panelMember'>  <i class="uil uil-user text-xl"></i> MEMBERS</Link></li>
                                <li onClick={() => setHighlight(6)} className={`${heighlight === 6 && 'text-orange-500'} `} >

                                    <Link style={{ width: '125px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} to='panelRequest'>
                                        <div>
                                            <i class="uil uil-user-exclamation text-xl"></i> REQUESTS
                                        </div>
                                        {findPendings?.length > 0 &&
                                            <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '3px 5px', fontSize: '12px', marginLeft: '3px' }}>{findPendings?.length}</div>
                                        }
                                    </Link>
                                </li>

                                <li onClick={() => setHighlight(8)} className={heighlight === 8 && 'text-orange-500'} > <Link to='panelTransection'>  <i class="uil uil-transaction text-xl"></i> TRANSACTION</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="main-content">

                    <div className="main-content-container">
                        <div className="firstBar">
                            <p onClick={() => setPositionSlide(0)} className='dashboardBargerIcon'>  <i class="uil uil-bars cursor-pointer"></i></p>
                        </div>
                        <div className="main-content-detailpart">
                            <div className='dashboard-title-container'>
                                <div className='dashboard-title'>
                                    <h1>CONTROLL PANEL</h1>
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

export default PanelBoard;