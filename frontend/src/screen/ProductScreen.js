import {
    hideLoading,
    parserRequestUrl,
    reRender,
    showLoading,
    showMessage,
} from '../ultils/helper';
import { createReview, getProduct } from '../ultils/api';
import Rating from '../components/Rating';

const ProductScreen = {
    after_render: async () => {
        tinyMCE.init({
            selector: '#comment',
            plugins: 'emoticons',
            toolbar: 'emoticons',
            heiht: 200,
            width: '100%',
        });
        const ratingStars = [
            ...document.getElementsByClassName('rating__star'),
        ];

        function executeRating(stars) {
            const starClassActive = 'rating__star fas fa-star';
            const starClassInactive = 'rating__star far fa-star';
            const starsLength = stars.length;
            let i;
            stars.map((star) => {
                star.onclick = () => {
                    i = stars.indexOf(star);
                    if (star.className === starClassInactive) {
                        for (i; i >= 0; --i) {
                            stars[i].className = starClassActive;
                        }
                    } else {
                        for (i; i < starsLength; ++i)
                            stars[i].className = starClassInactive;
                    }
                };
            });
        }

        executeRating(ratingStars);

        document.getElementById('add-button').addEventListener('click', () => {
            const request = parserRequestUrl();
            document.location.hash = `/cart/${request.id}`;
        });

        document
            .getElementById('preview-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                const comment = tinymce
                    .get('comment')
                    .getContent({ format: 'text' });
                const rating = document.getElementsByClassName(
                    'rating__star fas fa-star'
                ).length;
                const request = parserRequestUrl();
                const review = { rating, comment };
                const data = await createReview(request.id, review);
                if (data.error) {
                    showMessage(data.error);
                } else {
                    showMessage('Previews submit success', () => {
                        reRender(ProductScreen);
                        document.location.hash = '/';
                    });
                }
            });
    },
    render: async () => {
        const request = parserRequestUrl();
        showLoading();
        const product = await getProduct(request.id);
        hideLoading();
        if (product.error) {
            showMessage(product.error);
            document.location.hash = '/';
        }

        return `
        <div > 
            <div><a href="/#/">Go Home</a></div>
                <div class="product-wrapper">
                    <div class="product">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}"/>
                        </div>
                    <div class="product-info">
                        <div class="product-info__detail">
                            <h1>${product.name}</h1>
                            ${Rating.render({
                                value: product.rating,
                                text: `${product.numReviews} reviews`,
                            })}
                            <p>$ ${product.price}</p>
                        </div>
                        <div class="product-cart__action">
                            <p>$ ${product.price}</p>
                            <p>Status: In stock</p>
                            <button class="btn btn--radius" id="add-button">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div class="evaluation">
                    <div class="comment">
                         ${
                             product.length === 0
                                 ? `<div>No comment</div>`
                                 : `<ul>${product.reviews
                                       .map(
                                           (review) =>
                                               `<li>${review.comment}</li>`
                                       )
                                       .join('\n')}</ul>`
                         }
                    </div>
                    <div class="form-container">
                        <form id="preview-form">
                            <h6>Please review of the product </h6>
                            <div class="rating">
                                <i class="rating__star far fa-star"></i>
                                <i class="rating__star far fa-star"></i>
                                <i class="rating__star far fa-star"></i>
                                <i class="rating__star far fa-star"></i>
                                <i class="rating__star far fa-star"></i>
                            </div>
                            <textarea class= "form-item fw" id="comment" ></textarea>
                            <button class="btn fw" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
    },
};

export default ProductScreen;
