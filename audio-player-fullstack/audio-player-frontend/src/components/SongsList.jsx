import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SongsList extends Component {
    render() {
        let tracksJSX = this.props.songs.map((track, i) => {
            return <li
                    key={i}
                    >
                    <button onClick={()=>{this.props.play(i)}}>
                    {this.props.isPlaying ? "||" : "Play"}
                    </button>
                    <Link to={`/${track.id}`}>{track.title}</Link>
                    </li>
        })
        return (
            <div>
                <h3>List of songs </h3>
                <ul>
                    {tracksJSX}
                </ul>
            </div>
        )
    }
}

export default SongsList;