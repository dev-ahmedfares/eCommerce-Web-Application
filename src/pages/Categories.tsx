import { Category } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import GridList from "@components/shared/GridList/GridList";
import Heading from "@components/shared/Heading/Heading";
import useCategories from "@hooks/useCategories";

import { Container, Row } from "react-bootstrap";

export default function Categories() {
  const { loading, records, error } = useCategories();

  return (
    <Container>
      <Heading>Category</Heading>
      <Loading status={loading} error={error} type="category">
        <Row>
          {/* Render Props Pattern */}
          <GridList
            message="There are no categories"
            records={records}
            renderItem={(record) => <Category {...record} />}
          />
        </Row>
      </Loading>
    </Container>
  );
}
