function PopupWithForm(props) {

  
  return (
    <div className={`popup popup-${props.name}${props.isOpen?' popup_opened':''}`}>
      <div className="popup__container">
        <form onSubmit={(e)=>props.onSubmit(e)} className="form" name={props.name} noValidate>
          <h2 className="form__title">{props.title}</h2>
          <fieldset className="form__input-container">
            {props.children}
          </fieldset>
          <button type="submit" className={`form__button${props.isButtonDisabled?' form__button_disabled':''}`}>
            {props.buttonText}
          </button>
        </form>
        <button onClick={props.onClose} type="button" className="popup__button-close"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
