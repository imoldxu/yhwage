// import { message } from 'antd'
// import api from 'api'
// import { history } from 'umi'
// const { pathToRegexp } = require("path-to-regexp")

// const { addConfig, modifyConfig, queryConfig } = api

// export default {
//     namespace: "config",
//     state:{
//     },
//     subscriptions: {
//         //监听路径的变化，跳转之后发起查询操作
//         setup({ dispatch, history }) {
//             history.listen(location => {
//                 if (pathToRegexp('/config').exec(location.pathname)) {
//                     dispatch({
//                         type: 'query',
//                         payload:{},
//                     })
//                 }
//             })
//         },
//     },

//     reducers: {
//         //处理查询结果，合并到state中
//         querySuccess(state, { payload }) {
//             return {
//                 ...state,
//                 ...payload,
//             }
//         },
//     },

//     effects: {
//         *query({payload}, { call, put }) {
//             const { success, data } = yield call(queryConfig, payload)
//             if (success) {
//                 yield put({ type: 'querySuccess', payload: data })
//             } else {
//                 throw data
//             }
//         },
//         *new({payload}, { call, put }) {
//             const { success, data } = yield call(addConfig, payload)
//             if(success){
//                 yield put({type:'querySuccess', payload:{...data, isEdit: false}})
//                 message.success("修改成功")
//             }
//         },
//     }
// }