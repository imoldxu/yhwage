import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Trans } from '@lingui/react'
import { Button, Row, Col, DatePicker, Form, Input, Cascader } from 'antd'
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

class Filter extends Component {
  formRef = React.createRef()

  handleFields = fields => {
    // const { createTime } = fields
    // if (createTime && createTime.length) {
    //   fields.createTime = [
    //     //fields.startTime = moment(createTime[0]).format('YYYY-MM-DD'),
    //     //fields.endTime = moment(createTime[1]).format('YYYY-MM-DD'),
    //     moment(createTime[0]).format('YYYY-MM-DD'),
    //     moment(createTime[1]).format('YYYY-MM-DD'),
    //   ]
    // }
    // delete fields.createTime
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
    const { filter, onAdd, i18n } = this.props
    const { name } = filter

    // let initialCreateTime = []
    // if (filter.createTime && filter.createTime[0]) {
    //   initialCreateTime[0] = moment(filter.createTime[0])
    // }
    // if (filter.createTime && filter.createTime[1]) {
    //   initialCreateTime[1] = moment(filter.createTime[1])
    // }

    return (
      <Form
        ref={this.formRef}
        name="companyQuery"
        //layout="inline"
        initialValues={{ name }}
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

Filter.PropTypes = {
  onAdd: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter