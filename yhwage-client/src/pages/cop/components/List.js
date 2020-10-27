import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Card } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'
import { regFenToYuan } from '../../../utils/money'

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
                onDeleteItem(record.id)
                },
            })
        } 
    }

    render() {

        const { i18n, dataSource } = this.props
        
        const colume = [
            {
                title: '职级',
                dataIndex: 'name',
                width: '10%',
            },
            {
                title: '管理层',
                dataIndex: 'ismanager',
                width: '10%',
                render: (text, record) =>{
                    return record.ismanager===1 ? (<span>是</span>):(<span>否</span>)
                }
            },
            {
                title: '基本工资',
                dataIndex: 'basicwage',
                width: '15%',
                render: (text, record) =>{
                    return (<span>{regFenToYuan(record.basicwage)}</span>)
                }
            },
            {
                title: '浮动工资',
                dataIndex: 'floatwage',
                width: '15%',
                render: (text, record) =>{
                    return (<span>{regFenToYuan(record.floatwage)}</span>)
                }
            },
            {
                title: '月提成比例',
                dataIndex: 'monthratio',
                width: '15%',
                render: (text, record) => {
                    return (<span>{record.monthratio}%</span>)
                }
            },
            {
                title: '年终提成比例',
                dataIndex: 'yearratio',
                width: '15%',
                render: (text, record) => {
                    return (<span>{record.yearratio}%</span>)
                }
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
        ]

        return (
            <Table
                dataSource={dataSource}
                columns={colume}
                className={styles.table}
                pagination={false}
            ></Table>
        )
    }

}

List.PropTypes = {
    dataSource: PropTypes.array,
}

export default List 