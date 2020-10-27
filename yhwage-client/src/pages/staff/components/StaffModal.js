import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, Form, Input, Cascader, Modal, Select } from 'antd'

const { Option } = Select

const layout ={
    labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
    },
}


class StaffModal extends Component{
    constructor(props){
        super(props)
        const {staff, teamofcompany} = props
        if(staff.companyid){
            this.state = { teams: teamofcompany[staff.companyid], ismanager: staff.cop.ismanager}
        }else{
            this.state = { teams: [], ismanager:1}
        }
    }


    formRef = React.createRef()

    onOk = () =>{

        const {handleOk} = this.props;

        this.formRef.current
        .validateFields()
        .then(values => {

            delete values.ismanager//不上传是否是管理者

            if(handleOk){
                handleOk(values)
            }
        })
        .catch(info => {
            console.log('校验失败:', info);
        });        
    }
  
    handleCompanyChange = (companyid) =>{
        const { teamofcompany } = this.props
        const teams = teamofcompany[companyid]
        this.setState({teams: teams})
    }

    handleManagerChange = (value) => {
        this.setState({ismanager: value})
        this.formRef.current.setFields([{name:'copid',value:null}])
    }

    render(){

        const { staff, companys, cops=[], teamofcompany, visible, handleCancel} = this.props;
        const { id, cop } = staff;
        
        const teams = this.state.teams
        let ismanager = this.state.ismanager;
        let copid = null
        if(staff.cop){
            copid = staff.cop.id
        }

        const title = id ? "修改员工":"新建员工"

        return(
            <Modal
                title={title}
                visible={visible}
                onOk={this.onOk}
                confirmLoading={false}
                destroyOnClose={true}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    ref={this.formRef}
                    name="newStaff"
                    initialValues={{...staff, copid:copid, ismanager: ismanager}}
                    preserve={false}
                >
                    {id ?
                        (<Form.Item name="id" noStyle>
                            <Input type='hidden'></Input>
                        </Form.Item>):('')
                    }
                    <Form.Item name="name"
                    label="员工姓名"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <Input placeholder="员工姓名"></Input>
                    </Form.Item>
                    <Form.Item name="companyid"
                    label="所属公司"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <Select 
                            onChange={this.handleCompanyChange}>
                            {companys.map(company=>{
                                return (
                                <Option value={company.id}>{company.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="ismanager"
                    label="管理层"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <Select onChange={this.handleManagerChange}>
                            <Option value={1}>是</Option>
                            <Option value={0}>否</Option>
                        </Select>
                    </Form.Item>
                    {ismanager===1?(
                        <Form.Item name="copid"
                        label="职级"
                        rules={[{required:true}]}
                        hasFeedback
                        >
                            <Select>
                                {cops.map(cop=>{
                                    return cop.ismanager===1?
                                     (<Option value={cop.id}>{cop.name}</Option>) : ('')
                                })}
                            </Select>
                        </Form.Item>
                    ): (
                        <>
                        <Form.Item name="teamid" label="所属团队"
                        rules={[{required:true}]} 
                        hasFeedback>
                            <Select>
                                {teams.map(team=>{
                                    return (
                                    <Option value={team.id}>{team.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="copid"
                        label="职级"
                        rules={[{required:true}]}
                        hasFeedback
                        >
                            <Select>
                                {cops.map(cop=>{
                                    return cop.ismanager===1?
                                    ('') : (<Option value={cop.id}>{cop.name}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                        </>
                    )
                    }
                </Form>
            </Modal>
        )
    }

}

StaffModal.PropTypes={
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    staff: PropTypes.object,
    companys: PropTypes.array,
    cops: PropTypes.array,
}

export default StaffModal;