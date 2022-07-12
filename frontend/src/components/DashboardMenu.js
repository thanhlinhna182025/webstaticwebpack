const DashboardMenu = {
    render: () => {
        return `
            <div class="sidebar">
                <div class="sidebar-menu">
                    <h3>Dashboard</h3>
                    <ul>
                        <li><i class="fa-solid fa-house"><a href="/#/">Home</a></i></li>
                        <li><i class="fa-solid fa-chart-line"></i><a>Analytics</a></li>
                        <li><i class="fa-solid fa-arrow-trend-up"></i><a>Sale</a></li>
                    </ul>
                </div>
                <div class="sidebar-menu">
                    <h3>Quick Menu</h3>
                    <ul>
                        <li>
                            <i class="fa-solid fa-users"><a href="/#/users">Users</a></i>
                        </li>
                        <li>
                            <i class="fa-brands fa-product-hunt"><a href="/#/products">Products</a></i>
                        </li>
                        <li><i class="fa-solid fa-dollar-sign"></i><a>Transactions</a></li>
                        <li><i class="fa-solid fa-chart-simple"></i><a>Report</a></li>
                </ul>
                </div>
                <div class="sidebar-menu">
                    <h3>Notifications</h3>
                    <ul>
                        <li><i class="fa-solid fa-envelope"></i><a>Mail</a></li>
                        <li><i class="fa-solid fa-comments"></i><a>Feeback</a></li>
                        <li><i class="fa-solid fa-message"></i><a>Messages</a></li>
                    </ul>
                </div>
                <div class="sidebar-menu">
                    <h3>Staff</h3>
                    <ul>
                        <li><i class="fa-solid fa-briefcase"></i><a>Manage</a></li>
                        <li><i class="fa-solid fa-chart-line"></i><a>Analytics</a></li>
                        <li><i class="fa-solid fa-chart-simple"></i><a>Report</a></li>
                    </ul>
                </div>
            </div>
        `;
    },
};

export default DashboardMenu;
