import { TProduct } from "@customTypes/index";
import StaticStarsRating from "../StaticStarsRating/StaticStarsRating";

import { useAppDispatch } from "@store/hooks";
import { changeQuantity } from "@store/cart/cartSlice";
import { Button, Form, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";

import { useEffect, useState } from "react";

const {
  detailsParent,
  quantityList,
  parentActions,
  maxQuantity,
  description,
  starsHolder,
} = styles;
export default function ProductDetails({ title, price, quantity, id, max }:  TProduct ) {
 
  // staticElement
  const [selectedQuantity, setSelectedQuantity] = useState(1);
 
  // staticElement here problem of quantity not found in product object must came form API
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const dispatch = useAppDispatch();

  const remainingQuantity = max - (quantity ?? 0);
  const isQuantityReachedMax = !remainingQuantity ? true : false;

  useEffect(() => {
    if (!isBtnClicked) return;
    const debounce = setTimeout(() => {
      setIsBtnClicked(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnClicked]);

  function handleAddCart(id: number, quantity: number) {
    dispatch(changeQuantity({ id, quantity }));

    setIsBtnClicked(true);
  }

  const quantityArr = Array(max)
    .fill(0)
    .map((_, idx) => {
      const value = ++idx;
      return (
        <option key={idx} value={value}>
          {value}
        </option>
      );
    });

  // const handleRating = (rating: number) => {
  //   console.log(rating);
  // };

  return (
    <div className={detailsParent}>
      <div>
        <h2>{title}</h2>
        <p>${price && price.toFixed(2)}</p>
      </div>
      <div className={starsHolder}>
        {/* staticElement fix rating and add averageRating*/}
        <StaticStarsRating rating={4} size={17} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut
          ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et
          magnis dis parturient montes nascetur ridiculus mus. Vestibulum
          ultricies aliquam convallis.
        </p>
      </div>

      <div>
        <p className={maxQuantity}>
          {isQuantityReachedMax
            ? "You reach to the limit"
            : `You can add ${remainingQuantity} item(s)`}
        </p>
        <div className={parentActions}>
          <div className={quantityList}>
            <span className=" d-block">Quantity</span>
            <Form.Select
              aria-label="Default select example"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(+e.target.value)}
            >
              {quantityArr}
            </Form.Select>
          </div>

          <Button
            disabled={isBtnClicked || isQuantityReachedMax}
            onClick={() => handleAddCart(+id, +selectedQuantity)}
            variant="primary"
          >
            {isBtnClicked ? (
              <div className="d-flex align-items-center gap-2 m-0 justify-content-center">
                <Spinner size="sm" animation="border" />{" "}
              </div>
            ) : (
              "ADD TO CART"
            )}
          </Button>
        </div>
      </div>
      <div className={description}>
        <h3>Description</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut
          ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et
          magnis dis parturient montes nascetur ridiculus mus. Vestibulum
          ultricies aliquam convallis. Maecenas ut tellus mi. Proin tincidunt,
          lectus eu volutpat mattis, ante metus lacinia tellus, vitae
          condimentum nulla enim bibendum nibh. Praesent turpis risus, interdum
          nec venenatis id, pretium sit amet purus. Interdum et malesuada fames.
        </p>
      </div>
    </div>
  );
}
