import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { login } = api

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathToRegexp('/login').exec(from)) {
          if (['', '/'].includes(from)) history.push('/wage')
          else history.push(from)
        } else {
          history.push('/wage')
        }
      } else {
        throw data
      }
    },
  },
}
