import { message } from 'antd'
import api from 'api'
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")

const { queryTask, addTask, modifyTask, confirmTask } = api

export default {
    namespace: "task",
    state: {
        modalVisible: false,
        confirmModalVisible: false,
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
        showConfirmModal(state, {payload}) {
            return {
                ...state,
                confirmModalVisible: true,
                ...payload,
            }
        },
        closeConfirmModal(state, {payload}){
            return {
                ...state,
                confirmModalVisible: false,
            }
        }
    },

    effects: {
        *query({payload}, { call, put }) {
            const { success, data } = yield call(queryTask, payload)
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
            const { success, data } = yield call(addTask, payload)
            if(success){
                const {teamid, month} = payload
                yield put({type:'closeModal'})
                yield put({type:'query', payload:{teamid:teamid, month:month}})
                message.success("添加成功")
            }
        },
        *modify({payload}, { call, put, select }) {
            const { success, data } = yield call(modifyTask, payload)
            if(success){
                const { filter } = yield select(_ =>_.task );
                yield put({type:'closeModal'})
                yield put({type:'query', payload: filter})
                message.success("修改成功")
            }
        },
        *confirm({payload},{ call, put, select }) {
            delete payload.teamid
            delete payload.month
            const { success, data } = yield call(confirmTask, payload)
            if(success){
                const { filter } = yield select(_ =>_.task );
                yield put({type:'closeConfirmModal'})
                yield put({type:'query', payload: filter})
                message.success("完成成功")
            }
        }
    }
}