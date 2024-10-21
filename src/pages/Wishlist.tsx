import { Banner, Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import GridList from "@components/shared/GridList/GridList";

import useWishlist from "@hooks/useWishlist";

import { Container, Row } from "react-bootstrap";

export default function Wishlist() {
  const { products, loading, error } = useWishlist();

  return (
    <>
      <Banner
        title="WISHLIST"
        url={
          "https://www.equinoxitsol.com/blog/wp-content/uploads/2023/06/Make-an-Optimized-Shopping-Cart-1024x576.jpg"
        }
      />
      <Container fluid={"md"}>
        <Loading status={loading} error={error} type="product">
          <Row className="mt-3 mt-lg-5">
            <GridList
              message="Your wishlist is empty"
              records={products}
              renderItem={(record) => <Product {...record} />}
            />
          </Row>
        </Loading>
      </Container>
    </>
  );
}
