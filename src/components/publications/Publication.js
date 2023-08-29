/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import Publications from './Publication.module.css';
import usePublicationHook from '../../customHooks/usePublicationHook';
import { fetchGetPublicationBySearchData } from '../../fetchedData/fetchPublicationData';

const Publication = () => {
    const [imgData, setImgData] = useState([]);

    const [flipDrawer, setFlipDrawer] = useState(-50);

    const [number, setNumber] = useState(10);
    const [buttonNumber, setButtonNumber] = useState(10);
    const [modifiedButtonNumber, setModifiedButtonNumber] = useState();
    const [publicationData, refetch] = usePublicationHook();
    const [publicationDataBySearch, setPublicationBySearchData] = useState([])
    const [search, setSearch] = useState('')
    const [roundedDataLength, setRoundedDataLength] = useState('');

    const allPublicationData = publicationData?.data?.data?.data;


    const findApprovedPublications = allPublicationData?.filter(f => {
        return f.approval === true;
    });

    const findApprovedPublicationsBySearch = publicationDataBySearch?.filter(f => {
        return f.approval === true;
    })

    // pagination
    useEffect(() => {
        if (search === '') {
            setRoundedDataLength(Math.ceil(findApprovedPublications?.length / 10))
        } else {
            setRoundedDataLength(Math.ceil(findApprovedPublicationsBySearch?.length / 10))
        }
    }, [findApprovedPublications?.length, findApprovedPublicationsBySearch?.length, search])



    const totalDataLength = roundedDataLength * 10

    const arrayOfObjects = [];
    for (let id = 1; id <= (totalDataLength / 10); id++) {
        const newObj = { id: id };
        arrayOfObjects.push(newObj);
    }

    let mappedArray = arrayOfObjects.map((obj) => {
        return {
            ...obj,
        };
    });

    const handlePage = (value) => {
        const pageNumber = value * 10;
        setNumber(pageNumber)
    }

    const makeLastDigitZero = (number) => {
        if (number % 10 !== 0) {
            number = Math.ceil(number / 10) * 10;
        }
        setModifiedButtonNumber(number)
    }

    useEffect(() => {
        makeLastDigitZero(mappedArray?.length)
        if (modifiedButtonNumber < buttonNumber) {
            setButtonNumber(10)

        };
    }, [buttonNumber, mappedArray, modifiedButtonNumber]);

    const handlePageButton = (value) => {
        if (value === 'decrease' && buttonNumber > 10) {
            setButtonNumber(buttonNumber - 10)
        } else if (value === 'increase') {
            setButtonNumber(buttonNumber + 10)
        }
    }

    useEffect(() => {
        const url = 'gallery.json';
        fetch(url).then(res => res.json()).then(res => setImgData(res))
    })


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchGetPublicationBySearchData(search);
                setPublicationBySearchData(response?.data?.data?.data)
            } catch (error) {

            }
        }
        fetchData()

    }, [search])


    return (
        <div className={Publications.eventsMain}>
            <div className={Publications.eventsMainContainer}>
                <div onMouseLeave={() => setFlipDrawer(-50)} style={{ left: `${flipDrawer}%`, transition: '1s ease-in-out' }} className={Publications.eventsFirstPart}>
                    <div className={Publications.eventsFirstPartContainer}>
                        <div
                            className={Publications.events_Main_Title}>
                            <span>
                                <i class="uil uil-newspaper text-xl"></i>
                                <span> PUBLICATIONS</span>
                            </span>
                        </div>
                        {
                            search === ''
                                ?
                                <div className={Publications.eventsFirstPartDetail}>
                                    {
                                        findApprovedPublications?.slice((number - 10), number)?.reverse()?.map(publicationData => {
                                            return (
                                                <p className='cursor-pointer'>
                                                    {

                                                        <p title={publicationData?.title} className={Publications.title}>{publicationData?.title?.length > 30 ? publicationData?.title?.slice(0, 29) + '...' : publicationData?.title}</p>
                                                    }
                                                </p>
                                            )
                                        })
                                    }
                                </div>
                                :

                                <div className={Publications.eventsFirstPartDetail}>
                                    {
                                        findApprovedPublicationsBySearch?.length > 0 &&
                                        <div>
                                            {
                                                findApprovedPublicationsBySearch?.slice((number - 10), number)?.map(publicationData => {
                                                    return (
                                                        <p className='cursor-pointer'>
                                                            {

                                                                <p title={publicationData?.title} className={Publications.title}>{publicationData?.title?.length > 30 ? publicationData?.title?.slice(0, 29) + '...' : publicationData?.title}</p>
                                                            }
                                                        </p>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                    {findApprovedPublicationsBySearch?.length === 0 &&
                                        <p className='text-red-600 ml-3'>Found nothing from search result</p>
                                    }
                                </div>

                        }


                    </div>
                </div>
                <div className={Publications.eventsSecondPart}>
                    <div className={Publications.eventsSecondPartContainer}>

                        <div className={Publications.searchBar}>
                            <span className={Publications.bargerRes}> <i onClick={flipDrawer === 0 ? () => setFlipDrawer(50) : () => setFlipDrawer(0)} className=" uil uil-bars ml-2"></i></span>
                            <div className={Publications.searchBarContainer}>
                                <div>
                                    <i className="uil uil-search text-xl "></i>
                                    <input className={Publications.gallery_input} placeholder='search' type="text"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <i class="uil uil-times text-xl cursor-pointer"></i>
                            </div>

                            <div className={Publications.totalImg}>
                                <span>TOTAL PB: {search === '' ? findApprovedPublications?.length : findApprovedPublicationsBySearch?.length}</span>
                                <span>  |  </span>
                                <span>PAGE: {number.toString().slice(0, (number.toString().length - 1))}</span>
                            </div>
                        </div>
                        {
                            search === ''
                                ?
                                <div className={Publications.publications}>

                                    {
                                        findApprovedPublications?.slice(number - 10, number)?.reverse()?.map((publicationData, index) => {
                                            return (
                                                <p>
                                                    <a
                                                        href={`${publicationData?.link}`} className='mb-5 text-blue-500 cursor-pointer'
                                                        target='_blank'
                                                    >
                                                        {index + 1} {publicationData?.title}
                                                    </a>
                                                </p>
                                            )
                                        })
                                    }

                                </div>
                                :
                                <div className={Publications.publications}>

                                    <div>
                                        {
                                            findApprovedPublicationsBySearch?.slice(number - 10, number)?.reverse()?.map((publicationData, index) => {
                                                return (
                                                    <p className='mb-5 text-blue-500 cursor-pointer'>{index + 1} {publicationData?.title}</p>
                                                )
                                            })
                                        }
                                        {
                                            findApprovedPublicationsBySearch?.length === 0 &&
                                            <div style={{ width: '98%', height: '400px', boxShadow: ' 0 0 10px rgba(0, 0, 0, 0.2)', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <p className='text-red-600'>Found nothing from search result</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                        }
                        <div className={Publications.pagination} >

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <button onClick={() => handlePageButton('decrease')}> <p style={{ fontSize: '25px', marginRight: '25px' }}> <i className='uil uil-angle-left-b'></i></p> </button>
                                {
                                    mappedArray?.slice((buttonNumber - 10), buttonNumber).map(m => {
                                        return (
                                            <div key={m.id} onClick={() => handlePage(m.id)} style={{ height: '25px', width: '25px', border: '1px solid blue', borderRadius: '5px', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <p >{m.id}</p>
                                            </div>
                                        )
                                    })
                                }
                                <button onClick={() => handlePageButton('increase')}> <p style={{ fontSize: '25px', marginLeft: '25px' }}><i className='uil uil-angle-right-b'></i></p></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Publications.fakeNavBackground}>

            </div>
        </div>
    );
};

export default Publication;