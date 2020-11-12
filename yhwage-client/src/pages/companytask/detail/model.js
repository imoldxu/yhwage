import { message } from 'antd'
import api from 'api'
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")

const { queryTeamTasks, assignCompanyTask } = api

export default {
    namespace: "companyTaskDetail",
    state: {
    },
    subscriptions: {
        //监听路径的变化，跳转之后发起查询操作
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathToRegexp('/companytask/detail').exec(location.pathname)) {
                    const { companyid, month } = location.query
                    if(companyid){
                        dispatch({
                            type: 'query',
                            payload: {companyid, month},
                        })
                    }
                }
            })
        }
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
        *query({payload}, { call, put }) {
            const { success, data } = yield call(queryTeamTasks, payload)
            if (success) {
                yield put({ type: 'querySuccess', payload: {taskList:data} })
            } else {
                throw data
            }
        },
        *commit({payload}, { call, put }) {
            const { success, data } = yield call(assignCompanyTask, payload)
            if(success){
                history.goBack();
                message.success("提交成功")
            }
        },
    }
}