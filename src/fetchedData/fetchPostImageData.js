export const updloadImage = (imgFile, setImgHolder) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
    formData.append("cloud_name", `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            setImgHolder(result?.secure_url);

        })
}

export const updloadForBannerImage = (imgFile, setBannerDataContainer, setUpdateBannerDataContainer) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
    formData.append("cloud_name", `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {

            console.log(result?.secure_url);
            setBannerDataContainer({
                img: result?.secure_url
            })
            setUpdateBannerDataContainer({
                img: result?.secure_url
            })
        })

}

export const uploadForPanelDash = (imgFile, setAddImg, setUpdateImg, setImgHolder) => {
    console.log(imgFile)
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
    formData.append("cloud_name", `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            setAddImg(result?.secure_url)
            setUpdateImg(result?.secure_url)
            setImgHolder(result?.secure_url)
        })
}