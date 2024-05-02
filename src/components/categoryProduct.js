import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';

import { CartContext } from "../contexts/cartContext";

const CategoryProduct = ({
    id,
    title,
    image,
    specs,
    features,
    price,
    stock,
}) => {
    const navigate = useNavigate();
    const { addProduct } = useContext(CartContext);

    return (
        <ProductInfoArticle>
            <figure>
                <ProductImageContainer>
                    <ProductImage src={`/assets/${image}`} alt={title} />
                </ProductImageContainer>

            </figure>

            <ProductInfo >
                <ProductTitle>
                    <ProductTitleLink to={`/products/${id}`}>{title}</ProductTitleLink>
                </ProductTitle>
                <ProductInfoFinancePrice>
                    &pound;{price}
                </ProductInfoFinancePrice>
            </ProductInfo>

            <Buttons>
                <ProductInfoAction>
                    <ProductInfoActionButton onClick={() => navigate(`/products/${id}`)}>
                        View Product
                    </ProductInfoActionButton>
                    <ProductInfoActionButton onClick={() => addProduct({ id, title, price })}>Add to Basket</ProductInfoActionButton>
                </ProductInfoAction>
            </Buttons>
        </ProductInfoArticle>
    );
};

export default CategoryProduct;

const ProductInfoArticle = styled.article`
    flex: 1 1 auto;
    max-width: 295px;
    border: 1px solid #ddd;
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
    &:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
`;

const ProductTitle = styled.div`
    display: block;
    min-height: 60px;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 500;
    line-height: 1.3;
`;

const ProductTitleLink = styled(Link)`
    text-decoration: none;
    font-size: 14px;
    color: darkslategray;
    &:hover {
        color: #000;
        text-decoration: none;
    }
`;

const ProductImageContainer = styled.div`
    padding: 0.5rem;
`;

const ProductImage = styled.img`
    width: auto;
    margin: auto;
    max-width: 100%;
    height: auto;
`;

const ProductInfo = styled.div`
    position: relative;
    text-align: center;
    padding: 20px;
    padding-bottom: 6px;
`;

const ProductInfoAction = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
`;

const ProductInfoActionButton = styled.button`
    padding: 0.5rem;
    background-color: #1e88e5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #1565c0;
    }
`;

const ProductInfoFinancePrice = styled.div`
    font-size: 1.2rem;
    color: #e53935;
`;

const Buttons = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
`;