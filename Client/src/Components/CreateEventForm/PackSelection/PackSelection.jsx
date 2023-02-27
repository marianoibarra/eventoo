import React, { useState } from 'react';
import style from './PackSelection.module.css'

function PackSelection({ input, setInput }) {

    const packs = [
        {   
            id: 0,
            title: 'Free Pack',
            description: 'Basic listing',
            quantity: 1,
            unit_price: 0,
        },
        {
            id: 1,
            title: 'Classic Pack',
            description: 'Highlighted listing and first to apear on search',
            quantity: 1,
            unit_price: '5'
        },
        {
            id: 2,
            title: 'Premium Pack',
            description: 'Highlighted listing, first to apear on search and featured on homepage',
            quantity: 1,
            unit_price: '20'
        },
    ];
    const [clickedId, setClickedId] = useState(null);

    const handleCardClick = (pack, i) => {
        if (clickedId === i) {
            setClickedId(null);
        } else {
            setClickedId(i);
        }
        if (pack.id === 1) {
            setInput({
                ...input,
                isPremium: true,
                items: [pack],
                typePack: 'CLASSIC',
            });
        } else if(pack.id === 2){
            setInput({
                ...input,
                isPremium: true,
                items: [pack],
                typePack: 'PREMIUM',
            });
        } else {
            setInput({
                ...input,
                isPremium: false,
                items: null
            });
        }
    };

    return (
        <div className={style.packContainer}>
            <h1 className={style.title}>Packs</h1>
            <h4>Choose the type of publicity</h4>
            <div className={style.cardsContainer}>
                {packs.map((pack,i) => (
                    <div
                        key={i}
                        className={i === clickedId ? style.cardActive : style.card}
                        onClick={() => handleCardClick(pack,i)}>
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