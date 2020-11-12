// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { history, connect } from 'umi'
// import { Row, Col, Button, Popconfirm, Form, Input, Space, Descriptions } from 'antd'
// import { withI18n } from '@lingui/react'
// import { Page } from 'components'
// import { stringify } from 'qs'

// const layout ={
//     labelCol: {
//         span: 8,
//       },
//       wrapperCol: {
//         span: 8,
//     },
// }

// @withI18n()
// @connect(({ config, loading }) => ({ config, loading }))
// class Config extends PureComponent {
  
//   formRef = React.createRef()

//   handleSave = values =>{
//     const {dispatch} =this.props
//     dispatch({type:'config/new', payload:values})
//   }

//   handleEdit =()=>{
//     const {dispatch} =this.props
//     dispatch({type:'config/querySuccess', payload:{isEdit:true}})
//   }

//   render() {

//     const { config } = this.props;
//     const { isEdit=false } = config;

//     return (
//       <Page inner>
//           {isEdit? (
//             <Form
//                 { ...layout }
//                 ref={this.formRef}
//                 name="addConfig"
//                 layout="horizontal"
//                 initialValues={{ ...config }}
//                 onFinish={this.handleSave}
//             >
//                 <Row justify="end">
//                     <Col span={4}><Button htmlType="submit">保存</Button></Col>
//                 </Row>
//                 <Form.Item label="评分权重(%)" name='scoreweight'>
//                 <Input
//                     placeholder="请输入"
//                 />
//                 </Form.Item>
//                 <Form.Item label="利润权重(%)" name='profitweight'>
//                 <Input
//                     placeholder="请输入"
//                 />
//                 </Form.Item>
//                 <Form.Item label="流量权重(%)" name='touristsweight'>
//                 <Input
//                     placeholder="请输入"
//                 />
//                 </Form.Item>
//                 <Form.Item label="管理层月提成比例(%)" name='managermouthratio'>
//                 <Input
//                     placeholder="请输入"
//                 />
//                 </Form.Item>
//                 <Form.Item label="管理层年提成比(%)" name='manageryearratio'>
//                 <Input
//                     placeholder="请输入"
//                 />
//                 </Form.Item>
//                 <Form.Item label="团队月提成比例(%)" name='teammouthratio'>
//                 <Input
//                     placeholder="请输入"
//                 />
//                 </Form.Item>
//                 <Form.Item label="团队年提成比(%)" name='teamyearratio'>
//                 <Input
//                     placeholder="请输入"
//                 />
//                 </Form.Item>
//             </Form>
//           ):(
//             <Space direction="vertical">
//                 <Row justify="end">
//                     <Col span={4}><Button type="ghost" onClick={this.handleEdit}>编辑</Button></Col>
//                 </Row>
//                 <Descriptions title="绩效权重" layout="vertical">
//                     <Descriptions.Item label="评分权重">{config.scoreweight}%</Descriptions.Item>
//                     <Descriptions.Item label="利润权重">{config.profitweight}%</Descriptions.Item>
//                     <Descriptions.Item label="流量权重">{config.touristsweight}%</Descriptions.Item>
//                 </Descriptions>
//                 <Descriptions title="管理层提成比例" layout="vertical">
//                     <Descriptions.Item label="月提成比例">{config.managermouthratio}%</Descriptions.Item>
//                     <Descriptions.Item label="年提成比例">{config.manageryearratio}%</Descriptions.Item>
//                 </Descriptions>
//                 <Descriptions title="团队提成比例" layout="vertical">
//                     <Descriptions.Item label="月提成比例">{config.teammouthratio}%</Descriptions.Item>
//                     <Descriptions.Item label="年提成比例">{config.teamyearratio}%</Descriptions.Item>
//                 </Descriptions>
//             </Space>
//           )}
//       </Page>
//     )
//   }
// }

// Config.PropTypes = {
//   config: PropTypes.object,
//   location: PropTypes.object,
//   dispatch: PropTypes.func,
//   loading: PropTypes.object,
// }

// export default Config
