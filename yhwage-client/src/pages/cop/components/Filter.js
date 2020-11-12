import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'

import { Trans } from '@lingui/react'
import { Button, Row, Col, DatePicker, Form, Input, Cascader, Select } from 'antd'
const { RangePicker } = DatePicker
const { Option } = Select;

const ColProps = {
  // xs: 24,
  // sm: 12,
  // style: {
  //   marginBottom: 12,
  // },
}

const TwoColProps = {
  ...ColProps,
  // xl: 96,
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
    const { filter, i18n, onAdd } = this.props

    return (
      <Form
        ref={this.formRef}
        name="copQuery"
        layout="horizontal"
        initialValues={{ ...filter }}
        onFinish={this.handleSubmit}
        onReset={this.handleReset}
      >
        <Row gutter={[16,12]} justify="end">
          <Col span={4}>
            <Button type="ghost" onClick={() => onAdd()}>
              <Trans>Create</Trans>
            </Button>
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