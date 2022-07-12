import { register } from '../ultils/api';
import { getUserInfo, setUserInfo } from '../ultils/localStorage';
import {
    hideLoading,
    redirectUser,
    showLoading,
    showMessage,
} from '../ultils/helper';

const RegisterScreen = {
    after_render: () => {
        $('#btn-register-submit').click(async (e) => {
            e.preventDefault();
            const email = $('#email').val();
            const password = $('#password').val();
            const name = $('#name').val();
            const comfirmpassword = $('#comfirmpassword').val();
            if (password !== comfirmpassword) {
                showMessage('Password not match');
                return;
            }
            showLoading();
            const data = await register({ name, email, password });
            if (data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                redirectUser();
            }
            hideLoading();
        });
    },
    render: () => {
        if (getUserInfo().name) {
            redirectUser();
        }
        return `<div class="form-container">
                    <form id="register-form">
                        <ul>
                            <li class="form-item"><h1>REGISTER</h1></li>
                            <li class="form-item">
                                <label for="name">Username :</label>
                                <input id="name"  type="text" class="name"/>
                            </li>
                            <li class="form-item">
                                <label for="email">Email :</label>
                                <input id="email"  type="email" class="email"/>
                            </li>
                            <li class="form-item">
                                <label for="password">Password :</label>
                                <input  id="password" type="password" class="password"/>
                            </li>
                            <li class="form-item">
                                <label for="comfirmpassword">Comfirmpassword :</label>
                                <input  id="comfirmpassword" type="password" class="password"/>
                            </li>
                            <li class="form-item">
                                <button id="btn-register-submit" class="btn">Submit</button>
                            </li>
                            <p>Already have a user ? <a href="/#/login">Login</a></p>
                        </ul>
                    </form>    
                </div>
        `;
    },
};

export default RegisterScreen;
