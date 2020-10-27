import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
const { parse, compile } = require("path-to-regexp")
import { message } from 'antd'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'

const { CancelToken } = axios
window.cancelRequest = new Map()

export default function request(options) {
  let { data, url, method = 'get' } = options
  const cloneData = cloneDeep(data)

  axios.defaults.headers.post['Content-Type'] = 'application/json';
  
  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = parse(url)
    url = compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.url = url
  if('GET' == options.method){
    options.params = cloneData  //非get方法，不采用url后面接参数
  }
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response

      // let result = {}
      // if (typeof data === 'object') {
      //   result = data
      //   if (Array.isArray(data)) {
      //     result.list = data
      //   }
      // } else {
      //   result.data = data
      // }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        //...result,
        data,
      })
    })
    .catch(error => {
      const { response, message } = error

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        }
      }

      let msg
      let errCode
      let statusCode

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        errCode = data.code
        msg = data.message || statusText
      } else {
        statusCode = 600
        errCode = 0
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.reject({//使用reject导致请求获取不到错误的响应,使用reject只有在try catch才能获取到错误
        success: false,
        statusCode,
        errCode: errCode,
        message: msg,
      })
    })
}
