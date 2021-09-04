import axios from 'axios'

export const shopContentAxios = axios.create({
  baseURL: 'https://main-api.fulhaus.com/fulhaus-tech-test',
})
