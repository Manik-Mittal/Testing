import React from 'react'
import './LiveStream.css'
import { useState } from 'react'
import { useEffect } from 'react';
const LiveStream = () => {

    const [live, setlive] = useState([]);


    const alllivestreams = async () => {
        await fetch('http://localhost:5000/livestreams').then((Response) => {
            if (!Response.ok) {
                throw new Error("Unable to fetch livestreams")
            }
            return Response.json()
        }).then((data) => {
            console.log(data)
            setlive(data.livestreams)
        }).catch((err) => console.log(err))
    }

    const registeruse = () => {

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

                            <img src={val.image} onClick={() => { registeruse() }}></img>

                        </div>
                        <div className="stream-card-text">
                            <span>{val.name}</span>
                            <br></br>
                            <span>${val.old_price}  ${val.new_price}</span>
                        </div>
                    </div>


                })}
            </div>


        </div>

    )
}

export default LiveStream
