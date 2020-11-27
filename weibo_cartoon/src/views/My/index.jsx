import React, { Component } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import userImg from "../../assets/images/user.png";
import userBj from "../../assets/images/userbj2.png";
import styles from "./my.module.scss";
import MbImg from "../../assets/images/mb.png";
import Jiantou from "../../assets/images/jt.png";
import Sc from "../../assets/images/sc.png";
import Ll from "../../assets/images/ll.png";
import Yj from "../../assets/images/yj.png";
import Yg from "../../assets/images/yg.png";
import zj from "../../assets/images/zj.png";
export default class My extends Component {
  back = () => {
    this.props.history.go(-1);
  };

  render() {
    return (
      <div className={styles.Users}>
        <div className={styles.header_contend}>
          <div className={styles.header} onClick={this.back}>
            <img src={zj} alt="" />
          </div>
          <div className={styles.userinfor}>
            <LazyLoadImage src={userImg}></LazyLoadImage>
            <p className={styles.login}>戳我立即登入哦QAQ</p>
            <p className={styles.mymb}>我的墨币:0</p>
          </div>
          <div className={styles.mask_banner}>
            <LazyLoadImage src={userBj} alt="" className={styles.img}></LazyLoadImage>
          </div>
        </div>
        <div className={styles.users_content}>
          <div className={styles.content_title}>
            <LazyLoadImage src={MbImg} className={styles.icon}></LazyLoadImage>
            <p className={styles.chongzhi}>墨币充值</p>
            <LazyLoadImage src={Jiantou} className={styles.jiantou}></LazyLoadImage>
          </div>
          <div className={styles.content_title}>
            <LazyLoadImage src={Sc} className={styles.icon}></LazyLoadImage>
            <p className={styles.chongzhi}>我的关注</p>
            <LazyLoadImage src={Jiantou} className={styles.jiantou}></LazyLoadImage>
          </div>
          <div className={styles.content_title}>
            <LazyLoadImage src={Ll} className={styles.icon}></LazyLoadImage>
            <p className={styles.chongzhi}>浏览历史</p>
            <LazyLoadImage src={Jiantou} className={styles.jiantou}></LazyLoadImage>
          </div>
          <div className={styles.content_title}>
            <LazyLoadImage src={Yj} className={styles.icon}></LazyLoadImage>
            <p className={styles.chongzhi}>意见反馈</p>
            <LazyLoadImage src={Jiantou} className={styles.jiantou}></LazyLoadImage>
          </div>
          <div className={styles.content_title}>
            <LazyLoadImage src={Yg} className={styles.icon}></LazyLoadImage>
            <p className={styles.chongzhi}>已购作品</p>
            <LazyLoadImage src={Jiantou} className={styles.jiantou}></LazyLoadImage>
          </div>
          <div className={styles.content_title}>
            <LazyLoadImage src={Yg} className={styles.icon}></LazyLoadImage>
            <p className={styles.chongzhi}>自动购买管理</p>
            <LazyLoadImage src={Jiantou} className={styles.jiantou}></LazyLoadImage>
          </div>
        </div>
      </div>
    );
  }
}
