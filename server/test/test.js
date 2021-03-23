'use strict';

var should = require('chai').should();

const { fetchBook } = require('../booksApiService/fetchBook');
const { extractText } = require('../computerVisionService/textExtraction');

const heartSpringMountain =
  __dirname + '/../bookAssets/heart_spring_mountain.jpg';
const queenBee = __dirname + '/../bookAssets/queen_bee.jpeg';
const theGravityOfUs = __dirname + '/../bookAssets/the_gravity_of_us.jpeg';
const theWaterCure = __dirname + '/../bookAssets/the_water_cure.jpeg';
const theWomanDestroyed = __dirname + '/../bookAssets/the_woman_destroyed.jpeg';
const theSubtleArt = __dirname + '/../bookAssets/the_subtle_art.jpeg';

describe('Fetching books using computer vision text extraction', function () {
  it('should find the correct books with search terms', async function () {
    let fetchedBook;

    this.timeout(0); // Disable timeout for the multiple async calls

    fetchedBook = await fetchBook('no+country+for+old+men');
    fetchedBook.id.should.equal('3Ksa5vqnc8QC');

    fetchedBook = await fetchBook('sapiens');
    fetchedBook.id.should.equal('1EiJAwAAQBAJ');

    fetchedBook = await fetchBook('silk+roads');
    fetchedBook.id.should.equal('M1FFCQAAQBAJ');
  });

  it('should return the correct books with images', async function () {
    let fetchedBook;
    let searchQuery;

    this.timeout(0); // Disable timeout error for multiple async calls

    searchQuery = await extractText(heartSpringMountain);
    fetchedBook = await fetchBook(searchQuery);
    fetchedBook.id.should.equal('c42vDgAAQBAJ');

    searchQuery = await extractText(queenBee);
    fetchedBook = await fetchBook(searchQuery);
    fetchedBook.id.should.equal('VTz9zQEACAAJ');

    searchQuery = await extractText(theGravityOfUs);
    fetchedBook = await fetchBook(searchQuery);
    fetchedBook.id.should.equal('0N7LDwAAQBAJ');

    searchQuery = await extractText(theWaterCure);
    fetchedBook = await fetchBook(searchQuery);
    fetchedBook.id.should.equal('MPlKDwAAQBAJ');

    searchQuery = await extractText(theWomanDestroyed);
    fetchedBook = await fetchBook(searchQuery);
    fetchedBook.id.should.equal('khEtyAEACAAJ');

    searchQuery = await extractText(theSubtleArt);
    fetchedBook = await fetchBook(searchQuery);
    fetchedBook.id.should.equal('yng_CwAAQBAJ');
  });
});

console.log('this is the dir--------', __dirname);
