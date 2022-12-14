export default function Login(props) {
  return (
    <div
      className="signing"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submit loginForm');
        }}
        className="form"
        name="loginForm"
        // noValidate
      >
        <h2
          className="form__title form__title_centred"
        >
          Вход
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
    </div>
  );
}
