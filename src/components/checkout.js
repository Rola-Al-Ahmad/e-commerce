import React from "react";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    const [form, setForm] = React.useState({
        name: "",
        email: "",
        shippingAddress1: "",
        billingAddress1: "",

        touched: {
            name: false,
            email: false,
            shippingAddress1: false,
            billingAddress1: false,
        },
    });

    const errors = {
        name: form.name.length === 0,
        email: form.email.length === 0,
        shippingAddress1: form.shippingAddress1.length === 0,
        billingAddress1: form.billingAddress1.length === 0,
    };
    
    const disabled = Object.keys(errors).some((key) => errors[key]);

    const handleChange = (ev) => {
        const { name, value } = ev.target;

        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleBlur = (ev) => {
        const { name } = ev.target;
        setForm((prevState) => {
            return {
                ...prevState,
                touched: { ...form.touched, [name]: true },
            };
        });
    };

    const handleSubmit = (ev) => {
        if (disabled) {
            ev.preventDefault();
            return;
        }
        navigate("/orderconfirmation");
    };

    const showError = (field) => (errors[field] ? form.touched[field] : false);

    return (
        <form onSubmit={handleSubmit}>
            <CheckoutContainer>
                {/* Row 1 */}
                <CheckoutTitle>Shopping Checkout</CheckoutTitle>

                {/* Row 4 */}
                <CheckoutHeader>
                    <h4>Your Details</h4>
                </CheckoutHeader>

                {/* Row 5 */}
                <CheckoutHeaderLine />

                {/* Row 6 */}
                <CheckoutTable>
                    <CheckoutFormLabel>Name</CheckoutFormLabel>
                    <CheckoutInput
                        type="text"
                        name="name"
                        invalid={showError("name")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter name"
                    />
                    <CheckoutFormLabel>Email</CheckoutFormLabel>
                    <CheckoutInput
                        type="text"
                        name="email"
                        invalid={showError("email")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter email"
                    />
                </CheckoutTable>

                {/* Row 7 */}
                <CheckoutHeader>
                    <h4>Address Details</h4>
                </CheckoutHeader>

                {/* Row 8 */}
                <CheckoutHeaderLine />

                {/* Row 9 */}
                <CheckoutTable>
                    <CheckoutFormLabel>Copy to shipping</CheckoutFormLabel>
                    <CheckoutFormCheckbox type="checkbox" />

                    <CheckoutFormLabel>Billing Address</CheckoutFormLabel>

                    <CheckoutAddress>
                        <CheckoutInput
                            type="text"
                            name="billingAddress1"
                            invalid={showError("billingAddress1")}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter first billing address"
                        />
                        <CheckoutInput type="text" name="billingAddress2" />
                        <CheckoutInput type="text" name="billingCity" />
                    </CheckoutAddress>

                    <CheckoutFormLabel>Shipping Address</CheckoutFormLabel>

                    <CheckoutAddress>
                        <CheckoutInput
                            type="text"
                            name="shippingAddress1"
                            invalid={showError("shippingAddress1")}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter first shipping address"
                        />
                        <CheckoutInput type="text" name="shippingAddress2" />
                        <CheckoutInput type="text" name="shippingCity" />
                    </CheckoutAddress>
                </CheckoutTable>

                <CancelButton onClick={() => navigate("/basket")}>
                    Cancel
                </CancelButton>

                <CheckoutButton disabled={disabled}>
                    Confirm Order
                </CheckoutButton>
            </CheckoutContainer>
        </form>
    );
};

export default Checkout;

// Container for the checkout form
const CheckoutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

// Checkout title
const CheckoutTitle = styled.h2`
  text-align: center;
  font-size: 1.5em;
  color: #333;
`;

// Header for sections
const CheckoutHeader = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #555;
`;

// Horizontal line for section separation
const CheckoutHeaderLine = styled.hr`
  border: 0;
  height: 1px;
  background: #ddd;
`;

// Checkout form table style
const CheckoutTable = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

// Label for form fields
const CheckoutFormLabel = styled.label`
  font-size: 1em;
  color: #333;
`;

// Input fields for the form
const CheckoutInput = styled.input`
  padding: 10px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
  border-radius: 5px;
  background: #fff;
  color: #333;

  &:focus {
    border-color: ${({ invalid }) => (invalid ? 'red' : '#66afe9')};
    outline: none;
  }
`;

// Address style for multiple input fields
const CheckoutAddress = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

// Checkbox for the form
const CheckoutFormCheckbox = styled.input`
  transform: scale(1.2);
`;

// Buttons with common styling
const CheckoutButton = styled.button`
  background-color: #4CAF50; // Green
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Cancel button
const CancelButton = styled.button`
  background-color: #f44336; // Red
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-right: 10px;
`;