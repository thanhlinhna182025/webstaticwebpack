import DashboardMenu from '../components/DashboardMenu';
import { deleteUserbyAdmin, getAllUsers } from '../ultils/api';
import { showMessage } from '../ultils/helper';
const DashboardUserScreen = {
    after_render: () => {},
    render: async () => {
        const users = await getAllUsers();
        return `
            <div class="dashboard">
                    ${DashboardMenu.render()}
                    <div class="dashboard-content" id="dashboard-content" >
                       <div class="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>IsAdmin</th>
                                        <th>CreatedAt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${users
                                    .map(
                                        (user) => `
                                    <tr>
                                        <td>${user._id}</td>
                                        <td>${user.name}</td>
                                        <td>${user.email}</td>
                                        <td>${user.isAdmin}</td>
                                        <td>${user.createdAt}</td>
                                        <td><a href="/#/users/${user._id}/edit" type="button">Edit</a></td>
                                    </tr>`
                                    )
                                    .join('\n')}
                                </tbody>
                            </table>
                       </div>
                    </div>
                </div>
        `;
    },
};

export default DashboardUserScreen;
