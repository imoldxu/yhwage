import { message } from 'antd'
import api from 'api'
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")

const { addCompany, modifyCompany, queryCompany } = api

export default {
    namespace: "company",
    state:{
        modalVisible: false,
        selectCompany: {}
    },
    subscriptions: {
        //监听路径的变化，跳转之后发起查询操作
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp('/company').exec(location.pathname)) {
                    let query = location.query || {}
                    //let defaultquery = { pageIndex: 1, pageSize: 10}
                    const payload = { ...query }

                    dispatch({
                        type: 'query',
                        payload,
                    })
                }
            })
        },
    },

    reducers: {
        //处理查询结果，合并到state中
        querySuccess(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        // saveMore(state, { payload }) {
        //     const { list } = payload
        //     return { ...state, list: [...state.list, ...list] };
        // },
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
            const { success, data } = yield call(queryCompany, payload)
            if (success) {
                yield put({ type: 'querySuccess', payload: {list:data} })
            } else {
                throw data
            }
        },
        *new({payload}, { call, put }) {
            const { success, data } = yield call(addCompany, payload)
            if(success){
                yield put({type:'closeModal'})
                yield put({type:'query', payload:{}})
                message.success("添加成功")
            }
        },
        *modify({payload}, { call, put }) {
            const { success, data } = yield call(modifyCompany, payload)
            if(success){
                yield put({type:'closeModal'})
                yield put({type:'query', payload:{}})
                message.success("修改成功")
            }
        },
    }
}