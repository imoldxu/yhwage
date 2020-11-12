import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'

@withI18n()
@connect(({ statistic, loading }) => ({ statistic, loading }))
class StaffStatistic extends Component {
  //修改页面把过滤条件与页码等参数记录在路径上重新刷新
  // handleRefresh = newQuery => {
  //   const { location } = this.props
  //   const { query, pathname } = location

  //   history.push({
  //     pathname,
  //     search: stringify(
  //       {
  //         ...query,
  //         ...newQuery,
  //       },
  //       { arrayFormat: 'repeat' }
  //     ),
  //   })
  // }
  
  get listProps() {
    const { dispatch, statistic, loading } = this.props
    const { stafflist=[] } = statistic

    return {
      dataSource: stafflist,
      loading: loading.effects['statistic/staffStatistic'],
      //pagination,
      onChange: page => {
      },
      onDeleteItem: id => {
      },
      onShowItem(item) {
      },
      onEditItem(item) {
      },
      
      // 表格行可选择，暂不支持
      // rowSelection: {
      //   selectedRowKeys,//初始值
      //   //每次修改的更新操作
      //   onChange: keys => {
      //     dispatch({
      //       type: 'user/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  get filterProps() {
    const { statistic, i18n, dispatch } = this.props
    const { filter={} } = statistic

    return {
      i18n,
      filter: filter,
      onFilterChange: values => {
        dispatch({type:'statistic/querySuccess', payload:{filter: values}})
        dispatch({type:'statistic/staffStatistic', payload: values})
       },
    }
  }

  render() {
    return (
      <Page inner>
        <Filter {...this.filterProps}></Filter>
        <List {...this.listProps} />
      </Page>
    )
  }
}

StaffStatistic.propTypes = {
  statistic: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default StaffStatistic
