import React, { useEffect, useState } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Login.css';
import auth from '../../../firebase/firebase.init';
import Loading from '../../../Loading/Loading';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchToken } from '../../../fetchedData/fetchToken';

const Login = ({ darkmode }) => {
    const navigate = useNavigate();

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const [signInWithGoogle,] = useSignInWithGoogle(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const [user] = useAuthState(auth);



    const [
        createUserWithEmailAndPassword,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, profileLoading] = useUpdateProfile(auth);



    const [
        signInWithEmailAndPassword,
        userSignIn,
        loadingSignIn,
        errorSignIn,
    ] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loginSwitch, setLoginSwith] = useState(false);
    const [view, setView] = useState(false);

    const actionCodeSettings = {
        url: 'https://optometrist-a88bd.web.app/login',
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (userSignIn || errorSignIn) {
            setView(true)
            setTimeout(() => {
                setView(false);
                if (userSignIn) {
                    navigate('/');
                    toast.success("login successfull")
                }
            }, 2000)
        }
    }, [userSignIn, errorSignIn, navigate]);


    const handleSignInWithGoogle = async () => {
        const response = await signInWithGoogle();
        const userEmail = response?.user?.email

        await fetchToken(userEmail);



        navigate('/');
        toast.success("successfully signed in with google");

    }

    const handleEmailVarification = () => {
        sendEmailVerification(auth.currentUser).then(
            () => {
                toast.success("an email has been sent. please check!");
            }
        )

    }

    const pageLocation = useLocation();

    useEffect(() => {
        document.title = `oabd-${pageLocation?.pathname?.slice(1)}`;
    }, [pageLocation]);





    if (profileLoading) {
        return <Loading></Loading>
    }

    return (
        <div style={{ transition: '1s ease-in-out' }} className={` ${darkmode && 'bg-black text-white'} loginMain`}>
            <div className="loginRegistrationContainer">
                <div className="loginRegistrationOptions">
                    <div onClick={() => setLoginSwith(false)} className={`${!loginSwitch && 'backgroundForOptions'} loginOption`}>Login</div>
                    <div onClick={() => setLoginSwith(true)} className={` ${loginSwitch && 'backgroundForOptions'} registrationOption`}>Registration</div>
                </div>
                <br />
                {
                    !loginSwitch &&
                    <div className="login-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    className='inputLoginReg'
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    className='inputLoginReg'
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {loadingSignIn && <p className='text-blue-600'>Loading...</p>}
                                {
                                    view &&
                                    <p>
                                        {errorSignIn && <p className='text-red-600'>{errorSignIn.message}</p>}
                                    </p>
                                }
                                {
                                    view &&
                                    <p>
                                        {userSignIn && <p className='text-green-600'>successfully logged in</p>}
                                    </p>
                                }

                                <div className='w-full flex items-center justify-end'>
                                    <p className='text-green-500 text-sm cursor-pointer' onClick={async () => {
                                        if (email !== '') {
                                            const success = await sendPasswordResetEmail(email, actionCodeSettings)
                                            if (success) {
                                                toast.success("an email has been sent. please check!")
                                            }
                                        } else {
                                            toast.error("you did not type any email!")
                                        }
                                    }}>forgot password?</p>
                                </div>
                                <br />
                                <br />
                                {
                                    user?.emailVerified === false &&
                                    <p className='text-red-500 text-sm'>your email is not varified. please go to gmail account and verify soon!</p>
                                }
                            </div>


                            <div className="loginRegSubmitBtn">
                                <div className="loginRegSubmitBtnContainer">
                                    <button onClick={async () => {

                                        const response = await signInWithEmailAndPassword(email, password);

                                        if (response) {
                                            const email = response?.user?.email
                                            await fetchToken(email)
                                        }
                                        setPassword('');
                                    }} className='btnLoginReg' type="submit">Login</button>
                                    <br /><br />
                                    <button onClick={handleSignInWithGoogle} className='btnLoginReg' type="submit">Login with Google</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
                {
                    loginSwitch &&
                    <div className="login-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>name:</label>
                                <input
                                    className='inputLoginReg'
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    className='inputLoginReg'
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    className='inputLoginReg'
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="loginRegSubmitBtn">
                                <button onClick={async () => {
                                    const response = await createUserWithEmailAndPassword(email, password);
                                    await updateProfile({ displayName: name });
                                    handleEmailVarification();
                                    if (response) {
                                        const email = response?.user?.email
                                        await fetchToken(email);
                                    }
                                    toast.success("Registration successfull");
                                    navigate('/login');
                                    setPassword('');

                                }} className='btnLoginReg' type="submit">Signup</button>
                                <br /><br />
                                <button onClick={handleSignInWithGoogle} className='btnLoginReg' type="submit">Login with Google</button>

                            </div>
                        </form>
                    </div>
                }
            </div>
            <div className="fakeNavBackground">

            </div>
        </div>
    );
};

export default Login;