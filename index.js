const fs = require('fs');
const process = require('process');
const fetch = require('node-fetch');
const prompt = require('prompt');
console.log(process.argv);

// const jokeParms = process.argv;
const fetchJoke = async () => {
  const [, , ...jokeParms] = process.argv;
  const url =
    'https://us-central1-dadsofunny.cloudfunctions.net/DadJokes' +
    jokeParms.map((item) => `/${item}`).join('');
  const jokes = await fetch(url)
    .then((data) => data.json())
    .catch((err) => console.log(err));
  let count = 1;
  const fullJoke = jokes.map((joke) => {
    return count++ + ': ' + joke.setup + ' ' + joke.punchline + '\n';
  });
  console.log(fullJoke);
  fs.readFile('joke.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    fs.writeFile('joke.txt', fullJoke.join(''), (err) => {
      if (err) console.log(err);
      console.log(data);
    });
  });

  console.log();
};
