import { getCartItems } from './localStorage';

export const parserRequestUrl = () => {
    const Url = document.location.hash.toLocaleLowerCase();
    const request = Url.split('/');
    return {
        resource: request[1],
        id: request[2],
        action: request[3],
    };
};

export const reRender = async (component) => {
    document.getElementById('main').innerHTML = await component.render();
    await component.after_render();
};
export const showLoading = () => {
    document
        .getElementById('loading-overlay-container')
        .classList.add('active');
};
export const hideLoading = () => {
    document
        .getElementById('loading-overlay-container')
        .classList.remove('active');
};

export const showMessage = (message, callback) => {
    document.getElementById('message-overlay-container').innerHTML = `
    <div class="message-overlay-wrapper">
        <div id="message-overlay-content" class="message-overlay-content">${message}</div>
        <button id="message-overlay-close-button" class="btn">OK</button>
    </div>
    `;
    document
        .getElementById('message-overlay-container')
        .classList.add('active');
    document
        .getElementById('message-overlay-close-button')
        .addEventListener('click', () => {
            document
                .getElementById('message-overlay-container')
                .classList.remove('active');
        });

    if (callback) {
        callback();
    }
};

export const redirectUser = () => {
    if (getCartItems().length !== 0) {
        document.location.hash = '/shipping';
    } else {
        document.location.hash = '/';
    }
};
