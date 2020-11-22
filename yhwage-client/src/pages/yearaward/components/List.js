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
                key: 'staffid',
                width: '10%',
            },
            {
                title: '姓名',
                dataIndex: 'staffname',
                key: 'staffname',
                width: '10%',
            },
            {
                title: '年提成',
                dataIndex: 'yearaward',
                key: 'yearaward',
                width: '10%',
                render: (text, record) => {
                    return (<span>{regFenToYuan(record.yearaward)}</span>)
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