const isLocal = window.location.hostname === 'localhost';
const heroku = 'https://klu-portfolio-server-5858060573f4.herokuapp.com'
const local = 'http://localhost:3000'

const url = {
  server: isLocal ? local : heroku,
}
export default url