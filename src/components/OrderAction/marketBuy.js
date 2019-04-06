import React from 'react';

import OrderForm from './orderForm';

const LimitBuy = (props) => {
    return (
        <OrderForm
            type="MARKET"
            side="buy"
            {...props}
        />
    )
}

export default LimitBuy;
