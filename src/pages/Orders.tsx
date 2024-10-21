import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import Heading from "@components/shared/Heading/Heading";
import { TProduct } from "@customTypes/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, resetOrderStatus } from "@store/order/orderSlice";
import { useEffect, useState } from "react";
import { Col, Modal, Row, Table } from "react-bootstrap";

export default function Orders() {
  const dispatch = useAppDispatch();
  const { ordersList, loading, error } = useAppSelector(
    (state) => state.orders
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const modalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };
  const viewDetailsHandler = (id: number) => {
    const productDetails = ordersList.find((item) => item.id === id);
    const newItems = productDetails?.items ?? [];

    setShowModal(true);
    setSelectedProduct(newItems);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={modalHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "400px" }} className="overflow-y-scroll ">
          <Row>
            {selectedProduct.map((item) => (
              <Col key={`${item.cat_prefix}${item.id}`} md={6}>
                <div className="my-3 ">
                  <Product {...item} />
                </div>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
      <Heading style="mt-0 mb-3" >Orders List</Heading>
      <Loading type="table" error={error} status={loading}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>
                  {item.items.length} item(s) /{" "}
                  <span
                    onClick={() => viewDetailsHandler(item.id)}
                    className="text-decoration-underline"
                    role="button"
                  >
                    Product Details
                  </span>
                </td>
                <td>${item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
}
