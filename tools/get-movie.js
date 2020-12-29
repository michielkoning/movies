const axios = require('axios');

const fs = require('fs');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv));
// usage node get-movie.js --movie=tt0053125

axios
  .get('http://www.omdbapi.com/', {
    params: {
      apikey: 'fcedaa56',
      i: argv.movie,
    },
  })
  .then(response => {
    fs.writeFile(
      `./movies/${response.data.Title}.json`,
      JSON.stringify(response.data),
      err => {
        if (err) {
          return console.log(err);
        }

        console.log('The file was saved!');
      },
    );
  });
