import React, { Component } from "react";
import Header from "../../components/Header";
import styles from "./dayput.module.scss";
import { getDayData } from "../../api";

export default class Dayput extends Component {
  state = {
    week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    activeTabIndex: 0,
  };
  
  async componentDidMount() {
    let dayData = await getDayData();
    console.log(dayData);
  }

  changeTab = (index) => {
    // console.log(index);

    this.setState({
      activeTabIndex: index,
    });
  };

  render() {
    return (
      <div className={styles.release}>
        <Header title="放送表"></Header>

        <div className={styles.release_date}>
          {this.state.week.map((item, index) => {
            return (
              <div
                className={
                  index === this.state.activeTabIndex
                    ? styles.dateItem + " " + styles.active
                    : styles.dateItem
                }
                key={index}
                onClick={this.changeTab.bind(this, index)}
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className={styles.load_state}>
          <img
            src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/play-loading.83412bf6.png"
            alt=""
          />
          <p>今日的漫画还在绘制中</p>
        </div>
      </div>
    );
  }
}
