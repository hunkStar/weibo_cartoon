import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "../home.module.scss";
import { getHomeData } from "../../../api";

class FineWorks extends Component {
  state = {
    fine_works: [],
    isload: false,
  };
  toMore = () => {
    this.props.history.push("./home/moreFineWorks");
  };

  async componentDidMount() {
    let HomeData = await getHomeData();
    // console.log(HomeData.data);

    // 获取 精品佳作 数据
    let fineWorks = HomeData.data.h5_recommend_female_fine_works;
    // console.log(fineWorks);

    let newDataList = fineWorks.filter((item, index) => index <= 2);
    console.log(newDataList);

    this.setState({
      fine_works: newDataList,
      isload: true,
    });
  }

  //跳转漫画详情
  toComicDetail = (comic_id) => {
    console.log(comic_id);
    this.props.history.push(`/comicDetail/${comic_id}`)
  };

  render() {
    return (
      <div className={styles.recommend_block}>
        <div className={styles.recommend_header}>
          <div className={styles.recommend_header_title}>精品佳作</div>
          <div className={styles.recommend_header_more} onClick={this.toMore}>
            更多&gt;
          </div>
        </div>
        <div className={styles.recommend_content + " " + styles.threeClassic}>
          {this.state.isload &&
            this.state.fine_works.map((item, index) => {
              return (
                <div className={styles.recommend_comics} key={index}>
                  <div
                    className={styles.comic_cover_container}
                    onClick={this.toComicDetail.bind(this,item.extra.comic_id)}
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

export default withRouter(FineWorks);
