import {
    deleteUserbyAdmin,
    getUser,
    update,
    updateUserbyAdmin,
} from '../ultils/api';
import { setUserInfo } from '../ultils/localStorage';
import {
    hideLoading,
    parserRequestUrl,
    showLoading,
    showMessage,
} from '../ultils/helper';

const EditFormUserScreen = {
    after_render: () => {
        $('#btn-update-submit').click(async (e) => {
            e.preventDefault();
            const name = $('#name').val();
            const email = $('#email').val();
            showLoading();
            const data = await updateUserbyAdmin({ name, email });
            if (data.error) {
                showMessage(data.error);
            } else {
                showMessage('Success', () => {
                    setTimeout(() => {
                        document.location.hash = '/dashboard';
                    }, 1000);
                });
            }
            hideLoading();
        });
        $('#btn-delete-submit').click(async (e) => {
            e.preventDefault();
            const { id } = parserRequestUrl();
            console.log(id);
            showLoading();
            const data = await deleteUserbyAdmin(id);
            if (data.error) {
                showMessage(data.error);
            } else {
                showMessage('Success', () => {
                    setTimeout(() => {
                        document.location.hash = '/dashboard';
                    }, 1000);
                });
            }
            hideLoading();
        });
    },
    render: async () => {
        const { id } = parserRequestUrl();
        const user = await getUser(id);
        return `
        <div>
            <div class="profile-info">
                <div class="form-container">
                    <form>
                        <ul>
                            <li class="form-item"><h1>USER PROFILE</h1></li>
                            <li class="form-item">
                                <label for="name">Username :</label>
                                <input id="name"  class="name" value="${user.name}" />
                            </li>
                            <li class="form-item">
                                <label for="email">Email:</label>
                                <input id="email"  class="email" value="${user.email}" />
                            </li>
                            
                            <li class="form-item">
                                <button id="btn-update-submit" class="btn">Update</button>
                                <button id="btn-delete-submit" class="btn">Delete</button>
                            </li>
                        </ul>
                    </form>    
                </div>
            </div>
        </div>
        `;
    },
};
export default EditFormUserScreen;
