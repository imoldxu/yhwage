import { message } from 'antd'
import api from 'api'
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")

const { queryCompanyTask, addCompanyTask, modifyCompanyTask } = api

export default {
    namespace: "companytask",
    state: {
        modalVisible: false,
        selectTask: {},
        list: [],
        filter: {},
    },
    subscriptions: {
        //监听路径的变化，跳转之后发起查询操作
        // setup({ dispatch, history }) {
        //     history.listen(location => {
        //         if (pathToRegexp('/task').exec(location.pathname)) {
        //             dispatch({
        //                 type: 'querySuccess',
        //                 payload: {list:[]},
        //             })
        //         }
        //     })
        // }
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
        },
    },

    effects: {
        *query({payload}, { call, put }) {
            const { success, data } = yield call(queryCompanyTask, payload)
            if (success) {
                if (data.length==0){
                    message.success("没有绩效", 5, function(){})
                }

                yield put({ type: 'querySuccess', payload: {list:data} })
            } else {
                throw data
            }
        },
        *new({payload}, { call, put }) {
            const { success, data } = yield call(addCompanyTask, payload)
            if(success){
                const {companyid, month} = payload
                yield put({type:'closeModal'})
                yield put({type:'query', payload:{companyid:companyid, month:month}})
                message.success("添加成功")
            }
        },
        *modify({payload}, { call, put, select }) {
            const { success, data } = yield call(modifyCompanyTask, payload)
            if(success){
                const { filter } = yield select(_ =>_.companytask );
                yield put({type:'closeModal'})
                yield put({type:'query', payload: filter})
                message.success("修改成功")
            }
        },
    }
}