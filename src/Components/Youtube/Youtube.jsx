import React from 'react';
import './Youtube.css';
// import PropTypes from 'prop-types';

const YouTube = ({handlerYoutube, videoID}) => {
    return (
        <div className='player'>
        <p className='close' onClick = {handlerYoutube}>&#10006;</p>
            <iframe src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
            </iframe>
        </div>
    );
};

// YouTube.propTypes = {};
// YouTube.defaultProps = {};

export default YouTube;