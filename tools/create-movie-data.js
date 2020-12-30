const testFolder = './movies/';
const fs = require('fs');
const slugify = require('slugify');
const getColors = require('get-image-colors');
const chroma = require('chroma-js');

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

let array = [];
fs.readdir(testFolder, (folderError, files) => {
  files.forEach((file, index) => {
    fs.readFile(`./movies/${file}`, 'utf8', (filerError, jsonString) => {
      if (filerError) {
        console.log('File read failed:', filerError);
        return;
      }

      const data = JSON.parse(jsonString);

      const movie = {
        title: data.Title,
        director: getDirector(data.Director),
        year: data.Year,
        actors: data.Actors.split(','),
        genres: data.Genre.split(','),
        poster: data.Poster !== 'N/A' ? data.Poster : null,
        rating: Number(data.imdbRating),
        slug: slugify(data.Title.toLowerCase()),
        description: data.Plot,
        color: '#fff',
        // image: `/img/${data.Image}`,
      };
      delete data.Genres;

      data.Countries = data.Country.split(',');
      delete data.Country;

      data.Languages = data.Language.split(',');
      delete data.Language;

      data.Director = getDirector(data.Director);
      data.imdbRating = Number(data.imdbRating);
      data.Slug = slugify(data.Title.toLowerCase());

      if (data.Poster) {
        getColors(data.Poster).then(colors => {
          // const hex = colors.map(color => {
          //   // return color;
          //   const color1 =
          //   return chroma(color)
          //     .brighten(4)
          //     .hex();
          // });

          const color1 = colors[0];
          const color2 = colors[1];
          let colorsDarkToLight = [];
          if (chroma(color1).luminance() < chroma(color2).luminance()) {
            colorsDarkToLight = [color1, color2];
          } else {
            colorsDarkToLight = [color2, color2];
          }
          colorsDarkToLight = colorsDarkToLight.map(color =>
            chroma(color)
              .brighten(3)
              .hex(),
          );
          movie.colors = colorsDarkToLight;

          array.push(JSON.stringify(movie));

          if (index === files.length - 1) {
            array = array.sort((a, b) => a.title > b.title);
            fs.writeFile('./../src/data/movies.json', `[${array}]`, err => {
              if (err) {
                return console.log(err);
              }

              console.log('The file was saved!');
            });
          }
        });
      } else {
        array.push(JSON.stringify(movie));
      }
    });
  });
});
