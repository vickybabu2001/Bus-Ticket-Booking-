import React, { useEffect, useState } from 'react';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { Col, Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../../components/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import SeatSelection from './SeatSelection';
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';
const UserBooking = () => {
  const [selectedSeats, SeatSelectedSeats] = useState([]);
  let myImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCcmYMEEt2SLd9yB4yTuAPKSXHydQjWZpSnA&usqp=CAU"
  const [bus, setBus] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const[email,setEmail]=useState('vickybabu2001ara0@gmail.com');
  const navigate = useNavigate();
  //console.log(params.id);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/sendConfirmationEmail', {
        email,
      });

      if (response.status === 200) {
        // Email sent successfully
        console.log('Email sent!');
        // Handle success message or redirect
      } else {
        // Error sending email
        console.error('Failed to send email');
        // Handle error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error message
    }
  };

  

//default BookingForm;
//Make sure you have Axios installed in your project (npm install axios) and the necessary backend code to handle the API request at the /api/sendConfirmationEmail endpoint.







  
  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/ticket/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
        transactionId,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        handleSubmit();
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/ticket/payment", {
        token,
        amount: selectedSeats.length * bus.fare * 100,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", { _id: params.id });
      console.log("/get-bus-by-id", response);
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, []);
  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={[40, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <div className='card flex'>
              <h4 className="text-2xl primary-text">{bus.name}</h4>
              <h5 className="text-md">
                {bus.from} - {bus.to}
              </h5>
              <hr />
              <div className='d-flex'>
                <div className='flex flex-column'>
                  <p className="text-md" style={{ fontSize: "4px" }}>
                    <h5>Jourey Date : {bus.journeyDate}</h5>
                  </p>
                  <p className="text-md">
                    TicketPrice : $ {bus.fare} /-
                  </p>
                  <p className="text-md">
                    Departure Time : {bus.departure}
                  </p>
                  <p className="text-md">
                    Arrival Time : {bus.arrival}
                  </p>
                  <p className="text-md">
                    Capacity : {bus.capacity}
                  </p>


                  <hr />
                  <div className="flex flex-col gap-2">
                    <h6 className="text-2xl">
                      You have Prefer these Seats no for your Journey: {selectedSeats.join(", ")} Thank you!
                    </h6>
                    <hr></hr>
                    <h3 className="text-2xl mt-2">
                      Total-Tickets-Price:${bus.fare * selectedSeats.length} /-
                    </h3>
                    <StripeCheckout
                     billingAddress
                      token={onToken}
                     amount={bus.fare * selectedSeats.length * 100}
                     currency="INR"
                     stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
                    ><button
                      className={`primary-btn ${selectedSeats.length === 0 && "disabled-btn"
                        }`}

                      disabled={selectedSeats.length === 0}
                    >
                        Book Now
                      </button>
                    </StripeCheckout>
                  </div>

                </div>
                <div>
                  <img src={myImage} className='imgd' alt='image' />
                </div>
              </div>

            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection selectedSeats={selectedSeats} SeatSelectedSeats={SeatSelectedSeats} bus={bus} />
          </Col>
        </Row>
      )}

    </div>
  );
}

export default UserBooking;
