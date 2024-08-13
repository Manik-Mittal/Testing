import React from 'react'
import './Poll.css'
import { json, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Poll = () => {

    const { id } = useParams();

    //options of poll
    const [options, setoptions] = useState({})

    //cnt of poll
    const [polloption, setpolloptions] = useState({})
    const [voted, setvoted] = useState(false);

    console.log(polloption);
    console.log(options);

    const fetchoption = async () => {

        //fecth options from database
        const product = await fetch('https://skypeshop.onrender.com/getproductforpoll', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ "id": id })
        }).then((response) => {
            if (!response) {
                throw new Error("Unable to fetch the prodct from database")
            }
            return response.json()
        }).then((data) => {
            setoptions(data)
            //console.log(data)
        }).catch((err) => {
            console.log(err)
        })

        console.log(options)


        //to fecth the cnt of options from database
        await fetch('https://skypeshop.onrender.com/getpolloptions', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ "id": id })
        }).then((response) => {
            if (!response) {
                throw new Error("Unable to fetch the prodct from database")
            }
            return response.json()
        }).then((data) => {
            setpolloptions(data)
            //console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handlecount = async (cnt, id, optno) => {
        console.log(cnt, id, optno)

        //posting the updated options to database
        if (voted === false) {
            const newoptions = { ...polloption };
            newoptions[optno] = newoptions[optno] + 1;
            setpolloptions(newoptions)

            setvoted(true)

            await fetch('https://skypeshop.onrender.com/updatepolloptions', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ "id": id, "optno": optno })
            }).then((response) => {
                if (!response) {
                    throw new Error("Unable to fetch the prodct from database")
                }
                return response.json()
            }).then((data) => {

                console.log(data)
            }).catch((err) => {
                console.log(err)
            })

        }
        else {
            alert('You Already voted for this option')
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchoption();
    }, [])

    return (

        <div className='poll'>
            <h1>LivePolling</h1>
            <div className='options'>
                <div className="op1">
                    {!options.op1 ? <p hidden>{polloption[1]}</p> : <p>{polloption[1]}</p>}
                    {!options.op1 ? <button hidden>{options.op1}</button> : <button onClick={() => handlecount(polloption[1], polloption.prodid, 1)}>{options.op1}  </button>}
                </div>
                <div className="op2">
                    {!options.op2 ? <p hidden>{polloption[2]}</p> : <p>{polloption[2]}</p>}
                    {!options.op2 ? <button hidden>{options.op2}</button> : <button onClick={() => handlecount(polloption[2], polloption.prodid, 2)}>{options.op2}</button>}
                </div>
                <div className="op3">
                    {!options.op3 ? <p hidden>{polloption[3]}</p> : <p>{polloption[3]}</p>}
                    {!options.op3 ? <button hidden>{options.op3}</button> : <button onClick={() => handlecount(polloption[3], polloption.prodid, 3)}>{options.op3} </button>}
                </div>
                <div className="op4">
                    {!options.op4 ? <p hidden>{polloption[4]}</p> : <p>{polloption[4]}</p>}
                    {!options.op4 ? <button hidden>{options.op4}</button> : <button onClick={() => handlecount(polloption[4], polloption.prodid, 4)}>{options.op4}  </button>}
                </div>
                <div className="op5">
                    {!options.op5 ? <p hidden>{polloption[5]}</p> : <p>{polloption[5]}</p>}
                    {!options.op5 ? <button hidden>{options.op5}</button> : <button onClick={handlecount(polloption[5], polloption.prodid, 5)}>{options.op5}  </button>}
                </div>
            </div>
        </div>
    )
}

export default Poll