import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import HallBtnContainer from './HallBtnContainer';
import ConfStepHall from './ConfStepHall';

function HallConfig(props) {

  const { halls } = useContext(AdminContext);
  const [activeHall, setActiveHall] = useState(0);

  useEffect(() => {
    if (halls.length > 0) {
      setActiveHall(halls[0].id)      
    }
  }, [halls]);

    return (

        <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <HallBtnContainer active={activeHall} setActive={setActiveHall}/>
            <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            <div className="conf-step__legend">
              <label className="conf-step__label">Рядов, шт<input type="text" className="conf-step__input" placeholder="10" /></label>
              <span className="multiplier">x</span>
              <label className="conf-step__label">Мест, шт<input type="text" className="conf-step__input" placeholder="8" /></label>
            </div>
            <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div className="conf-step__legend">
              <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
              <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
              <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
              <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
            </div>  
            
            <ConfStepHall active={activeHall} />
            <fieldset className="conf-step__buttons text-center">
              <button className="conf-step__button conf-step__button-regular">Отмена</button>
              <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
            </fieldset>                 
        </div>
    )

  }
  
  export default HallConfig;