const FeatureInfo = {
    render: (data) => {
        const { orders, users } = data;
        return `
        <div class="feature">
            <div class="feature-item">
                <h6>Total User</h6>
                <div>
                    <span>${users[0].numUsers || 0}</span>
                </div>
            </div>
            <div class="feature-item">
                <h6>Total Order</h6>
                <div>
                    <span>${orders[0].numOrders || 0}</span>
                </div>
            </div>
            <div class="feature-item">
                <h6>Total Comic</h6>
                <div>
                    <span>$ ${orders[0].totalSales}</span>
                </div>
            </div>
        </div>`;
    },
};

export default FeatureInfo;
