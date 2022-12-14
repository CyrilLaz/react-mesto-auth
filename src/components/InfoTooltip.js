export default function InfoTooltip(props) {
  return (
    <div className={`popup${props.isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="info-tool">
            <div className={`info-tool__icon info-tool__icon_type_${props.isSuccess?'success':'error'}`}></div>
            <p className="info-tool__message">{props.message}</p>
        </div>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__button-close"
        ></button>
      </div>
    </div>
  );
}
