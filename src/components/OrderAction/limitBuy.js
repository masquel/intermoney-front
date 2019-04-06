import React from 'react';

import OrderForm from './orderForm';

const LimitBuy = (props) => {
    return (
        <OrderForm
            type="LIMIT"
            side="buy"
            {...props}
        />
    )
}

export default LimitBuy;
