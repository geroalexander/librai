# Librai

Librai is a progressive web app that runs on machine learning and AI. 
- It adjusts to user preferences and offers intelligent, evolving book recommendations that users will genuinely like. 
- While browsing in a book store or just feeling lazy, users can scan a book cover with the Smart Camera feature and get immediate results with a personalised compatability score every time.

### Available at [librai.netlify.app](https://librai.netlify.app/)

![librai demo (6)](https://user-images.githubusercontent.com/59074533/113449457-c5383d80-93f5-11eb-95a9-554c97838883.png)

![librai demo (7)](https://user-images.githubusercontent.com/59074533/113449459-c79a9780-93f5-11eb-806a-429c3ec0eb54.png)

![librai demo (8)](https://user-images.githubusercontent.com/59074533/113449464-c9645b00-93f5-11eb-8fb0-c2f3e9d05cea.png)

# App demo video

Here is the original app demo video on Youtube:

[![Screenshot 2021-04-02 at 21 02 44](https://user-images.githubusercontent.com/59074533/113449988-ecdbd580-93f6-11eb-9b22-93062d06da0d.png)](https://www.youtube.com/watch?v=x52aUU-3No8)

# Getting started 

#### 1. Clone this repo
```
git clone https://github.com/geroalexander/librai
```

#### 2. Navigate into both client and server folders and install dependencies
```
npm install
```

#### 3. Refer to the below section Setup Prequisites for instructions on how to configure environment variables 

- See ` client/.env.example ` and ` server/.env.example ` for an example of how the variables should be named

#### 4. After the setup, start the app!

- Navigate into client and run ` npm start `
- Navigate into server and run ` nodemon  ` or ` node index.js `

*Optional* 
- Populate the DB by running ` npm run populate ` from the server folder. 
- Log into the app with 'pams@hollywood.com' as the email and 'password' as the password. 
- Enjoy!

## Setup Prerequisites

First, create a .env in both client and server

### Database 

- Ensure you have docker installed and run the following command 
```
docker-compose up -d
```
- Refer to server/.env.example to configure local environment variables such as DB_NAME, DB_PORT, etc. 


### APIs
Setup an account and get an API key from the following sources: 

- Google Books
- Google Cloud Vision AI
- Recombee 
- Cloudinary

### OAuth
- Configure an OAuth consent screen and get a client ID from Google Cloud Platform 

# Tech Stack

### Frontend 
- [React (PWA setup)](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/) 
- [Redux](https://redux.js.org/) 
- [Sass](https://sass-lang.com/)
- [Lottie](https://airbnb.io/lottie/#/)

### Backend
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/) 
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) 

### CI/CD
- [Github Actions](https://github.com/features/actions)

### Deployment
- [Heroku (server)](https://www.heroku.com/)
- [Netlify (client)](https://www.netlify.com/)

## Authentication 
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)


## APIs
- [Google Books](https://developers.google.com/books) 
- [Google Cloud Vision AI](https://cloud.google.com/vision)
- [Recombee](https://www.recombee.com/)
- [Cloudinary](https://cloudinary.com/) 

# Contributors ✨
Github's and LinkedIn's linked below! 
([emoji key](https://allcontributors.org/docs/en/emoji-key))

<table>
  <tr>
    <td align="center"><a href="https://github.com/pamelakaylin"><img src="https://avatars.githubusercontent.com/u/59074533?v=4" width="120px;" alt=""/><br /><sub><b><a href="https://www.linkedin.com/in/pamela-chen-60377216b/" title="linkedin">Pamela Chen</a></b></sub></a><br /><a href="https://github.com/geroalexander/librai/commits?author=pamelakaylin" title="Code">💻</a> <a href="#ideas-pamela" title="Ideas & Planning">🤔</a> <a href="#pm-pamela" title="Project Management">📆</a> <a href="#design-pamela" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/andrasvaradi"><img src="https://avatars.githubusercontent.com/u/65424110?v=4" width="120px;" alt=""/><br /><sub><b><a href="https://www.linkedin.com/in/andras-varadi-a20517bb/" title="linkedin">Andras Varadi</a></b></sub></a><br /><a href="https://github.com/geroalexander/librai/commits?author=andrasvaradi" title="Code">💻</a> <a href="data-andras" title="Data">🔣</a> <a href="#tools-andras" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/IB3N"><img src="https://avatars.githubusercontent.com/u/62890543?v=4" width="120px;" alt=""/><br /><sub><b><a href="https://www.linkedin.com/in/ben-pearce-a27b81145/" title="linkedin">Ben Pearce</a></b></sub></a><br /><a href="https://github.com/geroalexander/librai/commits?author=IB3N" title="Code">💻</a> <a href="#infra-ben" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a><a href="#test-ben" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/geroalexander"><img src="https://avatars.githubusercontent.com/u/59166685?v=4" width="120px;" alt=""/><br /><sub><b><a href="https://www.linkedin.com/in/gero-kassing-9b79311a3/" title="linkedin">Gero Kassing</a></b></sub></a><br /><a href="https://github.com/geroalexander/librai/commits?author=geroalexander" title="Code">💻</a> <a href="#infra-gero" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a><a href="#security-gero" title="Security">🛡️</a> <a href="https://www.youtube.com/watch?v=x52aUU-3No8" title="Video">📹</a></td>
  </tr>
</table>

Big thanks to Team Librai.

