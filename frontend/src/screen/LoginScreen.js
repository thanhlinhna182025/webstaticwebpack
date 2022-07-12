import { login } from '../ultils/api';
import { getUserInfo, setUserInfo } from '../ultils/localStorage';
import {
    hideLoading,
    redirectUser,
    showLoading,
    showMessage,
} from '../ultils/helper';

const LoginScreen = {
    after_render: () => {
        $('#btn-login-submit').click(async (e) => {
            e.preventDefault();
            const email = $('#email').val();
            const password = $('#password').val();
            showLoading();
            const data = await login({ email, password });
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                redirectUser();
            }
        });
    },
    render: () => {
        if (getUserInfo().name) {
            redirectUser();
        }
        return `<div class="form-container">
                    <form id="login-form">
                        <ul>
                            <li class="form-item"><h1>SIGN IN</h1></li>
                            <li class="form-item">
                                <label for="email">Email :</label>
                                <input id="email"  type="email" class="email"/>
                            </li>
                            <li class="form-item">
                                <label for="password">Password :</label>

                                <input  id="password" type="password" class="password"/>
                            </li>
                            <li class="form-item">
                                <button id="btn-login-submit" class="btn">Submit</button>
                            </li>
                            <p>Have a user ? <a href="/#/register">Create new user</a></p>
                        </ul>
                    </form>    
                </div>
        `;
    },
};

export default LoginScreen;
