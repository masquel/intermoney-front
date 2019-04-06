import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table } from 'antd';

import './OrderList.css';


class OrderList extends Component {
    state = {
        pagination: {}
    };
    fetch = (params = {}) => {
        const {auth, limit, pagination} = this.props;
        const fetchLimit = params.limit || limit || pagination.size || 10;
        this.props.fetch(fetchLimit, fetchLimit * (params.page - 1) || 0);
    }
    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
        const { data, loading, pagination, auth, limit, columns, title } = this.props;
        const tablePagination = {
            pageSize: limit || pagination.size || 10,
            page: pagination.page,
            total: pagination.total
        }
        return (
            <div className="order-list">
                <h3 className="order-list__title">{title}</h3>
                <Table
                    className="order-list__table"
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={tablePagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}



export default OrderList;
