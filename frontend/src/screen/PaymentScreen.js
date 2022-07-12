import { getPayment, getUserInfo, setPayment } from '../ultils/localStorage';
import CheckOutStep from '../components/CheckOutStep';

const PaymentScreen = {
    after_render: () => {
        $('#payment-form').submit((e) => {
            e.preventDefault();
            const paymentMethod = document.querySelector(
                'input[name="payment-method"]:checked'
            ).value;
            setPayment({ paymentMethod });
            document.location.hash = '/orders';
        });
    },
    render: () => {
        const { name } = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }
        return `
        ${CheckOutStep.render({ step1: true, step2: true, step3: true })}
        <div class="form-container">
                    <form id="payment-form">
                        <ul>
                            <li class="form-item"><h1>PAYMENT</h1></li>
                            <li>
                                <div>
                                    <input type="radio" name="payment-method" id="paypal" value="Paypal" checked/>
                                    <label for="paypal">Paypal</label>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <input type="radio" name="payment-method" id="stripe" value="Stripe" />
                                    <label for="stripe">Stripe</label>
                                </div>
                            </li>
                            <li class="form-item">
                                <button type="submit" class="btn">Continute</button>
                            </li>
                        </ul>
                    </form>    
                </div>
        `;
    },
};

export default PaymentScreen;
