const handleErrors = (error, res) => {
  const { message } = error;

  switch (message) {
    case 'Missing credentials':
      res.status(400).send({ message });
      break;
    case 'No book received':
      res.status(400).send({ message });
      break;
    case 'Invalid book rating':
      res.status(400).send({ message });
      break;
    case 'Incorrect no. of genres':
      res.status(400).send({ message });
      break;
    case 'Incorrect no. of books':
      res.status(400).send({ message });
      break;
    case 'Bad credentials':
      res.status(401).send({ message });
      break;
    case 'Interaction does not exist':
      res.status(404).send({ message });
      break;
    case 'This user already exisits':
      res.status(409).send({ message });
      break;
    case 'Could not find user':
      res.status(500).send({ message });
      break;
    case 'Book could not be created':
      res.status(501).send({ message });
      break;
    case 'Book could not be saved':
      res.status(501).send({ message });
      break;
    case 'Rating could not be updated':
      res.status(501).send({ message });
      break;
    case 'Rated book could not be saved':
      res.status(501).send({ message });
      break;
    case 'Book could not be un-saved':
      res.status(501).send({ message });
      break;
    case 'Saved book could not be removed':
      res.status(501).send({ message });
      break;
    case 'Book rating could not be removed':
      res.status(501).send({ message });
      break;
    case 'Could not update favorite genres':
      res.status(501).send({ message });
      break;
    case 'Profile could not be updated':
      res.status(501).send({ message });
      break;
    case 'Recommendation engine error':
      res.status(502).send({ message });
      break;
    case 'No search query':
      res.status(502).send({ message });
      break;
    case 'Could not fetch book':
      res.status(502).send({ message });
      break;
    default:
      res.status(500).send({ message });
  }
};

module.exports = { handleErrors };
