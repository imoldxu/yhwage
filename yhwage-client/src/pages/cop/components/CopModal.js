import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'

import { Trans } from '@lingui/react'
import { Button, Row, Col, Form, Input, Select, Modal } from 'antd'
import { regYuanToFen, checkTwoPointNum, regFenToYuan } from '../../../utils/money'

const { Option} = Select

const layout ={
    labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
    },
}


class CopModal extends Component {
    formRef = React.createRef()

    onOk = () => {

        const { handleOk } = this.props;

        this.formRef.current
            .validateFields()
            .then(values => {

                values.basicwage = regYuanToFen(values.basicwage, 100)
                values.floatwage = regYuanToFen(values.floatwage, 100)

                if (handleOk) {
                    handleOk(values)
                }
            })
            .catch(info => {
                console.log('校验失败:', info);
            });
    }

    render() {

        const { cop, visible, handleCancel } = this.props;
        const { id, basicwage, floatwage } = cop;
        
        const basicWageYuan = regFenToYuan(basicwage);
        const floatWageYuan = regFenToYuan(floatwage);

        const title = id ? "修改职级" : "新建职级"

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
                    name="newCop"
                    initialValues={{ ...cop, basicwage: basicWageYuan, floatwage: floatWageYuan }}
                    preserve={false}
                >
                    {id ?
                        (<Form.Item name="id" noStyle>
                            <Input type='hidden'></Input>
                        </Form.Item>) : ('')
                    }
                    <Form.Item name="name"
                        label="职级名称"
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Input placeholder="职级名称"></Input>
                    </Form.Item>
                    <Form.Item name="ismanager"
                        label="是否管理层"
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Select>
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="basicwage"
                        label="基本工资（元）"
                        rules={[{ required: true, validator: (_, value) => 
                            checkTwoPointNum(value)?
                                Promise.resolve() :  Promise.reject('请输入正确的金额')
                        }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="基本工资"></Input>
                    </Form.Item>
                    <Form.Item name="floatwage"
                        label="浮动工资（元）"
                        rules={[{ required: true, validator: (_, value) => 
                            checkTwoPointNum(value)?
                                Promise.resolve() :  Promise.reject('请输入正确的金额')
                        }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="浮动工资"></Input>
                    </Form.Item>
                    <Form.Item name="monthratio"
                        label="月提成系数"
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="月提成系数"></Input>
                    </Form.Item>
                    <Form.Item name="yearratio"
                        label="年提成系数"
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="年提成系数"></Input>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

CopModal.propTypes = {
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    cop: PropTypes.object,
}

export default CopModal;