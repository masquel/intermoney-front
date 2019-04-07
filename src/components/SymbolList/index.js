import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Icon, Button, Radio, Table } from "antd";

import roundTo from "../../utils/roundTo";

import { Row, Col } from '../../components/Grid';

import SymbolListFilter from "./SymbolListFilter";

import "./symbolList.css";

const RadioGroup = Radio.Group;


class SymbolListButtons extends Component {
    render() {
        const buttons = ["BTC", "ETH", "USDT"];
        const { active, onClick } = this.props;
        return (
            <div className="symbol-lists__buttons">
                <Row
                    gutter={0}
                    justify="start"
                >
                    <Col md={24} className="text-right">
                        {buttons.map(button => {
                            const disabled = active === button;
                            return (
                                <Button
                                    className="symbol-lists__button"
                                    key={button}
                                    value={button}
                                    disabled={disabled}
                                    onClick={onClick}
                                    size="small"
                                >
                                    {button}
                                </Button>
                            );
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}


const SymbolListItem = ({
    active,
    symbol,
    pairInfo,
    inFavorites,
    onFavoriteIconClick
}) => {
    if (active) {
        return (
            <span>
                {pairInfo.base_currency} / {pairInfo.quote_currency} (selected)
            </span>
        );
    } else {
        return (
            <span>
                {Icon}
                <Link to={`/dashboard/trade/${symbol}`}>
                    {pairInfo.base_currency} / {pairInfo.quote_currency}
                </Link>
            </span>
        );
    }
};

const symbolListFields = {
    "change": {
        //className: "text-right",
        title: "Change",
        sorter: (a, b) => a.change_percent - b.change_percent,
        render: (text, record) => {
            if(!record.change_percent){
                return "-";
            }
            return <div>{roundTo(record.change_percent, 2)+"%" || "-"}</div>
        }
    },
    "volume": {
        //className: "text-right",
        title: "Volume",
        sorter: (a, b) => a.volume - b.volume,
        render: (text, record) => {
            if(!record.volume){
                return "-";
            }
            return <div>{roundTo(record.volume, 5) || "-"}</div>
        }
    }
}

const SymbolListField = (props) => {
    return (
        <div className="symbol-lists__field">
            <RadioGroup {...props}>
                {Object.keys(symbolListFields).map((item) => {
                    const field = symbolListFields[item];
                    return (
                        <Radio key={item} value={item}>{field.title}</Radio>        
                    )
                })}
            </RadioGroup>
        </div>
    )
}

class SymbolList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeList: "BTC",
            favorites: [],
            filterValue: "",
            activeField: "change"
        };
    }
    onChangeFilterValue = event => {
        const { value } = event.target;
        this.setState({ filterValue: value });
    };
    onChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }
    onActiveListSelect = event => {
        const { value } = event.target;
        this.setState({ activeList: value });
    };
    renderSymbolList = () => {
        const { activeList, filterValue, activeField } = this.state;
        const {
            defaultSymbol,
            symbolList,
            instrumentObject,
            tickers,
        } = this.props;
        if (!symbolList) {
            return null;
        }
        let activeSymbolList = [];
        activeSymbolList = symbolList.filter(item => {
            const pairInfo = instrumentObject[item];
            return activeList === pairInfo.quote_currency;
        });
        const filteredSymbolList = activeSymbolList.filter(item => {
            const pairInfo = instrumentObject[item];
            if(pairInfo){
                return (
                    pairInfo.quote_currency
                        .toLowerCase()
                        .indexOf(filterValue.toLowerCase()) > -1
                );
            }
            return false
        }).map(item => ({
            ...instrumentObject[item],
            ...tickers[item]
        }));
        const columns = [{
            width: 90,
            title: "Pair",
            sorter: (a, b) => a.quote_currency - b.quote_currency,
            render: (text, record) => {
                const item = record.symbol;
                const active = item === defaultSymbol;
                
                return active ? (
                    <div>
                        <span>{record.base_currency} / {record.quote_currency}</span>
                    </div>
                ) : (
                    <div>
                        <Link to={`/?pair=${item}`}>
                            {record.base_currency} / {record.quote_currency}
                        </Link>
                    </div>
                )
            }
        },{
            width: 90,
            title: "Price",
            render: (text, record) => {
                return <div>{record.last_price || "-"}</div>
            },
            sorter: (a, b) => a.last_price - b.last_price,
        }, symbolListFields[activeField]];
        return (
            <div className="symbol-list">
                <Table
                    columns={columns}
                    dataSource={filteredSymbolList}
                    pagination={false}
                    size="small"
                    bordered={false}
                    scroll={{y: 340}}
                />
            </div>
        );
    };
    render() {
        return (
            <div className="symbol-lists">
                <SymbolListButtons
                    active={this.state.activeList}
                    onClick={this.onActiveListSelect}
                />
                <Row
                    gutter={0}
                    justify="start"
                >
                    <Col md={8} >
                        <SymbolListFilter
                            value={this.state.filterValue}
                            onChange={this.onChangeFilterValue}
                        />
                    </Col>
                    <Col md={16}>
                        <SymbolListField
                            name="activeField"
                            onChange={this.onChange}
                            value={this.state.activeField}
                        />
                    </Col>
                </Row>
                {this.renderSymbolList()}
            </div>
        );
    }
}

SymbolList.defaultProps = {
    defaultSymbol: '',
    symbolList: [],
    instrumentObject: {},
    tickers: {}
}

export default SymbolList;
