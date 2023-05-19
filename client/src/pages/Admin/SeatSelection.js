import { Col, Row } from 'antd';
import React from 'react';
import "../../resources/components.css";
const SeatSelection = ({ selectedSeats, SeatSelectedSeats, bus }) => {
    console.log("bus", bus);
    console.log("bus.seatsBooked", bus.seatsBooked);
    const capacity = bus.capacity;

    const selectOrUnselectSeats = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            SeatSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            SeatSelectedSeats([...selectedSeats, seatNumber]);
        }
    };
    
    console.log("llllpp", selectedSeats);
    return (
        <div>
            <div className='bus-container'>
                <Row>
                    {Array.from(Array(capacity).keys()).map((seat) => {

                        let seatClass = ''
                        if (selectedSeats.includes(seat + 1)) {
                            seatClass = 'selected-seat'
                        } 
                        else if(bus.seatsBooked && bus.seatsBooked.includes(seat+1)) {
                            seatClass = 'booked-seat'
                          }

                        return (
                            <Col span={6}>
                                <div className={`seat ${seatClass}`} onClick={() => selectOrUnselectSeats(seat + 1)}>
                                    {seat + 1}
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </div >
    );
}

export default SeatSelection;
