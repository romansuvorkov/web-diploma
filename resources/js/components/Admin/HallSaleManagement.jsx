import React, { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import HallBtnContainer from './HallBtnContainer';
import Api from '../../functions/Api';

function HallSaleManagement() {

    const { halls, setHalls, loadFromServer } = useContext(AdminContext);

    const [activeHall, setActiveHall] = useState(0);
    const [hallForRender, setHallForRender] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    const handleOpenSale = async () => {
        // console.log(hallForRender.is_active);
        let status = hallForRender.is_active === 1 ? 0 : 1;
        const response = Api.openSales('hall', status, activeHall);
        if (response === 'Status update successful') {
            loadFromServer();
        }
    }



    useEffect(() => {
        setIsLoaded(false);
        if (halls.length === 0) {
            return;
        }
        setHallForRender(halls[0]);
        setActiveHall(halls[0].id);
        setIsLoaded(true);
    },[halls]);

        
    return (
        <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <HallBtnContainer active={activeHall} setActive={setActiveHall} setHallForRender={setHallForRender} />
            <div className="conf-step__wrapper text-center">
                <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
                <button className="conf-step__button conf-step__button-accent" onClick={handleOpenSale}>{hallForRender.is_active === 1 ? 'Закрыть продажу билетов' : 'Открыть продажу билетов'}</button>
                {/* {hallForRender.is_active === 1 ? <button className="conf-step__button conf-step__button-accent" onClick={handleOpenSale}>Закрыть продажу билетов</button> : <button className="conf-step__button conf-step__button-accent" onClick={handleOpenSale}>Открыть продажу билетов</button>} */}
            </div>
        </div>
    )

  }
  
  export default HallSaleManagement;