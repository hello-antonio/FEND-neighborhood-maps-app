import React from 'react';

const Header = (props)=>{
  return (
    <header className="app__header">
      <div className="app__menu-btn">
        <button type="button" value="open" className="app__menu-btn-open" onClick={props.handleSidebarToggle}>MENU</button>
      </div>
      <div className="app__title">
        <h1 className="app__logo">Parks and Recreations</h1>
      </div>
    </header>
  )
}

export default Header;
