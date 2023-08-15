export const updloadImage = (imgFile, setImgHolder) => {
    const imgStorageKey = `${process.env.REACT_APP_IMG_STORAGE_KEY}`;
    const formData = new FormData();
    formData.append('image', imgFile);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            setImgHolder(result?.data?.url);
        })
}

export const updloadForBannerImage = (imgFile, setBannerDataContainer, setUpdateBannerDataContainer) => {
    const imgStorageKey = `${process.env.REACT_APP_IMG_STORAGE_KEY}`;
    const formData = new FormData();
    formData.append('image', imgFile);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {


            setBannerDataContainer({
                img: result?.data?.url
            })
            setUpdateBannerDataContainer({
                img: result?.data?.url
            })
        })

}

export const uploadForPanelDash = (imgFile, setAddImg, setUpdateImg, setImgHolder) => {
    const imgStorageKey = `${process.env.REACT_APP_IMG_STORAGE_KEY}`;
    const formData = new FormData();
    formData.append('image', imgFile);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            setAddImg(result?.data?.url)
            setUpdateImg(result?.data?.url)
            setImgHolder(result?.data?.url)
        })
}