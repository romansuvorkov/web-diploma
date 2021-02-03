import React, { useEffect, useState, useCallback } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import HallSeat from './HallSeat';
import Api from '../../functions/Api';

function ConfStepHall(props) {

    // const API = new Api;
    const [seats, setSeats] = useState([]);
    const { halls } = useContext(AdminContext);
    const [seatTable, setSeatTable] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const activeHall = props.active;

    useEffect(async () => {
        const tableSeat = [];
        if(halls.length > 0 && activeHall !== 0) {
            // console.log('work');
            const hallForRender = halls.find(item => item.id == activeHall);
            // const rows = halls[activeHall].row;
            // const rowSeats = halls[activeHall].seats;
            // const rows = halls[activeHall].row;
            // const rowSeats = halls[activeHall].seats;
            // console.log(rowSeats);
            if (seats.length === 0) {
                // setSeats(await Api.getShow('seats', halls[activeHall].id));
                setSeats(await Api.getShow('seats', hallForRender.id));
            }
            let counter = 0;
            // console.log(counter);
            // console.log(seats);
            for (let i = 1; i <= hallForRender.row; i += 1) {
                // console.log(rows);                
                // console.log(rowSeats);
                let row = [];
                for (let y = 1; y <= hallForRender.seats; y += 1) {
                    // console.log(seats);
                    row.push(seats[counter]);
                    counter += 1;
                    // setSeatTable(prevState => {
                    //     // Object.assign также будет работать
                    //     return [...prevState, ...row];
                    // });
                }
                tableSeat.push(row);
            }
            setSeatTable(tableSeat);
            // console.log(tableSeat);
            setIsLoaded(true);
        }

    }, [halls, activeHall, seats]);


    return (

        isLoaded && <div className="conf-step__hall">
              <div className="conf-step__hall-wrapper">
                {seatTable.map(o => (
                    // console.log(o)
                    <HallSeat key={o[0].id} data={o} />
                ))}
                {/* <div class="conf-step__row">
                    <span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span>
                    <span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_vip"></span>
                    <span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_vip"></span>
                    <span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_disabled"></span>
                </div> */}
                {/* <span className="conf-step__chair conf-step__chair_standart" onClick={() => console.log(seatTable)}></span>           */}
              </div>  
            </div>
        
    )

  }
  
  export default ConfStepHall;