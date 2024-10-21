import { ImageGallery, ProductDetails } from "@components/eCommerce";
import { TProduct } from "@customTypes/index";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./styles.module.css"

const {parent} = styles

export default function ProductMainDetails({singleProduct}:{singleProduct:TProduct}) {
   

  const imgArr = [
    {
      img: "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-product-6-600x728.jpg",
      num: 1,
    },
    {
      img: "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-product-6-600x728.jpg",
      num: 2,
    },
    {
      img: "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-product-6-600x728.jpg",
      num: 3,
    },
    {
      img: "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-product-6-600x728.jpg",
      num: 4,
    },
  ];
  return (
    <div className={parent}>
      <Container fluid={"md"}>
        <Row xs={1} lg={2} className="gap-5 gap-lg-0">
          <Col>
            <ImageGallery imgArr={imgArr} />
          </Col>
          <Col>
            <ProductDetails {...singleProduct} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
