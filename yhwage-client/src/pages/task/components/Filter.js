import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, DatePicker, Form, Input, Cascader, Select } from 'antd'
const { Option } = Select;

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

  handleFields = fields => {
    if(fields.month){
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

  handleChange = (key, values) => {
    const { onFilterChange } = this.props
    let fields = this.formRef.current.getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
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
    const { filter={}, companys, onAdd } = this.props
    
    const teams = this.state.teams
    const departments = this.state.departments

    const { month } = filter
    let monthDate
    if(month){
      monthDate = moment(month)
    }

    return (
      <Form
        ref={this.formRef}
        name="taskQuery"
        layout="horizontal"
        initialValues={{...filter, month: monthDate}}
        onFinish={this.handleSubmit}
        onReset={this.handleReset}
      >
        <Row gutter={16}>
          <Col span= "4">
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
          <Col span= "4">
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
          <Col span= "4">
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
          <Col span="4">
            <Form.Item name="month" label="日期">
              <DatePicker picker="month">
              </DatePicker>
            </Form.Item>
          </Col>
          <Col span="8" >
            <Row justify="space-around">
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
              <Col flex={1}>
              {/* <Button
                htmlType="button" onClick={ ()=>onAdd() } >
                <Trans>Create</Trans>
              </Button> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }

}

Filter.propTypes = {
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter