import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Modal, notification, Form, Input, Select } from "antd";

function MasterData() {
  const [listBooks, setListBooks] = useState([]);
  const [author, setAuthor] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectId, setSelectId] = useState();
  const [writter, setWritter] = useState();
  const [body, setBody] = useState({
    title: "",
    author: "",
    authorId: "3",
    genre: "",
    cover: "",
    desc: "",
  });

  let page = 1;
  let authorName = "";

  const { Option } = Select;
  const { TextArea } = Input;

  const getAll = async () => {
    try {
      const res = await axios.get(`http://localhost:3100/books`);
      res.status == 200 && setListBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWritter = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3100/author/${id}`);
      // setWritter(res.data.value);
      return setBody((prevState) => {
        return {
          ...prevState,
          author: res.data.value,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthor = async () => {
    try {
      const res = await axios.get(`http://localhost:3100/author`);
      res.status == 200 && setAuthor(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (id) => {
    setOpen(true);
    setSelectId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3100/books/${selectId}`);
      notification.open({
        message: "Successfully",
        description: "Your request has been done successfully",
      });
      setOpen(false);
      getAll();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAuthor = (e) => {
    return setBody((prevState) => {
      getWritter(e);
      return {
        ...prevState,
        authorId: e,
      };
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleCancelAdd = () => {
    setOpenAdd(false);
  };

  const onChangeGenre = (value) => {
    return setBody((prevState) => {
      return {
        ...prevState,
        genre: value,
      };
    });
  };

  const onAdd = async () => {
    console.log(body);
    if (
      body.title === "" ||
      body.author === "" ||
      body.authorId === "" ||
      body.cover === "" ||
      body.desc === "" ||
      body.genre === ""
    ) {
      notification.open({
        message: "Please fill all field ",
        description: "Your request has been failure",
      });
    } else {
      try {
        await axios.post("http://localhost:3100/books", body);
        notification.open({
          message: "Successfully",
          description: "Your request has been done successfully",
        });
        setOpenAdd(false);
        getAll();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAll();
    getAuthor();
  }, []);

  return (
    <>
      <div className="container w-50 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="h4 mb-3">Master Data Book</p>

          <button
            onClick={() => setOpenAdd(true)}
            type="button"
            className="btn btn-primary me-3"
          >
            Add book
          </button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center text-capitalize">
              <th>#</th>
              <th>title</th>
              <th>genre</th>
              <th>author</th>
              <th>desc</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listBooks.length !== 0 ? (
              listBooks.map((data, idx) => (
                <tr key={idx}>
                  <td className="text-center" style={{ width: "3rem" }}>
                    {data.id}
                  </td>
                  <td style={{ width: "14" }}>{data.title}</td>
                  <td style={{ width: "6rem" }}>{data.genre}</td>
                  <td style={{ width: "10rem" }}>{data.author}</td>
                  <td>
                    <p style={{ width: "15rem" }} className="text-truncate">
                      {data.desc}
                    </p>
                  </td>
                  <td style={{ width: "10rem" }}>
                    <div className="d-flex justify-content-center">
                      <button
                        onClick={() => showModal(data.id)}
                        type="button"
                        className="btn btn-sm btn-outline-danger me-3"
                      >
                        delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="col-12">
                <td className="p-4 h6 text-center" colSpan="6">
                  Data books not found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal
        title="Delete Data"
        open={open}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this data?</p>
      </Modal>

      <Modal
        title="Add new book"
        open={openAdd}
        onOk={onAdd}
        onCancel={handleCancelAdd}
      >
        <Form className="py-3">
          <Form.Item
            labelCol={{ span: 5 }}
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={body.title}
              onChange={(e) =>
                setBody((prevState) => {
                  return {
                    ...prevState,
                    title: e.target.value,
                  };
                })
              }
              placeholder="input title"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 5 }}
            value={body.author}
            name="author"
            label="Author"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="select a option"
              onChange={handleChangeAuthor}
              allowClear
              options={author.map((e) => ({ label: e.value, value: e.id }))}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 5 }}
            name="cover"
            label="Cover"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="url"
              value={body.cover}
              onChange={(e) =>
                setBody((prevState) => {
                  return {
                    ...prevState,
                    cover: e.target.value,
                  };
                })
              }
              placeholder="input title"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 5 }}
            value={body.genre}
            onChange={(e) =>
              setBody((prevState) => {
                return {
                  ...prevState,
                  genre: e.target.value,
                };
              })
            }
            name="genre"
            label="Genre"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="select a option"
              allowClear
              onChange={onChangeGenre}
            >
              <Option value="fiction">Fiction</Option>
              <Option value="drama">Drama</Option>
              <Option value="romance">Romance</Option>
              <Option value="mystery">Mystery</Option>
              <Option value="horror">Horror</Option>
              <Option value="historical">Historical</Option>
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 5 }}
            value={body.desc}
            onChange={(e) =>
              setBody((prevState) => {
                return {
                  ...prevState,
                  desc: e.target.value,
                };
              })
            }
            name="desc"
            label="Desc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea placeholder="input description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default MasterData;
