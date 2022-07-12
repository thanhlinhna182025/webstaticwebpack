const Table = {
    after_render: () => {
        console.log('AAAAAA');
    },
    render: async (products) => {
        return `<div class="table-container">
            <table id="products-table">
                    <tr>
                        <td><input type="checkbox"/>ID</td>
                        <td><a id="sortname">Name</a></td>
                        <td><a id="sortbrand">Brand</a></td>
                        <td><a id="sortcategory">Category</a></td>
                        <td><a id="sortstock">Stock</a></td>
                        <td><a id="sortprice">Price(USD)</a></td>
                        <td><a id="sortstatus">Status</a></td>
                        <td>Action</td>
                    </tr>
                    ${products
                        .map(
                            (product) => `<tr>
                        <td><input type="checkbox"/>${product._id}</td>
                        <td>${product.name}</td>
                        <td>${product.brand}</td>
                        <td>${product.category}</td>
                        <td>${product.countInStock}</td>
                        <td>${product.price}</td>
                        <td><a type="button" id="${product._id}" class="status">${product.status}</a></td>
                        <td>
                            <a href="/#/products/${product._id}/edit"><i class="fa-solid fa-pen-to-square"></i></a>
                            <a type="button" class="delete-button" id="${product._id}"><i class="fa-solid fa-trash-can"></i></a>
                        </td>
                    </tr>`
                        )
                        .join('\n')}
                    
            </table>
        </div>`;
    },
};

export default Table;
