import { Button, Form, Modal, Table } from "react-bootstrap";
import styles from "./styles.module.css";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addProductSchema,
  type TAddProductForm,
} from "@validation/addProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/forms/Input/Input";

const { tableParent, productImg, btn, form } = styles;
export default function TableList() {
  const [modalShow, setModalShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAddProductForm>({
    resolver: zodResolver(addProductSchema),
  });

  const handleAddProduct: SubmitHandler<TAddProductForm> = (data) => {
    reset();
    console.log(data);
  };

  return (
    <>
      <div className={tableParent}>
        <Table responsive="lg">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Max Per Order</th>
              <th>Color</th>
              <th>Material</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={productImg}>
                  <img
                    src={
                      "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-product-4-600x728.jpg"
                    }
                    alt={"ok"}
                  />
                </div>
              </td>
              <td>
                <h2>Walk Black</h2>
              </td>
              <td className="d-none d-md-block">
                <h3>$200.00</h3>
              </td>
              <td>
                <h2>Home Decor</h2>
              </td>

              <td>
                <h3>4 Products / Order</h3>
              </td>
              <td>
                <h2>Black</h2>
              </td>
              <td>
                <h2>Concrete</h2>
              </td>
              <td>
                <div>
                  <Button variant="danger">Delete</Button>
                  <Button variant="primary">Edit</Button>
                </div>
              </td>
            </tr>
            
          </tbody>
        </Table>
        <div>For Pagnation</div>
      </div>
      <div className="d-grid my-3 ">
        <Button
          variant="primary"
          className={btn}
          size="lg"
          onClick={() => setModalShow(true)}
        >
          Add New Product
        </Button>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="border-0" />
        <Modal.Body className="pt-0">
          <Form className={form} onSubmit={handleSubmit(handleAddProduct)}>
            <Input
              label="Title"
              register={register}
              name="title"
              error={errors.title?.message}
            />

            <Input
              label="Price"
              register={register}
              name="price"
              type="number"
              error={errors.price?.message}
            />
            <Input
              as="textarea"
              label="Description"
              register={register}
              name="description"
              type="text"
              error={errors.description?.message}
            />

            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setModalShow(false);
                  reset();
                }}
                className={btn}
              >
                Close
              </Button>
              <Button type="submit" className={btn}>
                Add Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
