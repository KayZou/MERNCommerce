import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function SearchBox() {
  const { keyword: Keyword } = useParams();

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(Keyword || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for a product"
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button type="submit" variant="primary" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
}
