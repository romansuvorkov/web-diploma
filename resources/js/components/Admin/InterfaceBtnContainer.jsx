import React, { useEffect } from 'react';
import { useContext } from 'react';
// import HallButton from './HallButton';
// import AdminContext from './AdminContext';

function InterfaceBtnContainer(props) {

    return (
        <fieldset className="conf-step__buttons text-center">
            <button className="conf-step__button conf-step__button-regular" onClick={props.reset}>Отмена</button>
            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={props.accept}/>
        </fieldset> 
    );
  }
  
  export default InterfaceBtnContainer;