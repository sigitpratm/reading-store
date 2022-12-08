import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailData() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);

  const getDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:3100/books/${id}`);
      res.status == 200 && setDetail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="container w-75 pt-5">
      <div className="row row-cols-12">
        <div className="col-4">
          <img
            style={{ height: "38rem", objectFit: "cover" }}
            className="w-100 rounded-4 shadow"
            src={detail.cover}
            alt=""
          />
        </div>
        <div className="col-8 ps-5">
          <h1 className="mb-3">{detail.title}</h1>
          <div className="mb-4">
            <p className="fw-semibold h4  ">Description</p>
            <p className="h5 fw-normal">{detail.desc}</p>
          </div>
          <p className="h5 fw-normal mb-4">
            <span className="fw-semibold">Author</span> : {detail.author}
          </p>
          <p className="h5 fw-normal mb-4">
            <span className="fw-semibold">Genre</span> : {detail.genre}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailData;
