import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Register(props) {
  const [values, setValues] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (values.password && values.email) {
      const { password, email } = values;
      props.onRegister(password, email);
    }
  }

  return (
    <div className="signing">
      <form
        onSubmit={handleSubmit}
        className="form"
        name="registerForm"
      >
        <h2 className="form__title form__title_centred">Регистрация</h2>
        <fieldset className="form__input-container">
          <input
            onChange={handleChange}
            name="email"
            className="form__input form__input_bright"
            type="email"
            placeholder="Email"
            required
          ></input>
          <input
            onChange={handleChange}
            name="password"
            className="form__input form__input_bright"
            type="password"
            placeholder="Пароль"
            autoComplete='new-password'
            required
          ></input>
          <button className="form__button form__button_bright" type="submit">
          Зарегистрироваться
          </button>
        </fieldset>
      </form>
      <Link to={'/sign-in'} className="signing__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
