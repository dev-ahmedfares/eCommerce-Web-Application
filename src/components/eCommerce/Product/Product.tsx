import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/index";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { actToggleLike } from "@store/wishlist/wishlistSlice";
import { Link } from "react-router-dom";

const { product, productImg, maximumNotice, wishlistBtn, productInfo } = styles;

const Product = memo(
  ({
    id,
    price,
    img,
    title,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const remainingQuantity = max - (quantity ?? 0);
    const isQuantityReachedMax = !remainingQuantity ? true : false;
    const [isToggleLike, setIsToggleLike] = useState(false);

    useEffect(() => {
      if (!isBtnClicked) return;
      const debounce = setTimeout(() => {
        setIsBtnClicked(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnClicked]);

    function handleAddCart() {
      dispatch(addToCart(id));
      setIsBtnClicked(true);
    }

    function handleToggleLike(id: number) {
      if (isToggleLike) return;
      setIsToggleLike(true);
      dispatch(actToggleLike(id))
        .unwrap()
        .then(() => setIsToggleLike(false))
        .catch(() => setIsToggleLike(false));
    }

    return (
      <div className={product}>
        <Link to={`/product/${id}`}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        </Link>
        
        <div className={productInfo}>
        {isAuthenticated && (
          <div className={wishlistBtn}>
            <div>wishlist</div>
            <div  onClick={() => handleToggleLike(id)}>
              {isToggleLike ? (
                <Spinner animation="border" size="sm" variant="primary" />
              ) : isLiked ? (
                <LikeFill />
              ) : (
                <Like />
              )}
            </div>
          </div>
            
          )}
          <h2>{title}</h2>
          <p className={maximumNotice}>
            {isQuantityReachedMax
              ? "You reach to the limit"
              : `You can add ${remainingQuantity} item(s)`}
          </p>
          
          <div>
            <h3>${price.toFixed(2)}</h3>

            <Button
              disabled={isBtnClicked || isQuantityReachedMax}
              onClick={handleAddCart}
              variant=""
            >
              {isBtnClicked ? (
                <div className="d-flex align-items-center gap-2 m-0">
                  <Spinner size="sm" animation="border" />{" "}
                  
                </div>
              ) : (
                "ADD TO CART"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
export default Product;
