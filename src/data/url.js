const isLocal = window.location.hostname === 'localhost';
const heroku = ''
const local = 'http://localhost:3000'

const url = {
  server: isLocal ? local : heroku,
}
export default url