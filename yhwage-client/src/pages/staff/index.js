import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space, Card } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import StaffModal from './components/StaffModal'

@withI18n()
@connect(({ staff, company, team, cop, loading }) => ({ staff, company, team, cop, loading }))
class Staff extends PureComponent {
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
    const { dispatch, staff, loading } = this.props
    const { list } = staff

    return {
      dataSource: list,
      loading: loading.effects['staff/query'],
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
    const { dispatch, company, team, staff, location, i18n } = this.props
    const { filter } = staff
    const { list=[] } = company
    const { teamofcompany=[] } = team

    return {
      i18n,
      filter: filter,
      companys: list,
      teamofcompany: teamofcompany,
      onFilterChange: values => {
        dispatch({
          type: 'staff/querySuccess',
          payload: {filter: values}
        })
        dispatch({
          type: 'staff/query',
          payload: values,
        })
      },
      onAdd(){
        dispatch({type:'staff/showModal', payload:{selectStaff:{}}})
      },
    }
  }

  get modalProps(){
    const { staff, dispatch, company, team, cop } = this.props 
    const { modalVisible, selectStaff } = staff
    const { list=[] } = company
    const { teamofcompany } = team
    const copList = cop.list? cop.list : [] 

    return {
      visible: modalVisible,
      handleOk: this.handleAddOrModify,
      handleCancel: this.closeModal,
      staff: selectStaff,
      companys: list,
      teamofcompany: teamofcompany,
      cops: copList,
    }
  }

  handleAddOrModify = values =>{
    const {dispatch} = this.props;

    if (values.id){
      dispatch({
        type: 'staff/modify',
        payload: values,
      })
    }else{
      dispatch({
        type: 'staff/new',
        payload: values,
      })
    }
  }

  openModal = (staff) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'staff/showModal',
      payload: {
        selectStaff: staff,
      },
    })
  }

  closeModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'staff/closeModal',
      payload: {
      },
    })

  }

  showStaffModal = ()=>{
    return (<StaffModal {...this.modalProps}></StaffModal>)
  }

  render() {

    const { staff } = this.props;
    const { modalVisible, list = [] } = staff;

    return (
      <Page inner>
        <Filter {...this.filterProps}></Filter>
        <List {...this.listProps}></List>
        {
          modalVisible? this.showStaffModal() : ('') 
        }
      </Page>
    )
  }
}

Staff.PropTypes = {
  staff: PropTypes.object,
  company: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Staff
