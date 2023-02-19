import React, { useState } from 'react';
import style from './PackSelection.module.css'

function PackSelection({ setSelectedPack, selectedPack }) {


    const packs = [
        {
            title: 'Free',
            description: 'Basic listing',
            unit_price: 'Free'
        },
        {
            title: 'Classic',
            description: 'Highlighted listing and first to apear on search',
            unit_price: '5'
        },
        {
            title: 'Premium',
            description: 'Highlighted listing, first to apear on search and featured on homepage',
            unit_price: '20'
        },
    ];

    const handleCardClick = (pack) => {
        setSelectedPack(pack);
    };

    return (
        <div className={style.packContainer}>
            <h1 className={style.title}>Packs</h1>
            <h4>Choose the type of publicity</h4>
            <div className={style.cardsContainer}>
                {packs.map((pack) => (
                    <div
                        key={pack.title}
                        className={style.card}
                        onClick={() => handleCardClick(pack)}>
                        <h3>{pack.title}</h3>
                        <p>{pack.description}</p>
                        <p>Price: {pack.unit_price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PackSelection;