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
  span: 14
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Filter extends Component {

  formRef = React.createRef()

  handleFields = fields => {
    if(fields.year){
      fields.year = moment(fields.year).format('YYYY');
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

  render() {
    const { filter, i18n } = this.props
    const { name, year } = filter
    let yearDate
    if(year){
      yearDate = moment(year)
    }
    return (
      <Form
        {...layout}  
        ref={this.formRef}
        name="yearAwardQuery"
        initialValues={{name: name, year: yearDate}}
        onFinish={this.handleSubmit}
        onReset={this.handleReset}
      >
        <Row gutter={24}>
          <Col
            {...ColProps}
          >
            <Form.Item name="name" label="员工姓名">
              <Input placeholder="请输入员工姓名"></Input>
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
          >
            <Form.Item name="year" label="年份"
              rules={[{required:true}]}>
              <DatePicker picker="year">

              </DatePicker>
            </Form.Item>
          </Col>
          <Col
            {...TwoColProps}
          >
            <Row type="flex" align="middle" justify="space-between">
              <div>
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
              </div>
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