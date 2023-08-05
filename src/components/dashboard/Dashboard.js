import React, { useState } from 'react';
import './Dashboard.css';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
const Dashboard = () => {
    const [positionSlide, setPositionSlide] = useState(50);
    const [heighlight, setHighlight] = useState(1)
    const [user] = useAuthState(auth)

    return (
        <div className='dashboard_main'>
            <div className="dashboard">

                <div className="sidebar">
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
                                <li onClick={() => setHighlight(5)} className={heighlight === 5 && 'text-blue-500'}> <Link to='dashTransection'> <i class="uil uil-transaction text-xl"></i> TRANSECTION</Link> </li>
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
                                <li onClick={() => setHighlight(5)} className={heighlight === 5 && 'text-blue-500'}> <Link to='dashTransection'> <i class="uil uil-transaction text-xl"></i> TRANSECTION</Link> </li>
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
                                    <h1>DASHBOARD</h1>
                                </div>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;