import React,{useState,useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

export function AddPlacePopup(props) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
    props.handleValidForm(e);
  }

  function handleUrlChange(e) {
    setUrl(e.target.value);
    props.handleValidForm(e);
  }

  useEffect(() => {
    setTitle('');
    setUrl('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name: title, link: url });
  }

  return (
    <PopupWithForm
      name="addPicture"
      title="Новое место"
      isOpen={props.isOpen}
      {...props}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            onChange={handleTitleChange}
            value={title || ''}
            name="pictureName"
            type="text"
            placeholder="Название"
            className="form__input form__input_type_title"
            minLength="3"
            required
          />
          <span className="form__input-error pictureName-error">
            {props.errors.pictureName || ''}
          </span>
          <input
            onChange={handleUrlChange}
            value={url || ''}
            name="pictureUrl"
            type="url"
            placeholder="Ссылкак на картинку"
            className="form__input form__input_type_url"
            required
          />
          <span className="form__input-error pictureUrl-error">
            {props.errors.pictureUrl || ''}
          </span>
        </>
      }
    />
  );
}
