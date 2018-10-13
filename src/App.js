import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      gifs: [],
      key:  'oJyD2C14xVVHnLjo'
    }
  }

  componentDidMount() {
    this.getTrending();
  }

  getTrending(offset = 0) {
    const { gifs, key } = this.state;
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=00ousBAdUX0S${key}IPja&offset=${offset}`)
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
    console.log(this.state.gifs)
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
                <input type="submit" value="Search"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
