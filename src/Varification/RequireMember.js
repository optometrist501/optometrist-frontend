import React from 'react';
import auth from '../firebase/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchGetMemberData } from '../fetchedData/fetchMemberData';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';

const RequireMember = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    console.log(user?.email);

    const { data: getMemberData } = useQuery("getMemberData", () => fetchGetMemberData());

    const memberData = getMemberData?.data?.data?.data;


    if (loading) {
        return <Loading></Loading>
    }

    const findMember = memberData?.find(f => {
        return f.email === user?.email;
    });

    console.log(findMember?.isSignOut);

    if (!user?.email) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    if (user?.emailVerified === false) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }


    if (findMember?.isSignOut === true || findMember?.isSignOut === undefined) {
        return <Navigate to='/memberLogin' state={{ from: location }} replace />
    }

    if (findMember?.approval === false) {
        return <Navigate to='/memberLogin' state={{ from: location }} replace />
    }

    if (findMember?.isAdmin === true) {
        return <Navigate to='/memberLogin' state={{ from: location }} replace />
    }


    return children
};

export default RequireMember;