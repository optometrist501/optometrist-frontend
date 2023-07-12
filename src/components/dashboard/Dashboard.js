import React from 'react';
import './Dashboard.css';
const Dashboard = () => {
    return (
        <div className='dashboard_main'>
            <div className="dashboard">

                <div className="sidebar">
                    <div className="sidebarContainer">
                        <h2>Dashboard</h2>
                        <ul>
                            <li>Home</li>
                            <li>Analytics</li>
                            <li>Reports</li>
                            <li>Settings</li>
                        </ul>
                    </div>
                </div>
                <div className="main-content">
                    <h1>Welcome to the Dashboard</h1>
                    <p>Here is the main content of your dashboard.</p>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;