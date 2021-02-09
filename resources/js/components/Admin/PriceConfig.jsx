import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import HallBtnContainer from './HallBtnContainer';
import InterfaceBtnContainer from './InterfaceBtnContainer';
import Api from '../../functions/Api';

function PriceConfig() {

    const { halls, loadFromServer } = useContext(AdminContext);
    const [activeHall, setActiveHall] = useState(0);
    const [hallForRender, setHallForRender] = useState([]);
    const [price, setPrice] = useState(0);
    const [vipPrice, setVipPrice] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        if (halls.length === 0) {
            return;
        }
        if(hallForRender.length === 0) {
            setVipPrice(halls[0].vip_price);
            setPrice(halls[0].price);
            setActiveHall(halls[0].id);
            setHallForRender(halls[0]); 
        } else {
            setVipPrice(hallForRender.vip_price);
            setPrice(hallForRender.price);
        }
        setIsLoaded(true);

    },[halls, activeHall]); 

    const handleLabelChange = (e) => {
        const { name, value } = e.target;
        if (value === '') {
          if (name === 'standart') {
            setPrice(0);
          } else if (name === 'vip') {
            setVipPrice(0);
          }
          return;
        }
        let number;
        try { 
          number = Number.parseInt(value, 10); 
        } catch {
           return; 
        }
        if (name === 'standart') {
            setPrice(number);
        } else if (name === 'vip') {
            setVipPrice(number);
        }
    }

    const resetChanges = () => {
        setVipPrice(hallForRender.vip_price);
        setPrice(hallForRender.price);
    }

    const submitChanges = () => {
        try {
           Api.updateHallPrice('hall', activeHall, price, vipPrice); 
        } catch (e) {
            console.log(e);
        }
        setIsLoaded(false);
        setHallForRender([]);
        loadFromServer();
    }


    return (
        <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <HallBtnContainer active={activeHall} setActive={setActiveHall} setHallForRender={setHallForRender} />
              
            <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
              {isLoaded && <div className="conf-step__legend">
                <label className="conf-step__label">Цена, рублей<input type="text" name="standart" className="conf-step__input" placeholder="0" value={price} onChange={(e) => handleLabelChange(e)}/></label>
                за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
              </div>}  
              {isLoaded && <div className="conf-step__legend">
                <label className="conf-step__label">Цена, рублей<input type="text" name="vip" className="conf-step__input" placeholder="0" value={vipPrice} onChange={(e) => handleLabelChange(e)}/></label>
                за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
              </div>}
            
              <InterfaceBtnContainer reset={resetChanges} accept={submitChanges} />
          </div>
    )

  }
  
  export default PriceConfig;