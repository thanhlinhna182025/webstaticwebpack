import DashboardMenu from '../components/DashboardMenu';
import FeatureInfo from '../components/FeatureInfo';
import { getStatiscal } from '../ultils/api';

let data = {};
const DashboardScreen = {
    after_render: () => {
        const ctx = document.getElementById('myChart').getContext('2d');
        const ctx2 = document.getElementById('myChart2').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: data.monthyOrders.map((x) => x._id),
                datasets: [
                    {
                        label: 'income',
                        data: data.monthyOrders.map((x) => x.sales),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(111, 99, 132, 0.2)',
                            'rgba(123, 162, 235, 0.2)',
                            'rgba(167, 206, 86, 0.2)',
                            'rgba(282, 192, 192, 0.2)',
                            'rgba(233, 102, 255, 0.2)',
                            'rgba(216, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
        const myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: data.monthyOrders.map((x) => x._id),
                datasets: [
                    {
                        label: 'Orders',
                        data: data.monthyOrders.map((x) => x.orders),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    },
    render: async () => {
        data = await getStatiscal();
        return `
                <div class="dashboard">
                    ${DashboardMenu.render()}
                    <div class="dashboard-content" id="dashboard-content" >
                        ${FeatureInfo.render(data)}
                        <canvas id="myChart2" height="100px"></canvas>
                        <canvas id="myChart" height="100px"></canvas>
                    </div>
                </div>
            `;
    },
};

export default DashboardScreen;
