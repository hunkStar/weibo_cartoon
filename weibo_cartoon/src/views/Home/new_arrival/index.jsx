import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "../home.module.scss";
import { getHomeData } from "../../../api";
import new1 from "../../../assets/images/newarrive1.png";
import new2 from "../../../assets/images/newarrive2.png";

class NewArrival extends Component {
  toMore = () => {
    this.props.history.push("./home/moreNewArrival");
  };

  state = {
    newDataList: [],
    isload: false,
  };

  async componentDidMount() {
    let HomeData = await getHomeData();
    // console.log(HomeData.data);

    // 获取 最新上架 数据
    let newArrival = HomeData.data.h5_recommend_female_new_arrival;
    // console.log(newArrival);

    let newDataList = newArrival.filter((item, index) => index <= 2);
    // console.log(newDataList);

    this.setState({
      newDataList,
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
          <div className={styles.recommend_header_title}>最新上架</div>
          <div className={styles.recommend_header_more} onClick={this.toMore}>
            更多&gt;
          </div>
        </div>
        <div className={styles.recommend_content + " " + styles.threeColumn}>
          {this.state.isload &&
            this.state.newDataList.map((item, index) => {
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
                      <div className={styles.comic_cover_title}>{item.title}</div>

                      <div className={styles.comic_horizontal_author}>
                        <img src={new1} alt="" />
                        {item.cate_list.map((v) => v.cate_cn_name + "、")}
                      </div>
                      <div className={styles.comic_horizontal_author}>
                        <img src={new2} alt="" />
                        {item.extra.sina_nickname}
                      </div>
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

export default withRouter(NewArrival);
