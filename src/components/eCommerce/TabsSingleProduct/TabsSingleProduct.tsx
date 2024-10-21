import { Button, Container, Form, Tab, Tabs } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/index";
import StaticStarsRating from "../StaticStarsRating/StaticStarsRating";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import StarsRating from "../StarsRating/StarsRating";
import Input from "@components/forms/Input/Input";
import { reviewSchema, TReviewType } from "@validation/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const { tabsParent, tab } = styles;

export default function TabsSingleProduct({
  weight,
  color,
  dimensions,
  material,
  title,
  id,
}: TProduct) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TReviewType>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit: SubmitHandler<TReviewType> = (data) => {
    const reviewInfo = {
      ...data,
      // staticElement muse include dynamic id for user
      userId: 1,
      productId: id,
    };
    console.log(reviewInfo);
  };
  
  return (
    <div className={tabsParent}>
      <Container fluid={"md"}>
        <Tabs
          defaultActiveKey="additionalInformation"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="additionalInformation"
            title="Additional information"
            className={tab}
          >
            {/* staticElement */}
            <div>
              <span>Wight:</span>
              <span> {weight} kg</span>
            </div>
            <div>
              <span>Color:</span>
              <span className="text-capitalize"> {color?.join(", ")}</span>
            </div>
            <div>
              <span>Dimensions:</span> <span>{dimensions?.join(" x ")} cm</span>
            </div>
            <div>
              <span>Material:</span>
              <span className="text-capitalize"> {material?.join(", ")}</span>
            </div>
          </Tab>
          <Tab eventKey="review" title="Review" className={tab}>
            <div>
              <h4>1 review for {title}</h4>
              <ul>
                {/* when add array of review must check the length to add overflow-y:scroll to css if length greater than 3 */}
                <li>
                  <div>
                    <img
                      src="https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg"
                      alt="user..."
                    />
                    <div>
                      <StaticStarsRating size={17} rating={5} />
                      <p>
                        <span>User Name</span> - <span>08.02.2024</span>
                      </p>
                      <p>user review here!</p>
                    </div>
                  </div>
                </li>
              </ul>
              <div>
                <span>Add a review</span>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Controller
                      name="rating"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <StarsRating size={22} onSetRating={field.onChange} />
                      )}
                    />
                    <Form.Text muted>
                      {errors.rating?.message && (
                        <span className="text-danger">( Required )</span>
                      )}
                    </Form.Text>
                  </div>

                  <Input
                    label="Your review"
                    name="review"
                    register={register}
                    error={errors.review?.message}
                    as="textarea"
                  />

                  <Button
                    variant="primary"
                    type="submit"
                    // disabled={loading === "pending"}
                  >
                    {/* {loading === "pending" ? (
                      <>
                        <Spinner animation="border" size="sm" /> Loading...
                      </>
                    ) : ( */}
                    "Submit"
                    {/* )} */}
                  </Button>
                </Form>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}
