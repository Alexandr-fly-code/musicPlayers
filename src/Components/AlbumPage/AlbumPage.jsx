import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './AlbumPage.css';

const AlbumPage = ({albumsData, addFavourite, handlerYoutube}) => {
    return (
        <div className='content'>
            {albumsData.map((el, index) => <Card name={el.name} info={el.artist} url={el.image[2]['#text']} key={el.name + el.url} index={index} type='favoriteAlbums' checkArr='albumsData'addFavourite={addFavourite} int='interestingAlbums' handlerYoutube={handlerYoutube}/>)}
        </div>
    );
};

AlbumPage.propTypes = {
    
};

export default AlbumPage;