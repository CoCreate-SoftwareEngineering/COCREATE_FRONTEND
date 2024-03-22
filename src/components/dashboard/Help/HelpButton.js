import React, { useState } from 'react';
import './HelpButton.css'; 

const Help = () => {
  // State to manage whether the menu is active
  const [isActive, setIsActive] = useState(false);

  // Function to toggle the active state
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    // still to fix icons
    <div>            
      <div id="circularMenu" className={`circular-menu circular-menu-left ${isActive ? 'active' : ''}`}>
        <a className="floating-btn" onClick={toggleMenu}>
          <i className="help"></i>
        </a>
        <menu className="items-wrapper">
          <a href="#" className="menu-item faq">faq</a>
          <a href="#" className="menu-item github"></a>
          <a href="#" className="menu-item email"></a>
          <a href="#" className="menu-item settings"></a>                    
        </menu>
      </div>
    </div>
  );
};

export default Help;