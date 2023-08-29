import React, { useEffect, useState } from 'react';
import hero from './Hero.module.css';
import Typewriter from 'typewriter-effect';
import useHeroData from '../../customHooks/useHeroSectionHook';
import { updloadImage } from '../../fetchedData/fetchPostImageData';
import { fetchUpdateHeroData } from '../../fetchedData/fetchHeroData';
import { toast } from 'react-toastify';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase/firebase.init';

const Hero = () => {
    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    const [heroData, refetch] = useHeroData();
    const [titleOne, setTitleOne] = useState('');
    const [titleTwo, setTitleTwo] = useState('');
    const allHeroData = heroData?.data?.data?.data;
    const [imgHolder, setImgHolder] = useState('');
    const [memberData] = useMemberData();
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');


    const findAdmin = memberData?.data?.data?.data?.find(f => {
        return f?.email === user?.email
    });



    useEffect(() => {
        setTitleOne(allHeroData?.[0].titleOne)
        setTitleTwo(allHeroData?.[0].titleTwo)
        setEmail(allHeroData?.[0].infoEmail)
        setMobile(allHeroData?.[0].infoNumber)
    }, [allHeroData])


    const updateHero = async () => {

        const heroImg = imgHolder ? imgHolder : allHeroData?.[0].imgLink
        const updatedData = {
            titleOne: titleOne,
            titleTwo: titleTwo,
            imgLink: heroImg,
            infoEmail: email,
            infoNumber: mobile
        }

        await fetchUpdateHeroData(updatedData, allHeroData?.[0]._id, refetch).then(res => {
            if (res?.data?.statusCode === 200) {
                toast.success('successfully updated');
                setOpen(false);
            }
        })
    }

    return (

        <div className={hero.hero}>
            {
                allHeroData?.map(heroData => {
                    return (
                        <div key={heroData?._id} className={`${hero.main} hero min-h-screen`} style={{ backgroundImage: `url(${heroData?.imgLink})` }}>
                            <div className="hero-overlay bg-opacity-40"></div>
                            <div sty className={`hero-content  text-neutral-content ${hero.heroContainer}`}>
                                <div className={`max-w-md `}>

                                    <p className='text-5xl font-bold'> <Typewriter
                                        options={{
                                            strings: [`${heroData?.titleOne}`, `${heroData?.titleTwo}`],
                                            autoStart: true,
                                            delay: 75,
                                            loop: true
                                        }}
                                    />  </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className={`${open ? hero.block : hero.none}`}>
                <div className={`${hero.popup}`}>
                    <div className={hero.containerPopup}>
                        <i onClick={() => setOpen(false)} className="uil uil-times cursor-pointer text-gray-400"></i>
                        <hr className='mt-2' />
                        <br />
                        <div className={hero.popupDetail}>
                            <div>
                                <label className='text-sm font-bold text-gray-400' htmlFor="">change title one :</label>
                                <input className='border border-gray-400' type="text"
                                    value={titleOne}
                                    onChange={(e) => setTitleOne(e.target.value)}
                                />
                                <br />
                                <br />
                                <label className='text-sm font-bold  text-gray-400' htmlFor="">change title two :</label>
                                <input className='border border-gray-400' type="text"
                                    value={titleTwo}
                                    onChange={(e) => setTitleTwo(e.target.value)}
                                />
                                <br />
                                <br />
                                <div style={{ width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <label className='text-sm font-bold  text-gray-400'>change image :</label>
                                        <div className={hero.chooseFileDesign}>
                                            <p className='text-white font-bold'>
                                                <i class="uil uil-upload mr-2"></i>
                                                <span>Choose File</span>
                                            </p>
                                            <input className={hero.chooseFile} type="file" onChange={(e) => {
                                                const imgFile = e.target.files[0];

                                                updloadImage(imgFile, setImgHolder);
                                            }}
                                                required
                                            />
                                        </div>

                                    </div>


                                    {
                                        imgHolder && <span className='text-green-600 text-sm italic mt-5'>Image added</span>
                                    }
                                    <div>

                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className='text-sm font-bold  text-gray-400' htmlFor="">change email:</label>
                                <input type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <br />
                                <br />
                                <label className='text-sm font-bold  text-gray-400' htmlFor="">change number:</label>
                                <input type="number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                                <br />
                                <br />
                            </div>
                        </div>
                        <br />
                        <button onClick={updateHero} className='btn btn-primary w-full'>update</button>
                    </div>
                </div>

            </div>
            {
                findAdmin?.isAdmin === true &&
                <div onClick={() => setOpen(true)} className={hero.updateButton}>
                    <i className="uil uil-edit text-white cursor-pointer"></i>
                </div>
            }
        </div>
    );
};

export default Hero;