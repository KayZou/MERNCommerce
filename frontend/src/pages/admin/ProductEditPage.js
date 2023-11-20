import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

export default function ProductEditPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: { product } = {},
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(id);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingImage, error: uploadError }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated");
      navigate("/admin/productlist");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    if (e.target.files && e.target.files.length > 0) {
      formData.append("image", e.target.files[0]);
      console.log(e.target.files[0]);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        console.log(err);
      }
    } else {
      toast.error("No file selected");
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose File"
                name="image"
                onChange={(e) => uploadFileHandler(e)}
              />
              {loadingImage && <Loader />}
              {uploadError && <Message variant="danger">{uploadError?.data?.message}</Message>}
            </Form.Group>

            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}
