import Input from "@components/forms/Input/Input";
import Heading from "@components/shared/Heading/Heading";
import useLogin from "@hooks/useLogin";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const {
    errors,
    handleSubmit,
    register,
    error,
    accessToken,
    loading,
    searchParams,
    onSubmit,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading>User Login</Heading>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}
          {searchParams.get("message") === "login_required" && (
            <Alert variant="success">
              You need to login to view this content
            </Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              register={register}
              name="email"
              error={errors.email?.message}
            />

            <Input
              label="Password"
              register={register}
              name="password"
              type="password"
              error={errors.password?.message}
            />

            <Button
              variant="primary"
              type="submit"
              disabled={loading === "pending"}
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <p className="my-4 text-center ">
              <span style={{color:"var(--primary)",fontWeight:"300"}}>Don't have an account?{" "}</span>
              <Link
                to={"/register"}
                style={{
                  fontWeight: "600",
                  textDecoration: "none",
                  color: "var(--primary)",
                }}
              >
                Register
              </Link>
            </p>
            {error && (
              <Alert variant="danger" className="mt-3 px-3 py-2">
                {error}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}
