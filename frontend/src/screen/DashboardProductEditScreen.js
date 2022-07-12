import DashboardMenu from '../components/DashboardMenu';
import { baseUrl } from '../ultils/config';
import axios from 'axios';
import { getProduct, updateProduct } from '../ultils/api';
import {
    hideLoading,
    parserRequestUrl,
    showLoading,
    showMessage,
} from '../ultils/helper';

const DashboardProductEditScreen = {
    after_render: () => {
        const input = document.getElementById('input');
        const image = document.getElementById('image');
        input.addEventListener('change', () => {
            image.src = URL.createObjectURL(input.files[0]);
        });
        const btnUpdateSubmit = document.getElementById('btn-update-submit');
        btnUpdateSubmit.addEventListener('click', async (e) => {
            e.preventDefault();
            const file = input.files[0];
            try {
                const data = new FormData();
                data.append('file', file);
                const request = parserRequestUrl();
                const id = request.id;
                const update = {
                    _id: id,
                    name: document.getElementById('name').value,
                    brand: document.getElementById('brand').value,
                    category: document.getElementById('category').value,
                    description: document.getElementById('description').value,
                    price: document.getElementById('price').value,
                    countInStock: document.getElementById('countInStock').value,
                };
                if (file) {
                    showLoading();
                    const response = await axios.post(
                        `${baseUrl}/api/upload`,
                        data
                    );
                    update.image = baseUrl + '/' + response.data.path;
                    const res = await updateProduct(update);
                    showMessage(res.message);
                    hideLoading();
                    document.location.hash = '/products';
                } else {
                    update.image = document
                        .getElementById('image')
                        .getAttribute('src');
                    const res = await updateProduct(update);
                    showMessage(res.message);
                    hideLoading();
                    document.location.hash = '/products';
                }
            } catch (error) {
                console.log(error);
            }
        });
    },
    render: async () => {
        const { id } = parserRequestUrl();
        const product = await getProduct(id);
        return `
        <div class="dashboard">
            ${DashboardMenu.render()}
            <div class="dashboard-content">
                <div class="form-container fw">
                    <form id="update-product-form">
                       <ul>
                            <li class="form-item"><h1>EDIT PRODUCT</h1></li>
                            <li>
                                <label for="input">
                                    <i class="fa-solid fa-plus"></i>
                                </label>
                                <input id="input" type="file"/>
                                <img src="${product.image}" id="image"/>
                            </li>
                            <li class="form-item">
                                <label for="name">Name :</label>
                                <input id="name"  type="text" class="name" value="${
                                    product.name
                                }"/>
                            </li>
                             <li class="form-item">
                                <label for="category">category :</label>
                                <input  id="category"  class="category" value="${
                                    product.category
                                }"/>
                            </li>
                            <li class="form-item">
                                <label for="brand">brand :</label>
                                <input id="brand"   class="brand" value="${
                                    product.brand
                                }"/>
                            </li>
                            <li class="form-item">
                                <label for="countInStock">countInStock :</label>
                                <input id="countInStock"   class="countInStock" value="${
                                    product.countInStock
                                }"/>
                            </li>
                            <li class="form-item">
                                <label for="price">price :</label>
                                <input id="price"   class="price" value="${
                                    product.price
                                }"/>
                            </li>
                            <li class="form-item">
                                <label for="description">description :</label>
                                <textarea id="description" type="text" >${
                                    product.description
                                }</textarea>
                            </li>
                            <li class="form-item">
                                <button id="btn-update-submit" class="btn fw" type="submit">Submit</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
        `;
    },
};

export default DashboardProductEditScreen;
