import React, { Component } from "react";
import Header from "../../../components/Header";
import styles from "./more.module.scss";
import { getHomeData } from "../../../api";

export default class MorefineWorks extends Component {
  state = {
    xiaobianRecommend: [],
    isload: false,
  };

  async componentDidMount() {
    let HomeData = await getHomeData();
    let xiaobianRecommend = HomeData.data.h5_recommend_female_xiaobian_recommend;
    // console.log(xiaobianRecommend);

    this.setState({
      xiaobianRecommend,
      isload: true,
    });
  }

  //跳转漫画详情
  toComicDetail = (comic_id) => {
    console.log(comic_id);
    this.props.history.push(`/comicDetail/${comic_id}`);
  };

  render() {
    return (
      <div className={styles.viewMore}>
        <Header title="小编推荐"></Header>

        <div className={styles.moreList}>
          {this.state.isload &&
            this.state.xiaobianRecommend.map((item, index) => {
              return (
                <div
                  className={styles.com_item}
                  key={index}
                  onClick={this.toComicDetail.bind(this, item.extra.comic_id)}
                >
                  <div className={styles.item_cover}>
                    <div
                      className={styles.comic_cover}
                      style={{ backgroundImage: `url(${item.extra.hcover})` }}
                    ></div>
                  </div>
                  <div className={styles.item_info}>
                    <div className={styles.info_title}>{item.extra.name}</div>
                    <div className={styles.info_author}>作者：{item.extra.sina_nickname}</div>
                    <div className={styles.info_content}>{item.extra.watching_focus}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
