import axios from 'axios'

const http = axios.create({
  baseURL: 'https://pet-shop.buckhill.com.hr/api'
})

export default http
