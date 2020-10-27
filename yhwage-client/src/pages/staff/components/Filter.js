import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, Form, Select } from 'antd'
const { Option } = Select;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {teams: [] };
  }

  formRef = React.createRef()

  handleFields = fields => {
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
    const { teamofcompany } = this.props
    const teams = teamofcompany[companyid]
    this.setState({teams: teams})
  }

  render() {
    const { filter, companys, onAdd, i18n } = this.props
    const teams = this.state.teams 

    return (
      <Form
        ref={this.formRef}
        name="staffQuery"
        layout="horizontal"
        initialValues={{...filter}}
        onFinish={this.handleSubmit}
        onReset={this.handleReset}
      >
        <Row gutter={16}>
          <Col span= "6">
            <Form.Item label="公司" name='companyid'>
              <Select onChange={this.handleCompanyChange}>
                {
                  companys.map(company=>{
                    return (
                    <Option value={company.id}>{company.name}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span= "6" >
            <Form.Item name='teamid' label="团队">
              <Select>
                <Option></Option>
                {
                  teams.map(team=>{
                    return (
                    <Option value={team.id}>{team.name}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span="12" >
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
                <Button
                  htmlType="button" onClick={()=>onAdd()} >
                  <Trans>Create</Trans>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }

}

Filter.PropTypes = {
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter