import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
function Order() {
  const { id } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(id);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(id).unwrap();
      refetch();
      toast.success("Oder Delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.message}</Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      {" "}
                      Delivered on: {new Date(order.deliveredAt).toLocaleDateString("en-US", { dateStyle: "long" })}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">
                      {" "}
                      Paid on:{" "}
                      {new Date(order.paidAt).toLocaleDateString("en-US", { dateStyle: "long" })}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <h2>Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {/* PAY ORDER PLACEHOLDER */}
                  {/* MARK AS DELIVERED PLACEHOLDER */}
                  {loadingDeliver && <Loader />}
                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverOrderHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default Order;
