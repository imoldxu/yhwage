import { message } from 'antd'
import api from 'api'
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")

const { queryStaff, addStaff, modifyStaff } = api

export default {
    namespace: "staff",
    state: {
        modalVisible: false,
        selectStaff: {},
        list: []
    },
    subscriptions: {
        //监听路径的变化，跳转之后发起查询操作
        // setup({ dispatch, history }) {
        //     history.listen(location => {
        //         if (pathToRegexp('/staff').exec(location.pathname)) {
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
        }
    },

    effects: {
        *query({payload}, { call, put }) {
            const { success, data } = yield call(queryStaff, payload)
            if (success) {
                if (data.length==0){
                    message.success("还没有员工", 5, function(){})
                }

                yield put({ type: 'querySuccess', payload: {list:data} })
            } else {
                throw data
            }
        },
        *new({payload}, { call, put }) {
            const { success, data } = yield call(addStaff, payload)
            if(success){
                const { companyid, teamid } = payload
                yield put({type:'closeModal'})
                yield put({type:'query', payload:{companyid, teamid}})
                message.success("添加成功")
            }
        },
        *modify({payload}, { call, put }) {
            const { success, data } = yield call(modifyStaff, payload)
            if(success){
                const { companyid, teamid } = payload
                yield put({type:'closeModal'})
                yield put({type:'query', payload:{companyid, teamid}})
                message.success("修改成功")
            }
        },
    }
}