import {
  Accordion,
  Button,
  Form,
  Offcanvas,
  Pagination,
  Row,
} from "react-bootstrap";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import GridList from "@components/shared/GridList/GridList";
import Product from "../Product/Product";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductByPrefix,
  productsCleanUp,
} from "@store/Product/productSlice";
import List from "@assets/svg/lnr-list.svg?react";
import Loading from "@components/feedback/Loading";

const {
  parent,
  categoryBody,
  canvasContainer,
  sidebar,
  canvasBtn,
  sidebarCanvas,
  pagination,
  offCanvasBody,
} = styles;

export default function ShopList() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For Filter
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterColor, setFilterColor] = useState<string>("");
  const [filterMaterial, setFilterMaterial] = useState<string>("");
  const [filterSort, setFilterSort] = useState<string>("");
  const [filterPrice, setFilterPrice] = useState<string>("");

  // const arrOfFilter = [
  //   filterCategory,
  //   filterColor,
  //   filterMaterial,
  //   filterSort,
  //   filterPrice,
  // ];

  // const pathname = useLocation();
  // let path = pathname.search.slice(1);

  const categories = [
    { prefix: "all", label: "All" },
    { prefix: "homeDecor", label: "HOME DECOR" },
    { prefix: "lighting", label: "LIGHTING" },
    { prefix: "decoration", label: "DECORATION" },
    { prefix: "vases", label: "VASES" },
    { prefix: "basics", label: "BASICS" },
  ];

  const arrOfColors = ["black", "beige", "grey", "gold", "white"];
  const arrOfMaterials = ["chrome", "concrete", "metal", "wood"];

  // const handleBtnFilter = (value: string, fieldFilter: string) => {
  //   searchParams.set(fieldFilter, value);
  //   setSearchParams(searchParams, { replace: true });
  // };

  const handleRange = () => {
    // searchParams.set("price_lte", priceRange.toString());
    // setSearchParams(searchParams, { replace: true });
    setFilterPrice(`price_gte=0&price_lte=${priceRange.toString()}&`);
  };

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // searchParams.set("By", e.target.value);
    // setSearchParams(searchParams, { replace: true });
    setFilterSort(e.target.value);
  };

  const cartItems = useAppSelector((state) => state.cart.items);

  const likedProducts = useAppSelector((state) => state.wishlist.productsId);
  const { accessToken } = useAppSelector((state) => state.auth);

  // For Filter And Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const { records, lastPage, loading, error } = useAppSelector(
    (state) => state.products
  );

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: likedProducts.includes(el.id),
    isAuthenticated: accessToken ? true : false,
  }));

  // staticElement must get from api
  const [priceRange, setPriceRange] = useState(10);

  const handlePage = (prefix: string) => {
    setCurrentPage(1);
    setPriceRange(10);
    setFilterCategory(`cat_prefix=${prefix}&`);
  };

  const resetPrice = () => {
    setFilterPrice(`price_gte=0&price_lte=1000&`);
    setPriceRange(1000);
  };

  const query = `${filterCategory}${filterColor}${filterMaterial}${filterPrice}${filterSort}_page=${currentPage}&_limit=${limit}`;

  useEffect(() => {
    const promise = dispatch(actGetProductByPrefix(query));

    return () => {
      promise.abort();
      dispatch(productsCleanUp());
    };
  }, [dispatch, query]);

  console.log(query);
  return (
    // staticElement Loading here
    <div className={parent}>
      <div className={sidebar}>
        <Accordion defaultActiveKey="0" flush alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              <ul>
                {categories.map((item, idx) => (
                  <li key={`${item}-${idx}`}>
                    <button
                      onClick={(e) => {
                        if (e.currentTarget.value === "all") {
                          setFilterColor("");
                          setFilterMaterial("");
                          setCurrentPage(1);
                          return setFilterCategory("");
                        }
                        return handlePage(item.prefix);
                      }}
                      value={item.prefix}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Color</Accordion.Header>
            <Accordion.Body>
              <ul>
                {arrOfColors.map((item, idx) => (
                  <li key={`${item}-${idx}`}>
                    <button
                      onClick={(e) =>
                        setFilterColor(`color=${e.currentTarget.value}&`)
                      }
                      value={item}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Materials</Accordion.Header>
            <Accordion.Body>
              <ul>
                {arrOfMaterials.map((item, idx) => (
                  <li key={`${item}-${idx}`}>
                    <button
                      onClick={(e) =>
                        setFilterMaterial(`material=${e.currentTarget.value}&`)
                      }
                      value={item}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div>
          <Form.Label>Price</Form.Label>
          <Form.Range
            onChange={(e) => setPriceRange(+e.target.value)}
            min={10}
            max={productsFullInfo.reduce(
              (acc, el) => (acc >= el.price ? acc : el.price),
              0
            )}
            defaultValue={1000}
            value={priceRange}
          />
          <div>
            <div className="d-flex gap-2">
              <Button onClick={resetPrice}>Reset</Button>
              <Button onClick={handleRange}>Apply</Button>
            </div>
            <span>{priceRange === 10 ? "$10" : `$10-$${priceRange}`}</span>
          </div>
        </div>
      </div>
      <div className={categoryBody}>
        <div>
          <Offcanvas
            scroll={false}
            show={show}
            onHide={handleClose}
            className={canvasContainer}
          >
            <Offcanvas.Body className={offCanvasBody}>
              <div className={sidebarCanvas}>
                <Accordion defaultActiveKey="0" flush alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className={canvasBtn}>
                      Categories
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {categories.map((item, idx) => (
                          <li key={`${item}-${idx}`}>
                            <button
                              onClick={(e) => {
                                if (e.currentTarget.value === "all") {
                                  setFilterColor("");
                                  setFilterMaterial("");
                                  setCurrentPage(1);
                                  return setFilterCategory("");
                                }
                                return handlePage(item.prefix);
                              }}
                              value={item.prefix}
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Color</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {arrOfColors.map((item, idx) => (
                          <li key={`${item}-${idx}`}>
                            <button
                              onClick={(e) =>
                                setFilterColor(
                                  `color=${e.currentTarget.value}&`
                                )
                              }
                              value={item}
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Materials</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {arrOfMaterials.map((item, idx) => (
                          <li key={`${item}-${idx}`}>
                            <button
                              onClick={(e) =>
                                setFilterMaterial(
                                  `material=${e.currentTarget.value}&`
                                )
                              }
                              value={item}
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="my-4">
                  <Form.Label>Price</Form.Label>
                  <Form.Range
                    onChange={(e) => setPriceRange(+e.target.value)}
                    min={10}
                    max={productsFullInfo.reduce(
                      (acc, el) => (acc >= el.price ? acc : el.price),
                      0
                    )}
                    defaultValue={1000}
                    value={priceRange}
                  />
                  <div>
                    <div className="d-flex gap-2">
                      <Button onClick={resetPrice}>Reset</Button>
                      <Button onClick={handleRange}>Apply</Button>
                    </div>
                    <span>
                      {priceRange === 10 ? "$10" : `$10-$${priceRange}`}
                    </span>
                  </div>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>

          <div className="d-flex align-items-center gap-3">
            <Button
              variant="secondary"
              onClick={handleShow}
              className="d-block d-lg-none"
            >
              <List />
            </Button>
            <p className="d-none d-sm-block">
              Page <span className=" fs-6">{currentPage} </span>Showing 1-
              {productsFullInfo.length} results
            </p>
          </div>
          <Form.Select onChange={handleSorting}>
            <option value={"price_gte=0&"}>Default sorting</option>
            <option value={"_sort=price&_order=&"}>
              Sort by Price: Low to High
            </option>
            <option value={"_sort=price&_order=desc&"}>
              Sort by Price: High to Low
            </option>
          </Form.Select>
        </div>
                    {/* staticElement */}
        <Loading status={loading} error={error} type="product">
          <div className="py-4">
            <Row>
              <GridList
                cols={[{ sm: 6, md: 4, lg: 0, xxl: 3 }]}
                records={productsFullInfo}
                renderItem={(item) => <Product {...item} />}
              />
            </Row>
            {+lastPage !== 1 && (
              <div className={pagination}>
                <Pagination>
                  <Pagination.First
                    disabled={+currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                  />
                  <Pagination.Prev
                    disabled={+currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  />
                  <Pagination.Ellipsis disabled />
                  <Pagination.Item active>{currentPage}</Pagination.Item>
                  <Pagination.Ellipsis disabled />
                  <Pagination.Next
                    disabled={+currentPage === +lastPage}
                    onClick={() => setCurrentPage((prev) => ++prev)}
                  />
                  <Pagination.Last
                    disabled={+currentPage === +lastPage}
                    onClick={() => setCurrentPage(lastPage)}
                  />
                </Pagination>
              </div>
            )}
          </div>
        </Loading>
      </div>
    </div>
  );
}
