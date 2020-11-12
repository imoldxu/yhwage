import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'

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


class TeamModal extends Component{
    constructor(props){
        super(props)
        const { team={}, departofcompany } = props
        if(team.companyid){
            this.state = { departments: departofcompany[team.companyid]}
        }else{
            this.state = {departments:[]}
        }
    }


    formRef = React.createRef()

    onOk = () =>{

        const {handleOk} = this.props;

        this.formRef.current
        .validateFields()
        .then(values => {

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
    }

    render(){

        const { team, companys, visible, handleCancel} = this.props;
        const { id } = team;

        const departments = this.state.departments

        const title = id ? "修改团队":"新建团队"

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
                    name="newTeam"
                    initialValues={{...team}}
                    preserve={false}
                >
                    {id ?
                        (<Form.Item name="id" noStyle>
                            <Input type='hidden'></Input>
                        </Form.Item>):('')
                    }
                    <Form.Item name="name"
                    label="团队名称"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <Input placeholder="团队名称"></Input>
                    </Form.Item>
                    <Form.Item name="companyid"
                    label="所属公司"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <Select onChange={this.handleCompanyChange}>
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
                        <Select>
                            {departments.map(department=>{
                                return (
                                <Option value={department.id}>{department.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    
                </Form>
            </Modal>
        )
    }

}

TeamModal.propTypes={
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    team: PropTypes.object,
    companys: PropTypes.array,
}

export default TeamModal;