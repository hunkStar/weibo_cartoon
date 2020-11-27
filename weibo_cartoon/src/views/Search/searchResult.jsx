import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import waitMore from "../../assets/images/waitmore.png";
import styles from "./search.module.scss";

class SearchResult extends Component {
  toComic = (id) => {
    // console.log("要看的漫画id", id);
    this.props.history.push(`/comicDetail/${id}`)
  };

  render() {
    console.log(this.props.searchResult.data);

    return (
      <div className={styles.search_result}>
        <div className={styles.loadMoreWraper}>
          <div className={styles.loadMore}>
            {this.props.searchResult &&
              this.props.searchResult.map((item) => {
                return (
                  <div
                    className={styles.search_list}
                    key={item.comic_id}
                    onClick={this.toComic.bind(this, item.comic_id)}
                  >
                    <div className={styles.search_item}>
                      <div className={styles.search_item_img}>
                        <div
                          className={styles.comic_cover}
                          style={{ backgroundImage: `url(${item.cover})` }}
                        ></div>
                      </div>
                      <div className={styles.search_item_info}>
                        <div className={styles.search_item_title}>{item.name}</div>
                        <div className={styles.sina_nickname}>{item.sina_nickname}</div>
                        <div className={styles.sina_nickname}>
                          {item.cates.map((ele, index) => {
                            return (
                              <span key={ele.cate_id}>
                                {ele.cate_name}
                                {index < item.cates.length - 1 ? <span> / </span> : " "}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* <div className={styles.moreList}>
              <img src={waitMore} alt="" />
              <p>正在加载...</p>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchResult);
