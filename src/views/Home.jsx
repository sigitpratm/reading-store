import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  const navigate = useNavigate();
  const [listBooks, setListBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  let page = 1;

  const getAll = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3100/books?_page=${page}&_limit=3&_sort=id&_order=desc`
      );
      setLoading(false);
      res.status == 200 && setListBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = async () => {
    setLoading(true);
    ++page;
    if (page + 1 !== null || page + 1 !== undefined) {
      await getAll();
    }
    setLoading(false);
  };

  const prevPage = async () => {
    setLoading(true);
    --page;
    if (page + 1 !== null || page + 1 !== undefined) {
      await getAll();
    }
    setLoading(false);
  };

  const onDetail = (id) => {
    console.log(id);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="container w-50 pt-5">
      <p className="h4 mb-4 text-center">Books Store</p>

      {loading ? (
        <p className="p-5 h3 fw-medium text-center">Loading...</p>
      ) : (
        <div className="row row-cols-12 gap-3">
          {listBooks.length !== 0 ? (
            listBooks.map((data, idx) => (
              <Card
                key={idx}
                style={{ minWidth: "18rem" }}
                className={"col-2 p-2"}
              >
                <Card.Img
                  variant="top"
                  style={{ height: "22rem", objectFit: "cover" }}
                  src={data.cover}
                />
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text className="text-truncate">{data.desc}</Card.Text>
                  <Button
                    onClick={() => navigate(`/detail/${data.id}`)}
                    variant="primary"
                  >
                    See More
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="col-12 text-center text-white h3 py-5 bg-primary opacity-25 rounded-md">
              <p>No Book Found</p>
            </div>
          )}

          <div className="d-flex gap-4 justify-content-center mt-4">
            <button
              onClick={prevPage}
              type="button"
              className="btn btn-outline-secondary"
            >
              Prev
            </button>
            <button
              onClick={nextPage}
              type="button"
              className="btn btn-outline-primary"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
