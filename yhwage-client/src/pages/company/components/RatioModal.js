import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Modal } from 'antd'
import { checkTwoPointNum, regFenToYuan, regYuanToFen } from '../../../utils/money'

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
}

class RatioModal extends Component {
    formRef = React.createRef()

    onOk = () => {

        const { handleOk } = this.props;

        this.formRef.current
            .validateFields()
            .then(values => {

                const array = Object.values(values)

                if (handleOk) {
                    handleOk(array)
                }
            })
            .catch(info => {
                console.log('校验失败:', info);
            });


    }

    render() {

        const { company, departments=[], visible, handleCancel } = this.props;
        
        const title = "设置部门提成比例,总比例不超过100%"

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
                    name="departratio"
                    initialValues={{ ...departments }}
                    preserve={false}
                >
                    {departments.map((department, index)=>{
                            return (
                                <>
                                    <Form.Item name={[`ratios[${index}]`,'id']} initialValue={department.id} noStyle>
                                        <Input type="hidden" />
                                    </Form.Item>
                                    <Form.Item label={`${department.name}(%)`} name={[`ratios[${index}]`,'ratio']}
                                        initialValue={department.ratio}
                                        rules={[{ required: true }]}
                                        hasFeedback>
                                        <Input type="number" placeholder="请输入提成比例"/>
                                    </Form.Item>
                                </>
                            )
                        })
                    }
                </Form>
            </Modal>
        )
    }

}

RatioModal.propTypes = {
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    company: PropTypes.object,
}

export default RatioModal;