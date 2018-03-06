import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import SongsList from './components/SongsList.jsx';
import SongDetails from './components/SongDetails.jsx';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isPlaying: false,
      currentSong: 0,
      songs: [],
      pageLoaded: false
    }
  }
  componentWillMount() {
    axios.get(`http://localhost:8080/songslist`)
      .then((response) => {
        this.setState({
          songs: response.data,
          pageLoaded: true
        })
      })
  }
  play = () => {
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }
  playIndividual = (index) => {
    this.setState({
      currentSong: index,
      isPlaying: !this.state.isPlaying
    }, () => {
      this.audioPlayer.load()
      this.audioPlayer.play()
    })
  }
  changeSong = (index) => {
    this.setState({
      currentSong: this.state.currentSong + index
    }, () => {
      this.audioPlayer.load()
      this.audioPlayer.play()
    })
  }
  componentDidUpdate() {
    if (this.state.isPlaying) this.audioPlayer.play()
    else this.audioPlayer.pause()

  }
  render() {
    return (
      (this.state.pageLoaded) ? (
        <div className="App">
          <div className="title"> Audio Player</div>
          <audio ref={(self) => { this.audioPlayer = self }}>
            <source src={this.state.songs[this.state.currentSong].source} />
          </audio>

          <button onClick={this.play}>
            {this.state.isPlaying ? "||" : "Play"}
          </button>

          <button onClick={() => { this.changeSong(-1) }}
            disabled={this.state.currentSong === 0}>
            Previous
          </button>

          <button onClick={() => { this.changeSong(1) }}
            disabled={this.state.currentSong === this.state.songs.length - 1}>
            Next
          </button>
          <p> {this.state.isPlaying ? `Now playing ${this.state.songs[this.state.currentSong].title}` : ""}</p>
          <Route exact path="/" render={() => <SongsList play={this.playIndividual} songs={this.state.songs}/>} />
          <Route path='/:songId' render={(props) => <SongDetails play={this.playIndividual} songs={this.state.songs} {...props} />} />
        </div>
      ) : (
          <h1>Page is loading</h1>
        )
    );
  }
}

export default App;
