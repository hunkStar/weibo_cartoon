import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./header.module.scss";
import { Icon } from "antd-mobile";

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.header_left}>
          <Icon type="left" onClick={() => this.props.history.go(-1)}/>
        </div>
        <div className={styles.header_center}>{this.props.title}</div>
        <div className={styles.header_right}></div>
      </div>
    );
  }
}

export default withRouter(Header)