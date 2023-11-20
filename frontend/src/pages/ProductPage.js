import {
  useGetProductByIdQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/CartSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import products from "../Products";
import { Link } from "react-router-dom";
import {
  Form,
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

function ProductPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: productId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError: error,
    refetch,
  } = useGetProductByIdQuery(productId);

  const [createReview, { isLoading: loadingReviews, error: reviewError }] =
    useCreateReviewMutation();

  if (!data || !data.product) {
    // return <Message variant="danger">Product not found</Message>;
    return <Loader />;
  }

  const product = data.product;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  // console.log(product);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {error ? (
        <Message>{error?.data.message || error.error}</Message>
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Price: {product.price}$</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Description: {product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong> {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        <strong>
                          {" "}
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingReviews && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingReviews}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductPage;
