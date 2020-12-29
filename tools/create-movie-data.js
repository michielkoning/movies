const testFolder = './movies/';
const fs = require('fs');
const slugify = require('slugify');
const getColors = require('get-image-colors');

const createFullName = (firstName, lastName, middleName) => ({
  FirstName: firstName,
  MiddleName: middleName,
  LastName: lastName,
});

const getDirector = director => {
  if (director === 'Alejandro G. Iñárritu') {
    return createFullName('Alejandro.', 'Iñárritu', 'G');
  }
  if (director === 'Nicolas Winding Refn') {
    return createFullName('Nicolas Winding', 'Refn');
  }
  if (director === 'Guillermo del Toro') {
    return createFullName('Guillermo', 'Toro', 'del');
  }
  if (director === 'Lars von Trier') {
    return createFullName('Lars', 'Trier', 'von');
  }
  if (director === 'Franklin J. Schaffner') {
    return createFullName('Franklin', 'Schaffner', 'J');
  }
  const newDirector = director.split(' ');
  const firstName = newDirector[0];
  const lastName = newDirector[1].replace(',', '');
  return createFullName(firstName, lastName);
};

const array = [];
fs.readdir(testFolder, (err, files) => {
  files.forEach((file, index) => {
    fs.readFile(`./movies/${file}`, 'utf8', (err, jsonString) => {
      if (err) {
        console.log('File read failed:', err);
        return;
      }

      const data = JSON.parse(jsonString);

      const movie = {
        title: data.Title,
        director: getDirector(data.Director),
        year: data.Year,
        actors: data.Actors.split(','),
        genres: data.Genre.split(','),
        poster: data.Poster,
        rating: Number(data.imdbRating),
        slug: slugify(data.Title.toLowerCase()),
      };
      delete data.Genres;

      data.Countries = data.Country.split(',');
      delete data.Country;

      data.Languages = data.Language.split(',');
      delete data.Language;

      data.Director = getDirector(data.Director);
      data.imdbRating = Number(data.imdbRating);
      data.Slug = slugify(data.Title.toLowerCase());

      // if (data.Poster) {
      //   getColors(data.Poster).then((colors) => {
      //     const hex = colors.map(color => color.hex());
      //     data.bgColor = hex;
      //     data.darkTextColor = chroma.contrast(colors[0].hex(), '#fff') < 4.5;

      //     const newData = JSON.stringify(data);

      //     array.push(newData);
      //     if (index === files.length - 1) {
      //       fs.writeFile('./public/data/movies.json', `[${array}]`, (err) => {
      //         if (err) {
      //           return console.log(err);
      //         }

      //         console.log('The file was saved!');
      //       });
      //     }
      //   });
      // } else {
      data.bgColor = '#fff';
      data.lightTextColor = false;
      const newData = JSON.stringify(movie);

      array.push(JSON.stringify(movie));

      if (index === files.length - 1) {
        fs.writeFile('./../src/data/movies.json', `[${array}]`, err => {
          if (err) {
            return console.log(err);
          }

          console.log('The file was saved!');
        });
      }
    });
  });
});
