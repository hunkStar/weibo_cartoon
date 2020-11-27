import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import styles from "./search.module.scss";

class SearchContent extends Component {
  toComic = (comicId) => {
    // console.log("要看的漫画id", comicId);
    this.props.history.push(`/comicDetail/${comicId}`);
  };

  freshHotSearch=()=>{
    this.props.onEvent2();
  }

  render() {
    return (
      <div className={styles.search_page}>
        <div className={styles.hot_search}>
          <div className={styles.hot_serch_header}>
            <div className={styles.search_title}>热门搜索</div>
            <div className={styles.search_icon + " " + styles.refresh} onClick={this.freshHotSearch}></div>
          </div>
          <ul className={styles.hot_search_conent}>
            {this.props.hotSearchIsload &&
              this.props.hotSearch.map((item, index) => {
                return (
                  <li className={styles.search_label} key={index}>
                    <span onClick={this.toComic.bind(this, item.object_id)}>{item.title}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchContent)