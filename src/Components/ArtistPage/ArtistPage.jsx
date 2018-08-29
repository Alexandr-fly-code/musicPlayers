import React from 'react';
// import PropTypes from 'prop-types';
import Card from '../Card/Card';
import "./ArtistPage.css"

const ArtistPage = ({artistsData, addFavourite, handlerYoutube}) => {
    return (
        <div className='content'>
                {artistsData.map((el, index) => <Card url={el.image[2]['#text']} name={el.name} info={`Listeners ${(+el.listeners).toLocaleString()}`} key={el.name} addFavourite={addFavourite} index={index} type='favoriteArtists' checkArr='artistsData' int='interestingArtists' handlerYoutube={handlerYoutube}/>)}
            </div>
    );
};

ArtistPage.propTypes = {
    
};

export default ArtistPage;