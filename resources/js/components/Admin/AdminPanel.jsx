import React, { useEffect } from 'react';
import './admin.css';
import SectionHeader from './SectionHeader'
import backgroundImage from '../../../images/admin/background-admin.jpg';
import HallManagement from './HallManagment';
import HallConfig from './HallConfig';
import API from '../../functions/Api';
import AdminContext from './AdminContext';
import AdminProvider from './AdminProvider';

function AdminPanel() {

    const backgroundImageStyle = `
        background-image: url(${backgroundImage});
        background-color: rgba(0, 0, 0, 0.5);
        background-blend-mode: multiply;
        background-size: cover;
        background-attachment: fixed;
        counter-reset: num;
    `;

    document.body.style  = backgroundImageStyle;
    

    return (
        <AdminProvider >
    <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>
      
      <main className="conf-steps">
        <section className="conf-step">
          <SectionHeader title="Управление залами" />
          <HallManagement />
        </section>
        
        <section className="conf-step">
          <SectionHeader title="Конфигурация залов" />
          <HallConfig />
        </section>
        
        <section className="conf-step">
          <SectionHeader title="Конфигурация цен" />
          <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <ul className="conf-step__selectors-box">
              <li><input type="radio" className="conf-step__radio" name="prices-hall" value="Зал 1" /><span className="conf-step__selector">Зал 1</span></li>
              <li><input type="radio" className="conf-step__radio" name="prices-hall" value="Зал 2" /><span className="conf-step__selector">Зал 2</span></li>
            </ul>
              
            <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
              <div className="conf-step__legend">
                <label className="conf-step__label">Цена, рублей<input type="text" className="conf-step__input" placeholder="0" /></label>
                за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
              </div>  
              <div className="conf-step__legend">
                <label className="conf-step__label">Цена, рублей<input type="text" className="conf-step__input" placeholder="0" /></label>
                за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
              </div>  
            
            <fieldset className="conf-step__buttons text-center">
              <button className="conf-step__button conf-step__button-regular">Отмена</button>
              <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
            </fieldset>  
          </div>
        </section>
        
        <section className="conf-step">
          <SectionHeader title="Сетка сеансов" />
          <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">
              <button className="conf-step__button conf-step__button-accent">Добавить фильм</button>
            </p>
            <div className="conf-step__movies">
              <div className="conf-step__movie">
                <img className="conf-step__movie-poster" alt="poster" src="images/poster.png" />
                <h3 className="conf-step__movie-title">Звёздные войны XXIII: Атака клонированных клонов</h3>
                <p className="conf-step__movie-duration">130 минут</p>
              </div>
              
              <div className="conf-step__movie">
                <img className="conf-step__movie-poster" alt="poster" src="images/poster.png" />
                <h3 className="conf-step__movie-title">Миссия выполнима</h3>
                <p className="conf-step__movie-duration">120 минут</p>
              </div>
              
              <div className="conf-step__movie">
                <img className="conf-step__movie-poster" alt="poster" src="images/poster.png" />
                <h3 className="conf-step__movie-title">Серая пантера</h3>
                <p className="conf-step__movie-duration">90 минут</p>
              </div>
              
              <div className="conf-step__movie">
                <img className="conf-step__movie-poster" alt="poster" src="images/poster.png" />
                <h3 className="conf-step__movie-title">Движение вбок</h3>
                <p className="conf-step__movie-duration">95 минут</p>
              </div>   
              
              <div className="conf-step__movie">
                <img className="conf-step__movie-poster" alt="poster" src="images/poster.png" />
                <h3 className="conf-step__movie-title">Кот Да Винчи</h3>
                <p className="conf-step__movie-duration">100 минут</p>
              </div>            
            </div>
            
            {/* <div className="conf-step__seances">
              <div className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">Зал 1</h3>
                <div className="conf-step__seances-timeline">
                  <div className="conf-step__seances-movie" style="width: 60px; background-color: rgb(133, 255, 137); left: 0;">
                    <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                    <p className="conf-step__seances-movie-start">00:00</p>
                  </div>
                  <div className="conf-step__seances-movie" style="width: 60px; background-color: rgb(133, 255, 137); left: 360px;">
                    <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                    <p className="conf-step__seances-movie-start">12:00</p>
                  </div>
                  <div className="conf-step__seances-movie" style="width: 65px; background-color: rgb(202, 255, 133); left: 420px;">
                    <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                    <p className="conf-step__seances-movie-start">14:00</p>
                  </div>              
                </div>
              </div>
              <div className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">Зал 2</h3>
                <div className="conf-step__seances-timeline">
                  <div className="conf-step__seances-movie" style="width: 65px; background-color: rgb(202, 255, 133); left: 595px;">
                    <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                    <p className="conf-step__seances-movie-start">19:50</p>
                  </div>
                  <div className="conf-step__seances-movie" style="width: 60px; background-color: rgb(133, 255, 137); left: 660px;">
                    <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                    <p className="conf-step__seances-movie-start">22:00</p>
                  </div>              
                </div>
              </div>
            </div> */}
            
            <fieldset className="conf-step__buttons text-center">
              <button className="conf-step__button conf-step__button-regular">Отмена</button>
              <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
            </fieldset>  
          </div>
        </section>
        
        <section className="conf-step">
          <SectionHeader title="Открыть продажи" />
          <div className="conf-step__wrapper text-center">
            <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
            <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
          </div>
        </section>    
      </main>
  </AdminProvider>
    );
  }
  
  export default AdminPanel;