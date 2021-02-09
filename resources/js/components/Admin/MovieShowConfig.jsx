import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import poster from '../../../images/poster1.jpg';
import poster1 from '../../../images/poster2.jpg';
import Api from '../../functions/Api';
import AddFilmPopup from './AddFilmPopup';

function  MovieShowConfig(props) {

    const { films } = useContext(AdminContext);

    // const [films, setFilms] = useState([]);
    // const [isAddPopup, setIsAddPopup] = useState(false);
    const { handleAdd } = props;

    // useEffect(async () => {
    //     if (films.length === 0) {
    //         setFilms(await Api.getItems('film'));
    //         return;
    //     }
    // },[films]);

    // const handleOnAddClick = () => {
    //   setIsAddPopup(true);
    // }



    return (

            <div className="conf-step__wrapper">
              {/* {isAddPopup && <AddFilmPopup />} */}
            <p className="conf-step__paragraph">
              <button className="conf-step__button conf-step__button-accent" onClick={() => handleAdd(true)}>Добавить фильм</button>
            </p>
            <div className="conf-step__movies">
            {films.length > 0 && films.map((film) => (
                  <div className="conf-step__movie" key={film.id}>
                  <img className="conf-step__movie-poster" alt="poster" src={film.poster} />
                  <h3 className="conf-step__movie-title">{film.name}</h3>
                  <p className="conf-step__movie-duration">{film.duration} минут</p>
                </div>
                ))} 
            </div>
            
            <div className="conf-step__seances">
              <div className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">Зал 1</h3>
                <div className="conf-step__seances-timeline">
                  <div className="conf-step__seances-movie" style={{width: 60 + 'px', backgroundColor: 'rgb(133, 255, 137)', left: 0}}>
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
              </div>
              <div className="conf-step__seances-hall">
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
              </div>
            </div>
            
            <fieldset className="conf-step__buttons text-center">
              <button className="conf-step__button conf-step__button-regular">Отмена</button>
              <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
            </fieldset>  
          </div>

    )

  }
  
  export default MovieShowConfig;