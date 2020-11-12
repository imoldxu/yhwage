import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'
import { regFenToYuan } from '../../../utils/money'

@withI18n()
class List extends PureComponent {

    handleMenuClick = (record, e) => {
        const { onDeleteItem, onEditItem, onAssign, i18n } = this.props

        if (e.key === '1') {
            onEditItem(record)
        } else if (e.key === '2') {
            confirm({
                title: i18n.t`Are you sure delete this record?`,
                onOk() {
                console.log("delete")
                onDeleteItem(record)
                },
            })
        } else if (e.key === '3'){
            onAssign(record)
        }
    }

    render() {

        const { onDeleteItem, onEditItem, onShowItem, i18n, ...tableProps } = this.props
        
        const columns = [
            {
                title: '公司',
                dataIndex: 'companyName',
                key: 'companyName',
                width: '10%',
            },
            {
                title: '月份',
                dataIndex: 'month',
                key: 'month',
                width: '10%',
            },
            {
                title: '利润考核',
                dataIndex: 'profit',
                key: 'profit',
                width: '10%',
                render: (text, record) =>{
                    return (<span>{regFenToYuan(record.profit)}</span>)
                }
            },
            {
                title: '流量考核',
                dataIndex: 'tourists',
                key: 'tourists',
                width: '10%',
            },
            {
                title: '操作',
                key: 'op',
                width: '10%',
                fixed: 'right',
                render: (text, record) => {
                    return record.id?
                        (
                        <DropOption
                            onMenuClick={e => this.handleMenuClick(record, e)}
                            menuOptions={[
                                { key: '1', name: i18n.t`Update` },
                                { key: '3', name: "分解绩效" },
                            ]}
                        />
                        ):('')
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
                rowKey={record=> record.id}
            ></Table>
        )
    }

}

export default List 