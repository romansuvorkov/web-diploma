import React, { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import poster from '../../../images/poster1.jpg';
import poster1 from '../../../images/poster2.jpg';
import Api from '../../functions/Api';
import AddFilmPopup from './AddFilmPopup';
import AddMovieShowPopup from './AddMovieShowPopup';


function  MovieShowConfig() {

    const { halls } = useContext(AdminContext);

    const [movieShows, setMovieShows] = useState(false);
    const [isAddPopup, setIsAddPopup] = useState(false);
    const [isAddMovieShow, setIsAddMovieShow] = useState(false);
    const [films, setFilms] = useState([]);

    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const today = now.getFullYear()+"-"+(month)+"-"+(day);

    const [activeDate, setActiveDate] = useState(today);
    const [draggedFilm, setDraggedFilm] = useState({});
    const [activeHall, setActiveHall] = useState(false);
    const [addMovieShowErr, setAddMovieShowErr] = useState('');




    useEffect(async () => {
      setMovieShows(await Api.getMovie('movie', today));
      setFilms(await Api.getItems('film'));
    },[]);

    const handleAddFilmSubmit = async(e, film, file) => {
      e.preventDefault();
      // console.dir(fileRef.current.files[0]);
      // console.log(fileRef.current.files[0]);
      let response = await Api.storeFilm('film', film, file);
      // console.log(test);
      if(response === 'New film added') {
          setIsAddPopup(false);
          setFilms(await Api.getItems('film'));
      }
    }

    const handleAddMovieShow = async(e, film, hallId, startTime) => {
      e.preventDefault();
      const hour = Number.parseInt(startTime.substr(0, 2));
      const minutes = Number.parseInt(startTime.substr(3));
      const movieShowStart = hour * 60 + minutes;
      console.log(movieShowStart);
      for (let item of movieShows) {
        if (hallId === item.hall_id) {
          const start = Number.parseInt(item.start_time);
          const end = Number.parseInt(item.start_time) + item.movie_show_duration;
          // console.log(start);
          // console.log(end);
          // console.log(start < movieShowStart && movieShowStart < end);
          if ( start < movieShowStart && movieShowStart < end ) {
            setAddMovieShowErr(`Сеанс пересекается по веремени с сеансом ${item.id}`);
            return;
          }
          // console.log('start < movieShowStart && movieShowStart < end');
          // console.log(start < movieShowStart && movieShowStart < end);
          // console.log('start < movieShowStart + film.duration && movieShowStart + film.duration < end ');
          // console.log(start < movieShowStart + film.duration && movieShowStart + film.duration < end );
          // console.log('start');
          // console.log(start);
          // console.log('movieShowStart + film.duration ');
          // console.log(movieShowStart + film.duration);
          // console.log('end');
          // console.log(end);
          // console.log('start > movieShowStart && movieShowStart + film.duration > end');
          // console.log(start > movieShowStart && movieShowStart + film.duration > end);
          if ( start < movieShowStart + film.duration && movieShowStart + film.duration < end ) {
            setAddMovieShowErr(`Сеанс пересекается по веремени с сеансом ${item.id}`);
            return;
          }
          if ( start > movieShowStart && movieShowStart + film.duration > end ) {
            setAddMovieShowErr(`Сеанс пересекается по веремени с сеансом ${item.id}`);
            return;
          }
          setAddMovieShowErr('');
          console.log('film.duration');
          console.log(film.duration);
          let response = await Api.storeMovie('movie', film.id, hallId, movieShowStart, film.duration, activeDate);
          // console.log(test);
          if(response === 'New movie show added') {
              setIsAddMovieShow(false);
              setMovieShows(await Api.getMovie('movie', activeDate));
          }
        }
        
      }
      // console.log("Работает правильно");


    }

    const handleDateChange = (e) => {
      const {target} = e;
      setActiveDate(target.value);
      console.log(activeDate);
    }

    const handleDate = async () => setMovieShows(await Api.getMovie('movie', activeDate));

    const handleDragStart = (o) => {
      setDraggedFilm(o);
      console.log(draggedFilm);
    }

    const handleDragEnd = (e, hall) => {
      e.preventDefault();
      const {target} = e;
      if(target.classList.contains('conf-step__seances-timeline')) {
        target.style.backgroundColor = 'transparent';
      }
      setIsAddMovieShow(true);
      setActiveHall(hall);
    }

    const handleDragOver = (e) => {
      e.preventDefault();
      const {target} = e;
      if(target.classList.contains('conf-step__seances-timeline')) {
        target.style.backgroundColor = 'grey';
      }
    }

    const handleDragLeave = (e) => {
      const {target} = e;
      if(target.classList.contains('conf-step__seances-timeline')) {
        target.style.backgroundColor = 'transparent';
      }
    }

  
    // const handleOnAddClick = () => {
    //   setIsAddPopup(true);
    // }



    return (
            <div className="conf-step__wrapper">
              {isAddPopup && <AddFilmPopup handleClose={setIsAddPopup} handleSubmit={handleAddFilmSubmit}/>}
              {isAddMovieShow && activeHall && <AddMovieShowPopup error={addMovieShowErr} film={draggedFilm} hall={activeHall} handleClose={setIsAddMovieShow} handleSubmit={handleAddMovieShow}/>}
            <p className="conf-step__paragraph">
              <button className="conf-step__button conf-step__button-accent" onClick={() => {setIsAddMovieShow(true); console.log(isAddMovieShow);}}>Добавить сеанс</button>
              <button className="conf-step__button conf-step__button-accent" onClick={() => setIsAddPopup(true)}>Добавить фильм</button>
              <button className="conf-step__button conf-step__button-accent" onClick={handleDate}>Выбрать дату</button>
              {activeDate && <input type="date" name="date" value={activeDate} min={today} onChange={(e) => handleDateChange(e)}></input>}
            </p>
            <div className="conf-step__movies">
            {films.length > 0 && films.map((film) => (
                  <div className="conf-step__movie" key={film.id} 
                  draggable={true} onDragStart={() => handleDragStart(film)}
                  >
                  <img className="conf-step__movie-poster" alt="poster" src={film.poster} />
                  <h3 className="conf-step__movie-title">{film.name}</h3>
                  <p className="conf-step__movie-duration">{film.duration} минут</p>
                </div>
                ))} 
            </div>
            
            <div className="conf-step__seances">
              {halls.length > 0 && halls.map((hall) => (
                    <div key={hall.id} className="conf-step__seances-hall">
                    <h3 className="conf-step__seances-title">{hall.name}</h3>
                    <div className="conf-step__seances-timeline" 
                      onDragOver={(e) => handleDragOver(e)}
                      onDragLeave={(e) => handleDragLeave(e)}
                      onDrop={(e) => handleDragEnd(e, hall)}
                    >
                      {movieShows && movieShows.map((movie) => (
                      movie.hall_id === hall.id && <div key={movie.id} className="conf-step__seances-movie" style={{width: 100*movie.movie_show_duration/1440 + '%', backgroundColor: 'rgb(202, 255, 133)', left: 100*movie.start_time/1440 + '%'}}>
                        <p className="conf-step__seances-movie-title">{movie.film_id}</p>
                        <p className="conf-step__seances-movie-start">{movie.start_time}</p>
                      </div>))}
                    </div>
                  </div>
              ))}
              {/* <div className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">Зал 1</h3>
                <div className="conf-step__seances-timeline">
                  <div className="conf-step__seances-movie" style={{width: 20 + '%', backgroundColor: 'rgb(133, 255, 137)', left: 0}}>
                    <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                    <p className="conf-step__seances-movie-start">00:00</p>
                  </div>
                  <div className="conf-step__seances-movie" style={{width: 60 + 'px', backgroundColor: 'rgb(133, 255, 137)', left: 360 + 'px'}}>
                    <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                    <p className="conf-step__seances-movie-start">12:00</p>
                  </div>
                  <div className="conf-step__seances-movie" style={{width: 65 + 'px', backgroundColor: 'rgb(202, 255, 133)', left: 420 + 'px'}}>
                    <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                    <p className="conf-step__seances-movie-start">14:00</p>
                  </div>              
                </div>
              </div> */}
              {/* <div className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">Зал 2</h3>
                <div className="conf-step__seances-timeline">
                  <div className="conf-step__seances-movie" style={{width: 65 + 'px', backgroundColor: 'rgb(202, 255, 133)', left: 595 + 'px'}}>
                    <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                    <p className="conf-step__seances-movie-start">19:50</p>
                  </div>
                  <div className="conf-step__seances-movie" style={{width: 60 + 'px', backgroundColor: 'rgb(133, 255, 137)', left: 66 + 'px'}}>
                    <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                    <p className="conf-step__seances-movie-start">22:00</p>
                  </div>              
                </div>
              </div> */}
            </div>
            
            <fieldset className="conf-step__buttons text-center">
              <button className="conf-step__button conf-step__button-regular">Отмена</button>
              <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
            </fieldset>  
          </div>
    )

  }
  
  export default MovieShowConfig;