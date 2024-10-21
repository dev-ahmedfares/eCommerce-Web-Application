import CategorySection from "@components/eCommerce/CategorySection/CategorySection";
import Slider from "@components/eCommerce/Slider/Slider";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container fluid={"md"}>
    <div>
      <Slider />
    </div>
    <div className="my-5">
      {<CategorySection/>}
    </div>
    </Container>
  );
}
