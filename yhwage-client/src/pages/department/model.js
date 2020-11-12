import { message } from 'antd'
import api from 'api'
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")

const { queryDepartment, addDepartment, modifyDepartment, queryAllDepartment } = api

export default {
    namespace: "department",
    state: {
        modalVisible: false,
        selectDepartment: {},
        list: [],
        departofcompany: {},
    },
    subscriptions: {
        //监听路径的变化，跳转之后发起查询操作
        // setup({ dispatch, history }) {
        //     history.listen(location => {
        //         if (pathToRegexp('/team').exec(location.pathname)) {
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
            const { success, data } = yield call(queryDepartment, payload)
            if (success) {
                if (data.length==0){
                    message.success("还没有部门", 5, function(){})
                }
                yield put({ type: 'querySuccess', payload: {list:data} })
            } else {
                throw data
            }
        },
        *new({payload}, { call, put }) {
            const { success, data } = yield call(addDepartment, payload)
            if(success){
                const {companyid} = payload
                yield put({type:'closeModal'})
                yield put({type:'query', payload:{companyid:companyid}})
                yield put({type:'queryAll', payload:{}})
                message.success("添加成功")
            }
        },
        *modify({payload}, { call, put, select }) {
            const { success, data } = yield call(modifyDepartment, payload)
            if(success){
                const { filter } = yield select(_ =>_.department );
                yield put({type:'closeModal'})
                yield put({type:'query', payload: filter})
                yield put({type:'queryAll', payload:{}})
                message.success("修改成功")
            }
        },
        *queryAll({payload}, { call, put }) {
            const { success, data } = yield call(queryAllDepartment, payload)
            if (success) {
                yield put({ type: 'querySuccess', payload: {departofcompany:data} })
            } else {
                throw data
            }
        }
    }
}