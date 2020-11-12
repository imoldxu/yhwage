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


class DepartmentModal extends Component{
    
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

    render(){

        const { department, companys, visible, handleCancel} = this.props;
        const { id } = department;

        const title = id ? "修改部门":"新建部门"

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
                    name="newDepartment"
                    initialValues={{...department}}
                    preserve={false}
                >
                    {id ?
                        (<Form.Item name="id" noStyle>
                            <Input type='hidden'></Input>
                        </Form.Item>):('')
                    }
                    <Form.Item name="name"
                    label="部门名称"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <Input placeholder="部门名称"></Input>
                    </Form.Item>
                    <Form.Item name="companyid"
                    label="所属公司"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <Select>
                            {companys.map(company=>{
                                return (
                                <Option value={company.id}>{company.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

DepartmentModal.propTypes={
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    companys: PropTypes.array,
}

export default DepartmentModal;