import React,{useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info-container">
          <div onClick={props.onEditAvatar} className="profile__avatar">
            <img
              className="profile__avatar-img"
              alt="фотография профиля"
              src={currentUser.avatar}
            />
            <div className="profile__avatar-hover"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__subname">{currentUser.about}</p>
          </div>
          <button
            className="profile__button profile__button_type_edit"
            type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__button profile__button_type_add"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">{props.cards}</ul>
      </section>
    </main>
  );
}

export default Main;
