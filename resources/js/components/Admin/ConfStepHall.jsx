import React, { useEffect, useState, useCallback } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import InterfaceBtnContainer from './InterfaceBtnContainer';

import Api from '../../functions/Api';

function ConfStepHall(props) {

    const {seats, rows, seatsInRow, activeHall, resetChanges, setHallForRender} = props;
    const [changedSeats, setChangedSeats] = useState([]);
    const { halls, loadFromServer, setHalls } = useContext(AdminContext);
    const [seatTable, setSeatTable] = useState(seats);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      console.log(activeHall);
      console.log('activeHall');
        setIsLoaded(false);
        const tableSeat = [];
        let counter = 0;
        for (let i = 1; i <= rows; i += 1) {
          let row = [];
          for (let y = 1; y <= seatsInRow; y += 1) {
            row.push(seats[counter]);
            counter += 1;
          }
            tableSeat.push(row);
        }
        setSeatTable(tableSeat);
        setChangedSeats(seats);        
        setIsLoaded(true);
    }, [halls, activeHall, seats]);

    const refreshRenderArr = () => {
        const tableSeat = [];
        let counter = 0;
        for (let i = 1; i <= rows; i += 1) {
            let row = [];
            for (let y = 1; y <= seatsInRow; y += 1) {
                row.push(changedSeats[counter]);
                counter += 1;
            }
            tableSeat.push(row);
        }
        setSeatTable(tableSeat);
    }

    const handleStatusChange = (seat) => {
        const index = seat - 1;
        const status = changedSeats[index].status;
        let newStatus;
        if (status + 1 > 2) {
            newStatus = 0;
        } else {
            newStatus = status + 1;
        }
        let newArray = [...changedSeats];
        newArray[index].status = newStatus;
        setChangedSeats(newArray);
        refreshRenderArr();
    }

    const submitChanges = () => {
        try {
           Api.updateSeats('seats', activeHall, changedSeats, rows, seatsInRow); 
        } catch (e) {
            console.log(e);
        }
        setHallForRender([]);
        setHalls([]);
        loadFromServer();
        
    }

    const seatStatus = ['chair_disabled', 'chair_standart', 'chair_vip']

    return (
        
        isLoaded && <>
            <div className="conf-step__hall" onClick={() => console.log(seatTable)}>
              <div className="conf-step__hall-wrapper">
                {rows > 0 && seatsInRow > 0 && seatTable.length > 0 && seatTable.map((row) => (
                  <div className="conf-step__row" key={row[0].id}>
                    { row.map((o) => (
                      <span key={o.id} className={`conf-step__chair conf-step__${seatStatus[o.status]}`} onClick={() => handleStatusChange(o.seat_number)}></span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <InterfaceBtnContainer reset={resetChanges} accept={submitChanges}/>
      
        </>
    )

  }
  
  export default ConfStepHall;