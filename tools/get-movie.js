const axios = require('axios');
const Path = require('path');
const fs = require('fs');
const slugify = require('slugify');

const getMovie = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'fcedaa56',
      i: movie,
    },
  });

  const image = slugify(`${response.data.Title}.jpg`, { lower: true });

  response.data.Image = image;
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

  const url = response.data.Poster;
  const path = Path.resolve(__dirname, './../public/img', image);
  const writer = fs.createWriteStream(path);

  const imageResponse = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  imageResponse.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

getMovie('tt0071562');
