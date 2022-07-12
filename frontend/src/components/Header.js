import { getUserInfo } from '../ultils/localStorage';

const Header = {
    render: () => {
        const { name, _id, isAdmin } = getUserInfo();
        return `<div class="brand">
                    <a href="/#/">LiNaTa</a>
                </div>
                <div class="nav">
                ${
                    name
                        ? `<a href="/#/profile/${_id}">${name}</a>`
                        : `<a href="/#/login">Log In</a>`
                }
                    
                    <a href ="/#/cart">Cart</a>
                    ${isAdmin ? `<a href="/#/dashboard" >Dashboard</a>` : ''}
                </div>`;
    },
    after_render: () => {},
};
export default Header;
