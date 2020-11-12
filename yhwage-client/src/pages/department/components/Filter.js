import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'

import { Trans } from '@lingui/react'
import { Button, Row, Col, DatePicker, Form, Input, Cascader, Select } from 'antd'
const { RangePicker } = DatePicker
const { Option } = Select;

const ColProps = {
}

const TwoColProps = {
  ...ColProps,
}

class Filter extends Component {
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

  render() {
    const { filter, onAdd, companys, i18n } = this.props
  
    return (
      <Form
        ref={this.formRef}
        name="teamQuery"
        layout="horizontal"
        initialValues={{...filter}}
        onFinish={this.handleSubmit}
        onReset={this.handleReset}
      >
        <Row gutter={16}>
          <Col {...ColProps} span= "6">
            <Form.Item label="公司" name='companyid'>
              <Select>
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
          <Col {...ColProps} span="18" >
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
              <Button htmlType="button" onClick={ ()=> onAdd() }>
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

Filter.propTypes = {
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter