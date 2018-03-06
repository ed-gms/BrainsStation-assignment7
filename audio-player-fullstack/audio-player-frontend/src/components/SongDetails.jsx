import React, {Component} from 'react';

class SongDetails extends Component {
    render() {
        let index = this.props.match.params.songId
        let track = this.props.songs[index]
        return (
            <div>
                <p>Title: {track.title}</p>
                <p>Artist: {track.artist}</p>
                <button onClick={() => { this.props.play(index) }} >Play</button>
            </div>
        )
    }
}

export default SongDetails;