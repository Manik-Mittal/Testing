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


        await fetch('https://skypeshop.onrender.com/goinlive', {
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
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })


        window.location = `https://66528b7543d1d245c37aa122--cerulean-kashata-374ab4.netlify.app/`

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
