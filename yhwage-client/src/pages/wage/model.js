import { message } from 'antd'
import api from 'api'
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")

const { queryWage, calcWage } = api

export default {
    namespace: "wage",
    state: {
        modalVisible: false,
        list: []
    },
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
        showModal(state, {payload}) {
            return {
                ...state,
                modalVisible: true,
            }
        },
        closeModal(state, {payload}){
            return {
                ...state,
                modalVisible: false,
            }
        }
    },

    effects: {
        *calc({payload}, { call, put }) {
            const { success, data } = yield call(calcWage, payload)
            if (success) {
                yield put({type: 'closeModal'})
                message.success("月薪生成成功",5, ()=>{})
            } else {
                throw data
            }
        },
        *query({payload}, { call, put }) {
            const { success, data } = yield call(queryWage, payload)
            if (success) {
                yield put({ type: 'querySuccess', payload: {list: data} })
            } else {
                throw data
            }
        }
    }
}