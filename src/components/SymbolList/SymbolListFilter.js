import React from "react";
import { Input, Icon } from "antd";

class SymbolListFilter extends React.Component {
    onClear = () => {
        this.props.onChange({target: {value: ""}});
    };
    render() {
        const { value, onChange } = this.props;
        const suffix = value ? (
            <Icon type="close-circle" onClick={this.onClear} />
        ) : null;
        return (
            <div className="symbol-lists__filter">
                <Input
                    size="small"
                    placeholder="Search"
                    prefix={<Icon type="search" />}
                    suffix={suffix}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default SymbolListFilter;