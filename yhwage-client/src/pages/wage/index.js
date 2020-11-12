import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import WageModal from './components/WageModal'

@withI18n()
@connect(({ wage, company, department, team, loading }) => ({ wage, company, department, team, loading }))
class Wage extends Component {
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
  handleDeleteItems = () => {
  }

  get listProps() {
    const { dispatch, wage, loading } = this.props
    const { list } = wage

    return {
      dataSource: list,
      loading: loading.effects['wage/query'],
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
    const { wage, i18n, company, department, team, dispatch } = this.props
    const { filter } = wage
    const { list=[] } = company
    const { departofcompany } = department
    const { teamofdepartment } = team

    return {
      i18n,
      filter: filter,
      companys: list,
      departofcompany,
      teamofdepartment,
      onFilterChange: values => {
        dispatch({type:'wage/querySuccess', payload:{filter: values}})
        dispatch({type:'wage/query', payload: values})
       },
       onCalc: () => {
        this.openModal()
      },
      onDelete: () => {
        dispatch({type:'wage/showDeleteModal', payload: {}})
      }
    }
  }

  get modalProps(){
    const { wage, company, dispatch } = this.props 
    const { modalVisible } = wage
    const { list=[] } = company

    return {
      visible: modalVisible,
      handleOk: values=>{
        dispatch({
          type: 'wage/calc',
          payload: values,
        })
      },
      handleCancel: this.closeModal,
      companys: list,
      title: "计算月薪",
    }
  }

  get deleteModalProps(){
    const { wage, company, dispatch } = this.props 
    const { deleteModalVisible } = wage
    const { list=[] } = company

    return {
      visible: deleteModalVisible,
      handleOk: values=>{
        dispatch({
          type: 'wage/delete',
          payload: values,
        })
      },
      handleCancel: ()=>{
        dispatch({type: 'wage/closeDeleteModal'})
      },
      companys: list,
      title: "删除月薪"
    }
  }

  openModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'wage/showModal',
      payload: {
      },
    })
  }

  closeModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'wage/closeModal',
      payload: {
      },
    })

  }

  render() {
    const { wage } = this.props
    //const { selectedRowKeys } = user

    return (
      <Page inner>
        <Filter {...this.filterProps}></Filter>
        <List {...this.listProps} />
        <WageModal {...this.modalProps}></WageModal>
        <WageModal {...this.deleteModalProps}></WageModal>
      </Page>
    )
  }
}

Wage.propTypes = {
  wage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Wage
