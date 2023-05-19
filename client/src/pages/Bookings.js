import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { axiosInstance } from "../components/axiosInstance";
import { Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

const Bookings = () => {
  const { user } = useSelector(state => state.users);
  console.log("use",  user.data._id);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  console.log("setbookings1",bookings);
  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/ticket/get-all-bookings",{}
      )
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  useEffect(() => {
    getBookings();
  }, []);
  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
      
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },];
  console.log("setbookings",bookings);
  return (
    <div>
    <PageTitle title="Ticket Bookings List" />
    <div className="mt-2">
       <Table dataSource={bookings} columns={columns} /> 
    </div>
    </div>
  );
};

export default Bookings;
