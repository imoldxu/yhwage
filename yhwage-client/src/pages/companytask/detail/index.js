import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { history, connect } from 'umi'
import { Row, Col, Button, Popconfirm, Form, Input, Space, Card, Divider, Descriptions } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Page } from 'components'
import { checkTwoPointNum, regFenToYuan, regYuanToFen } from '../../../utils/money'

const layout ={
    labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
    },
}

@withI18n()
@connect(({ companyTaskDetail, department, team, loading }) => ({ companyTaskDetail, department, team, loading }))
class CompanyTaskDetail extends Component {
    formRef = React.createRef()

    handleFields = fields => {
        const { month } = this.props.location.query

        let ret = new Array()
        const departments = Object.values(fields)

        departments.map(department=>{
            let depart = { departmentid: department.departmentid }
            delete department.departmentid
            const teams = Object.values(department)
            teams.map(team=>{
                team.profit = regYuanToFen(team.profit, 100)
                team.month = month
            })
            depart.teams = teams
            ret.push(depart)
        })

        console.log(ret)
        return ret
    }

    handleSubmit = values => {
        const {dispatch , location } = this.props
        const { companyid, month } = location.query
        console.log(values)

        let fields = this.handleFields(values)
        dispatch({ type:'companyTaskDetail/commit', payload:{ companyid:companyid, month:month, departments:fields}})
      }
    
      handleReset = () => {
        const { getFieldsValue, setFieldsValue } = this.formRef.current
    
        const fields = getFieldsValue()
        for (let item in fields) {
          if ({}.hasOwnProperty.call(fields, item)) {
            if (fields[item] instanceof Array) {
              fields[item] = []
            } else {
              fields[item] = undefined
            }
          }
        }
        setFieldsValue(fields)
      }

    // onCommit = values =>{
    //     const { dispatch } = this.props

    //     this.formRef.current
    //         .validateFields()
    //         .then(values => {

    //             const array = Object.values(values)

                
    //         })
    //         .catch(info => {
    //             console.log('校验失败:', info);
    //         });
    // }

    render() {

        const { department, team, location, companyTaskDetail } = this.props;
        const { companyid, companyName, month, profit, tourists } = location.query
        const { departofcompany } = department
        const { teamofdepartment } = team
        const { taskList } = companyTaskDetail
        const departments = departofcompany[companyid]

        return (
            <Page inner>
                <Descriptions title="公司绩效" column={2} bordered={true}>
                    <Descriptions.Item label="公司">{companyName}</Descriptions.Item>
                    <Descriptions.Item label="月份">{month}</Descriptions.Item>
                    <Descriptions.Item label="利润">{regFenToYuan(profit)}</Descriptions.Item>
                    <Descriptions.Item label="流量">{tourists}</Descriptions.Item>
                </Descriptions>
                <Form
                    {...layout}
                    ref={this.formRef}
                    name="taskdetail"
                    preserve={false}
                    onFinish={this.handleSubmit}
                    onReset={this.handleReset}
                >                    
                    {
                        departments.map((department, index)=>{
                            const teams = teamofdepartment[department.id]
                            return (<Row gutter={[12,12]} justify="center">
                                <Form.Item name={[`departmentTask[${index}]`, "departmentid"]} 
                                    initialValue={department.id}
                                    noStyle>
                                    <Input type='hidden'></Input>
                                </Form.Item>
                                <Col span={24}>
                                    <Divider>{department.name}</Divider>
                                </Col>
                                {teams.map((team, i)=>{
                                    return(
                                        <>
                                            <Form.Item name={[`departmentTask[${index}]`, `teamTask[${i}]`, "teamid"]} 
                                                initialValue={team.id}
                                                noStyle>
                                                <Input type='hidden'></Input>
                                            </Form.Item>
                                            <Col span="4"><span>{team.name}</span></Col>
                                            <Col span="10">
                                                <Form.Item name={[`departmentTask[${index}]`, `teamTask[${i}]`, "profit"]}
                                                    label="利润（元）"
                                                    initialValue={ taskList[team.id]? regFenToYuan(taskList[team.id].profit) : 0 }
                                                    rules={[{
                                                        required: true, validator: (_, value) =>
                                                            checkTwoPointNum(value) ?
                                                                Promise.resolve() : Promise.reject('请输入正确的金额')
                                                    }]}
                                                    hasFeedback
                                                >
                                                    <Input type="number" placeholder="利润"></Input>
                                                </Form.Item>    
                                            </Col>
                                            <Col span="10">
                                                <Form.Item name={[`departmentTask[${index}]`, `teamTask[${i}]`, "tourists"]}
                                                    label="流量（人）"
                                                    initialValue={ taskList[team.id]? taskList[team.id].tourists : 0 }
                                                    rules={[{ required: true }]}
                                                    hasFeedback
                                                >
                                                    <Input type="number" placeholder="游客流量"></Input>
                                                </Form.Item>
                                            </Col>
                                        </>
                                    )
                                })}
                            </Row>
                            )
                        })
                        
                    }
                    <Row justify="center" gutter="16">
                        <Col span="2">
                        <Button
                            htmlType="reset" >
                            <Trans>Reset</Trans>
                        </Button>
                        </Col>
                        <Col span="2">
                        <Button
                            type="primary"
                            htmlType="submit">
                            提交
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </Page>
        )
    }
}

CompanyTaskDetail.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default CompanyTaskDetail
