import api from 'api'
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")

const { calcYearAward } = api

export default {
    namespace: "yearaward",
    subscriptions: {
        //监听路径的变化，跳转之后发起查询操作
        // setup({ dispatch, history }) {
        //     history.listen(location => {
        //         if (pathToRegexp('/wage').exec(location.pathname)) {
        //             dispatch({
        //                 type: 'querySuccess',
        //                 payload: {list:[]},
        //             })
        //         }
        //     })
        // },
    },

    reducers: {
        //处理查询结果，合并到state中
        querySuccess(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },

    effects: {
        *calc({payload}, { call, put }) {
            const { success, data } = yield call(calcYearAward, payload)
            if (success) {
                yield put({ type: 'querySuccess', payload: {list: data} })
            } else {
                throw data
            }
        },
    }
}