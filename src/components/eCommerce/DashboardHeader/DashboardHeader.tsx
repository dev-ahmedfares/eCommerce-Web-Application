import { Form } from "react-bootstrap";
import styles from "./styles.module.css";
const { select, text } = styles;
export default function DashboardHeader({
  handleSorting,
}: {
  handleSorting: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-4">
        <p className={text}> All Products</p>
        <Form.Select onChange={handleSorting} className={select}>
          <option value={"default"}>Default sorting</option>
          <option value={"popularity"}>Sort by Popularity</option>
          <option value={"average-rating"}>Sort by Average rating</option>
          <option value={"latest"}>Sort by latest</option>
          <option value={"price-asc"}>Sort by Price: Low to High</option>
          <option value={"price-dec"}>Sort by Price: High to Low</option>
        </Form.Select>
      </div>
    </>
  );
}
