import { getMyOrder, update } from '../ultils/api';
import { clearUser, getUserInfo, setUserInfo } from '../ultils/localStorage';
import { hideLoading, showLoading, showMessage } from '../ultils/helper';

const ProfileScreen = {
    after_render: () => {
        $('#btn-update-submit').click(async (e) => {
            e.preventDefault();
            const email = $('#email').val();
            const password = $('#password').val();
            const name = $('#name').val();
            showLoading();
            const data = await update({ name, email, password });
            if (data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                document.location.hash = '/';
            }
            hideLoading();
        });
        $('#btn-signout-submit').click(() => {
            clearUser();
            document.location.hash = '/';
        });
    },
    render: async () => {
        const { name, email } = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }
        const orders = await getMyOrder();
        return `
        <div class="profile">
            <div class="profile-info">
                <div class="form-container">
                    <form>
                        <ul>
                            <li class="form-item"><h1>USER PROFILE</h1></li>
                            <li class="form-item">
                                <label for="name">Username :</label>
                                <input id="name"  class="name" value="${name}" />
                            </li>
                            <li class="form-item">
                                <label for="email">Email :</label>
                                <input id="email"  type="email" class="email" value="${email}"/>
                            </li>
                            <li class="form-item">
                                <label for="password">Password :</label>
                                <input  id="password" type="password" class="password"/>
                            </li>
                            <li class="form-item">
                                <button id="btn-update-submit" class="btn">Update</button>
                            </li>
                            <li class="form-item">
                                <button id="btn-signout-submit" class="btn">Sign Out</button>
                            </li>
                        </ul>
                    </form>    
                </div>
            </div>
            <div class="profile-orders">
            <h2>Orders List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ORDER ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                       ${
                           orders.length === 0
                               ? `<tr><td colspan="6">Not Found</td></tr>`
                               : orders
                                     .map(
                                         (order) =>
                                             `<tr>
                                    <td>${order._id}</td>
                                    <td>${order.createdAt}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>${order.paidAt || 'NO'}</td>
                                    <td>${order.deliveredAt || 'NO'}</td>
                                    <td><a href="/#/orders/${
                                        order._id
                                    }">Detail Order</a></td>
                               </tr>`
                                     )
                                     .join('\n')
                       }
                    </tbody>
                    
                </table>
            </div>
        </div>
        
        `;
    },
};

export default ProfileScreen;
