import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { Popular } from '../Components/Popular/Popular'
import { Offer } from '../Components/Offer/Offer'
import { NewCollection } from '../Components/New Collection/NewCollection'
import { NewsLetter } from '../Components/NewsLetter/NewsLetter'
const Shop = () => {
    return (
        <div className='shop'>
            <Hero />
            <Popular />
            <Offer />
            <NewCollection />
            <NewsLetter />
        </div>
    )
}

export { Shop }