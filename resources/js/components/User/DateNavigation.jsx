import React, { useEffect, useState, useContext } from 'react';
import UserContext from './UserContext';
import Api from '../../functions/Api';

function DateNavigation() {

  const { setMovieShows, movieShows } = useContext(UserContext);

  const now = new Date();
  const day = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const today = now.getFullYear()+"-"+(month)+"-"+(day);
  const [daysData, setDaysData] = useState([]);
  const [activeDate, setActiveDate] = useState(0);
  // const [test, setTest] = useState([]);

  useEffect(async () => {
      const schedule = await Api.getMovie('movie_hall', today);
      setMovieShows(schedule);
      calendarLoad();
  },[]);

    const calendarLoad = () => {
      const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      const dateArray = [];
      for (let i = 0; i < 8; i += 1) {
        const newDate = new Date();
        newDate.setDate(new Date().getDate() + i);
        const dayOfWeek = newDate.getDay();
        const day = ("0" + newDate.getDate()).slice(-2);
        const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
        const dateString = newDate.getFullYear()+"-"+(month)+"-"+(day);
        const newObject = {
          day: days[dayOfWeek],
          api: dateString,
          active: false,
          date: day,
          id: i
        }
        if (newObject.api === today) {
            newObject.active = true;
        }
        dateArray.push(newObject);
      }
      setDaysData(dateArray); 
    }

    const handleDateClick = async (index, date) => {
        setActiveDate(index);
        const schedule = await Api.getMovie('movie_hall', date);
        console.log(schedule);
        setMovieShows(schedule);
    }

    const handleNextClick = async () => {
        if (activeDate + 1 >= daysData.length) {
            return;
        }
        const nextDay = activeDate + 1;
        setActiveDate(nextDay);
        const schedule = await Api.getMovie('movie_hall', daysData[nextDay].api);
        console.log(schedule);
        setMovieShows(schedule);
        // console.log(movieShows);
    }


    return (
        <nav className="page-nav">
        {daysData && daysData.map((day) => (
          <a className={`
          ${day.id === activeDate ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day'} 
          ${day.api === today ? 'page-nav__day_today' : ''} 
          ${(day.day === 'сб' || day.day === 'вс') ? 'page-nav__day_weekend' : ''}`} 
          onClick={() => handleDateClick(day.id, day.api)}
          href="#" key={day.date}>
            <span className="page-nav__day-week">{day.day}</span><span className="page-nav__day-number">{day.date}</span>
        </a>
        ))}
        <a className="page-nav__day page-nav__day_next" onClick={async () => {handleNextClick()}} href="#">
        </a>
      </nav>
    );
  }
  
  export default DateNavigation;