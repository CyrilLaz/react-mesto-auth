import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Card from './Card';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useRouteMatch, Link } from 'react-router-dom';
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { useFormValidator } from './useFormValidator';
import { ConfirmDeletionPopup } from './ConfirmationDeletePopup';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
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

  // const isLogin = useRouteMatch('/sign-in');
  // const isLogup = useRouteMatch('/sign-up');

  // console.log(isLogin);
  // console.log('url',url, '###', 'path',path);
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

  // получаем информацию для загрузки
  useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <div className="App">
      <div className="App__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route exact path="/">
              <Header
                menu={
                  <>
                    <span>example@email.com</span>
                    <Link
                      className="header__link"
                      style={{ color: '#A9A9A9' }}
                      to="/sign-up"
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
            <Route>
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
                <Login />
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
                <Register />
              </Route>
              <InfoTooltip isOpen={true} isSuccess={false}/>
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
