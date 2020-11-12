import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space, Card } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import TeamModal from './components/TeamModal'

@withI18n()
@connect(({ team, company, department, loading }) => ({ team, company, department, loading }))
class Team extends Component {
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
    const { dispatch, team, loading } = this.props
    const { list } = team

    return {
      dataSource: list,
      loading: loading.effects['team/query'],
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
    const { dispatch, team, department, company, i18n } = this.props
    const { filter } = team
    const { list=[] } = company
    const { departofcompany } = department

    return {
      i18n,
      filter: filter,
      companys: list,
      departofcompany,
      onFilterChange: values => {
        dispatch({
          type: 'team/querySuccess',
          payload: {filter: values},
        })
        dispatch({
          type: 'team/query',
          payload: values,
        })
      },
      onAdd(){
        dispatch({type:'team/showModal', payload:{selectTeam:{}}})
      }
    }
  }

  get modalProps(){
    const { team, company, department } = this.props 
    const { modalVisible, selectTeam } = team
    const { list=[] } = company
    const { departofcompany } = department

    return {
      visible: modalVisible,
      handleOk: this.handleAddOrModify,
      handleCancel: this.closeModal,
      team: selectTeam,
      companys: list,
      departofcompany,
    }
  }

  handleAddOrModify = values =>{
    const {dispatch} = this.props;

    if (values.id){
      dispatch({
        type: 'team/modify',
        payload: values,
      })
    }else{
      dispatch({
        type: 'team/new',
        payload: values,
      })
    }
  }

  openModal = (team) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'team/showModal',
      payload: {
        selectTeam: team,
      },
    })
  }

  closeModal = () => {
    const {dispatch} = this.props;

    dispatch({
      type: 'team/closeModal',
      payload: {
      },
    })

  }

  createTeamModal = () =>{
    const { team } = this.props;
    const { modalVisible } = team
    if(modalVisible){
      return (<TeamModal {...this.modalProps}></TeamModal>)
    } else{ 
      return (<></>) 
    } 
  }

  render() {

    const { team } = this.props;
    const { modalVisible } = team
    const { list = [] } = team;

    return (
      <Page inner>
        <Filter {...this.filterProps}></Filter>
        <List {...this.listProps}></List>
        {
          this.createTeamModal()
        }    
      </Page>
    )
  }
}

Team.propTypes = {
  team: PropTypes.object,
  company: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Team
