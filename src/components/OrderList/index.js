import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table } from 'antd';

import './OrderList.css';


class OrderList extends Component {
    render() {
        const { data, loading, columns, title } = this.props;
        return (
            <div className="order-list">
                <h3 className="order-list__title">{title}</h3>
                <Table
                    className="order-list__table"
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    loading={loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}



export default OrderList;
