import { getShipping, getUserInfo, setShipping } from '../ultils/localStorage';
import CheckOutStep from '../components/CheckOutStep';

const ShippingScreen = {
    after_render: () => {
        $('#shipping-form').submit((e) => {
            e.preventDefault();
            setShipping({
                address: $('#address').val(),
                city: $('#city').val(),
                postalCode: $('#postalCode').val(),
                country: $('#country').val(),
            });
            document.location.hash = '/payment';
        });
    },
    render: () => {
        const { name, email } = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }
        const { address, city, postalCode, country } = getShipping();
        return `
        ${CheckOutStep.render({ step1: true, step2: true })}
        <div class="form-container">
                    <form id="shipping-form">
                        <ul>
                            <li class="form-item"><h1>SHIPPING</h1></li>
                            <li class="form-item">
                                <label for="address">Address :</label>
                                <input id="address"  class="address" value="${address}" />
                            </li>
                            <li class="form-item">
                                <label for="city">City :</label>
                                <input id="city"  class="city" value="${city}" />
                            </li>
                            <li class="form-item">
                                <label for="postalCode">PostalCode :</label>
                                <input id="postalCode"  class="postalCode" value="${postalCode}" />
                            </li>
                            <li class="form-item">
                                <label for="country">Country :</label>
                                <input id="country"  class="country" value="${country}" />
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

export default ShippingScreen;
