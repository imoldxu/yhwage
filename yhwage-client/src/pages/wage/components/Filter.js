import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, DatePicker, Form, Input, Cascader, Select } from 'antd'

const { Option } = Select;

const ColProps = {
  span: 4
}

const TwoColProps = {
  span: 8
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Filter extends Component {
  constructor(props){
    super(props)
    const { filter={}, departofcompany, teamofdepartment } = props
    if(filter.companyid){
      if(filter.departmentid){
        this.state = { departments: departofcompany[filter.companyid], teams: teamofdepartment[filter.departmentid] }
      }else{
        this.state = { departments: departofcompany[filter.companyid], teams: [] }
      }
    }else{
      this.state = {departments:[], teams:[]}
    }
  }


  formRef = React.createRef()

  // calcWage = () => {
  //   const { onCalcWage } = this.props
  //   this.formRef.current
  //       .validateFields()
  //       .then(values => {

  //          let fields = this.handleFields(values)
  //          onCalcWage(fields)
  //       })
  //       .catch(info => {
  //           console.log('校验失败:', info);
  //       });

  // }

  handleFields = fields => {
    if(fields.month){
      console.log(fields.month)
      fields.month = moment(fields.month).format('YYYY-MM');
    }
    return fields
  }

  handleSubmit = values => {
    const { onFilterChange } = this.props
    let fields = this.handleFields(values)
    onFilterChange(fields)
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
    this.handleSubmit(fields)
  }

  handleCompanyChange = (companyid) =>{
    const { departofcompany } = this.props
    const departments = departofcompany[companyid]
    this.formRef.current.setFieldsValue({departmentid: null})
    this.formRef.current.setFieldsValue({teamid: null})
    this.setState({ departments: departments, teams: []})
  }

  handleDepartmentChange = (departmentid) =>{
    const { teamofdepartment } = this.props
    if(departmentid){
      const teams = teamofdepartment[departmentid]
      this.setState({ teams: teams})
    }else{
      this.setState({ teams: []})
    }
    this.formRef.current.setFieldsValue({teamid: null})
  }

  render() {
    const { filter={}, onCalc, onDelete, companys, i18n } = this.props
    
    const { month } = filter
    let monthDate
    if(month){
      monthDate = moment(month)
    }

    const teams = this.state.teams
    const departments = this.state.departments

    return (
      <Form
        {...layout}  
        ref={this.formRef}
        name="wageQuery"
        initialValues={{...filter, month: monthDate}}
        onFinish={this.handleSubmit}
        onReset={this.handleReset}
      >
        <Row gutter={24}>
          <Col
            {...ColProps}
          >
            <Form.Item name="companyid" label="公司">
              <Select
                onChange={this.handleCompanyChange}
                >
                {
                   companys.map(company=>{
                      return(
                        <Option value={company.id}>{company.name}</Option>
                      )
                   }) 
                }
              </Select>
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
          >
            <Form.Item name="departmentid" label="部门">
              <Select
                onChange={this.handleDepartmentChange}
                >
                {
                   departments.map(department=>{
                      return(
                        <Option value={department.id}>{department.name}</Option>
                      )
                   }) 
                }
              </Select>
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
          >
            <Form.Item name="teamid" label="团队">
              <Select>
                <Option></Option>
                {
                  teams.map(team=>{
                    return (<Option value={team.id}>{team.name}</Option>)
                  })
                }
              </Select>
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
          >
            <Form.Item name="month" label="月份"
              rules={[{required:true}]}>
              <DatePicker picker="month">

              </DatePicker>
            </Form.Item>
          </Col>
          <Col
            {...TwoColProps}
          >
            <Row type="flex" align="middle" justify="space-between">
              <Col flex={3}>
                <Button
                  type="primary"
                  className="margin-right"
                  htmlType="submit">
                  <Trans>Search</Trans>
                </Button>
                <Button
                  htmlType="reset" >
                  <Trans>Reset</Trans>
                </Button>
              </Col>
              <Col>
                <Button
                  htmlType="button" onClick={()=>onCalc()}>
                  生成月薪
                </Button>
              </Col>
              <Col>
                <Button
                  htmlType="button" onClick={()=>onDelete()}>
                  删除
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }

}

Filter.propTypes = {
  onAdd: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter