import React, { useState } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className="App">
      <header className="App-header">
        <nav
          className={`${styles.navbar}`}
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <a
            href="https://drive.google.com/file/d/1k6WFBN-OOq7lUf1mIR-7YGG841co6yej/view?usp=sharing"
            className={`${styles.logo}`}
          >
            AiVsHuman
          </a>
          <ul className={`${styles.navMenu}`}>
            <div>
              <a href="/" className={`${styles.navLink}`}>
                Home
              </a>
            </div>
            <div>
              <a href="/contributors" className={`${styles.navLink}`}>
                Contributors
              </a>
            </div>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
