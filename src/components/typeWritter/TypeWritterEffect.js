import React, { useEffect, useState } from 'react';
import typeWriter from './TypeWritterEffect.module.css';
import ScrollTrigger from 'react-scroll-trigger';
import Typewriter from 'typewriter-effect';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useHeroData from '../../customHooks/useHeroSectionHook';
import { fetchUpdateHeroData } from '../../fetchedData/fetchHeroData';
import { toast } from 'react-toastify';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
// ..
AOS.init();

const TypeWritterEffect = () => {
    const [heroData, refetch] = useHeroData();
    const allHeroData = heroData?.data?.data?.data;
    const [memberData] = useMemberData();
    const allMembers = memberData?.data?.data?.data;
    const [user] = useAuthState(auth);
    const [counterStart, setCounterStart] = useState(false);
    const [open, setOpen] = useState(false);
    const [titleOne, setTitleOne] = useState('')
    const [titleTwo, setTitleTwo] = useState('')
    const [employee, setEmployee] = useState('')
    const [branch, setBranch] = useState('')

    const findAdmins = allMembers?.filter(f => {
        return f?.isAdmin === true;
    });


    const findAdmin = findAdmins?.find(f => {
        return f?.email === user?.email
    })

    const openModal = () => {
        setOpen(true);
        console.log(open)
    };

    useEffect(() => {
        setTitleOne(allHeroData?.[0].titleThree)
        setTitleTwo(allHeroData?.[0].titleFour)
        setEmployee(allHeroData?.[0].employee)
        setBranch(allHeroData?.[0].branch)
    }, [allHeroData])

    const updateTypeWritter = async () => {

        const updatedData = {
            titleThree: titleOne,
            titleFour: titleTwo,
            employee,
            branch
        }

        await fetchUpdateHeroData(updatedData, allHeroData?.[0]._id, refetch).then(res => {
            if (res?.data?.statusCode === 200) {
                toast.success('successfully updated');
                setOpen(false);
            }
        })
    }

    return (
        <ScrollTrigger onEnter={() => setCounterStart(true)} onExit={() => setCounterStart(false)}>
            <div>
                <div className={typeWriter.typeWriter}>
                    <div data-aos='fade-up' className={typeWriter.typeWriterMain} >
                        <p> <Typewriter

                            options={{
                                strings: [`${allHeroData?.[0].titleThree}`, `${allHeroData?.[0].titleFour}`],
                                autoStart: true,
                                delay: 75,
                                loop: true
                            }}

                        />  </p>
                    </div>
                    <div data-aos='fade-up' className={typeWriter.increasingNumber}>

                        <div className={typeWriter.increasingNumberOne}>
                            <p style={{ fontSize: '25px' }}>{counterStart && <CountUp start={0} end={`${allHeroData?.[0].employee}`} duration={4}></CountUp>}+</p>
                            <p>EMPLOYEE</p>
                        </div>
                        <div className={typeWriter.increasingNumberTwo}>
                            <p style={{ fontSize: '25px' }}>{counterStart && <CountUp start={0} end={`${allHeroData?.[0].branch}`} duration={4}></CountUp>}+</p>
                            <p>BRANCH</p>
                        </div>

                    </div>
                    {
                        findAdmin?.email
                        &&
                        <div className={typeWriter.updateBtn}>
                            <i onClick={openModal} className="uil uil-edit mr-2 cursor-pointer"></i>
                        </div>
                    }
                </div>

                <div className={open ? typeWriter.block : typeWriter.none}>
                    <div className={`${typeWriter.modal}`}>
                        <div className={typeWriter.modalContainer}>
                            <i onClick={() => setOpen(false)} className="uil uil-times cursor-pointer text-gray-400"></i>
                            <hr className='mt-1 mb-1' />
                            <div className={typeWriter.modalDetail}>
                                <div className={typeWriter.detailOne}>
                                    <label className='text-gray-300' htmlFor="">change title one :</label>
                                    <input type="text" name="" id=""
                                        value={titleOne}
                                        onChange={(e) => setTitleOne(e.target.value)}
                                    />
                                    <br /><br />
                                    <label className='text-gray-300' htmlFor="">change title two :</label>
                                    <input type="text" name="" id=""
                                        value={titleTwo}
                                        onChange={(e) => setTitleTwo(e.target.value)}
                                    />
                                </div>

                                <div className={typeWriter.detailTwo}>
                                    <label className='text-gray-300' htmlFor="">change employee number :</label>
                                    <input type="text" name="" id=""
                                        value={employee}
                                        onChange={(e) => setEmployee(e.target.value)}
                                    />
                                    <br /><br />
                                    <label className='text-gray-300' htmlFor="">change branch number :</label>
                                    <input type="text" name="" id=""
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <br /><br />
                            <div className={typeWriter.updateBtns}>
                                <button onClick={updateTypeWritter} className='btn btn-primary w-full'>update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollTrigger>
    );
};

export default TypeWritterEffect;