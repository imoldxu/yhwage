import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space, Card } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import TaskModal from './components/TaskModal'

@withI18n()
@connect(({ companytask, company, loading }) => ({ companytask, company, loading }))
class CompanyTask extends Component {
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

  //处理删除操作
  // handleDeleteItems = () => {
  //   const { dispatch, teamList } = this.props
  //   const { list, pagination, selectedRowKeys } = teamList

  //   //发送删除操作
  //   dispatch({
  //     type: 'teamList/multiDelete',
  //     payload: {
  //       ids: selectedRowKeys,
  //     },
  //   }).then(() => {
  //     //重新刷新
  //     this.handleRefresh({
  //       pageIndex:
  //         list.length === selectedRowKeys.length && pagination.current > 1
  //           ? pagination.current - 1
  //           : pagination.current,
  //     })
  //   })
  // }

  get listProps() {
    const { dispatch, history, companytask, loading } = this.props
    const { list } = companytask

    return {
      dataSource: list,
      loading: loading.effects['companytask/query'],
      pagination: false,
      onChange: page => {
        // this.handleRefresh({
        //   pageIndex: page.current,
        //   pageSize: page.pageSize,
        // })
      },
      onDeleteItem: id => {
      },
      onShowItem: item => {
      },
      onEditItem: item => {
        this.openModal(item)
      },
      onAssign: item => {
        history.push({pathname: '/companytask/detail',
          query: {
            ...item
          }}
        )

      }

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
    const { dispatch, companytask, company, i18n } = this.props
    const { filter } = companytask
    const { list=[] } = company

    return {
      i18n,
      filter: filter,
      companys: list,
      onFilterChange: values => {
        dispatch({
          type: 'companytask/querySuccess',
          payload: {filter: values}
        })

        dispatch({
          type: 'companytask/query',
          payload: values,
        })
      },
      onAdd: () =>{
        this.openModal({})
      }
    }
  }

  get modalProps(){
    const { companytask, company } = this.props 
    const { modalVisible, selectTask } = companytask
    const { list=[] } = company

    return {
      visible: modalVisible,
      handleOk: this.handleAddOrModify,
      handleCancel: this.closeModal,
      task: selectTask,
      companys: list,
    }
  }

  handleAddOrModify = values =>{
    const {dispatch} = this.props;

    if (values.id){
      dispatch({
        type: 'companytask/modify',
        payload: values,
      })
    }else{
      dispatch({
        type: 'companytask/new',
        payload: values,
      })
    }
  }

  openModal = (task) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'companytask/showModal',
      payload: {
        selectTask: task,
      },
    })
  }

  closeModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'companytask/closeModal',
      payload: {
      },
    })
  }

  render() {

    const { companytask } = this.props;
    const { list = [] } = companytask;

    return (
      <Page inner>
        <Filter {...this.filterProps}></Filter>
        <List {...this.listProps}></List>
        <TaskModal {...this.modalProps}></TaskModal>
      </Page>
    )
  }
}

CompanyTask.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CompanyTask
