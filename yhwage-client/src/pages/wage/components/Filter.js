import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, DatePicker, Form, Input, Cascader, Select } from 'antd'

const { Option } = Select;

const ColProps = {
  span: 5
}

const TwoColProps = {
  span: 9
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
    this.state={teams:[]}
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
    const { teamofcompany } = this.props
    const teams = teamofcompany[companyid]
    this.setState({teams: teams})
  }

  render() {
    const { filter, onCalc, companys, i18n } = this.props
    
    const teams = this.state.teams

    return (
      <Form
        {...layout}  
        ref={this.formRef}
        name="wageQuery"
        initialValues={{...filter}}
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
              <Col flex={3}>
                <Button
                  htmlType="button" onClick={()=>onCalc()}>
                  生成月薪
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