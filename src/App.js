import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Gif from './Gif.js';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      url: 'https://api.giphy.com/v1/gifs/',
      gifs: [],
      key:  'GoNup8Vhyxzuui7BE9WYUaBN&offset=',
      view: 'trending',
      offset: 0,
      value: '', // search bar input value
      query: '', // search query
      favorites: {},
      loading: true
    }
  }

  componentDidMount() {
    this.getTrendingGifs();
    window.onscroll = this.loadMoreGifs;
  }


  /* infinite scroll/load */

  loadMoreGifs = () => {
    const windowBottomY = window.pageYOffset + window.innerHeight,
          appHeight = document.body.offsetHeight;

    if (appHeight - windowBottomY < 150) {
      if (this.state.view === 'trending') {
        this.getTrendingGifs();
      } 
      if (this.state.view === 'search') {
        this.getSearchGifs();
      }
    }
  }


  /* Trending gifs */

  renderTrending = () => {
    this.setState({
      view: 'trending',
      gifs: [],
      loading: true,
      offset: 0
    }, this.getTrendingGifs);
  }

  getTrendingGifs() {
    const { url, gifs, key, offset } = this.state,
          newOffset = offset + 24;

    axios.get(`${url}trending?api_key=jZRfFuMp${key}${offset}&limit=24`)
      .then((response) => {
        const nextGifBatch = response.data.data;
        this.setState({ gifs: gifs.concat(nextGifBatch), offset: newOffset, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ gifs: [], loading: false });
      });
  }


  /* Searching gifs */

  searchGifs = (e) => {
    e.preventDefault();
    this.setState({
        view: 'search',
        gifs: [],
        loading: true,
        offset: 0,
        query: this.state.value
    }, this.getSearchGifs);
  }

  getSearchGifs() {
    const { url, gifs, key, offset, query } = this.state,
          newOffset = offset + 24;

    axios.get(`${url}search?api_key=jZRfFuMp${key}${offset}&limit=24&q=${query}`)
      .then((response) => {
        const nextGifBatch = response.data.data;
        this.setState({ gifs: gifs.concat(nextGifBatch), offset: newOffset, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ gifs: [], loading: false });
      });
  }


  /*  Add, remove and render favorites */
  
  addFavorite = (gif) => {
    const newFavorites = Object.assign({}, this.state.favorites);
    newFavorites[gif.id] = gif;
    this.setState({ favorites: newFavorites });
  }

  removeFavorite = (gif) => {
    const newFavorites = Object.assign({}, this.state.favorites);
    delete newFavorites[gif.id];
    this.setState({ favorites: newFavorites }, () => this.state.view === 'favorite' ? this.renderFavorites() : null);
  }

  renderFavorites = () => {
    this.setState({ 
      view: 'favorite',
      gifs: Object.values(this.state.favorites)
    }, this.renderGifs);
  }


  /* Form input event handler */

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  
  /* Rendering gifs */

  renderGifs() {
    const { gifs, view, favorites, loading } = this.state;

    if (gifs.length === 0 && !loading) {
      return <div id="error">NO GIFS...</div>
    }
    
    return gifs.map(gif => {
      let favorited = Boolean(favorites[gif.id]);
      if (view === 'favorite') favorited = true;
      return (
        <Gif gif={gif}
          key={gif.id}
          favorite={favorited}
          addFavorite={this.addFavorite}
          removeFavorite={this.removeFavorite}
        />
      );
    });
  }

  render() {
    const { value, view } = this.state;
    return (
      <div className="App">
        <div id="top-bar">
          <div id="logo" onClick={this.renderTrending}>
            <img src="spliffy.gif" alt="(_______)" id="spliffy-logo"></img>
            <span id="spliffy-text">SPLIFFY</span>
          </div>
          <div id="search-bar">
            <form id="search-input" onSubmit={this.searchGifs}>
              <div>
                <input value={value} onChange={this.handleChange} type="text" placeholder="Search all gifs"/>
              </div>
            </form>
          </div>
          <img src="search.png" id="search-button" alt="search" onClick={this.searchGifs}/>
        </div>
        <div id="middle-bar">
          <div id="view">{view.toUpperCase()} GIFS</div>
          <button type="button" id="favorites-button" onClick={this.renderFavorites}>
            <span id="favorites-text">FAVORITES</span>
            <span id="favorites-heart">♥</span>
          </button>
        </div>
        <div id="gifs-container">
          {this.renderGifs()}
        </div>
      </div>
    );
  }
}