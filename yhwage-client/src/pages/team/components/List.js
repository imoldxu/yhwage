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
                title: '团队编号',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
            },
            {
                title: '团队名称',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
            },
            {
                title: '公司',
                dataIndex: 'companyName',
                key: 'companyName',
                width: '20%',
            },
            {
                title: '部门',
                dataIndex: 'departmentName',
                key: 'departmentName',
                width: '20%',
            },
            {
                title: '操作',
                key: 'op',
                width: '20%',
                fixed: 'right',
                render: (text, record) => {
                    return (
                        <DropOption
                            onMenuClick={e => this.handleMenuClick(record, e)}
                            menuOptions={[
                                { key: '1', name: i18n.t`Update` },
                                // { key: '2', name: i18n.t`Delete` },
                                //{ key: '3', name: '上传价格文件' },
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