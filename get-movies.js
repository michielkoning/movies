const axios = require('axios');

const fs = require('fs');

const movies = ['tt4686844'];

const writeMovie = title => {
  axios
    .get('http://www.omdbapi.com/', {
      params: {
        apikey: 'fcedaa56',
        i: title,
      },
    })
    .then(response => {
      fs.writeFile(`./movies/${response.data.Title}.json`, JSON.stringify(response.data), err => {
        if (err) {
          return console.log(err);
        }

        console.log('The file was saved!');
      });
    });
};

movies.forEach(movie => writeMovie(movie));
