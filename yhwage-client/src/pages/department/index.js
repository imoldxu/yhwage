import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space, Card } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import DepartmentModal from './components/DepartmentModal'

@withI18n()
@connect(({ department, company, loading }) => ({ department, company, loading }))
class Department extends Component {
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
    const { dispatch, department, loading } = this.props
    const { list } = department

    return {
      dataSource: list,
      loading: loading.effects['department/query'],
      pagination: false,
      onChange: page => {
        // this.handleRefresh({
        //   pageIndex: page.current,
        //   pageSize: page.pageSize,
        // })
      },
      onDeleteItem: id => {
        // 暂时不做任何事
      },
      onShowItem: item=> {
      },
      onEditItem: item=>{
        this.openModal(item)
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
    const { dispatch, department, company, i18n } = this.props
    const { filter } = department
    const { list=[] } = company

    return {
      i18n,
      filter: filter,
      companys: list,
      onFilterChange: values => {
        dispatch({
          type: 'department/querySuccess',
          payload: {filter: values},
        })
        dispatch({
          type: 'department/query',
          payload: values,
        })
      },
      onAdd(){
        dispatch({type:'department/showModal', payload:{selectDepartment:{}}})
      }
    }
  }

  get modalProps(){
    const { department, company } = this.props 
    const { modalVisible, selectDepartment } = department
    const { list=[] } = company


    return {
      visible: modalVisible,
      handleOk: this.handleAddOrModify,
      handleCancel: this.closeModal,
      department: selectDepartment,
      companys: list,
    }
  }

  handleAddOrModify = values =>{
    const {dispatch} = this.props;

    if (values.id){
      dispatch({
        type: 'department/modify',
        payload: values,
      })
    }else{
      dispatch({
        type: 'department/new',
        payload: values,
      })
    }
  }

  openModal = (department) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'department/showModal',
      payload: {
        selectDepartment: department,
      },
    })
  }

  closeModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'department/closeModal',
      payload: {
      },
    })

  }

  render() {

    const { department } = this.props;
    const { list = [] } = department;

    return (
      <Page inner>
        <Filter {...this.filterProps}></Filter>
        <List {...this.listProps}></List>
        <DepartmentModal {...this.modalProps}></DepartmentModal>        
      </Page>
    )
  }
}

Department.propTypes = {
  department: PropTypes.object,
  company: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Department
