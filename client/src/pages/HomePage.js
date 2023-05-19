import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { axiosInstance } from '../components/axiosInstance';
import { Col, Row, message } from 'antd';
import Busdisplay from './Admin/Busdisplay';
import axios from 'axios';

const HomePage = () => {
  const { user } = useSelector(state => state.users);
  console.log("use", { user });
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [filters = {}, setFilters] = useState({});
  const getBuses = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses", { filters });

      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
        console.log("datarrrr", buses);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBuses();
  }, []);
  return (
    <div>
      <div className='my-3 card p-2 m-3'>
        <Row gutter={10}>
          <Col lg={6} sm={24}>
            <input type='text' value={filters.from} placeholder='From'
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input type='text' value={filters.to} placeholder='To'
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input type='date' value={filters.journeyDate} placeholder='Date'
              onChange={(e) => setFilters({ ...filters, journeyDate: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-1">
              <button className="secondary-btn" onClick={() => getBuses()} style={{ backgroundColor: "yellowgreen" }}>
                Filter
              </button>
              <Col  style={{paddingLeft:"32px"}}>
              <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Applied Filters
            </button>
              </Col>
            </div>

          </Col>

        </Row>
      </div>
      <div className='m-2'>
        <Row gutter={[15, 15]}>
          {buses.filter(bus => bus.status === "Yet To Start").map((bus) => (
            <Col lg={12} xs={23} sm={24}>
              <Busdisplay bus={bus} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
