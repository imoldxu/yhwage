import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, Form, Input, DatePicker, Modal } from 'antd'
import { regYuanToFen, regFenToYuan, checkTwoPointNum } from '../../../utils/money'

const layout ={
    labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
    },
}


class ConfirmModal extends Component {
    formRef = React.createRef()

    onOk = () => {

        const { task, handleOk } = this.props;
        const { teamid, month } = task

        this.formRef.current
            .validateFields()
            .then(values => {

                values.actualprofit = regYuanToFen(values.actualprofit, 100)
                values.othercost = regYuanToFen(values.othercost, 100)
                values.teamid = teamid
                values.month = month
                if (handleOk) {
                    handleOk(values)
                }
            })
            .catch(info => {
                console.log('校验失败:', info);
            });
    }

    render() {

        const { task, visible, handleCancel } = this.props;
        const { id ,companyName, teamName, month, profit, tourists, actualprofit, actualtourists, actualscore, othercost } = task;

        const title = companyName+"-"+teamName+"-"+month+"绩效"
        const profitYuan = regFenToYuan(profit)
        const actualProfitYuan = regFenToYuan(actualprofit)
        const othercostYuan = regFenToYuan(othercost)

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
                    name="confirmTask"
                    initialValues={{ id, actualprofit:actualProfitYuan, actualtourists, actualscore, othercost:othercostYuan }}
                    preserve={false}
                >
                    <Form.Item name="id" noStyle>
                        <Input type='hidden'></Input>
                    </Form.Item>
                    <Form.Item name="actualprofit"
                        label="完成利润（元）"
                        rules={[{ required: true, validator: (_, value) => 
                            checkTwoPointNum(value)?
                                Promise.resolve() :  Promise.reject('请输入正确的金额')
                        }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="利润"></Input>
                    </Form.Item>
                    <Form.Item name="actualtourists"
                        label="完成流量（人）"
                        rules={[{ required: true  }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="完成游客流量"></Input>
                    </Form.Item>
                    <Form.Item name="actualscore"
                        label="服务评分"
                        rules={[{ required: true  }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="服务评分0-5"></Input>
                    </Form.Item>
                    <Form.Item name="othercost"
                        label="其他支出"
                        rules={[{ required: true  }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="其他支出"></Input>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

ConfirmModal.PropTypes = {
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    task: PropTypes.object,
}

export default ConfirmModal;