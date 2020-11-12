import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'
import { regFenToYuan } from '../../../utils/money'

@withI18n()
class List extends PureComponent {

    render() {

        const { onDeleteItem, onEditItem, onShowItem, i18n, ...tableProps } = this.props
        
        const columns = [
            {
                title: '员工编号',
                dataIndex: 'staffid',
                width: '10%',
            },
            {
                title: '姓名',
                dataIndex: 'staffName',
                width: '10%',
            },
            {
                title: '年份',
                dataIndex: 'year',
                width: '10%',
            },
            {
                title: '总支出',
                dataIndex: 'totalCost',
                width: '10%',
                render: (text, record) => {
                    return (<span>{regFenToYuan(record.totalCost)}</span>)
                },
            },
            {
                title: '总收入',
                dataIndex: 'totalProfit',
                width: '10%',
                render: (text, record) => {
                    return (<span>{regFenToYuan(record.totalProfit)}</span>)
                },
            },
            {
                title: '成本占比',
                key: 'costRatio',
                width: '10%',
                render: (text, record) => {
                    return (<span>{Math.round(record.totalCost/record.totalProfit*100)}%</span>)
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