import React from "react";
import * as logo from "../../assets/logo.png";
import styles from "./header.module.css";
import { Typography, Divider } from "@material-ui/core";

const Header = props => {
  return (
    <div>
      <img src={logo} className={styles.Logo} alt="The Guardian logo" />

      <Typography variant="body1" gutterBottom style={{ color: "white" }}>
        Archive Search
      </Typography>
    </div>
  );
};

export default Header;
