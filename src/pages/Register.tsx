import Heading from "@components/shared/Heading/Heading";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Input from "@components/forms/Input/Input";
import { Link, Navigate } from "react-router-dom";
import useRegister from "@hooks/useRegister";

export default function Register() {
  const {
    register,
    handleSubmit,
    emailCheckAvailability,
    emailAvailabilityStatus,
    onSubmit,
    error,
    accessToken,
    loading,
    errors
  } = useRegister()
  
  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading>User Registration</Heading>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="First Name"
              register={register}
              name="firstName"
              error={errors.firstName?.message}
            />

            <Input
              label="Last Name"
              register={register}
              name="lastName"
              error={errors.lastName?.message}
            />

            <Input
              label="Email"
              register={register}
              name="email"
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : emailAvailabilityStatus === "unavailable"
                  ? "This email is already in use."
                  : ""
              }
              onBlur={emailCheckAvailability}
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
              disable={emailAvailabilityStatus === "checking"}
            />

            <Input
              label="Password"
              register={register}
              name="password"
              type="password"
              error={errors.password?.message}
            />

            <Input
              label="Confirm Password"
              register={register}
              name="confirmPassword"
              type="password"
              error={errors.confirmPassword?.message}
            />

            <Button
              variant="primary"
              type="submit"
              disabled={
                emailAvailabilityStatus === "checking" || loading === "pending"
              }
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
              <span style={{color:"var(--primary)",fontWeight:"300"}}>Already have an account?{" "}</span>
              <Link
                to={"/login"}
                style={{
                  fontWeight: "600",
                  textDecoration: "none",
                  color: "var(--primary)",
                }}
              >
                Login
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
