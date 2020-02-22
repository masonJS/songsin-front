const axios = require('axios')
const { appid } = require('../../config/weather')
const SONGSIN ={}
const WEATHER = {}

const songsin = axios.create({
  baseURL: 'https://t69dubq083.execute-api.ap-northeast-2.amazonaws.com/dev',
  // baseURL: 'http://localhost:3000',
  timeout: 100000,
  headers: {
  }
})

const weather = axios.create({
  baseURL: 'http://api.openweathermap.org',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

SONGSIN.createNotice = (data) => songsin.post('/create_notice', data)
SONGSIN.createBirth = (data) => songsin.post('/create_birth', data)

SONGSIN.getUser = (id, pw) => songsin.get('/get_user', { params: { id, pw }})
SONGSIN.getNewsTopic = _ => songsin.get('/get_news_topic')
SONGSIN.getDust = (stationName, dataTerm, pageNo, numOfRows, ver, ServiceKey) => songsin.get('/get_dust', { params: { stationName, dataTerm, pageNo, numOfRows, ver, ServiceKey }})
SONGSIN.getNotice = _ => songsin.get('/get_notice')
SONGSIN.getBirth = _ => songsin.get('/get_birth')

WEATHER.getDay = (lat, lon) => weather.get('/data/2.5/weather',  { params: { lat, lon, appid }})
WEATHER.getWeek = (lat, lon) => weather.get('/data/2.5/forecast',  { params: { lat, lon, appid }})


module.exports = {
  SONGSIN,
  WEATHER,
}

