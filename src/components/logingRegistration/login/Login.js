import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import './Login.css';
import auth from '../../../firebase/firebase.init';

const Login = ({ darkmode }) => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        userCreateWithEmail,
        loadingCreateWithEmail,
        errorCreateWithEmail,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [
        signInWithEmailAndPassword,
        userSignIn,
        loadingSignIn,
        errorSignIn,
    ] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [loginSwitch, setLoginSwith] = useState(false);
    const [view, setView] = useState(false);
    console.log(view)



    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    useEffect(() => {
        if (userSignIn || errorSignIn) {
            setView(true)
            setTimeout(() => {
                setView(false);
            }, 2000)
        }
    }, [userSignIn, errorSignIn])

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
                        <h2>Login</h2>
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
                            </div>


                            <div className="loginRegSubmitBtn">
                                <div className="loginRegSubmitBtnContainer">
                                    <button onClick={() => {
                                        signInWithEmailAndPassword(email, password)

                                        setPassword('');
                                    }} className='btnLoginReg' type="submit">Login</button>
                                    <br /><br />
                                    <button onClick={() => signInWithGoogle()} className='btnLoginReg' type="submit">Login with Google</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
                {
                    loginSwitch &&
                    <div className="login-form">
                        <h2>Registration</h2>
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
                            </div>
                            <div className="loginRegSubmitBtn">
                                <button onClick={() => {
                                    createUserWithEmailAndPassword(email, password)

                                    setPassword('');
                                }} className='btnLoginReg' type="submit">Signup</button>
                                <br /><br />
                                <button onClick={() => signInWithGoogle()} className='btnLoginReg' type="submit">Login with Google</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;