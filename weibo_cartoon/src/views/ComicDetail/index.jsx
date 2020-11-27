import React, { Component } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getDetailData, getComment } from "../../api";
import Header from "../../components/Header";
import styles from "./ComicDetail.module.scss";
import trange from "../../assets/images/th.png";

export default class ComicDetail extends Component {
  async componentDidMount() {
    let detailData = await getDetailData({
      comic_id: this.state.cate_id,
      create_source: "h5",
      _type: "h5",
    });

    let CommentData = await getComment({
      comic_id: this.state.cate_id,
      page_num: 1,
      rows_num: 10,
      _type: "h5",
    });
    this.setState(
      {
        detaildatas: detailData.data,
        Commentdata: CommentData.data,
      },
      () => {
        let ds = this.state.Commentdata.data;
        let arr = [];

        ds.map((item) => {
          let date = item.create_day;
          date =
            date.substring(0, 4) +
            "-" +
            date.substring(4, 6) +
            "-" +
            date.substring(6, 8);
          arr.push(date);
        });
        // console.log(arr);
        this.setState({
          creatTime: arr,
        });
      }
    );
    // console.log(this.state.creatTime);
  }
  state = {
    cate_id: this.props.match.params.id,
    detaildatas: [],
    Commentdata: [],
    creatTime: [],
    isdirectoryShow: true,
    iscatalogShow: false,
    isSequence: true,
  };

  // 点击显示详情页面
  directoryShow = () => {
    this.setState({
      isdirectoryShow: true,
      iscatalogShow: false,
    });
  };

  // 点击显示目录页面
  catalogShow = () => {
    this.setState({
      isdirectoryShow: false,
      iscatalogShow: true,
    });
  };

  // 点击显示正序
  sequenceShow = () => {
    this.setState({
      isSequence: false,
    });
  };

  // 点击显示倒序
  sequenceShow2 = () => {
    this.setState({
      isSequence: true,
    });
  };
  render() {
    const {
      comic,
      site_image,
      comic_tag,
      chapter_list,
    } = this.state.detaildatas;
    const { data, user, content } = this.state.Commentdata;

    return (
      <div className={styles.ComicCont}>
        <Header title={comic && comic.name}></Header>
        <div className={styles.Content}>
          {/* 漫画展示图组件 */}
          <div className={styles.banner}>
            <LazyLoadImage
              src={comic && site_image + comic.hcover}
              alt=""
            ></LazyLoadImage>
            <div className={styles.mask}>
              <div className={styles.comic_article}>
                <div className={styles.comic_name}>{comic && comic.name}</div>
                <div className={styles.tags_hot}>
                  <div className={styles.tags}>
                    {comic_tag && comic_tag[0].tag_name} |{" "}
                    {comic_tag && comic_tag[1].tag_name} 
                  </div>
                  <div className={styles.hot}>
                    <span>热度值: </span>
                    <span>{comic && comic.comic_hot_value_text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 点击开始阅读组件 */}
          <div className={styles.reading}>
            <p className={styles.Noreading}>暂未阅读</p>
            <button className={styles.reading}>开始阅读</button>
          </div>

          {/* 详情目录组件 */}
          <div className={styles.directory}>
            <div className={styles.menu}>
              {/* 详情 */}
              <div
                onClick={this.directoryShow}
                className={styles.detail}
                style={
                  this.state.isdirectoryShow
                    ? { color: "#666" }
                    : { color: "#ccc" }
                }
              >
                详情
              </div>
              {/* 目录 */}
              <div
                className={styles.catalog}
                onClick={this.catalogShow}
                style={
                  this.state.iscatalogShow
                    ? { color: "#666" }
                    : { color: "#ccc" }
                }
              >
                目录
              </div>
              {/* 正序倒序 */}
              <div
                className={styles.order}
                style={
                  this.state.iscatalogShow
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <span className={styles.allcont}>
                  共: {chapter_list ? chapter_list.length : 200} 话
                </span>
                {this.state.isSequence ? (
                  <span
                    onClick={this.sequenceShow}
                    className={styles.inverted_order}
                  >
                    倒序
                  </span>
                ) : (
                  <span
                    onClick={this.sequenceShow2}
                    className={styles.positive_order}
                  >
                    正序
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* 详情组件部分 */}
          <div
            className={styles.detail_menu}
            style={
              this.state.isdirectoryShow
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {/* 简介 */}
            <div className={styles.synopsis}>
              <div className={styles.comic_synopsis}>
                <div>简介</div>
                {comic && comic.description}
              </div>
              <div className={styles.author}>
                <span className={styles.comic_author}>作者:</span>
                <span className={styles.headportrait}>
                  <LazyLoadImage
                    src={comic && comic.cover}
                    alt=""
                  ></LazyLoadImage>
                </span>
                <span className={styles.author_name}>
                  {comic && comic.sina_nickname}
                </span>
              </div>
            </div>
            {/* 评论 */}
            <div className={styles.comment}>
              <div className={styles.hotComment}>热门评论</div>
              <div className={styles.commentMenu}>
                {data &&
                  data.map((item, index) => {
                    return (
                      <div className={styles.userinfo} key={index}>
                        <div className={styles.userbox}>
                          {/* 头像 */}
                          <div className={styles.user_logo}>
                            {Object.keys(user).map((value) => {
                              return user[value].user_id === item.user_id ? (
                                <LazyLoadImage
                                  key={value}
                                  src={
                                    user[value].user_avatar
                                      ? user[value].user_avatar
                                      : trange
                                  }
                                  alt=""
                                ></LazyLoadImage>
                              ) : null;
                            })}
                          </div>
                          {/* 用户名字 */}
                          <div className={styles.user_name}>
                            {Object.keys(user).map((value) => {
                              return user[value].user_id === item.user_id
                                ? user[value].user_nickname
                                : null;
                            })}
                          </div>
                          {/* 发布时间 */}
                          <div className={styles.creatTime}>
                            {this.state.creatTime.map((value, ind) => {
                              // console.log(value);
                              return index === ind ? value : null;
                            })}
                          </div>
                        </div>
                        <div className={styles.userComment}>
                          <div className={styles.mycomment}>
                            {Object.keys(content).map((value) => {
                              return content[value].comment_id ===
                                item.comment_id
                                ? content[value].comment_content
                                : null;
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* 目录组件 */}
          <div
            className={styles.catalog_menu}
            style={
              this.state.iscatalogShow
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {chapter_list &&
              chapter_list.map((item, index) => {
                // console.log(item);
                return (
                  <div className={styles.section} key={index}>
                    {item.chapter_name}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
