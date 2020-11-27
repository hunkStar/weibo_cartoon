import React, { Component } from "react";
import styles from "./home.module.scss";
import logImg from "../../assets/images/log.png";
import searchImg from "../../assets/images/search.png";
import boyImg from "../../assets/images/boy.png";
import usersImg from "../../assets/images/users.png";

import { getHomeData } from "../../api";
import { Carousel } from "antd-mobile";
import FineWorks from "./fine_works";
import PopularWorks from "./popular_works";
import NewArrival from "./new_arrival";
import HotSerial from "./hot_serial";
import XiaobianRecommend from './xiaobian_recommend';
import WeekRecommend from './week_recommend';

export default class Home extends Component {
  state = {
    swiperList: [],
    lunboIsload: false,
    navList: [
      {
        id: 1,
        imgURL: "https://img.manhua.weibo.com/static/b/vcomic-h5/dist/img/daypub.7d71503a.png",
        name: "放送表",
      },
      {
        id: 2,
        imgURL: "https://img.manhua.weibo.com/static/b/vcomic-h5/dist/img/catelog.3cfb4bb6.png",
        name: "分类",
      },
      {
        id: 3,
        imgURL: "https://img.manhua.weibo.com/static/b/vcomic-h5/dist/img/rank.bfd0ebb0.png",
        name: "榜单",
      },
      {
        id: 4,
        imgURL: "https://img.manhua.weibo.com/static/b/vcomic-h5/dist/img/ending.932e7864.png",
        name: "完结",
      },
    ],
    imgHeight: 214,
    location_style: 1,
    location_en: "",
    fine_works: [], //精品佳作
    popular_works: [], //人气作品
    new_arrival: [], //最新上架
    hot_serial: [], //热门连载
    xiaobian_recommend: [], //小编推荐
    week_recommend: [], //本周推荐
  };

  async componentDidMount() {
    let HomeData = await getHomeData();
    console.log(HomeData.data);

    // 获取轮播图数据
    let homeSwiper = HomeData.data.h5_recommend_female_rotation_map;
    homeSwiper = homeSwiper.map((item) => item.image_url);
    // console.log(homeSwiper);

    // 获取 精品佳作 数据
    let fineWorks = HomeData.data.h5_recommend_female_fine_works;
    // console.log(fineWorks);

    // 获取 人气作品 数据
    let popularWorks = HomeData.data.h5_recommend_female_popular_works;
    // console.log(popularWorks);

    // 获取 最新上架 数据
    let newArrival = HomeData.data.h5_recommend_female_new_arrival;
    // console.log(newArrival);

    // 获取 热门连载 数据
    let hotSerial = HomeData.data.h5_recommend_female_hot_serial;
    // console.log(hotSerial);

    // 获取 小编推荐 数据
    let xiaobianRecommend = HomeData.data.h5_recommend_female_xiaobian_recommend;
    // console.log(xiaobianRecommend);

    // 获取 本周推荐 数据
    let weekRecommend = HomeData.data.h5_recommend_female_week_recommend;
    // console.log(weekRecommend);

    this.setState({
      swiperList: homeSwiper,
      lunboIsload: true,
      fine_works: fineWorks,
      popular_works: popularWorks,
      new_arrival: newArrival,
      hot_serial: hotSerial,
      xiaobian_recommend: xiaobianRecommend,
      week_recommend:weekRecommend
    });
  }

  toNavItem = (navItemId) => {
    // console.log(navItemId,this.props.history)
    switch (navItemId) {
      case 1:
        this.props.history.push("/dayput");
        break;
      case 2:
        this.props.history.push("/category");
        break;
      case 3:
        this.props.history.push("/rankList");
        break;
      case 4:
        this.props.history.push("/comicEnd");
        break;
      default:
        this.props.history.push("/home");
    }
  };

  toSearch=()=>{
    this.props.history.push("/search")
  }
  
  toMy=()=>{
    this.props.history.push("/my")
  }
  render() {
    return (
      <div>
        <div className={styles.home}>
          {/* 头部 */}
          <div className={styles.header}>
            <div className={styles.header_left}>
              <img src={logImg} alt=""></img>
            </div>
            <div className={styles.header_right}>
              <div className={styles.gender_switch}>
                <img src={boyImg} alt=""></img>
              </div>
              <div className={styles.search} onClick={this.toSearch}>
                <img src={searchImg} alt=""></img>
              </div>
              <div className={styles.users} onClick={this.toMy}>
                <img src={usersImg} alt=""></img>
              </div>
            </div>
          </div>
          {/* 头部结束 */}

          <div className={styles.content}>
            {/* 轮播图开始 */}
            <div className={styles.swipeShow}>
              <div className={styles.swipeShow_box}>
                {/* 请求数据回来，轮播才开始自动播放，设置一个阀门 lunboIsload */}
                {this.state.lunboIsload && (
                  <Carousel autoplay={true} infinite autoplayInterval={2000}>
                    {this.state.swiperList.map((item, index) => (
                      <img
                        key={index}
                        src={item}
                        alt=""
                        className={styles.lunboImg}
                        onLoad={() => {
                          window.dispatchEvent(new Event("resize"));
                          this.setState({ imgHeight: "auto" });
                        }}
                      />
                    ))}
                  </Carousel>
                )}
              </div>
            </div>
            {/* 轮播图结束 */}

            {/* nav区开始 */}
            <div className={styles.nav}>
              {this.state.navList.map((item) => {
                return (
                  <div
                    className={styles.navItem}
                    key={item.id}
                    onClick={this.toNavItem.bind(this, item.id)}
                  >
                    <img src={item.imgURL} alt="" />
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
            {/* nav区结束 */}

            {/* 精品佳作开始 */}
            <FineWorks></FineWorks>

            {/* 人气作品开始 */}
            <PopularWorks></PopularWorks>

            {/* 最新上架开始 */}
            <NewArrival></NewArrival>

            {/* 热门连载开始 */}
            <HotSerial></HotSerial>

            {/* 小编推荐开始 */}
            <XiaobianRecommend></XiaobianRecommend>

            {/* 本周推荐开始 */}
            <WeekRecommend></WeekRecommend>
          </div>
        </div>
      </div>
    );
  }
}

/* 
在返回的数据中，在location_list里，有一个location_style属性，控制className
location_style=1 对应“1-2”结构，有2个，精品推荐，小编推荐
location_style=2 对应“2-2”结构，人气作品
location_style=6 对应“1-1-1”结构，最新上架
location_style=7 对应“2-0”结构，热门连载
location_style=5 对应“3-0”结构，本周推荐 
初步想法：把location_style和对应的漫画数据存在一个数组中
recommendList=[
  {
    id:1,
    location_style:1,
    location_en:location_en
    dataList:[]
  }
]
如果location_en和getHomeData()请求回来的数据中的每一项一样，过滤数据，就拿到相对应的数据，
分别存在一个数组中，一共6个数组。
*/