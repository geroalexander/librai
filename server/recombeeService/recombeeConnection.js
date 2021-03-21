require('dotenv').config({
  path: '../.env',
});
const config = process.env;
const { RECOMBEE_NAME, RECOMBEE_KEY } = config;
let recombee = require('recombee-api-client');
let rqs = recombee.requests;

let client = new recombee.ApiClient(RECOMBEE_NAME, RECOMBEE_KEY)

module.exports = {client, rqs}