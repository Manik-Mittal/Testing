import React from 'react'
import { useState } from 'react';
import './Appointment.css'
import Sidebar from '../Sidebar/Sidebar';
import { useEffect } from 'react';
const Appointment = () => {

    const [urlDetails, setUrlDetails] = useState({
        email: "",
        url: ""
    });

    const parseUrl = (text) => {
        const urlMatch = text.match(/url:\s*'([^']+)'/);
        return urlMatch ? urlMatch[1] : null;
    }
    const getuser = async () => {

        await fetch('https://skypeshop.onrender.com/getadmin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`
            },

        }).then((response) => {
            if (!response.ok) {
                throw error('Unable to fetch data')
            }
            return response.json()
        }).then((data) => {
            console.log(data)
            setUrlDetails({ ...urlDetails, email: data })
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        console.log("AddProduct component mounted");
        if (!localStorage.getItem('auth-token')) {
            alert('Please login or signup first');
            window.location = "/";
        }
        getuser();
    }, []);

    const urlHandler = (e) => {
        console.log(e.target.value)
        setUrlDetails({ ...urlDetails, url: e.target.value })
    }
    const postlive = async () => {
        const parsedUrl = parseUrl(urlDetails.url)
        setUrlDetails({ ...urlDetails, url: parsedUrl })
        try {
            console.log(urlDetails)
            await fetch('http://localhost:5000/createappointmentbooking', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(urlDetails)
            }).then((response) => {
                if (!response.ok) {
                    alert('Wait for server being activated')
                    response.json({ msg: "unable to post" })
                }
                return response.json()
            }
            ).then((data) => {
                alert('Appointment Posted')
            }).catch((err) => {
                console.log(err)
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            alert('Please login or signup first')
            window.location = "/";
        }
    }, [])

    return (

        <div className="main-container">
            <div className="sidebar">
                <Sidebar></Sidebar>
            </div>
            <div className='addproduct'>

                <div className="container">

                    <div className="prodbutton">
                        <a href='https://skype-shop-admin-livestream.vercel.app/'><button>Create Appointment schedule</button></a>
                    </div>

                    <div className="title">
                        <p>Paste Website embed code belwo</p>
                        <input type='text' name='url' placeholder='Enter Product name' onChange={urlHandler}></input>
                    </div>



                    <div className="prodbutton">
                        <button onClick={() => { postlive() }}>Post Schedule</button>
                    </div>

                </div>



            </div >
        </div>


    )
}

export default Appointment