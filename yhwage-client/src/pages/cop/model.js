import { message } from 'antd'
import api from 'api'
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")

const { addCop, modifyCop, queryCop } = api

export default {
    namespace: "cop",
    state:{
        modalVisible: false,
        selectCop: {}
    },
    subscriptions: {
        //监听路径的变化，跳转之后发起查询操作
        // setup({ dispatch, history }) {
        //     history.listen(location => {
        //         if (pathToRegexp('/price').exec(location.pathname)) {
        //             let query = location.query || {}
        //             let defaultquery = { pageIndex: 1, pageSize: 10}
        //             const payload = { ...defaultquery, ...query }

        //             dispatch({
        //                 type: 'query',
        //                 payload,
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
                ...payload,
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
        *query({payload}, { call, put }) {
            const { success, data } = yield call(queryCop, payload)
            if (success) {
                if (data.length==0){
                    message.success("没有匹配的职级", 5, function(){})
                }
                yield put({ type: 'querySuccess', payload: {list:data} })
            } else {
                throw data
            }
        },
        *new({payload}, { call, put }) {
            const { success, data } = yield call(addCop, payload)
            if(success){
                yield put({type:'closeModal'})
                yield put({type:'query', payload:{}})
                message.success("添加成功")
            }
        },
        *modify({payload}, { call, put }) {
            const { success, data } = yield call(modifyCop, payload)
            if(success){
                yield put({type:'closeModal'})
                yield put({type:'query', payload:{}})
                message.success("修改成功")
            }
        },
    }
}