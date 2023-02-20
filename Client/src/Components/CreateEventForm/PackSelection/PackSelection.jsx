import React, { useState } from 'react';
import style from './PackSelection.module.css'

function PackSelection({ input, setInput }) {


    const packs = [
        {   
            id: 0,
            title: 'Free',
            description: 'Basic listing',
            quantity: 1,
            unit_price: 0,
        },
        {
            id: 1,
            title: 'Classic',
            description: 'Highlighted listing and first to apear on search',
            quantity: 1,
            unit_price: '5'
        },
        {
            id: 2,
            title: 'Premium',
            description: 'Highlighted listing, first to apear on search and featured on homepage',
            quantity: 1,
            unit_price: '20'
        },
    ];

    const handleCardClick = (pack) => {
        if(pack.id !== 0) {
            setInput({
                ...input,
                isPremium: true,
                items: [pack]
            })
        } else {
            setInput({
                ...input,
                isPremium: false,
                items: null
            })
        }

    };

    return (
        <div className={style.packContainer}>
            <h1 className={style.title}>Packs</h1>
            <h4>Choose the type of publicity</h4>
            <div className={style.cardsContainer}>
                {packs.map((pack,index) => (
                    <div
                        key={pack.title}
                        className={style.card}
                        onClick={() => handleCardClick(pack)}>
                        <h3>{pack.title}</h3>
                        <p>{pack.description}</p>
                        <p>Price: ${pack.unit_price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PackSelection;