import axios from 'axios';
import Rating from '../components/Rating';
import { getProducts } from '../ultils/api';
import { hideLoading, showLoading } from '../ultils/helper';
const HomeScreen = {
    render: async () => {
        showLoading();
        const products = await getProducts();
        hideLoading();
        return `<ul class="products">
        ${products
            .map((product) =>
                product.status
                    ? `
                        <li>
                            <div class="product">
                                <a href="/#/product/${product._id}">
                                    <div class="img-wrapper">
                                        <img
                                            src="${product.image}"
                                            alt="${product.name}"
                                        />
                                    </div>
                                </a>
                                <div class="product-name">
                                    <a href="/#/product/${product._id}">${
                          product.name
                      }</a>
                                </div>
                                <div class="product-brand">
                                    <a href="/#/category/${product.category}">${
                          product.category
                      }</a>
                                </div>
                                <div class="product-rating">
                                ${Rating.render({
                                    value: product.rating,
                                    text: `${product.numReviews} reviews`,
                                })}
                                </div>
                                <div class="product-price">$${
                                    product.price
                                }</div>
                            </div>
                        </li>
        `
                    : ''
            )
            .join(' ')}

        </ul>`;
    },
};

export default HomeScreen;
