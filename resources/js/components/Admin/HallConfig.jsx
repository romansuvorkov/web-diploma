import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import HallBtnContainer from './HallBtnContainer';
import ConfStepHall from './ConfStepHall';
import Api from '../../functions/Api';

function HallConfig() {

  const { halls } = useContext(AdminContext);
  const [activeHall, setActiveHall] = useState(1);
  const [seats, setSeats] = useState([]);
  const [hallForRender, setHallForRender] = useState([]);
  const [rows, setRows] = useState(0);
  const [seatsInRow, setSeatsInRow] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [seatsIsLoaded, setSeatsIsLoaded] = useState(false);
  const [isRedacting, setIsRedacting] = useState(false);
  // const [seatTable, setSeatTable] = useState([]);

  useEffect(async () => {
    setIsLoaded(false);
    // setSeatsIsLoaded(false);
    if (halls.length > 0) {
      if (hallForRender.length === 0) {
        setHallForRender(halls.find(item => item.id == activeHall));
      } else {
        console.log('trouble');
        setSeats(await Api.getShow('seats', hallForRender.id));
        // setSeatsIsLoaded(true);
        setRows(hallForRender.row);
        setSeatsInRow(hallForRender.seats);
        setIsLoaded(true);
      }
        // setIsLoaded(true);
    }
  }, [halls, hallForRender]);

  useEffect(() => {
    setSeatsIsLoaded(false);
    // console.log('work use effect seats');
    if (isRedacting) {
      console.log('work Redacting');
      if (rows <= 0) {
        return;
      } else if (seatsInRow <= 0) {
        return;
      }
      const arrLength = rows * seatsInRow;
      let seatsArr = [];
      for (let i = 1; i <= arrLength; i += 1) {
        const newObj = {
          id: i,
          hall_id: activeHall,
          seat_number: i,
          status: 1
        };
        // console.log('counter');
        // console.log(newObj);
        seatsArr.push(newObj);
        setSeats(seatsArr);
        setIsRedacting(false);
        setSeatsIsLoaded(true);
      }
    }
    // if(seats.length !== 0 && !isRedacting) {
    //   console.log('work for cycle for tableseat in use effect');
    //   const tableSeat = [];
    //   let counter = 0;
    //   for (let i = 1; i <= rows; i += 1) {
    //     let row = [];
    //     for (let y = 1; y <= seatsInRow; y += 1) {
    //       row.push(seats[counter]);
    //       counter += 1;
    //     }
    //       tableSeat.push(row);
    //   }
      // setSeatTable(tableSeat);
      setSeatsIsLoaded(true);
    // }
  },[seats, rows, seatsInRow]); 

  const handleLabelChange = (e) => {
    setSeatsIsLoaded(false);
    const { name, value } = e.target;
    if (value === '') {
      if (name === 'rows') {
        setRows(0);
      } else if (name === 'seats') {
        setSeatsInRow(0);
      }
      return;
    }
    let number;
    try { 
      number = Number.parseInt(value, 10); 
    } catch {
       return; 
    }
    if (name === 'rows') {
      setRows(number);
    } else if (name === 'seats') {
      setSeatsInRow(number);
    }
    setIsRedacting(true);
  }

  const resetChanges = async () => {
    setSeats(await Api.getShow('seats', hallForRender.id));
  }


    return (

            <div className="conf-step__wrapper">        
            <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <HallBtnContainer active={activeHall} setActive={setActiveHall} setHallForRender={setHallForRender} />
            <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            {isLoaded && <div className="conf-step__legend">
              <label className="conf-step__label">Рядов, шт<input type="text" className="conf-step__input" placeholder="10" name="rows" value={rows} onChange={(e) => handleLabelChange(e)}/></label>
              <span className="multiplier">x</span>
              <label className="conf-step__label">Мест, шт<input type="text" className="conf-step__input" placeholder="10" name="seats"value={seatsInRow} onChange={(e) => handleLabelChange(e)}/></label>
            </div>}
            <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div className="conf-step__legend">
              <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
              <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
              <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
              <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
            </div>  
            
            {isLoaded && seatsIsLoaded && seats.length > 0 && activeHall !== 0 && <ConfStepHall activeHall={activeHall} seats={seats} rows={rows} setHallForRender={setHallForRender} seatsInRow={seatsInRow} resetChanges={resetChanges} />}

        </div>
    )

  }
  
  export default HallConfig;