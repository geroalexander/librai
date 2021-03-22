'use strict';

const should = require('chai').should();

const { fetchBook } = require('../booksApiService/fetchBooks');
const { extractText } = require('../computerVisionService/textExtraction');

const heartSpringMountain = require('../bookAssets/heart_spring_mountain.jpg');
const oppositeOfAlways = require('../bookAssets/opposite_of_always.jpeg');
const queenBee = require('../bookAssets/queen_bee.jpeg');
const theGravityOfUs = require('../bookAssets/the_gravity_of_us.jpeg');
const theWaterCure = require('../bookAssets/the_water_cure.jpeg');
const theWomanDestroyed = require('../bookAssets/the_woman_destroyed.jpeg');
const theSubtleArt = require('../bookAssets/the_subtle_art.jpeg');
  

describe('Fetching books using computer vision text extraction', function () {

  it('should find the correct books with search terms', async function () {

  });

  it('should return the correct books with images', async function () {
    
    const searchQuery = await extractText(heartSpringMountain);
    const retrievedBook = await fetchBooks(searchQuery);
    (retrievedBook.id).

  })

});