import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { collection, addDoc } from 'firebase/firestore';
import { MuiFileInput } from 'mui-file-input'
import { db } from "../firebase";
import axios from 'axios';
import "./AddPost.css"
import { Button, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddPost = () => {
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState("");
    const user = useSelector((state) => state.data.user.user);
    const [fileName, setFileName] = useState("No image selected");

    const onSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));
                formData.append('pinataMetadata', JSON.stringify({ name: comment }));
                console.log(formData);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        maxContentLength: 'Infinity',
                        pinata_api_key: `1403ed857ff67e3e87c6`,
                        pinata_secret_api_key: `36fc2e26581f8773b7b5cd1c3c4d8baf33134b48809a00281d71784b2862580a`,
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
                    },
                });


                console.log(resFile);

                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                const hash = await addDoc(collection(db, 'post'), { hash: `${resFile.data.IpfsHash}`, Comment: `${comment}`, name: `${user.username}` });
                // console.log(hash);
                // alert("Successfully Uploaded Image to IPFS!!")
                toast(' SuccessFully Image Uploaded to IPFS 🦄 !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(resFile.data.IpfsHash);
                console.log(ImgHash);
                setFile('');
                setComment('');
            } catch (e) {
                // alert("Unable to Upload Image To IPFS!!")
                toast(' Unable to Uploaded Image!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setFileName("No image selected");
                setFile('');
            }
        }
    };

    const handleChange = (newValue) => {
        setFile(newValue)
    }


    return (
        <div className="Post">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="Post__title">Add Post</div><br />
            <form onSubmit={onSubmit}>
                <MuiFileInput style={{ background: "white", cursor: "pointer" }} value={file} onChange={handleChange} placeholder='Click Here to Choose File' /><br /><br />
                <label >Add Comment</label><br /><br />
                <TextField
                    required
                    label="Comment"
                    variant="standard"
                    value={comment}
                    focused
                    style={{ color: "black", background: "white" }}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }} />
                <br />
                <br />
                <Button style={{ background: "white", color: "black" }} type='submit'>Post</Button>
            </form>
        </div>
    )
}

export default AddPost

// API Key: 1403ed857ff67e3e87c6
//  API Secret: 36fc2e26581f8773b7b5cd1c3c4d8baf33134b48809a00281d71784b2862580a
//  JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZGZhMWM5Mi05N2RlLTQ5NGQtODIyMi02MzlmMmQxMjkwZTkiLCJlbWFpbCI6Im5pcnVrYXRoZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMTQwM2VkODU3ZmY2N2UzZTg3YzYiLCJzY29wZWRLZXlTZWNyZXQiOiIzNmZjMmUyNjU4MWY4NzczYjdiNWNkMWMzYzRkOGJhZjMzMTM0YjQ4ODA5YTAwMjgxZDcxNzg0YjI4NjI1ODBhIiwiaWF0IjoxNjg1MzgwODU1fQ.UpzDK3gPqGK_Y6_XvXCuCLTAVcJcCnilzuPAWRdU6v4


// Email: nirukathe@gmail.com

// Name: NIRAJ KATHE

// Password : Niraj@02