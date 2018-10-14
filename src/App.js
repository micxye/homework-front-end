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
      key:  'oJyD2C14xVVHnLjo',
      view: 'trending',
      offset: 120,
    }
  }

  componentDidMount() {
    this.getTrending(this.state.offset);
  }

  getTrending(offset) {
    const { url, gifs, key } = this.state;
    axios.get(`${url}trending?api_key=00ousBAdUX0S${key}IPja&offset=${offset}&limit=24`)
      .then((response) => {
        const nextGifBatch = response.data.data;
        this.setState({ gifs: gifs.concat(nextGifBatch) });
      })
      .catch((error) => {
        console.log(error);
        // render error page
      });
  }

  render() {
    const { gifs } = this.state;
    console.log(gifs)
    return (
      <div className="App">
        <div id="top-bar">
          <div id="logo">
            <img src="spliffy.gif" alt="(_______)" id="spliffy-logo"></img>
            <span id="spliffy-text">SPLIFFY</span>
          </div>
          <div id="search-bar">
            <form id="search-input">
              <div>
                <input type="text" placeholder="Search all gifs"></input>
              </div>
            </form>
          </div>
        </div>
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
