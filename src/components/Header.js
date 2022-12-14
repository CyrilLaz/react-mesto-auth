function Header(props) {
  
  return (
    <header className="header">
      <div className="header__logo"></div>
      <nav className="header__menu">{props.menu}</nav>
    </header>
  );
}

export default Header;