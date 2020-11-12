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
@connect(({ yearaward, loading }) => ({ yearaward, loading }))
class YearAward extends Component {
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
    const { dispatch, yearaward, loading } = this.props
    const { list=[] } = yearaward

    return {
      dataSource: list,
      loading: loading.effects['yearaward/calc'],
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
    const { yearaward, i18n, dispatch } = this.props
    const { filter={} } = yearaward

    return {
      i18n,
      filter: filter,
      onFilterChange: values => {
        dispatch({type:'yearaward/querySuccess', payload:{filter: values}})
        dispatch({type:'yearaward/calc', payload: values})
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

YearAward.propTypes = {
  yearaward: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default YearAward
