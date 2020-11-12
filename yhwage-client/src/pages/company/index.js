import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import CompanyModal from './components/CompanyModal'
import RatioModal from './components/RatioModal'

@withI18n()
@connect(({ company, department, loading }) => ({ company, department, loading }))
class Company extends Component {
  //修改页面把过滤条件与页码等参数记录在路径上重新刷新
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    history.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

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
    const { dispatch, company, loading } = this.props
    const { list } = company

    return {
      dataSource: list,
      //loading: loading.effects['company/query'],
      pagination: false,
      onChange: page => {
        // 分页
        // this.handleRefresh({
        //   pageIndex: page.current,
        //   pageSize: page.pageSize,
        // })
      },
      onDeleteItem: id => {
      },
      onShowItem: (item) => {
      },
      onEditItem: (item) => {
        this.openModal(item)
      }, 
      onSetDepartmentRatio: (item) =>{
        this.openRatioModal(item)
      }
    }
  }

  get filterProps() {
    const { location, i18n, dispatch } = this.props
    const { query } = location

    return {
      i18n,
      filter:{
        ...query,
      },
      onFilterChange: values => {
        console.log(values)
        this.handleRefresh({
          ...values,
        })
       },
      onAdd(){
        dispatch({type:'company/showModal', payload:{selectCompany:{}}})
      }
    }
  }

  get modalProps(){
    const { company } = this.props 
    const { modalVisible, selectCompany } = company

    return {
      visible: modalVisible,
      handleOk: this.handleAddOrModify,
      handleCancel: this.closeModal,
      company: selectCompany,
    }
  }

  handleAddOrModify = values =>{
    const {dispatch} = this.props;

    if (values.id){
      dispatch({
        type: 'company/modify',
        payload: values,
      })
    }else{
      dispatch({
        type: 'company/new',
        payload: values,
      })
    }
  }

  openModal = (company) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'company/showModal',
      payload: {
        selectCompany: company,
      },
    })
  }

  closeModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'company/closeModal',
      payload: {
      },
    })

  }

  get ratioModalProps(){
    const { dispatch, company, department } = this.props 
    const { ratioModalVisible, selectCompany } = company
    const { departofcompany } = department
    const departments = departofcompany[selectCompany.id]

    return {
      visible: ratioModalVisible,
      handleOk: (values)=>{
        dispatch({type:'company/setRatio', payload:values})
      },
      handleCancel: this.closeRatioModal,
      company: selectCompany,
      departments,
    }
  }

  openRatioModal = (company) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'company/showRatioModal',
      payload: {
        selectCompany: company,
      },
    })
  }

  closeRatioModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'company/closeRatioModal',
      payload: {
      },
    })

  }

  render() {

    return (
      <Page inner>
        <Filter {...this.filterProps}></Filter>
        <List {...this.listProps} />
        <CompanyModal {...this.modalProps} />
        <RatioModal {...this.ratioModalProps} />
      </Page>
    )
  }
}

Company.propTypes = {
  company: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Company
