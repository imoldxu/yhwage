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
        const {staff, departofcompany, teamofdepartment} = props
        if(staff.companyid){
            if(staff.departmentid){
                this.state = { departments: departofcompany[staff.companyid], teams: teamofdepartment[staff.departmentid] }
            }else{
                this.state = { departments: departofcompany[staff.companyid], teams: [] }
            }
        }else{
            this.state = {departments:[], teams:[]}
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
        const { departofcompany } = this.props
        const departments = departofcompany[companyid]
        this.setState({ departments: departments, teams: []})
        this.formRef.current.setFieldsValue({departmentid:null, teamid:null})
      }
    
      handleDepartmentChange = (departmentid) =>{
        const { teamofdepartment } = this.props
        const teams = teamofdepartment[departmentid]
        this.setState({ teams: teams})
        this.formRef.current.setFieldsValue({teamid:null})
    }

    render(){

        const { staff, companys, cops=[], visible, handleCancel} = this.props;
        const { id, cop } = staff;
        
        const departments = this.state.departments
        const teams = this.state.teams

        let copid = null
        if(cop){
            copid = cop.id
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
                    initialValues={{...staff, copid }}
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
                    <Form.Item name="departmentid"
                    label="所属部门"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <Select onChange={this.handleDepartmentChange}>
                            {departments.map(department=>{
                                return (
                                <Option value={department.id}>{department.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
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
                                return (<Option value={cop.id}>{cop.name}</Option>)
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

StaffModal.propTypes={
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    staff: PropTypes.object,
    companys: PropTypes.array,
    cops: PropTypes.array,
}

export default StaffModal;