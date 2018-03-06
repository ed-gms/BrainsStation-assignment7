const express = require('express')
const app = express()
const port = process.argv[2] || 8080
const bodyParser = require('body-parser')

app.use(bodyParser.json())

function Song(source, title, artist, id) {
  this.source = source;
  this.title = title;
  this.artist = artist;
  this.id = id;
}

const songs = [
  new Song('/songs/suites-1.mp3', 'Bach Cello Suites 1', 'Mstislav Rostropovich', 0),
  new Song('/songs/suites-2.mp3', 'Bach Cello Suites 2', 'Mstislav Rostropovich', 1),
  new Song('/songs/suites-3.mp3', 'Bach Cello Suites 3', 'Mstislav Rostropovich', 2),
]

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/songslist', (req, res) => {
  // console.log(songs)
  res.json(songs)

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})