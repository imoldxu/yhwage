import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'
import { regFenToYuan } from '../../../utils/money'

@withI18n()
class List extends PureComponent {

    // handleMenuClick = (record, e) => {
    //     const { onDeleteItem, onEditItem, i18n } = this.props

    //     if (e.key === '1') {
    //         onEditItem(record)
    //     } else if (e.key === '2') {
    //         confirm({
    //             title: i18n.t`Are you sure delete this record?`,
    //             onOk() {
    //             console.log("delete")
    //             onDeleteItem(record.id)
    //             },
    //         })
    //     }
    // }

    render() {

        const { onDeleteItem, onEditItem, onShowItem, i18n, ...tableProps } = this.props
        
        const columns = [
            {
                title: '姓名',
                dataIndex: 'staffName',
                key: 'staffName',
                width: '10%',
            },
            {
                title: '公司名称',
                dataIndex: 'companyName',
                key: 'companyName',
                width: '10%',
            },
            {
                title: '职级',
                dataIndex: 'copName',
                key: 'copName',
                width: '10%',
            },
            {
                title: '团队名称',
                dataIndex: 'teamName',
                key: 'teamName',
                width: '10%',
            },
            {
                title: '基本工资',
                dataIndex: 'basicwage',
                key: 'basicwage',
                width: '10%',
                render: (text, record) => {
                    return (<span>{regFenToYuan(record.basicwage)}</span>)
                },
            },
            {
                title: '浮动工资',
                dataIndex: 'floatwage',
                key: 'floatwage',
                width: '10%',
                render: (text, record) => {
                    return (<span>{regFenToYuan(record.floatwage)}</span>)
                },
            },
            {
                title: '提成',
                dataIndex: 'award',
                key: 'award',
                width: '10%',
                render: (text, record) => {
                    return (<span>{regFenToYuan(record.award)}</span>)
                },
            },
            {
                title: '总计',
                dataIndex: '',
                key: '',
                width: '10%',
                render: (text, record) => {
                    const wage = record.basicwage+record.floatwage+record.award;
                    return (<span>{regFenToYuan(wage)}</span>)
                },
            },
        ];

        return (
            <Table
                {...tableProps}
                className={styles.table}
                //bordered
                //scroll={{ x: 1200 }}
                columns={columns}
                //simple
                //rowKey={record=> record.id}
            ></Table>
        )
    }

}

export default List 