import { Link } from 'react-router-dom';
export default function Register(props) {
  return (
    <div
      className="signing"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submit registerForm');
        }}
        className="form"
        name="registerForm"
        // noValidate
      >
        <h2
          className="form__title form__title_centred"
        >
          Регистрация
        </h2>
        <fieldset className="form__input-container">
          <input
            name="email"
            className="form__input form__input_bright"
            type="email"
            placeholder="Email"
            required
          ></input>
          <input
            name="password"
            className="form__input form__input_bright"
            type="password"
            placeholder="Пароль"
            required
          ></input>
          <button
            className="form__button form__button_bright"
            type="submit"
          >
            Войти
          </button>
        </fieldset>
      </form>
      <Link to={'/sign-in'} className="signing__link" style={{}}>
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
