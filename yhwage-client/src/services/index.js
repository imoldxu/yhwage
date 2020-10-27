import request from 'utils/request'
import { apiPrefix } from 'utils/config'
import axios from 'axios'
import api from './api'

const gen = params => {
  let url = apiPrefix + params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

// APIFunction.queryWeather = params => {
//   params.key = 'i7sau1babuzwhycn'
//   return request({
//     url: `${apiPrefix}/weather/now.json`,
//     data: params,
//   })
// }

APIFunction.uploadPrices = parmas => {
    
    //let file = document.getElementsByName('img')[0].files[0];
    
    const {file, providerId} = parmas

    let formData = new FormData();
    formData.append("file",file,file.name);
    formData.append("providerId",providerId)
     
    // const config = {
    //   headers: { "Content-Type": "multipart/form-data" },
    // };
     
    let options = {
      url: "/api/v1/excelprice",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      responseType: 'blob',
    }

    return request(options)

    // axios
    // .post("/api/v1/excelprice",formData,config)
    // .then(function (response) {
    //  const { statusText, status, data } = response

    //   // let result = {}
    //   // if (typeof data === 'object') {
    //   //   result = data
    //   //   if (Array.isArray(data)) {
    //   //     result.list = data
    //   //   }
    //   // } else {
    //   //   result.data = data
    //   // }

    //   return Promise.resolve({
    //     success: true,
    //     message: statusText,
    //     statusCode: status,
    //     //...result,
    //     data,
    //   })
    // })
    // .catch(function (error) {
    //   const { response, message } = error

    //   if (String(message) === CANCEL_REQUEST_MESSAGE) {
    //     return {
    //       success: false,
    //     }
    //   }

    //   let msg
    //   let errCode
    //   let statusCode

    //   if (response && response instanceof Object) {
    //     const { data, statusText } = response
    //     statusCode = response.status
    //     errCode = data.code
    //     msg = data.message || statusText
    //   } else {
    //     statusCode = 600
    //     errCode = 0
    //     msg = error.message || 'Network Error'
    //   }

    //   /* eslint-disable */
    //   return Promise.reject({//使用reject导致请求获取不到错误的响应,使用reject只有在try catch才能获取到错误
    //     success: false,
    //     statusCode,
    //     errCode: errCode,
    //     message: msg,
    //   })
    // });
};

export default APIFunction
