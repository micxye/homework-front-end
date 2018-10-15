import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Gif from './Gif.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      url: 'https://api.giphy.com/v1/gifs/',
      gifs: [],
      key:  'BFABVk0eLtHW4ZVUK6B',
      view: 'trending',
      offset: 0,
      value: '', // search bar input value
      query: '', // search query
    }
  }

  componentDidMount() {
    this.getTrending();
    window.onscroll = this.loadMoreGifs;
  }

  loadMoreGifs = () => {
    const windowBottomY = window.pageYOffset + window.innerHeight,
          appHeight = document.body.offsetHeight;

    if (appHeight - windowBottomY < 150) { // at correct scroll height to load
      if (this.state.view === 'trending') {
        this.getTrending();
      } 
      if (this.state.view === 'search') {
        this.getSearch();
      }
    }
  }

  getTrending() {
    const { url, gifs, key, offset } = this.state,
          newOffset = offset + 24;

    axios.get(`${url}trending?api_key=eaZ2sn${key}QPlabzg&offset=${offset}&limit=24`)
      .then((response) => {
        const nextGifBatch = response.data.data;
        this.setState({ gifs: gifs.concat(nextGifBatch), offset: newOffset });
      })
      .catch((error) => {
        console.log(error);
        // render error page
      });
  }

  searchGifs = (e) => {
    if (e) e.preventDefault();

    this.setState({
        view: 'search',
        gifs: [],
        offset: 0,
        query: this.state.value
    }, this.getSearch);
  }

  getSearch() {
    const { url, gifs, key, offset, query } = this.state,
          newOffset = offset + 24;

    axios.get(`${url}search?api_key=eaZ2sn${key}QPlabzg&q=${query}&offset=${offset}&limit=24`)
      .then((response) => {
        const nextGifBatch = response.data.data;
        this.setState({ gifs: gifs.concat(nextGifBatch), offset: newOffset });
      })
      .catch((error) => {
        console.log(error);
        // render error page
      });
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { gifs, value, view } = this.state;
    console.log(gifs)
    return (
      <div className="App">
        <div id="top-bar">
          <div id="logo">
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
        </div>
        <div id="view">{view}</div>
        <div id="gifs-container">
          {gifs.map((gif, i) => {
            return <Gif gif={gif} key={i} />
          })}
        </div>
      </div>
    );
  }
}

export default App;
