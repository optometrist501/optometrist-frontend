import React from 'react';
import committee from './Founder.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchDeleteFounderData, fetchPostFounderData, fetchUpdateFounderData } from '../../fetchedData/fetchFounderData';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import useFounderData from '../../customHooks/useFounderSectionHook';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { updloadImage } from '../../fetchedData/fetchPostImageData';

const Founder = ({ darkmode }) => {
    const [user] = useAuthState(auth);
    const [founderData, refetch] = useFounderData();
    const allFounderData = founderData?.data?.data?.data;
    const [memberData] = useMemberData();
    const allMembers = memberData?.data?.data?.data;
    const [switchOption, setSwitchOption] = useState(1);
    const [imgHolder, setImgHolder] = useState('');
    const [open, setOpen] = useState(false);
    const [idContainer, setIdContainer] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [blankIdentifier, setBlankIdentifier] = useState({});

    const [updateName, setUpdateName] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateDesignation, setUpdateDesignation] = useState('');
    const [updateMobile, setUpdateMobile] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');

    const openModal = (id) => {
        setOpen(true);
        setIdContainer(id);
    }

    const findFounderById = allFounderData?.find(f => {
        return f?._id === idContainer
    });

    const findAdmins = allMembers?.filter(f => {
        return f?.isAdmin === true
    });

    const findAdmin = findAdmins?.find(f => {
        return f?.email === user?.email
    });



    console.log(findFounderById?._id);


    useEffect(() => {
        setUpdateName(findFounderById?.name)
        setUpdateEmail(findFounderById?.email)
        setUpdateAddress(findFounderById?.address)
        setUpdateMobile(findFounderById?.mobile)
        setUpdateDesignation(findFounderById?.designation)
    }, [findFounderById]);


    const updateFounder = async () => {
        const imgData = imgHolder ? imgHolder : findFounderById?.img;
        const updatedData = {
            name: updateName,
            email: updateEmail,
            address: updateAddress,
            mobile: updateMobile,
            designation: updateDesignation,
            img: imgData
        };

        await fetchUpdateFounderData(idContainer, updatedData, refetch).then(res => {
            if (res?.data?.statusCode === 200) {
                toast.success('updated successfully');
                setOpen(false);
            } else {
                toast.error('failed')
            }
        })
    }


    const postFounderData = async () => {

        setBlankIdentifier({
            name,
            publisherName: user?.displayName,
            email,
            publisherEmail: user?.email,
            designation,
            mobile,
            address,
            img: imgHolder
        })

        const FounderData = {
            name,
            publisherName: user?.displayName,
            email,
            publisherEmail: user?.email,
            designation,
            mobile,
            address,
            img: imgHolder
        }

        if (name !== '' && email !== '' && designation !== '' && imgHolder !== '') {
            await fetchPostFounderData(FounderData, refetch)
                .then(res => {
                    if (res?.data?.statusCode === 200) {
                        toast.success('successfully posted');
                        setOpen(false)
                    } else {
                        toast.error('failed')
                    }
                })
        } else {
            toast.error('except mobile and address, all field must have to be full-filed')
        }
    }


    const deleteFounder = async (idForDelete) => {
        const result = window.confirm(`are you sure to delete ${allFounderData?.find(f => {
            return f?._id === idForDelete
        })?.name}?`);
        if (result) {
            await fetchDeleteFounderData(idForDelete, refetch)
                .then(res => {
                    if (res?.data?.statusCode === 200) {
                        toast.success('successfully deleted')
                        setOpen(false)
                    } else {
                        toast.error('failed')
                    }
                })
        }
    }



    if (founderData?.data?.statusCode !== 200 && memberData?.data?.statusCode !== 200) {
        return <Loading></Loading>
    }

    return (
        <div className={`${darkmode ? 'bg-black text-white' : `${committee.backgroundImage}`} ${committee.main}`}>
            <p style={{ marginTop: '130px' }} className='text-center text-3xl font-bold'>FOUNDING MEMBERS</p>
            <br />
            <div className={committee.container}>
                <section className={`${committee.detailPart} ${darkmode && 'bg-black'}`}>
                    <br />
                    {
                        allFounderData?.map(committeeData => {
                            return (
                                <div key={committeeData?._id} className={`${darkmode ? 'bg-black' : 'bg-white'} ${committee.detailContainer}`}>
                                    <div className={committee.detail1}>
                                        <img src={committeeData?.img} alt="" />
                                    </div>
                                    <br />
                                    <div className={committee.detail2}>
                                        <p className='text-sm font-bold mb-1 text-center'>{committeeData?.name}</p>
                                        <p className='text-sm font-bold mb-1 text-center'>{committeeData?.designation}</p>
                                        <p className='text-sm font-bold mb-1 text-center'>{committeeData?.email}</p>
                                        {
                                            committeeData?.mobile && <p className='text-sm font-bold mb-1 text-center'>{committeeData?.mobile}</p>
                                        }
                                        {
                                            committeeData?.address && <p className='text-sm font-bold mb-1 text-center'>{committeeData?.address}</p>
                                        }
                                    </div>
                                    {
                                        findAdmin?.email
                                        &&
                                        <div onClick={() => openModal(committeeData?._id)} className={committee.edition}>
                                            <i class="uil uil-pen text-gray-400 cursor-pointer"></i>
                                        </div>
                                    }
                                    {
                                        (allFounderData?.length > 1 && findAdmin?.email)
                                        &&
                                        <div className={committee.delete}>
                                            <i onClick={() => deleteFounder(committeeData?._id)} className="uil uil-trash-alt text-gray-400 cursor-pointer"></i>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </section>
            </div>
            <div className={open ? `${committee.block}` : `${committee.none}`}>
                <div className={committee.modal}>
                    <div className={committee.modalContainer}>
                        <i onClick={() => setOpen(false)} className="uil uil-times cursor-pointer text-gray-400"></i>
                        <hr className='mb-4 mt-4' />
                        <div className={committee.modalOptions}>
                            <p onClick={() => setSwitchOption(1)} className={`${switchOption === 1 ? 'text-red-600 font-bold' : 'text-white'} cursor-pointer`}>  <i class="uil uil-edit"></i> UPDATE</p>
                            <p onClick={() => setSwitchOption(2)} className={`${switchOption === 2 ? 'text-red-600 font-bold' : 'text-white'} cursor-pointer`}><i class="uil uil-plus-circle"></i> ADD NEW</p>
                        </div>
                        <br />
                        {
                            switchOption === 1 &&
                            <div className={committee.updatePart}>
                                <div className={committee.updateOne}>
                                    <label htmlFor="">update name:</label>
                                    <input type="text" name="" id=""
                                        value={updateName}
                                        onChange={(e) => setUpdateName(e.target.value)}
                                    />
                                    <br />
                                    <br />
                                    <label htmlFor="">update designation:</label>
                                    <input type="text" name="" id=""
                                        value={updateDesignation}
                                        onChange={(e) => setUpdateDesignation(e.target.value)}
                                    />
                                    <br />
                                    <br />
                                    <label htmlFor="">update email:</label>
                                    <input type="email" name="" id=""
                                        value={updateEmail}
                                        onChange={(e) => setUpdateEmail(e.target.value)}
                                    />
                                    <br />
                                    <br />
                                    <label htmlFor="">update mobile:</label>
                                    <input type="text" name="" id=""
                                        value={updateMobile}
                                        onChange={(e) => setUpdateMobile(e.target.value)}
                                    />
                                </div>
                                <div className={committee.updateTwo}>
                                    <label htmlFor="">update address:</label>
                                    <input type="text" name="" id=""
                                        value={updateAddress}
                                        onChange={(e) => setUpdateAddress(e.target.value)}
                                    />
                                    <br />
                                    <br />
                                    <div style={{ width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <label className='text-sm font-bold  text-gray-400'>change image :</label>
                                            <div className={committee.chooseFileDesign}>
                                                <p className='text-white font-bold'>
                                                    <i class="uil uil-upload mr-2"></i>
                                                    <span>Choose File</span>
                                                </p>
                                                <input className={committee.chooseFile} type="file" onChange={(e) => {
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
                                <div className={committee.updateButton}>
                                    <button onClick={updateFounder} className='btn btn-primary w-full'>update</button>
                                </div>
                            </div>
                        }
                        {
                            switchOption === 2 &&
                            <div className={committee.addPart}>
                                <div className={committee.addOne}>
                                    <label htmlFor=""> name:</label>
                                    <input className='mb-1' type="text" name="" id=""
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {
                                        blankIdentifier.name === '' && <p className='text-sm text-red-500'>please fillup name filed</p>
                                    }
                                    <br />

                                    <label htmlFor="">designation:</label>
                                    <input className='mb-1' type="text" name="" id=""
                                        onChange={(e) => setDesignation(e.target.value)}
                                    />
                                    {
                                        blankIdentifier.designation === '' && <p className='text-sm text-red-500'>please fillup designation filed</p>
                                    }
                                    <br />

                                    <label htmlFor="">email:</label>
                                    <input className='mb-1' type="email" name="" id=""
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {
                                        blankIdentifier.email === '' && <p className='text-sm text-red-500'>please fillup email filed</p>
                                    }
                                    <br />

                                    <label htmlFor="">mobile:</label>
                                    <input className='mb-1' type="text" name="" id=""
                                        onChange={(e) => setMobile(e.target.value)}
                                    />

                                </div>
                                <div className={committee.addTwo}>
                                    <label htmlFor="">address:</label>
                                    <input className='mb-1' type="text" name="" id=""
                                        onChange={(e) => setAddress(e.target.value)}
                                    />

                                    <br />

                                    <div style={{ width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <label className='text-sm font-bold  text-gray-400'>change image :</label>
                                            <div className={committee.chooseFileDesign}>
                                                <p className='text-white font-bold'>
                                                    <i class="uil uil-upload mr-2"></i>
                                                    <span>Choose File</span>
                                                </p>
                                                <input className={committee.chooseFile} type="file" onChange={(e) => {
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
                                    {
                                        blankIdentifier.img === '' && <p className='text-sm text-red-500'>please fillup img filed</p>
                                    }

                                </div>
                                <div className={committee.updateButton}>
                                    <button onClick={postFounderData} className='btn btn-primary w-full'>add</button>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
            <div className={committee.fakeNavBackground}>
            </div>
        </div>
    );
};

export default Founder;