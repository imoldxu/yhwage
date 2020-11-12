import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Modal } from 'antd'
import { checkTwoPointNum, regFenToYuan, regYuanToFen } from '../../../utils/money'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}

class CompanyModal extends Component {
    formRef = React.createRef()

    onOk = () => {

        const { handleOk } = this.props;

        this.formRef.current
            .validateFields()
            .then(values => {

                values.headerfee = regYuanToFen(values.headerfee, 100)

                if (handleOk) {
                    handleOk(values)
                }
            })
            .catch(info => {
                console.log('校验失败:', info);
            });


    }

    render() {

        const { company, visible, handleCancel } = this.props;
        const { id } = company;
        let { headerfee } = company;

        if(headerfee){
            headerfee = regFenToYuan(headerfee)
        }

        const title = id ? "修改公司" : "新建公司"

        return (
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
                    initialValues={{ ...company, headerfee }}
                    preserve={false}
                >
                    {id ?
                        (<Form.Item name="id" noStyle>
                            <Input type='hidden'></Input>
                        </Form.Item>) : ('')
                    }
                    <Form.Item name="name"
                        label="公司名称"
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Input placeholder="公司名称"></Input>
                    </Form.Item>
                    <Form.Item label="评分权重(%)" name='scoreweight'
                        rules={[{ required: true }]}
                        hasFeedback>
                        <Input
                            placeholder="请输入"
                        />
                    </Form.Item>
                    <Form.Item label="利润权重(%)" name='profitweight'
                        rules={[{ required: true }]}
                        hasFeedback>
                        <Input
                            placeholder="请输入"
                        />
                    </Form.Item>
                    <Form.Item label="流量权重(%)" name='touristsweight'
                        rules={[{ required: true }]}
                        hasFeedback>
                        <Input
                            placeholder="请输入"
                        />
                    </Form.Item>
                    <Form.Item label="月毛利提成比例(%)" name='monthratio'
                        rules={[{ required: true }]}
                        hasFeedback>
                        <Input
                            placeholder="请输入"
                        />
                    </Form.Item>
                    <Form.Item label="年纯利提成比(%)" name='yearratio'
                        rules={[{ required: true }]}
                        hasFeedback>
                        <Input
                            placeholder="请输入"
                        />
                    </Form.Item>
                    <Form.Item label="人头费(元)" name='headerfee'
                        rules={[{ required: true, validator: (_, value) =>
                            checkTwoPointNum(value)?
                                Promise.resolve() :  Promise.reject('请输入正确的金额')
                        }]}
                        hasFeedback>
                        <Input type="number" placeholder="请输入人头费"/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

CompanyModal.propTypes = {
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    company: PropTypes.object,
}

export default CompanyModal;