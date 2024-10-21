import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import Header from "../../components/shared/Header/Header";
import Footer from "@components/shared/Footer/Footer";
import { Outlet } from "react-router-dom";

const { wrapper, container, main } = styles;

export default function MainLayout() {
  return (
    <div className={main}>
      <Header />

      <div className={wrapper}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
