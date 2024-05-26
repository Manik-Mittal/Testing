import React from 'react'
import './LiveStream.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
const LiveStream = () => {

    const [live, setlive] = useState([]);


    const alllivestreams = async () => {
        await fetch('https://skypeshop.onrender.com/livestreams').then((Response) => {
            if (!Response.ok) {
                throw new Error("Unable to fetch livestreams")
            }
            return Response.json()
        }).then((data) => {
            console.log(data)
            setlive(data.livestreams)
        }).catch((err) => console.log(err))
    }

    const registeruse = async (url, name) => {

        const userlivedetails = {
            livename: url,
            isinsidelive: false,
            email: "",
            room: 0
        }

        let room = "";
        for (let i = url.length - 1; i >= 0; i--) {
            if (url[i] != '=') {
                room = room + url[i];
            }
            else break;
        }
        room = room.split('').reverse().join('');
        userlivedetails.room = Number(room)
        console.log(Number(room))


        let token = localStorage.getItem('auth-token')
        if (!token) {
            alert('Kindly login/signup to join the livestream')
            return;
        }

        await fetch('http://localhost:5000/getuser', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-type': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`
            }
        }).then((response) => {
            if (!response) {
                throw Error("Unable to fetch user")
            }
            return response.json()
        }).then((data) => {

            userlivedetails.email = data
            console.log(userlivedetails, 1)

        }).catch((err) => {
            console.log(err)
        })

        console.log(userlivedetails, 2)


        await fetch('http://localhost:5000/goinlive', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userlivedetails)
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Unable to post live users in database")
            }
            return response.json()
        }).then((data) => {
            console.log(data, 3)
        }).catch((err) => {
            console.log(err)
        })


        // window.location = `https://6652934c887786ecc8eb1087--superb-mermaid-a3466b.netlify.app/`

    }
    useEffect(() => {
        alllivestreams()
    }, [])


    return (

        <div className="live">
            <div className="live-head">
                <h1>LiveStreams</h1>
            </div>

            <div className="stream-container">
                {live.map((val, index) => {
                    return <div className="stream-card-content">
                        <div className="stream-card-image">

                            <img src={val.image} onClick={() => { registeruse(val.url, val.name) }}></img>

                        </div>
                        <div className="stream-card-text">
                            <span>{val.name}</span>
                            <br></br>
                            <span>${val.old_price}  ${val.new_price}</span>
                            <br></br>
                            <br></br>

                            {!val.op1 && !val.op2 && !val.op3 && !val.op4 && !val.op5 ? <button hidden></button> : <Link to={`/poll/${val._id}`}><button className='pollbutton'>Live Polling</button></Link>}


                        </div>
                    </div>


                })}
            </div>


        </div>

    )
}

export default LiveStream
