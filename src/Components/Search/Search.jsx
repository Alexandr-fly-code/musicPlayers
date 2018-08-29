import React from 'react';
// import PropTypes from 'prop-types';
import Chart from '../Chart/Chart';
import './Search.css';

const Search = ({value, onChange, handlerSearch}) => {
    return (
        <div className='search'>
                <form method="post" className="search__form" onSubmit ={handlerSearch}>
                    <input type="text" className="search__input" placeholder="Search music" value={value} onChange={onChange} name= 'searchValue'/>
                    <input type="submit" value="search" className="search__btn"/>
                </form>
                <Chart/>
        </div>
    );
};

Search.propTypes = {
    
};

export default Search;