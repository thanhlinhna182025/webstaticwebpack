import CheckOutStep from '../components/CheckOutStep';
import { createOrder } from '../ultils/api';
import {
    cleanCart,
    getCartItems,
    getPayment,
    getShipping,
} from '../ultils/localStorage';
import { hideLoading, showLoading, showMessage } from '../ultils/helper';

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if (!shipping.address) {
        document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if (!payment.paymentMethod) {
        document.location.hash = '/payment';
    }
    const itemsPrice = orderItems.reduce((a, c) => a + c.quantity * c.price, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    };
};

const PlaceOrderScreen = {
    after_render: () => {
        $('#place-order-button').click(async () => {
            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
                cleanCart();
                document.location.hash = '/orders/' + data.order._id;
            }
        });
    },
    render: () => {
        const {
            orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = convertCartToOrder();

        return `
        <div>
            ${CheckOutStep.render({
                step1: true,
                step2: true,
                step3: true,
                step4: true,
            })}
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
                    </div>
                    <div>
                        <h2>Payment</h2>
                        <div>
                        Payment method : ${payment.paymentMethod},
                        </div>
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
                                    <div class="cart-price">Price : ${item.price}</div>
                                </div>
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
                        <li><div>Shipping price</div><div>$${shippingPrice}</div></li>
                        <li><div>Tax</div><div>$${taxPrice}</div></li>
                        <li><div>total price</div><div>$${totalPrice}</div></li>
                        <li><button class="btn" id="place-order-button">Place Order</button></li>
                    </ul>
                </div>
            </div>
        </div>`;
    },
};

export default PlaceOrderScreen;
