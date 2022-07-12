import DashboardMenu from '../components/DashboardMenu';
import { baseUrl } from '../ultils/config';
import axios from 'axios';
import { getUserInfo } from '../ultils/localStorage';
import { createProduct } from '../ultils/api';
import { hideLoading, showLoading, showMessage } from '../ultils/helper';

const DashboardProductCreateScreen = {
    after_render: () => {
        const input = document.getElementById('input');
        const preview = document.getElementById('preview');
        input.style.opacity = 0;
        input.addEventListener('change', updateImageDisplay);
        function updateImageDisplay() {
            while (preview.firstChild) {
                preview.removeChild(preview.firstChild);
            }

            const curFiles = input.files;
            if (curFiles.length === 0) {
                const para = document.createElement('p');
                para.textContent = 'No files currently selected for upload';
                preview.appendChild(para);
            } else {
                const list = document.createElement('ol');
                preview.appendChild(list);

                for (const file of curFiles) {
                    const listItem = document.createElement('li');
                    const para = document.createElement('p');
                    if (validFileType(file)) {
                        para.textContent = `File name ${
                            file.name
                        }, file size ${returnFileSize(file.size)}.`;
                        const image = document.createElement('img');
                        image.src = URL.createObjectURL(file);

                        listItem.appendChild(image);
                        listItem.appendChild(para);
                    } else {
                        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
                        listItem.appendChild(para);
                    }

                    list.appendChild(listItem);
                }
            }
        }
        const fileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        function validFileType(file) {
            return fileTypes.includes(file.type);
        }
        function returnFileSize(number) {
            if (number < 1024) {
                return number + 'bytes';
            } else if (number >= 1024 && number < 1048576) {
                return (number / 1024).toFixed(1) + 'KB';
            } else if (number >= 1048576) {
                return (number / 1048576).toFixed(1) + 'MB';
            }
        }

        const btnSubmit = document.getElementById('btn-create-submit');
        btnSubmit.addEventListener('click', async (e) => {
            e.preventDefault();
            const file = input.files[0];

            if (file) {
                const data = new FormData();
                data.append('file', file);
                try {
                    const response = await axios.post(
                        `${baseUrl}/api/upload`,
                        data
                    );
                    const name = document.getElementById('name').value;
                    const category = document.getElementById('category').value;
                    const brand = document.getElementById('brand').value;
                    const description =
                        document.getElementById('description').value;
                    const newProduct = { name, brand, category, description };

                    if (response.statusText === 'OK') {
                        newProduct.image = baseUrl + '/' + response.data.path;
                        showLoading();
                        const data = await createProduct(newProduct);
                        showMessage(data.message);
                        hideLoading();
                        document.location.hash = '/products';
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    },
    render: async () => {
        return `
        <div class="dashboard">
            ${DashboardMenu.render()}
            <div class="dashboard-content">
                <div class="form-container fw">
                    <form >
                       <ul>
                            <li class="form-item"><h1>CREATE PRODUCT</h1></li>
                            <li>
                                <label for="input">
                                    <i class="fa-solid fa-plus"></i>
                                </label>
                                <input id="input" type="file"/>
                            </li>
                            <li id="preview">
                                <p>No files currently selected for upload</p>
                            </li>
                            <li class="form-item">
                                <label for="name">Name :</label>
                                <input id="name"  type="text" class="name"/>
                            </li>
                             <li class="form-item">
                                <label for="category">category :</label>
                                <input  id="category"  class="category"/>
                            </li>
                            <li class="form-item">
                                <label for="brand">brand :</label>
                                <input id="brand"   class="brand"/>
                            </li>
                           
                            <li class="form-item">
                                <label for="description">description :</label>
                                <textarea id="description" ></textarea>
                            </li>
                            <li class="form-item">
                                <button id="btn-create-submit" class="btn fw">CREATE</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
        `;
    },
};

export default DashboardProductCreateScreen;
