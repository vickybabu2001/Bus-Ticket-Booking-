import React from 'react';
import { Col, Form, message, Row } from "antd";
import { Modal } from 'antd';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import axios from "axios";
import { axiosInstance } from './axiosInstance';
const BusPopModel = ({ show, nonshow, tp = "Add", getData, selectBus,setSelectBus }) => {
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response = null;
            if (tp === "Add") {
                response = await axiosInstance.post("/api/buses/add-bus", values);
            }else {
                response = await axiosInstance.post("/api/buses/update-bus", {
                  ...values,
                  _id: selectBus._id,
                });
              }

            if (response.data.success) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
            getData();
            nonshow(false);
            setSelectBus(null);
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            //dispatch(HideLoading());
        }
    };
    return (
        <Modal
        width={800}
        title={tp === "Add" ? "Add Bus" : "Update Bus"}
        open={show}
        onCancel={() => {
          setSelectBus(null);
          nonshow(false);
        }}
        footer={false}
      >
            <Form layout="vertical" onFinish={onFinish} initialValues={selectBus}>
                <Row gutter={[10, 10]}>
                    <Col lg={24} xs={24}>
                        <Form.Item label="Bus Name" name="name">
                            <input type="text" style={{ width: "100%" }} placeholder='Enter Your Bus Name' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Bus Number" name="number">
                            <input type="text" placeholder='Enter Your Bus Number' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Capacity" name="capacity">
                            <input type="text" placeholder='Enter Total no of Seats' />
                        </Form.Item>
                    </Col>

                    <Col lg={12} xs={24}>
                        <Form.Item label="From" name="from">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="To" name="to">
                            <input type="text" />
                        </Form.Item>
                    </Col>

                    <Col lg={8} xs={24}>
                        <Form.Item label="Journey Date" name="journeyDate">
                            <input type="date" />
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item label="Departure" name="departure">
                            <input type="time" />
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item label="Arrival" name="arrival">
                            <input type="time" />
                        </Form.Item>
                    </Col>

                    <Col lg={12} xs={24}>
                        <Form.Item label="Type" name="type">
                            <select name="" id="">
                                <option value="AC">AC</option>
                                <option value="Non-AC">Non-AC</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Fare" name="fare">
                            <input type="text" />
                        </Form.Item>
                    </Col>

                    <Col lg={12} xs={24}>
                        <Form.Item label="Status" name="status">
                            <select name="" id="">
                                <option value="Yet To Start">Yet To Start</option>
                                <option value="Running">Running</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </Form.Item>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end">
                    <button className="primary-btn" type="submit">
                        Save
                    </button>
                </div>
            </Form>
        </Modal>
    );
}

export default BusPopModel;
