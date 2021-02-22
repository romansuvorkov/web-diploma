import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import HallBtnContainer from './HallBtnContainer';
import Preloader from '../Preloader';
import ConfStepHall from './ConfStepHall';
import Api from '../../functions/Api';

function HallConfig() {

  const { halls } = useContext(AdminContext);
  const [activeHall, setActiveHall] = useState(0);
  const [seats, setSeats] = useState([]);
  const [hallForRender, setHallForRender] = useState([]);
  const [rows, setRows] = useState(0);
  const [seatsInRow, setSeatsInRow] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [seatsIsLoaded, setSeatsIsLoaded] = useState(false);
  const [isRedacting, setIsRedacting] = useState(false);

  useEffect(async () => {
    setIsLoaded(false);
    if (halls.length > 0) {
      if (hallForRender.length === 0) {
        setActiveHall(halls[0].id);
        setHallForRender(halls[0]);
      } else {
        const seatsFromServer = await Api.getShow('seats', hallForRender.id);
        setSeats(seatsFromServer);
        setRows(hallForRender.row);
        setSeatsInRow(hallForRender.seats);
        setIsLoaded(true);
      }
    }     
  }, [halls, hallForRender]);

  useEffect(async () => {
    setIsLoaded(false);
    const seatsFromServer = await Api.getShow('seats', hallForRender.id);
    setSeats(seatsFromServer);
    setRows(hallForRender.row);
    setSeatsInRow(hallForRender.seats);
    setIsLoaded(true);
  }, [activeHall]);



  useEffect(() => {
    if (isRedacting) {
      // if (rows <= 1) {
      //   // setIsRedacting(false);
      //   return;
      // } else if (seatsInRow <= 1) {
      //   // setIsRedacting(false);
      //   return;
      // }
      const arrLength = rows * seatsInRow;
      let seatsArr = [];
      for (let i = 1; i <= arrLength; i += 1) {
        const newObj = {
          id: i,
          hall_id: activeHall,
          seat_number: i,
          status: 1
        };
        seatsArr.push(newObj);
        // setSeats(seatsArr);
        setIsRedacting(false);
      }
      setSeats(seatsArr);
      setSeatsIsLoaded(true);
    }
      setSeatsIsLoaded(true);
  },[seats, rows, seatsInRow]); 

  const handleLabelChange = (e) => {
    setSeatsIsLoaded(false);
    const { name, value } = e.target;

    if (value === '') {
      if (name === 'rows') {
        if (rows == 1) {
          setSeatsIsLoaded(true);
          return;
        }
        setRows(1);
        // setIsRedacting(false);
      } else if (name === 'seats') {
        if (seatsInRow == 1) {
          setSeatsIsLoaded(true);
          return;
        }
        setSeatsInRow(1);
        // setIsRedacting(false);
      }
      return;
    } 
    // else if (rows === 1) {
    //   setSeatsIsLoaded(true);
    // } else if (seatsInRow === 1) {
    //   setSeatsIsLoaded(true);
    // }
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
    setIsLoaded(false);
    setSeatsIsLoaded(false);
    setRows(hallForRender.row);
    setSeatsInRow(hallForRender.seats);
    setSeats([]);
    const seats = await Api.getShow('seats', hallForRender.id);
    setSeats(seats);
    setIsLoaded(true);
  }


    return (
          <div className="conf-step__wrapper">        
            <p className="conf-step__paragraph" onClick={() => console.log(hallForRender)}>Выберите зал для конфигурации:</p>
            <HallBtnContainer active={activeHall} setActive={setActiveHall} setHallForRender={setHallForRender} />
            <p className="conf-step__paragraph" onClick={() => console.log(seatsIsLoaded)}>Укажите количество рядов и максимальное количество кресел в ряду:</p>
            {!isLoaded && <Preloader />}
            {isLoaded && <div className="conf-step__legend">
              {rows && <label className="conf-step__label">Рядов, шт<input type="text" className="conf-step__input" placeholder="10" name="rows" value={rows} onChange={(e) => handleLabelChange(e)}/></label>}
              <span className="multiplier">x</span>
              {seatsInRow && <label className="conf-step__label">Мест, шт<input type="text" className="conf-step__input" placeholder="10" name="seats"value={seatsInRow} onChange={(e) => handleLabelChange(e)}/></label>}
            </div>}
            <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div className="conf-step__legend">
              <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
              <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
              <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
              <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
            </div>
            {(!isLoaded || !seatsIsLoaded ) && <Preloader />}
            {isLoaded && seatsIsLoaded && seats.length > 0 && activeHall !== 0 && <ConfStepHall activeHall={activeHall} seats={seats} rows={rows} setHallForRender={setHallForRender} seatsInRow={seatsInRow} resetChanges={resetChanges} />}

        </div>
    )

  }
  
  export default HallConfig;