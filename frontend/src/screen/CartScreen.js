import { getProduct } from '../ultils/api';
import { getCartItems, setCartItems } from '../ultils/localStorage';
import { parserRequestUrl, reRender } from '../ultils/helper';
const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        }
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
        reRender(CartScreen);
    }
};
const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if (id === parserRequestUrl().id) {
        document.location.hash = '/cart';
    } else {
        reRender(CartScreen);
    }
};
const CartScreen = {
    after_render: () => {
        const quantitySelects =
            document.getElementsByClassName('quantity-select');
        Array.from(quantitySelects).forEach((quantitySelect) =>
            quantitySelect.addEventListener('change', (e) => {
                const item = getCartItems().find(
                    (x) => x.product === quantitySelect.id
                );
                addToCart({ ...item, quantity: Number(e.target.value) }, true);
            })
        );
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', () => {
                removeFromCart(deleteButton.id);
            });
        });
        const checkoutButton = document.getElementById('checkout-button');
        checkoutButton.addEventListener('click', () => {
            document.location.hash = '/login';
        });
        let amount = 1;
        document.getElementById('descrease').addEventListener('click', () => {
            if (amount > 0) {
                amount--;
                document.getElementById('amount').innerHTML = amount;
            }
        });
        document.getElementById('increase').addEventListener('click', () => {
            if (amount < 5) {
                amount++;
                document.getElementById('amount').innerHTML = amount;
            }
        });
    },
    render: async () => {
        const request = parserRequestUrl();
        if (request.id) {
            const product = await getProduct(request.id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                quantity: 1,
            });
        }
        const cartItems = getCartItems();

        return `
        <div class="cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h3>Shopping cart</h3>
                        <div>Price</div>
                    </li>
                    ${
                        cartItems.length === 0
                            ? '<div>Cart is empty. <a href="/#/">Go Shopping</a></div>'
                            : `${cartItems
                                  .map(
                                      (item) => `
                                  <li>
                                        <div class="cart-image">
                                            <img src="${item.image}"/>
                                        </div>
                                        <div class="cart-info">
                                            <div>
                                                <a href="/#/product/${
                                                    item.product
                                                }">${item.name}</a>
                                            </div>
                                            <div>
                                                <button id="descrease">Giam</button>
                                                <span id="amount">0</span>
                                                <button id="increase">Tang</button>
                                            </div>
                                            <div>
                                                Quantity: 
                                                    <select class="quantity-select" id="${
                                                        item.product
                                                    }">
                                                        ${[
                                                            ...Array(
                                                                item.countInStock
                                                            ).keys(),
                                                        ].map((x) =>
                                                            item.quantity ===
                                                            x + 1
                                                                ? `<option selected value="${
                                                                      x + 1
                                                                  }">${
                                                                      x + 1
                                                                  }</option>`
                                                                : `<option value="${
                                                                      x + 1
                                                                  }">${
                                                                      x + 1
                                                                  }</option>`
                                                        )}
                                                    </select>
                                                <div>
                                                    $ ${item.price}
                                                </div>
                                                <button type="button" id="${
                                                    item.product
                                                }" class="btn delete-button">Delete</button>
                                            </div>
                                        </div>
                                  </li>`
                                  )
                                  .join('\n')}`
                    }
                </ul>
            </div>
            <div class="cart-action">
                <h3>Subtotal(${cartItems.reduce(
                    (a, c) => a + c.quantity,
                    0
                )} item) : ${cartItems.reduce(
            (a, c) => a + c.quantity * c.price,
            0
        )}$
                </h3>
                <button class="btn" id="checkout-button">Process to checkout</button>
            </div>
        </div>
        `;
    },
};

export default CartScreen;
