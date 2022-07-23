import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import { userRequest } from "../requestMethods";
import Updates from "../Components/Updates";
import Footer from "../Components/Footer";
const Container = styled.div``;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let data;
    const getRes = async () => {
      try {
        const res = await userRequest.get("/orders");
        data = res.data;
      } catch (error) {
        console.log(error);
      }
    };
    getRes();
    setOrders(data);
  }, []);

  console.log(orders);

  return (
    <Container>
      <Navbar />
      <Updates />
      <Wrapper>
        <Title>YOUR ORDERS</Title>
        <Top>
          <TopButton
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "poiter" }}
          >
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {setTimeout(() => {
              orders.products.map((product) => {
                return <Product key={product._id}>
                  <ProductDetail>
                    {/* // <Image src={order.img} /> */}
                    <ProductName>
                      <b>ProductId:</b> {product._id}
                    </ProductName>
                    <Details>
                      <ProductName>address: {product.address.city}</ProductName>
                      <ProductName>
                        contact: {product.address.mo.mo}
                      </ProductName>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {product.quantity}
                    </ProductAmountContainer>
                    <ProductPrice>rs. {product.amount}/-</ProductPrice>
                  </PriceDetail>
                </Product>;
              });
            }, 5300)}
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Orders;
