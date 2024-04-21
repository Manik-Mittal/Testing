import React from 'react'
import './Poll.css'
import { json, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Poll = () => {

    const { id } = useParams();

    const [options, setoptions] = useState({})
    const [polloption, setpolloptions] = useState({})
    const [vote, setvote] = useState({
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0
    })


    const fetchoption = async () => {

        //fecth options from database
        const product = await fetch('http://localhost:5000/getproductforpoll', {
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
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })

        console.log(options)


        //to fecth the cnt of options from database
        await fetch('http://localhost:5000/getpolloptions', {
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
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handlecount = async (cnt, id, optno) => {
        console.log(cnt, id, optno)

        //posting the updated options to database
        if (vote[optno] == 0) {
            const newoptions = { ...polloption };
            newoptions[optno] = newoptions[optno] + 1;
            setpolloptions(newoptions)

            const newvote = { ...vote };
            newvote[optno] = 1;
            setvote(newvote);

            await fetch('http://localhost:5000/updatepolloptions', {
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
        fetchoption();
    }, [])

    return (

        <div className='poll'>
            <h1>LivePolling</h1>
            <div className='options'>
                <div className="op1">

                    {!options.op1 ? <button hidden>{options.op1}</button> : <button onClick={() => handlecount(polloption[1], polloption.prodid, 1)}>{options.op1}  {polloption[1]}</button>}
                </div>
                <div className="op2">

                    {!options.op2 ? <button hidden>{options.op2}</button> : <button onClick={() => handlecount(polloption[2], polloption.prodid, 2)}>{options.op2}  {polloption[2]}</button>}
                </div>
                <div className="op3">

                    {!options.op3 ? <button hidden>{options.op3}</button> : <button onClick={() => handlecount(polloption[3], polloption.prodid, 3)}>{options.op3}  {polloption[3]}</button>}
                </div>
                <div className="op4">

                    {!options.op4 ? <button hidden>{options.op4}</button> : <button onClick={() => handlecount(polloption[4], polloption.prodid, 4)}>{options.op4}  {polloption[4]}</button>}
                </div>
                <div className="op5">
                    {!options.op5 ? <button hidden>{options.op5}</button> : <button onClick={handlecount(polloption[5], polloption.prodid, 5)}>{options.op5}  {polloption[5]}</button>}
                </div>
            </div>
        </div>
    )
}

export default Poll