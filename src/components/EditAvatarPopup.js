import React,{useRef,useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

export function EditAvatarPopup(props) {
  const input = useRef();

  useEffect(() => {
    input.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: input.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="changeAvatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      {...props}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            ref={input}
            defaultValue=""
            onChange={(e)=>props.handleValidForm(e)}
            name="avatarUrl"
            type="url"
            placeholder="Ссылкак на фотографию профиля"
            className="form__input form__input_type_url"
            required
          />
          <span className="form__input-error avatarUrl-error">
            {props.errors.avatarUrl || ''}
          </span>
        </>
      }
    />
  );
}
