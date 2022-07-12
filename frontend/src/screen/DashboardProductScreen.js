import DashboardMenu from '../components/DashboardMenu';
import Table from '../components/Table';
import { deleteProduct, getProducts, updateStatus } from '../ultils/api';
import {
    hideLoading,
    reRender,
    showLoading,
    showMessage,
} from '../ultils/helper';

const DashboardProductScreen = {
    after_render: async () => {
        const btnDeletes = document.getElementsByClassName('delete-button');
        Array.from(btnDeletes).forEach((btnDelete) => {
            btnDelete.addEventListener('click', async () => {
                if (confirm('Are you sure to delete this product')) {
                    showLoading();
                    const id = btnDelete.getAttribute('id');
                    const data = await deleteProduct(id);
                    if (data.error) {
                        showMessage(data.error.message);
                    } else {
                        showMessage(data.message);
                        reRender(DashboardProductScreen);
                    }
                    hideLoading();
                }
            });
        });
        const btnStatus = document.getElementsByClassName('status');
        Array.from(btnStatus).forEach((status) => {
            status.addEventListener('click', async () => {
                if (confirm('Are you sure to update this product')) {
                    showLoading();
                    const id = status.getAttribute('id');
                    const data = await updateStatus(id);
                    if (data.error) {
                        showMessage(data.error.message);
                    } else {
                        showMessage(data.message);
                        reRender(DashboardProductScreen);
                    }
                    hideLoading();
                }
            });
        });
        const sortTable = (n) => {
            var table,
                rows,
                switching,
                i,
                x,
                y,
                shouldSwitch,
                dir,
                switchcount = 0;
            table = document.getElementById('products-table');
            switching = true;
            dir = 'asc';
            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < rows.length - 1; i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName('TD')[n];
                    y = rows[i + 1].getElementsByTagName('TD')[n];
                    if (dir == 'asc') {
                        if (
                            x.innerHTML.toLowerCase() >
                            y.innerHTML.toLowerCase()
                        ) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == 'desc') {
                        if (
                            x.innerHTML.toLowerCase() <
                            y.innerHTML.toLowerCase()
                        ) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount == 0 && dir == 'asc') {
                        dir = 'desc';
                        switching = true;
                    }
                }
            }
        };
        document.getElementById('sortname').addEventListener('click', () => {
            sortTable(1);
        });
        document.getElementById('sortbrand').addEventListener('click', () => {
            sortTable(2);
        });
        document
            .getElementById('sortcategory')
            .addEventListener('click', () => {
                sortTable(3);
            });

        document.getElementById('sortstock').addEventListener('click', () => {
            sortTable(4);
        });
        document.getElementById('sortprice').addEventListener('click', () => {
            sortTable(5);
        });
        document.getElementById('sortstatus').addEventListener('click', () => {
            sortTable(6);
        });
    },
    render: async () => {
        const products = await getProducts();
        return `
        <div class="dashboard">
            ${DashboardMenu.render()}
            <div class="dashboard-content">
                <div>
                    <a href="/#/createproduct">Create new product</a>
                </div>
                ${await Table.render(products)}
            </div>
        </div>
        `;
    },
};

export default DashboardProductScreen;
