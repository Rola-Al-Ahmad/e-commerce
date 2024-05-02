import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { getProductsById } from '../fetcher';
import styled from 'styled-components';
import { CartContext } from "../contexts/cartContext";

function ProductDetail() {
  const { addProduct } = useContext(CartContext);;
  const [product, setProduct] = useState({ errorMessage: '', data: {} });
  let { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsById(productId);
      console.log({ responseObject });
      setProduct(responseObject);
    }
    fetchData();
  }, [productId]);

  const createMarkup = () => {
    return { __html: product.data?.description };
  };

  return (

    <ProductInfoArticle>
      <Container>
        <figure className='col-md-5'>
          <ProductImageContainer>
            <ProductImage
              src={`/assets/${product.data.image}`}
              alt={product.data.title}
            />
          </ProductImageContainer>
        </figure>

        <ProductInfoSection className='col-md-7'>
          <ProductTitle>{product.data.title}</ProductTitle>
          <ProductInfoFinancePrice>
            &pound;{product.data.price}
          </ProductInfoFinancePrice>
          <ProductInfoStock>
            <ProductInfoStockLabel>
              Stock Level: {product.data.stock}
            </ProductInfoStockLabel>
            <ProductInfoStockLabel>FREE Delivery</ProductInfoStockLabel>
          </ProductInfoStock>
          <ProductInfoSection>

            <ProductInfoAction style={{ marginTop: '.5rem' }}>
              <ProductInfoActionButton
                onClick={() =>
                  addProduct({
                    id: product.data.id,
                    title: product.data.title,
                    price: product.data.price,
                  })
                }
              >
                Add to Basket
              </ProductInfoActionButton>
            </ProductInfoAction>
          </ProductInfoSection>
          <div style={{ float: 'left', width: '100%' }}>

            {product.data.specs?.dimensions && (
              <ProductInfo>
                <ProductInfoHeader>Dimensions</ProductInfoHeader>
                <label>{product.data.specs?.dimensions}</label>
              </ProductInfo>
            )}
            {product.data.specs?.capacity && (
              <ProductInfo>
                <ProductInfoHeader>Capacity</ProductInfoHeader>
                <label>{product.data.specs?.capacity}</label>
              </ProductInfo>
            )}
            {product.data?.features && (
              <ProductInfo>
                <ProductInfoHeader>Features</ProductInfoHeader>
                <ul>
                  {product.data.features?.map((feature, index) => {
                    return (
                      <ProductInfoListItem key={`feature${index}`}>
                        {feature}
                      </ProductInfoListItem>
                    );
                  })}
                </ul>
              </ProductInfo>
            )}
          </div>
        </ProductInfoSection>
      </Container>
      <ProductDescription>
          <ProductDescriptionHeader>Description</ProductDescriptionHeader>
          <DescText dangerouslySetInnerHTML={createMarkup()}></DescText>
      </ProductDescription>
    </ProductInfoArticle>
  );
};

export default ProductDetail;

const ProductInfoArticle = styled.div`
  margin-right: -15px;
  margin-left: -15px;
`;

const Container = styled.div`
  max-width: 100%;
  width: 1200px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const ProductImageContainer = styled.div`
  max-width: 100%;
  position: relative;
  margin: 0 auto;
`;

const ProductImage = styled.img`
  width: 100%;
  background: #fff;
  border-radius: 10%;
  padding: 20px;
`;

const ProductInfo = styled.div`
  padding: .5rem;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  font-weight: 300;
  text-transform: none;
  color: #333;
`;

const ProductInfoSection = styled.div`
  margin-bottom: 1rem;
`;

const ProductInfoHeader = styled.h3`
  color: #333;
  font-size: 1em;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
`;

const ProductInfoListItem = styled.li`
  list-style-type: disc;
  margin-left: 20px;
  font-size: 16px;
  color: #555;
`;

const ProductInfoStock = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
`;

const ProductInfoStockLabel = styled.label`
  padding-bottom: 5px;
`;

const ProductInfoFinancePrice = styled.div`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 1rem;
  margin-top: 0px;
  color: #ec0726;
`;

const ProductInfoAction = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const ProductInfoActionButton = styled.button`
  padding: 0.7rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0062cc;
  }
`;

const ProductDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  clear: left;
  padding: 0 0 0 1em;
  margin: 0 0 1.618em;
  border-top: 1px solid #ccc !important;
  text-align: center;
`;
const ProductDescriptionHeader = styled.div`
  padding: 5px 20px;
  position: relative;
  font-weight: 800;
  font-size: 34px;
  margin-bottom: 10px;
`;

const DescText = styled.p`
  margin: 0 0 20px 0;
  font-size: 16px;
  line-height: 1.75;
  padding: 0 20px;
`;