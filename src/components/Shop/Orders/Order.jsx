import React from 'react'
import { Table } from 'antd';

const columns = [
    { title: 'Date Ordered', dataIndex: 'name', key: 'name' },
    Table.EXPAND_COLUMN,
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
];

const data = [
    {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Not Expandable',
        age: 29,
        address: 'Jiangsu No. 1 Lake Park',
        description: 'This not expandable',
    },
    {
        key: 4,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
];




function OrdersTable({ orders }) {
    console.log(orders, 'order')

    // const sortedOrders = sortOrders(orders);

    return (
        <Table
            columns={columns}
            rowSelection={{}}
            expandable={{
                expandedRowRender: record => <p>{record.description}</p>,
            }}
            dataSource={data}
        />
    )
}

export default OrdersTable