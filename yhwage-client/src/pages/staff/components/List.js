import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

@withI18n()
class List extends PureComponent {

    handleMenuClick = (record, e) => {
        const { onDeleteItem, onEditItem, i18n } = this.props

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
        } 
    }

    render() {

        const { onDeleteItem, onEditItem, onShowItem, i18n, ...tableProps } = this.props
        
        const columns = [
            {
                title: '员工编号',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
            },
            {
                title: '员工名称',
                dataIndex: 'name',
                key: 'name',
                width: '15%',
            },
            {
                title: '职级',
                dataIndex: 'copName',
                key: 'copName',
                width: '10%',
                render: (text, record) =>{
                    return (<span>{record.cop.name}</span>)
                }
            },
            {
                title: '公司',
                dataIndex: 'companyName',
                key: 'companyName',
                width: '15%',
            },
            {
                title: '部门',
                dataIndex: 'departmentName',
                key: 'departmentName',
                width: '15%',
            },
            {
                title: '团队',
                dataIndex: 'teamName',
                key: 'teamName',
                width: '15%',
            },
            {
                title: '操作',
                key: 'op',
                width: '15%',
                fixed: 'right',
                render: (text, record) => {
                    return (
                        <DropOption
                            onMenuClick={e => this.handleMenuClick(record, e)}
                            menuOptions={[
                                { key: '1', name: i18n.t`Update` },
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