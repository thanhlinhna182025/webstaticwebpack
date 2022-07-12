import { baseUrl } from './config';
import axios from 'axios';
import { getUserInfo } from './localStorage';
import { parserRequestUrl } from './helper';

// Auth
// export const login = () => {
//     const form = {
//         email: document.getElementById('email'),
//         password: document.getElementById('password'),
//         btnLoginSubmit: document.getElementById('btn-login-submit'),
//     };
//     form.btnLoginSubmit.addEventListener('click', (e) => {
//         e.preventDefault();
//         fetch('http://localhost:4000/api/users/login', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: form.email.value,
//                 password: form.password.value,
//             }),
//         })
//             .then((response) => response.json())
//             .then((data) => localStorage.setItem('user', JSON.stringify(data)))
//             .catch((error) => {
//                 console.log(error.response);
//             });
//     });
// };
export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(`${baseUrl}/api/users/login`, {
            email,
            password,
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const register = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${baseUrl}/api/users/register`, {
            name,
            email,
            password,
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
//User
export const update = async ({ name, email, password }) => {
    try {
        const { _id, token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: { name, email, password },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const updateUserbyAdmin = async ({ name, email }) => {
    try {
        const { id } = parserRequestUrl();
        const { token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/users/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: { name, email },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const deleteUserbyAdmin = async () => {
    try {
        const { token } = getUserInfo();
        const { id } = parserRequestUrl();
        const response = await axios({
            url: `${baseUrl}/api/users/${id}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const getAllUsers = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/users`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const getUser = async (id) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/users/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};

//Product

export const getProduct = async (id) => {
    try {
        const response = await axios({
            url: `${baseUrl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const getProducts = async () => {
    try {
        const response = await axios({
            url: `${baseUrl}/api/products`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error('Error getting data');
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const createProduct = async (newproduct) => {
    const { token } = getUserInfo();
    try {
        const response = await axios({
            url: `${baseUrl}/api/products`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: newproduct,
        });
        if (response.statusText !== 'Created') {
            throw new Error('Error creating product');
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const deleteProduct = async (id) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/products/${id}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const updateProduct = async (product) => {
    try {
        const { token } = getUserInfo();

        const response = await axios({
            url: `${baseUrl}/api/products/${product._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: product,
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};

export const updateStatus = async (id) => {
    try {
        const { token } = getUserInfo();

        const response = await axios({
            url: `${baseUrl}/api/products/${id}/status`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
// Review
export const createReview = async (productId, review) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/products/${productId}/reviews`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: review,
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
//Order
export const createOrder = async (order) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/orders`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: order,
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};

export const getOrder = async (id) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/orders/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const getMyOrder = async () => {
    const { token } = getUserInfo();
    try {
        const response = await axios({
            url: `${baseUrl}/api/orders/mine`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
export const getPaypalClientId = async () => {
    try {
        const response = await axios({
            url: `${baseUrl}/api/paypal/clientId`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data.clientId;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};

export const payOrder = async (orderId, paymentResult) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/orders/${orderId}/pay`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: paymentResult,
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};

//Statiscal
export const getStatiscal = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${baseUrl}/api/statistical`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            error: error.response ? error.response.data.message : error.message,
        };
    }
};
