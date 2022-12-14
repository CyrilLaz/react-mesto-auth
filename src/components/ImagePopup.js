function ImagePopup(props) {
  return (
    <div className={`popup popup-${props.name}${props.isOpen?' popup_opened':''}`}>
      <div className="popup-picture__container">
        <img className="popup-picture__picture" alt={`изображение ${props.name}`} src={props.link} />
        <h2 className="popup-picture__title">{props.name}</h2>
        <button className="popup__button-close close-picture" onClick={()=>props.onClose()}></button>
      </div>
    </div>
  );
}
export default ImagePopup;
