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
        const { onDeleteItem, onEditItem, onSetDepartmentRatio, i18n } = this.props

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
        } else if (e.key === '3') {
            onSetDepartmentRatio(record)
        }
    }

    render() {

        const { onDeleteItem, onEditItem, onShowItem, i18n, ...tableProps } = this.props
        
        const columns = [
            {
                title: '公司编号',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
            },
            {
                title: '公司名称',
                dataIndex: 'name',
                key: 'name',
                width: '10%',
            },
            {
                title: '利润权重',
                dataIndex: 'profitweight',
                key: 'profitweight',
                width: '10%',
                render: (text, record) => {
                    return (
                        <span>{record.profitweight}%</span>
                    )
                }
            },
            {
                title: '流量权重',
                dataIndex: 'touristsweight',
                key: 'touristsweight',
                width: '10%',
                render: (text, record) => {
                    return (
                        <span>{record.touristsweight}%</span>
                    )
                }
            },
            {
                title: '好评权重',
                dataIndex: 'scoreweight',
                key: 'scoreweight',
                width: '10%',
                render: (text, record) => {
                    return (
                        <span>{record.scoreweight}%</span>
                    )
                }
            },
            {
                title: '月毛利提成',
                dataIndex: 'monthratio',
                key: 'monthratio',
                width: '10%',
                render: (text, record) => {
                    return (
                        <span>{record.monthratio}%</span>
                    )
                }
            },
            {
                title: '年纯利提成',
                dataIndex: 'yearratio',
                key: 'yearratio',
                width: '10%',
                render: (text, record) => {
                    return (
                        <span>{record.yearratio}%</span>
                    )
                }
            },
            {
                title: '人头提成',
                dataIndex: 'headerfee',
                key: 'headerfee',
                width: '10%',
                render: (text, record) => {
                    return (
                        <span>{regFenToYuan(record.headerfee)}</span>
                    )
                }
            },
            {
                title: '操作',
                key: 'op',
                width: '10%',
                fixed: 'right',
                render: (text, record) => {
                    return (
                        <DropOption
                            onMenuClick={e => this.handleMenuClick(record, e)}
                            menuOptions={[
                                { key: '1', name: i18n.t`Update` },
                                // { key: '2', name: i18n.t`Delete` },
                                { key: '3', name: '设置部门提成' },
                            ]}
                        />
                    )
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