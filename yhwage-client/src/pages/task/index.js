import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space, Card } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import TaskModal from './components/TaskModal'
import ConfirmModal from './components/ConfirmModal'

@withI18n()
@connect(({ task, company, team, loading }) => ({ task, company, team, loading }))
class Task extends PureComponent {
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
    const { dispatch, task, loading } = this.props
    const { list } = task

    return {
      dataSource: list,
      loading: loading.effects['task/query'],
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
      onConfirm: item => {
        this.openConfirmModal(item)
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
    const { dispatch, task, company, team, i18n } = this.props
    const { filter } = task
    const { list=[] } = company
    const { teamofcompany } = team

    return {
      i18n,
      filter: filter,
      companys: list,
      teamofcompany: teamofcompany,
      onFilterChange: values => {
        dispatch({
          type: 'task/querySuccess',
          payload: {filter: values}
        })

        dispatch({
          type: 'task/query',
          payload: values,
        })
      },
      onAdd: () =>{
        this.openModal({})
      }
    }
  }

  get modalProps(){
    const { task, company, team } = this.props 
    const { modalVisible, selectTask } = task
    const { list=[] } = company
    const { teamofcompany } = team

    return {
      visible: modalVisible,
      handleOk: this.handleAddOrModify,
      handleCancel: this.closeModal,
      task: selectTask,
      companys: list,
      teamofcompany: teamofcompany,
    }
  }

  handleAddOrModify = values =>{
    const {dispatch} = this.props;

    if (values.id){
      dispatch({
        type: 'task/modify',
        payload: values,
      })
    }else{
      dispatch({
        type: 'task/new',
        payload: values,
      })
    }
  }

  openModal = (task) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'task/showModal',
      payload: {
        selectTask: task,
      },
    })
  }

  closeModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'task/closeModal',
      payload: {
      },
    })
  }

  get confirmModalProps(){
    const { task } = this.props 
    const { confirmModalVisible, selectTask } = task

    return {
      visible: confirmModalVisible,
      handleOk: this.handleConfirm,
      handleCancel: this.closeConfirmModal,
      task: selectTask,
    }
  }

  handleConfirm = values =>{
    const {dispatch} = this.props;
    dispatch({
      type: 'task/confirm',
      payload: values,
    })
  }

  openConfirmModal = (task) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'task/showConfirmModal',
      payload: {
        selectTask: task,
      },
    })
  }

  closeConfirmModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'task/closeConfirmModal',
      payload: {
      },
    })

  }

  render() {

    const { task } = this.props;
    const { list = [] } = task;

    return (
      <Page inner>
        <Filter {...this.filterProps}></Filter>
        <List {...this.listProps}></List>
        <TaskModal {...this.modalProps}></TaskModal>
        <ConfirmModal {...this.confirmModalProps}></ConfirmModal>
      </Page>
    )
  }
}

Task.PropTypes = {
  PriceList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Task
