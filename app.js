const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const movieList = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(function validateToken(req, res, next){
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization');
  if(!authToken || authToken.split(' ')[1] !== apiToken){
    return res.status(401).json({ error: 'Unauthorized request'});
  }
  next();
});

app.get('/', (req, res) => {
  res.send("Hey, you're not supposed to be here, get the **** outta here! Get onto /movie!");
});

function handleGetMovie(req, res) {
  let response = [...movieList];

  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }
  if (req.query.country) {
    response = response.filter(movie => 
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }
  if (req.query.avg_vote) {
    response = response.filter(movie => 
      Number(movie.avg_vote) >= Number(req.query.avg_vote)
    );
  }
  res.json(response);
}

app.get('/movie', handleGetMovie);

app.listen(9000, () => {
  console.log('Listening on 9000')
});