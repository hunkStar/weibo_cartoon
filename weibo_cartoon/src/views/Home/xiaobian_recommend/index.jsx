import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "../home.module.scss";
import { getHomeData } from "../../../api";

class XiaobianRecommend extends Component {
  state = {
    xiaobianRecommend: [],
    isload: false,
  };
  toMore = () => {
    this.props.history.push("./home/moreXiaobianRecommend");
  };

  async componentDidMount() {
    let HomeData = await getHomeData();
    // console.log(HomeData.data);

    // 获取 小编推荐 数据
    let xiaobianRecommend = HomeData.data.h5_recommend_female_xiaobian_recommend;
    // console.log(xiaobianRecommend);

    let newDataList = xiaobianRecommend.filter((item, index) => index <= 2);
    // console.log(newDataList);

    this.setState({
      xiaobianRecommend: newDataList,
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
      <div className={styles.recommend_block}>
        <div className={styles.recommend_header}>
          <div className={styles.recommend_header_title}>小编推荐</div>
          <div className={styles.recommend_header_more} onClick={this.toMore}>
            更多&gt;
          </div>
        </div>
        <div className={styles.recommend_content + " " + styles.threeClassic}>
          {this.state.isload &&
            this.state.xiaobianRecommend.map((item, index) => {
              return (
                <div className={styles.recommend_comics} key={index}>
                  <div
                    className={styles.comic_cover_container}
                    onClick={this.toComicDetail.bind(this, item.extra.comic_id)}
                  >
                    {/* 漫画封面 */}
                    <div
                      className={styles.comic_cover}
                      style={{ backgroundImage: `url(${item.extra.hcover})` }}
                    ></div>

                    {/* 漫画介绍 */}
                    <div className={styles.comic_cover_info}>
                      <div className={styles.comic_cover_title}>{item.extra.name}</div>

                      <div className={styles.comic_cover_desc}>{item.extra.watching_focus}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default withRouter(XiaobianRecommend);
