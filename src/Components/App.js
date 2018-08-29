import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import Sidebar from './Sidebar/Sidebar';
import Search from './Search/Search';
import ArtistPage from './ArtistPage/ArtistPage';
import SongsPage from './SongsPage/SongsPage';
import AlbumPage from './AlbumPage/AlbumPage';
import {fetchData, getLocal , youtubeFetch} from '../helpers/fetch';
import Youtube from './Youtube/Youtube';
import './App.css';


class App extends Component {

    state ={
        artistsData:[],
        albumsData:[],
        songsData: [],
        searchValue: '',
        isLoading: true,
        favoriteArtists: [],
        favoriteAlbums: [],
        favoriteSongs: [],
        interestingArtists: [],
        interestingAlbums: [],
        interestingSongs: [],
        youtubeIsActive: false,
        videoID: '',
    }


    componentDidMount() {

        fetchData('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=412e51e107155c7ffabd155a02371cbd&limit=48&format=json')
        .then(data => (
            this.setState({
                artistsData: data.artists.artist.sort((a,b) => (+b.listeners)-(+a.listeners)),
                isLoading: false,
                favoriteArtists: getLocal('favoriteArtists'),
                interestingArtists: getLocal('interestingArtists')
            })
        ))

        fetchData('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=rock&api_key=412e51e107155c7ffabd155a02371cbd&limit=48&format=json')
        .then(data => (
            this.setState({
                albumsData: data.albums.album,
                favoriteAlbums: getLocal('favoriteAlbums'),
                interestingAlbums: getLocal('interestingAlbums')
            })
        ))

        fetchData('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=412e51e107155c7ffabd155a02371cbd&limit=48&format=json')
        .then(data => (
            this.setState({
                songsData: data.tracks.track,
                favoriteSongs: getLocal('favoriteSongs'),
                interestingSongs: getLocal('interestingSongs')
            })
        ))
    }

    addFavourite = ({target}) => {
        const index = target.dataset.index;
        const arrForAdd = target.dataset.arrForAdd;
        const check = target.dataset.check;
        const curentItem = this.state[check][index];
        if(!this.state[arrForAdd].includes(curentItem)){
            this.setState(prev =>({
                [arrForAdd]: [curentItem, ...prev[arrForAdd]]
            }),()=> {
                localStorage.setItem(`${arrForAdd}`, JSON.stringify(this.state[arrForAdd]))
            })
        }
    }

    inputChange = (e) => {
        const value = e.target.value.toLowerCase();
        const name = e.target.name;
            this.setState({
            [name]: value
        })
        
    }

    searchData = (e) => {
        e.preventDefault();
        if (this.state.searchValue === '') {
            return
        }
        fetchData(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&format=json`)
        .then(({results}) => {
            this.setState({
                artistsData: results.artistmatches.artist
            })
        })

        fetchData(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&format=json`)
        .then(({results}) => {
            this.setState({
                albumsData: results.albummatches.album
            })
        })

        fetchData(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&format=json`)
        .then(({results}) => {
            this.setState({
                songsData: results.trackmatches.track
            })
        })
    }

    handlerYoutube = ({target}) => {
        if (target.className === 'close') {
            this.setState({
                youtubeIsActive: false,
            })
        } else {
        const query = target.dataset.query;
        console.log(query);
        youtubeFetch(query)
        .then(data => {
            console.log(data);
            this.setState({
                youtubeIsActive: true,
                videoID: data,
            })
        })
        }
        
        
    }

    render() {
        const {songsData, albumsData, artistsData, searchValue, isLoading, favoriteArtists, favoriteAlbums, favoriteSongs,interestingArtists,interestingAlbums,interestingSongs, youtubeIsActive, videoID} = this.state;
        return (
            <div className='wrapper'>
                <div className="container">
                    <Sidebar/>
                    <main className='main'>
                    {youtubeIsActive ? <Youtube handlerYoutube={this.handlerYoutube} videoID = {videoID}/> : null }
                        <Search value={searchValue} onChange={this.inputChange} handlerSearch = {this.searchData}/>
                        {isLoading ? <div className='loader'>
                        <Loader
                        type="ThreeDots"
                        color="var(--red)"
                        height="100"
                        width="100"/>
                        </div> :
                        <div>
                            <Switch>
                                <Route exact path='/' render ={() => <ArtistPage artistsData={artistsData}
                                addFavourite={this.addFavourite} handlerYoutube={this.handlerYoutube}/>}/> 
                                <Route path='/albums' render= {() => <AlbumPage albumsData={albumsData}
                                addFavourite={this.addFavourite} handlerYoutube={this.handlerYoutube}/>}/>
                                <Route path= '/songs' render = {() => <SongsPage songsData={songsData}
                                addFavourite={this.addFavourite} handlerYoutube={this.handlerYoutube}/>}/>
                                <Route path='/FavouritesArtists' render ={() => <ArtistPage artistsData={favoriteArtists}
                                addFavourite={this.addFavourite} handlerYoutube={this.handlerYoutube}/>}/>
                                <Route path='/FavouritesAlbums' render= {() => <AlbumPage albumsData={favoriteAlbums}
                                addFavourite={this.addFavourite} handlerYoutube={this.handlerYoutube}/>}/>
                                <Route path= '/FavouritesSongs' render = {() => <SongsPage songsData={favoriteSongs} handlerYoutube={this.handlerYoutube}/>}/>
                                <Route path='/InterestingArtists' render ={() => <ArtistPage artistsData={interestingArtists}
                                addFavourite={this.addFavourite} handlerYoutube={this.handlerYoutube}/>}/>
                                <Route path='/InterestingAlbums' render= {() => <AlbumPage albumsData={interestingAlbums}
                                addFavourite={this.addFavourite} handlerYoutube={this.handlerYoutube}/>}/>
                                <Route path= '/InterestingSongs' render = {() => <SongsPage songsData={interestingSongs} handlerYoutube={this.handlerYoutube}/>}/>
                                </Switch>
                                </div>
                            }
                    </main>
                </div>
            </div>
        );
    }
}

App.propTypes = {

};

export default App;

