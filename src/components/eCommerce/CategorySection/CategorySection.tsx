import {
  Button,
  Dropdown,
  DropdownButton,
  Pagination,
  Row,
} from "react-bootstrap";
import styles from "./styles.module.css";
import GridList from "@components/shared/GridList/GridList";
import { useState } from "react";
import Loading from "@components/feedback/Loading";
import Product from "../Product/Product";
import useGetProducts from "@hooks/useGetProducts";

const {
  btn,
  dropdown,
  btnActive,
  menu,
  FilterActive,
  categoryStyle,
  categoryList,
  pagination,
} = styles;

export default function CategorySection() {
  
  const [prefix, setPrefix] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;


  const handlePrefix=(prefix:string)=> {
    setCurrentPage(1)
    setPrefix(prefix)
  }

  if (prefix === "all") {
    setPrefix(null);
  }

  const query =
    prefix && filter
      ? `cat_prefix=${prefix}&${filter}`
      : prefix
      ? `cat_prefix=${prefix}`
      : filter
      ? `${filter}`
      : null;

  const newQuery = query
    ? `${query}&_page=${currentPage}&_limit=${limit}`
    : `_page=${currentPage}&_limit=${limit}`;

  const { loading, error, productsFullInfo, lastPage } = useGetProducts(newQuery);

  const categories = [
    { prefix: "all", label: "All" },
    { prefix: "homeDecor", label: "HOME DECOR" },
    { prefix: "lighting", label: "LIGHTING" },
    { prefix: "decoration", label: "DECORATION" },
    { prefix: "vases", label: "VASES" },
    { prefix: "basics", label: "BASICS" },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <ul className={categoryList}>
          {categories.map((category) => (
            <li key={category.prefix}>
              <Button
                variant="link"
                className={`${btn} ${
                  category.prefix === prefix ? btnActive : ""
                }`}
                onClick={() => handlePrefix(category.prefix)}
              >
                {category.label}
              </Button>
            </li>
          ))}
        </ul>
        <div className={categoryStyle}>
          <DropdownButton
            id="dropdown-item-button"
            variant=""
            title="CATEGORY"
            className={dropdown}
            align={"end"}
          >
            <div className={menu}>
              <div>
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category.label}
                    onClick={() => handlePrefix(category.prefix)}
                    as="button"
                    className={`${
                      category.prefix === prefix ? FilterActive : ""
                    }`}
                  >
                    {category.label}
                  </Dropdown.Item>
                ))}
              </div>
            </div>
          </DropdownButton>
        </div>
        <div>
          <DropdownButton
            id="dropdown-item-button"
            variant=""
            title="FILTER"
            className={dropdown}
            align={"end"}
          >
            <div className={menu}>
              <div>
                <Dropdown.ItemText>SORT BY</Dropdown.ItemText>
                <Dropdown.Item
                  as="button"
                  onClick={() => setFilter("price_gte=0")}
                  className={`${filter === "price_gte=0" ? FilterActive : ""}`}
                >
                  Default
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => setFilter("_sort=price&_order=asc")}
                  className={`${
                    filter === "_sort=price&_order=asc" ? FilterActive : ""
                  }`}
                >
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => setFilter("_sort=price&_order=desc")}
                  className={`${
                    filter === "_sort=price&_order=desc" ? FilterActive : ""
                  }`}
                >
                  Price: High to Low
                </Dropdown.Item>
              </div>
              <div>
                <Dropdown.ItemText>PRICE RANGE</Dropdown.ItemText>
                <Dropdown.Item
                  as="button"
                  onClick={() => setFilter("price_gte=0&price_lte=100")}
                  className={`${
                    filter === "price_gte=0&price_lte=100" ? FilterActive : ""
                  }`}
                >
                  $0-$100
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => setFilter("price_gte=100&price_lte=300")}
                  className={`${
                    filter === "price_gte=100&price_lte=300" ? FilterActive : ""
                  }`}
                >
                  $100-$300
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => setFilter("price_gte=300&price_lte=500")}
                  className={`${
                    filter === "price_gte=300&price_lte=500" ? FilterActive : ""
                  }`}
                >
                  $300-$500
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => setFilter("price_gte=500&price_lte=1000")}
                  className={`${
                    filter === "price_gte=500&price_lte=1000"
                      ? FilterActive
                      : ""
                  }`}
                >
                  $500-$1000
                </Dropdown.Item>
              </div>
            </div>
          </DropdownButton>
        </div>
      </div>
      <Loading status={loading} error={error} type="product">
        <Row>
          {/* Render Props Pattern */}
          <GridList
            message="There are no products"
            records={productsFullInfo}
            renderItem={(record) => <Product {...record} />}
          />
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
        </Row>
      </Loading>
    </>
  );
}
