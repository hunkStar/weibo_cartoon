import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import new1 from "../../assets/images/newarrive1.png";
import new2 from "../../assets/images/newarrive2.png";
import styles from "./rankList.module.scss";

class ReadRank extends Component {
  //跳转漫画详情
  toComicDetail = (comic_id) => {
    console.log(comic_id);
    this.props.history.push(`/comicDetail/${comic_id}`);
  };

  render() {
    return (
      <div className={styles.rank_list_box}>
        {this.props.readRankload &&
          this.props.readRank.map((item) => {
            return (
              <div
                className={styles.rank_list_con}
                key={item.comic_id}
                onClick={this.toComicDetail.bind(this, item.comic_id)}
              >
                <div className={styles.comic_horizontal_container}>
                  <div
                    className={styles.comic_cover}
                    style={{ backgroundImage: `url(${item.hcover})` }}
                  ></div>
                  <div className={styles.comic_cover_horizontal_info}>
                    <div className={styles.comic_cover_horizontal_title}>{item.name}</div>
                    <div className={styles.comic_cover_horizontal_author}>
                      <img src={new1} alt="" />
                      {item.cate_list
                        .map((ele) => ele.cate_cn_name)
                        .filter((vv, index) => index < 3)
                        .join("/")}
                    </div>
                    <div className={styles.comic_cover_horizontal_author}>
                      <img src={new2} alt="" />
                      {item.sina_nickname}
                    </div>
                  </div>
                  <div className={styles.comic_cover_horizontal_rank}>
                    {item.rank_no > 3 ? (
                      <div className={styles.rank_num}>{item.rank_no}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default withRouter(ReadRank);
