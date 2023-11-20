import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/usersApiSlice";

function UserEditPage() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(id);

  const [updateUser, { isLoading: loadingUpdate, error: errorUpdate }] =
    useUpdateUserMutation();

  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      _id: user._id,
      name,
      email,
      isAdmin,
    };
    console.log(updatedUser);
    const res = await updateUser(updatedUser);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    }
  };

  return (
    <>
      <Button variant="primary">
        <Link to="/admin/userlist">Go Back</Link>
      </Button>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : errorUpdate ? (
          <Message variant="danger">
            {errorUpdate?.data?.message || errorUpdate.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default UserEditPage;
