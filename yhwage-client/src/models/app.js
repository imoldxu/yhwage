/* global window */

import { history } from 'umi'
import { stringify } from 'qs'
import store from 'store'
const { pathToRegexp } = require("path-to-regexp")
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import config from 'config'

//const { queryRouteList, logoutUser, queryUserInfo } = api
const { queryCompany, queryCop, queryAllTeam, queryUser, logout } = api

const goWagePage = () => {
  if (pathToRegexp(['/', '/login']).exec(window.location.pathname)) {
    history.push({
      pathname: '/wage',
    })
  }
}

export default {
  namespace: 'app',
  state: {
    routeList: [
      {
        id: '1',
        icon: 'dashboard',
        name: 'wage',
        zh: {
          name: '薪酬管理'
        }
      },
      {
        id: '11',
        menuParentId: '1',
        breadcrumbParentId: '1',
        name: 'wage',
        zh: {
          name: '月薪'
        },
        route: '/wage',
      },
      {
        id: '12',
        menuParentId: '1',
        breadcrumbParentId: '1',
        name: 'yearaward',
        zh: {
          name: '年提成'
        },
        route: '/yearaward',
      },
      {
        id: '2',
        name: 'company',
        zh: {
          name: '公司管理'
        },
        icon: 'user',
      },
      {
        id: '21',
        name: 'company',
        menuParentId: '2',
        breadcrumbParentId: '2',
        zh: {
          name: '公司管理'
        },
        route: '/company',
      },
      {
        id: '22',
        name: 'department',
        menuParentId: '2',
        breadcrumbParentId: '2',
        zh: {
          name: '部门管理'
        },
        route: '/department',
      },
      {
        id: '23',
        name: 'team',
        menuParentId: '2',
        breadcrumbParentId: '2',
        zh: {
          name: '团队管理'
        },
        route: '/team',
      },
      {
        id: '24',
        name: 'cop',
        menuParentId: '2',
        breadcrumbParentId: '2',
        zh: {
          name: '职级管理'
        },
        route: '/cop',
      },
      {
        id: '25',
        name: 'staff',
        menuParentId: '2',
        breadcrumbParentId: '2',
        zh: {
          name: '员工管理'
        },
        route: '/staff',
      },
      {
        id: '3',
        name: 'task',
        zh: {
          name: '绩效管理'
        },
        icon: 'shopping-cart',
      },
      {
        id: '31',
        name: 'companytask',
        menuParentId: '3',
        breadcrumbParentId: '3',
        zh: {
          name: '公司绩效'
        },
        route: '/companytask',
      },
      {
        id: '32',
        name: 'staff',
        menuParentId: '3',
        breadcrumbParentId: '3',
        zh: {
          name: '团队绩效'
        },
        route: '/task',
      },
      {
        id: '4',
        name: 'dashboard',
        zh: {
          name: '成本分析'
        },
        icon: 'dashboard',
        route: '/dashboard',
      },
      // {
      //   id: '4',
      //   name: 'config',
      //   zh: {
      //     name: '配置管理'
      //   },
      //   icon: 'setting',
      //   route: '/config',
      // },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      // store isInit to prevent query trigger by refresh
      yield put({type:'company/query', payload:{}}) 
      yield put({type:'cop/query', payload:{}})
      yield put({type:'department/queryAll', payload:{}})
      yield put({type:'team/queryAll', payload:{}})

      const isInit = store.get('isInit')
      if (isInit) {
        //goDashboard()
        goWagePage()
        return
      }
      const { locationPathname } = yield select(_ => _.app)

      //const { success, user } = yield call(queryUserInfo, payload)
      //if (success && user) {
        //const { list } = yield call(queryRouteList)
        //const { permissions } = user
        //let routeList = list
        //if (
        //  permissions.role === ROLE_TYPE.ADMIN ||
        //  permissions.role === ROLE_TYPE.DEVELOPER
        //) {
        //  permissions.visit = list.map(item => item.id)
        //} else {
        //  routeList = list.filter(item => {
        //    const cases = [
        //      permissions.visit.includes(item.id),
        //      item.mpid
        //        ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
        //        : true,
        //      item.bpid ? permissions.visit.includes(item.bpid) : true,
        //    ]
        //    return cases.every(_ => _)
        // })
        //}
        //store.set('routeList', routeList)
        //store.set('permissions', permissions)
        //store.set('user', user)
      try{
         const resp = yield call(queryUser, payload)
         if ( resp.success ) {
           store.set('user', resp.data)
           store.set('isInit', true)
           goWagePage()
         }
      }catch(err){
         if (queryLayout(config.layouts, locationPathname) !== 'public') {
           history.push({
             pathname: '/login',
             search: stringify({
               from: locationPathname,
             }),
           })
         }else{
           history.push({
             pathname: '/login'
           })
         }
       }
      // const resp = yield call(queryAgencyInfo, payload)
      // if ( resp.success ) {
      //   store.set('agency', resp.data)
      //   store.set('isInit', true)
      //   goDashboard()
      // } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
      //   history.push({
      //     pathname: '/login',
      //     search: stringify({
      //       from: locationPathname,
      //     }),
      //   })
      // }
    },

    *signOut({ payload }, { call, put }) {
      const data = yield call(logout)
      //const data = yield call(logoutAgency)
      //const data = { success:true }
      if (data.success) {
        //store.set('routeList', [])
        //store.set('permissions', { visit: [] })
        store.set('user', {})
        //store.set('agency', {})
        store.set('isInit', false)
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
