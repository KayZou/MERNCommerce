import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import products from '../Products'
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  console.log(data);

  if (!data || !data.products) {
    // return <Message variant="danger">No Products found</Message>;
    return <Loader />;
  }

  const products = data.products;
  return (
    <>
    {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-light">Go Back</Link> }
      {error ? (
        <Message> {error?.data.message || error.error} </Message>
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <Meta />
          <h1>Latest Products:</h1>
          <Row>
            {products?.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
