import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space, Card } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import CopModal from './components/CopModal'

@withI18n()
@connect(({ cop, loading }) => ({ cop, loading }))
class Cop extends PureComponent {
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
    const { dispatch, cop, loading } = this.props
    const { list=[] } = cop

    return {
      dataSource: list,
      loading: loading.effects['cop/query'],
      pagination: false,
      onChange: page => {
      },
      onDeleteItem: id => {
      },
      onShowItem(item) {
      },
      onEditItem: (item)=>{
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
    const { dispatch, cop, i18n } = this.props
    const { filter } = cop

    return {
      i18n,
      filter: filter,
      onFilterChange: values => {
        console.log(values)
        dispatch({
          type: 'cop/querySuccess',
          payload: {filter: values}
        })
        dispatch({
          type: 'cop/query',
          payload: values,
        })
      },
      onAdd(){
        dispatch({type:'cop/showModal', payload:{selectCop:{}}})
      }
    }
  }

  get modalProps(){
    const { cop } = this.props 
    const { modalVisible, selectCop } = cop

    return {
      visible: modalVisible,
      handleOk: this.handleAddOrModify,
      handleCancel: this.closeModal,
      cop: selectCop,
    }
  }

  handleAddOrModify = values =>{
    const {dispatch} = this.props;

    if (values.id){
      dispatch({
        type: 'cop/modify',
        payload: values,
      })
    }else{
      dispatch({
        type: 'cop/new',
        payload: values,
      })
    }
  }

  openModal = (cop) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'cop/showModal',
      payload: {
        selectCop: cop,
      },
    })
  }

  closeModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'cop/closeModal',
      payload: {
      },
    })

  }

  render() {

    const { cop } = this.props;
    const { list = [] } = cop;

    return (
      <Page inner>
        <Filter {...this.filterProps}></Filter>
        <List {...this.listProps}></List>
        <CopModal {...this.modalProps}></CopModal>
      </Page>
    )
  }
}

Cop.PropTypes = {
  cop: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Cop
