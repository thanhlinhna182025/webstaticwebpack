import '../scss/style.scss';
import HomeScreen from '../screen/HomeScreen';
import ProductScreen from '../screen/ProductScreen';
import { hideLoading, parserRequestUrl, showLoading } from '../ultils/helper';
import Error404Screen from '../screen/ErrorScreen';
import CartScreen from '../screen/CartScreen';
import LoginScreen from '../screen/LoginScreen';
import Header from '../components/Header';
import RegisterScreen from '../screen/RegisterScreen';
import ProfileScreen from '../screen/ProfileScreen';
import ShippingScreen from '../screen/ShippingScreen';
import PaymentScreen from '../screen/PaymentScreen';
import PlaceOrderScreen from '../screen/PlaceOrderScreen';
import OrderScreen from '../screen/OrderScreen';
import DashboardScreen from '../screen/DashboardScreen';
import DashboardProductScreen from '../screen/DashboardProductScreen';
import DashboardUserScreen from '../screen/DashboardUserScreen';
import EditFormUserScreen from '../screen/EditFormUserScreen';
import DashboardProductCreateScreen from '../screen/DashboardProductCreateScreen';
import DashboardProductEditScreen from '../screen/DashboardProductEditScreen';

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/login': LoginScreen,
    '/register': RegisterScreen,
    '/profile/:id': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
    '/orders/:id': OrderScreen,
    '/orders': PlaceOrderScreen,
    '/dashboard': DashboardScreen,
    '/products': DashboardProductScreen,
    '/products/:id/edit': DashboardProductEditScreen,
    '/createproduct': DashboardProductCreateScreen,
    '/users': DashboardUserScreen,
    '/users/:id/edit': EditFormUserScreen,
};
const router = async () => {
    showLoading();
    const request = parserRequestUrl();
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.action ? `/${request.action}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const main = document.getElementById('main');
    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();
    main.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();
    hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
