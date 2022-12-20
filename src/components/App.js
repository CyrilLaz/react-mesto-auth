import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Card from './Card';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as Auth from '../utils/Auth';
import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { useFormValidator } from '../hooks/useFormValidator';
import { ConfirmDeletionPopup } from './ConfirmationDeletePopup';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [stateInfoTool, setStateInfoTool] = useState({
    isOpen: false,
    isSuccess: false,
  });
  const [userEmail, setUserEmail] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [buttonText, setButtonText] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [
    handleValidForm,
    errors,
    isButtonDisabled,
    resetForm,
    toggleButtonDisabling,
  ] = useFormValidator();

  const [
    {
      isEditProfilePopupOpen,
      isEditAvatarPopupOpen,
      isAddPlacePopupOpen,
      isConfirmDeletionPopupOpen,
      popupProps,
    },
    setPopupOpen,
  ] = useState({});

  function getContent() {
    Promise.all([Api.getUserInfo(), Api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }

  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Auth.getContent(jwt)
        .then((data) => {
          setUserEmail(data.email);
          setLoggedIn(true);
          history.push('/');
        })
        .then(() => getContent())
        .catch((err) => console.log(err));
    }
  }, [history]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  function handleCardClick(props) {
    setSelectedCard({ ...props, isOpen: true });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.log);
  }

  function handleCardDelete(card) {
    toggleButtonDisabling(true);
    setButtonText('Сохранение...');
    Api.removeCard(card._id)
      .then((mes) => {
        closeAllPopups();
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.log);
  }

  function handleEditAvatarClick() {
    setButtonText('Сохранить');
    setPopupOpen({ isEditAvatarPopupOpen: true });
  }

  function handleEditProfileClick() {
    setButtonText('Сохранить');
    setPopupOpen({ isEditProfilePopupOpen: true });
  }

  function handleAddPlaceClick() {
    setButtonText('Сохранить');
    setPopupOpen({ isAddPlacePopupOpen: true });
  }

  function closeAllPopups() {
    setPopupOpen({});
    setStateInfoTool({ ...stateInfoTool, isOpen: false });
    resetForm();
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleUpdateUser(props) {
    toggleButtonDisabling(true);
    setButtonText('Сохранение...');
    Api.changeUserInfo(props)
      .then((res) => {
        setButtonText('Готово');
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(props) {
    toggleButtonDisabling(true);
    setButtonText('Сохранение...');
    Api.changeAvatar(props.avatar)
      .then((res) => {
        setButtonText('Готово');
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace(props) {
    toggleButtonDisabling(true);
    setButtonText('Сохранение...');
    Api.addNewCard(props)
      .then((newCard) => {
        setButtonText('Готово');
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleConfirmationDelete(props) {
    toggleButtonDisabling(false);
    setButtonText('Да');
    setPopupOpen({
      isConfirmDeletionPopupOpen: true,
      popupProps: props,
    });
  }

  function onRegister(password, email) {
    Auth.register(password, email)
      .then((res) => {
        if (res.data) {
          setStateInfoTool({
            isSuccess: true,
            isOpen: true,
            message: 'Вы успешно зарегистрировались!',
          });
          history.push('/sign-in');
        } else {
          return Promise.reject(res.error);
        }
      })
      .catch((err) => {
        console.error(err);
        setStateInfoTool({
          isSuccess: false,
          isOpen: true,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  }

  function onLogin(password, email) {
    Auth.login(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setUserEmail(email);
          getContent();
          setLoggedIn(true);
          history.push('/');
        } else {
          return Promise.reject(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setStateInfoTool({
          isSuccess: false,
          isOpen: true,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  }

  function onSignOut(e) {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <div className="App__container">
        <CurrentUserContext.Provider value={currentUser}>
          <InfoTooltip {...stateInfoTool} onClose={closeAllPopups} />
          <Switch>
            <Route exact path="/">
              <Header
                menu={
                  <>
                    <span>{userEmail}</span>
                    <Link
                      className="header__link"
                      style={{ color: '#A9A9A9' }}
                      onClick={onSignOut}
                      to="/"
                    >
                      Выход
                    </Link>
                  </>
                }
              />
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                cards={cards.map((card) => {
                  return Card({
                    ...card,
                    isOwn: card.owner._id === currentUser._id,
                    isLiked: card.likes.some((i) => i._id === currentUser._id),
                    handleCardClick,
                    handleCardLike,
                    handleConfirmationDelete,
                  });
                })}
              />
              <ImagePopup {...selectedCard} onClose={closeAllPopups} />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                buttonText={buttonText}
                onUpdateUser={handleUpdateUser}
                handleValidForm={handleValidForm}
                errors={errors}
                isButtonDisabled={isButtonDisabled}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                buttonText={buttonText}
                onUpdateAvatar={handleUpdateAvatar}
                handleValidForm={handleValidForm}
                errors={errors}
                isButtonDisabled={isButtonDisabled}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                buttonText={buttonText}
                onAddPlace={handleAddPlace}
                handleValidForm={handleValidForm}
                errors={errors}
                isButtonDisabled={isButtonDisabled}
              />
              <ConfirmDeletionPopup
                {...popupProps}
                isOpen={isConfirmDeletionPopupOpen}
                onClose={closeAllPopups}
                buttonText={buttonText}
                onConfirmDeletion={handleCardDelete}
                isButtonDisabled={isButtonDisabled}
              />
              <Footer />
            </Route>
            <Route path="/sign-in">
              <Header
                menu={
                  <>
                    <Link className="header__link" to="/sign-up">
                      Регистрация
                    </Link>
                  </>
                }
              />
              <Login onLogin={onLogin} />
            </Route>
            <Route path="/sign-up">
              <Header
                menu={
                  <>
                    <Link className="header__link" to="/sign-in">
                      Вход
                    </Link>
                  </>
                }
              />
              <Register onRegister={onRegister} />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
