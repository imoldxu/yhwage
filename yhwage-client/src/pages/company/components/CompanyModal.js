import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, Form, Input, Cascader, Modal } from 'antd'

const layout ={
    labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
    },
}

class CompanyModal extends Component{
    formRef = React.createRef()

    onOk = () =>{

        const {handleOk} = this.props;

        this.formRef.current
        .validateFields()
        .then(values => {

            // let fileObj = document.getElementById('uploadPrice_file').files[0]
            
            // let newValues ={
            //     providerId: values.providerId,
            //     file: fileObj,
            // }

            if(handleOk){
                handleOk(values)
            }
        })
        .catch(info => {
            console.log('校验失败:', info);
        });

        
    }

    render(){

        const { company, visible, handleCancel} = this.props;
        const { id, name } = company;

        const title = id ? "修改公司":"新建公司"

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
                    name="newCompany"
                    initialValues={{id, name}}
                    preserve={false}
                >
                    {id ?
                        (<Form.Item name="id" noStyle>
                            <Input type='hidden'></Input>
                        </Form.Item>):('')
                    }
                    <Form.Item name="name"
                    label="公司名称"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <Input placeholder="公司名称"></Input>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

CompanyModal.PropTypes={
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    company: PropTypes.object,
}

export default CompanyModal;