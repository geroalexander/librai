require('dotenv').config();

const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

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
  if (capitalizedWords.length > 3)
    searchQuery = capitalizedWords.join('+').toLowerCase();
  else searchQuery = textArr.slice(0, 6).join('+').toLowerCase();

  return searchQuery;
};

module.exports = { extractText };
