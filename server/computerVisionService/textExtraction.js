require('dotenv').config({ path: '../.env' });

const vision = require('@google-cloud/vision');
// const { fetchBooks } = require('../booksApiService/fetchBooks');

const client = new vision.ImageAnnotatorClient();

//dummy variable for experimenting
const fileName =
  'https://kbimages1-a.akamaihd.net/9c7cd39a-f9cd-48d1-89c4-daf66190877d/1200/1200/False/flowers-for-algernon.jpg';

const extractText = async (image) => {
  const [result] = await client.textDetection(image);
  if (!result) throw new Error('Could not extract text!');
  const detections = result.textAnnotations;

  const textArr = [];

  //cleaning the text, stripping whitespace/special characters
  detections.forEach((text, idx) => {
    if (idx) {
      const description = text.description.replace(/[^A-Za-z']/g, '');
      if (/\S/.test(description)) {
        textArr.push(description);
      }
    }
  });

  //METHOD 1 - extracting the capitalized words | METHOD 2 - extracting the first 6 words
  const capitalizedWords = textArr.filter((t) => t === t.toUpperCase());

  let searchQuery;
  console.log(capitalizedWords, 'capitalizedWords');
  if (capitalizedWords.length > 3)
    searchQuery = capitalizedWords.join('+').toLowerCase();
  else searchQuery = textArr.slice(0, 6).join('+').toLowerCase();

  return searchQuery;
};

//function call for setup, remove before launching client
// extractText(fileName);

//TODOS
//check accuracy with Books Api
//ensure it works with local image files

module.exports = { extractText };
