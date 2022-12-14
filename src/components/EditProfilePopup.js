import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    props.handleValidForm(e);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
    props.handleValidForm(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      {...props}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            onChange={handleNameChange}
            value={name || ''}
            name="userName"
            type="text"
            placeholder="Ваше имя"
            className="form__input form__input_type_name"
            minLength="3"
            required
          />
          <span className="form__input-error userName-error">
            {props.errors.userName || ''}
          </span>
          <input
            onChange={handleAboutChange}
            value={description || ''}
            name="userJob"
            type="text"
            placeholder="Чем занимаетесь"
            className="form__input form__input_type_job"
            minLength="5"
            required
          />
          <span className="form__input-error userJob-error">
            {props.errors.userJob || ''}
          </span>
        </>
      }
    />
  );
}
