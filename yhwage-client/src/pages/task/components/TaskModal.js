import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, Form, Input, DatePicker, Modal, Select } from 'antd'
import { regYuanToFen, checkTwoPointNum, regFenToYuan } from '../../../utils/money'

const { Option } = Select

const layout ={
    labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
    },
}


class TaskModal extends Component {
    constructor(props){
        super(props)
        const {task, teamofcompany} = props
        if(task.companyid){
            this.state = { teams: teamofcompany[task.companyid]}
        }else{
            this.state = { teams: []}
        }
    }


    formRef = React.createRef()

    onOk = () => {

        const { handleOk } = this.props;

        this.formRef.current
            .validateFields()
            .then(values => {

                values.profit = regYuanToFen(values.profit, 100)
                
                values.month = moment(values.month).format('YYYY-MM');

                if (handleOk) {
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

    render() {

        const { task, visible, handleCancel, companys } = this.props;
        const { id, profit, tourists, month, companyid, teamid } = task;

        const monthDate = moment(month)
        const profitYuan = regFenToYuan(profit)

        const teams = this.state.teams

        const title = id ? "修改绩效" : "新建绩效"

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
                    name="newTask"
                    initialValues={{ id, companyid, teamid, profit:profitYuan, tourists, month: monthDate }}
                    preserve={false}
                >
                    {id ?
                        (<Form.Item name="id" noStyle>
                            <Input type='hidden'></Input>
                        </Form.Item>) : ('')
                    }
                    <Form.Item name="companyid"
                    label="公司"
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
                    <Form.Item name="teamid"
                    rules={[{required:true}]}
                    label="团队"
                    hasFeedback
                    >
                        <Select>
                            {teams.map(team=>{
                                return (
                                <Option value={team.id}>{team.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="month"
                        label="月份"
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <DatePicker picker="month"></DatePicker>
                    </Form.Item>
                    <Form.Item name="profit"
                        label="利润（元）"
                        rules={[{ required: true, validator: (_, value) => 
                            checkTwoPointNum(value)?
                                Promise.resolve() :  Promise.reject('请输入正确的金额')
                        }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="利润"></Input>
                    </Form.Item>
                    <Form.Item name="tourists"
                        label="流量（人）"
                        rules={[{ required: true  }]}
                        hasFeedback
                    >
                        <Input type="number" placeholder="游客流量"></Input>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

TaskModal.PropTypes = {
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    task: PropTypes.object,
}

export default TaskModal;