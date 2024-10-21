import { Banner, Table } from "@components/eCommerce";
import DashboardHeader from "@components/eCommerce/DashboardHeader/DashboardHeader";

import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams, { replace: true });
  };
  return (
    <>
      <Banner title="Dashboard" />
      <Container fluid={"md"}>
        <DashboardHeader handleSorting={handleSorting} />
        <Table />
      </Container>
    </>
  );
}
