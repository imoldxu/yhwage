import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, Form, Input, Cascader, Modal, Select, DatePicker } from 'antd'

const { Option } = Select

const layout ={
    labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
    },
}


class WageModal extends Component{
    
    formRef = React.createRef()

    onOk = () =>{

        const {handleOk} = this.props;

        this.formRef.current
        .validateFields()
        .then(values => {

            values.month = moment(values.month).format("YYYY-MM")

            if(handleOk){
                handleOk(values)
            }
        })
        .catch(info => {
            console.log('校验失败:', info);
        });

        
    }

    render(){

        const { companys, visible, handleCancel} = this.props;

        return(
            <Modal
                title="计算月薪"
                visible={visible}
                onOk={this.onOk}
                confirmLoading={false}
                destroyOnClose={true}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    ref={this.formRef}
                    name="calc"
                    initialValues={{}}
                    preserve={false}
                >
                    
                    <Form.Item name="companyid"
                    label="公司"
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
                    <Form.Item name="month"
                    label="月份"
                    rules={[{required:true}]}
                    hasFeedback
                    >
                        <DatePicker picker="month"></DatePicker>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

WageModal.PropTypes={
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    companys: PropTypes.array,
}

export default WageModal;