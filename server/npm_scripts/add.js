// add.js
// adds two integers recieved as command line arguments
// execute: npm run --silent js-add <INTEGER 1> <INTEGER 2>

const add = (a, b) => {
  return parseInt(a) + parseInt(b);
};

!process.argv[2] || !process.argv[3]
  ? console.log('Insufficient number of argunments! Give two numbers please!')
  : console.log(
      `The sum of ${process.argv[2]} and ${process.argv[3]} is ${add(
        process.argv[2],
        process.argv[3],
      )}`,
    );
