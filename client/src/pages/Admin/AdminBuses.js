import React, { useEffect, useState } from 'react';
import { message, Table } from "antd";
import axios from "axios";
import PageTitle from '../../components/PageTitle';
import BusPopModel from '../../components/BusPopModel';
import { axiosInstance } from '../../components/axiosInstance';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import "../../resources/auth.css";
const AdminBuses = () => {
  const dispatch = useDispatch();
  const [show, notshow] = useState(false);
  const [buses, setBuses] = useState([]);
  const [selectBus, setSelectBus] = useState(null);
  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses");
      console.log(response);
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const deleteBus = async (id) => {
    try {
      dispatch(ShowLoading());
      prompt("Are You Sure To Delete");
      const response = await axiosInstance.post("/api/buses/delete-bus", {
        _id: id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getBuses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            class="ri-delete-bin-line"
            onClick={() => {
              deleteBus(record._id);
            }}
          ></i>

          <i
            class="ri-pencil-line"
            onClick={() => {
              setSelectBus(record);
              notshow(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBuses();
  }, []);
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <PageTitle title='Buses' />
        <button className='primary-btn' style={{ background: "red" }}
          onClick={() => notshow(true)}
        >Add Bus</button>
      </div>
      <Table columns={columns} dataSource={buses} />
      {show && <BusPopModel show={show} nonshow={notshow}
        getData={getBuses} tp={selectBus ? "edit" : "Add"} selectBus={selectBus} setSelectBus={setSelectBus} />}
    </div>
  );
}

export default AdminBuses;
