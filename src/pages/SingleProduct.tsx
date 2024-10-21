import {
  TabsSingleProduct,
  ProductMainDetails,
  Product,
} from "@components/eCommerce";
import Loading from "@components/feedback/Loading";

import GridList from "@components/shared/GridList/GridList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetSingleProduct,
  singleProductCleanUp,
} from "@store/Product/productSlice";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const params = useParams();

  const productId = Number(params.productId);

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const likedProducts = useAppSelector((state) => state.wishlist.productsId);

  const { accessToken, loading: userLoading } = useAppSelector(
    (state) => state.auth
  );

  const {
    singleProduct,
    records,
    loading: productsLoading,
    error,
  } = useAppSelector((state) => state.products);
  console.log(singleProduct,
    records)
  const currentProduct = singleProduct[0];

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: likedProducts.includes(el.id),
    isAuthenticated: accessToken ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(actGetSingleProduct(productId));

    return () => {
      promise.abort();
      dispatch(singleProductCleanUp());
    };
  }, [dispatch, productId]);

  return (
    <Loading status={productsLoading || userLoading} error={error} type="table">
      <>
        <ProductMainDetails singleProduct={currentProduct} />
        <TabsSingleProduct {...currentProduct} />
        <Container fluid={"md"}>
          <Row className="pt-5 ">
            <h4 className="fs-5 mb-3">RELATED PRODUCTS</h4>
            <GridList
              records={productsFullInfo}
              renderItem={(item) => <Product {...item} />}
            />
          </Row>
        </Container> 
      </>
    </Loading>
  );
}
