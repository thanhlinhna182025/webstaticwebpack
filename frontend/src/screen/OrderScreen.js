import { getOrder, getPaypalClientId, payOrder } from '../ultils/api';
import {
    hideLoading,
    parserRequestUrl,
    reRender,
    showLoading,
    showMessage,
} from '../ultils/helper';

const addPaypalSdk = async (totalPrice) => {
    const clientId = await getPaypalClientId();
    showLoading();
    if (!window.paypal) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypalobjects.com/api/checkout.js';
        script.async = true;
        script.onload = () => handlePayment(clientId, totalPrice);
        document.body.appendChild(script);
    } else {
        handlePayment(clientId, totalPrice);
    }
    hideLoading();
};
const handlePayment = (clientId, totalPrice) => {
    window.paypal.Button.render(
        {
            env: 'sandbox',
            client: {
                sandbox: clientId,
                production: '',
            },
            locale: 'en_US',
            style: {
                size: 'responsive',
                color: 'gold',
                shape: 'pill',
            },
            commit: true,
            payment(data, actions) {
                return actions.payment.create({
                    transactions: [
                        {
                            amount: {
                                total: totalPrice,
                                currency: 'USD',
                            },
                        },
                    ],
                });
            },
            onAuthorize(data, actions) {
                return actions.payment.execute().then(async () => {
                    // showLoading();
                    await payOrder(parserRequestUrl().id, {
                        orderID: data.orderID,
                        payerID: data.payerID,
                        paymentID: data.paymentID,
                    });
                    // hideLoading();
                    showMessage('Payment was successfull.', () => {
                        reRender(OrderScreen);
                    });
                });
            },
        },
        '#paypal-button'
    ).then(() => {
        hideLoading();
    });
};
const OrderScreen = {
    after_render: () => {},
    render: async () => {
        const request = parserRequestUrl();

        const {
            _id,
            shipping,
            payment,
            orderItems,
            itemsPrice,
            shippingPrice = 0,
            totalPrice,
            taxPrice,
            isDelivered,
            deliveredAt,
            isPaid,
            paidAt,
        } = await getOrder(request.id);
        if (!isPaid) {
            addPaypalSdk(totalPrice);
        }
        return `
        <div>
        <h2>Order ${_id}</h2>
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Shipping</h2>
                        <div>
                            ${shipping.address},
                            ${shipping.city},
                            ${shipping.postalCode},
                            ${shipping.country}
                        </div>
                        ${
                            isDelivered
                                ? `<div class="success">Delivered At ${deliveredAt}</div>`
                                : `<div class="error">Not delivered</div>`
                        }
                    </div>
                    <div>
                        <h2>Payment</h2>
                        <div>
                        Payment method : ${payment.paymentMethod}
                        </div>
                         ${
                             isPaid
                                 ? `<div class="success">Paid At ${paidAt}</div>`
                                 : `<div class="error">Not paid</div>`
                         }
                    </div>
                    <div>
                        <ul class="cart-list-container">
                            <li>
                                <h2>Shopping Cart</h2>
                            </li>
                            ${orderItems
                                .map(
                                    (item) => `
                            <li class="cart-wapper">
                                <div class="cart-image">
                                    <img src="${item.image}" alt="${item.name}"/>
                                </div>
                                <div class="cart-item">
                                    <div>
                                        <a href="/#/product/${item.product}">Name : ${item.name}</a>
                                    </div>
                                    <div>Quantity : ${item.quantity} </div>
                                </div>
                                <div class="cart-price">Price : ${item.price}</div>
                            </li>
                            `
                                )
                                .join('\n')}
                        </ul>
                    </div>
                </div>
                <div class="order-action">
                    <ul>
                        <li><h2>Order Summary</h2></li>
                        <li><div>Item</div><div>$${itemsPrice}</div></li>
                        <li><div>Shipping</div><div>$${shippingPrice}</div></li>
                        <li><div>Tax</div><div>$${taxPrice}</div></li>
                        <li><div>totalPrice</div><div>$${totalPrice}</div></li>
                        <li><div id="paypal-button"></div></li>
                    </ul>
                </div>
            </div>
        </div>`;
    },
};

export default OrderScreen;
