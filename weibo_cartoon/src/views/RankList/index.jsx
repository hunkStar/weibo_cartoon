import React, { Component } from "react";
import Header from "../../components/Header";
import { getReadRank, getNewDoRank, getAllRank } from "../../api";
import ReadRank from "./readRank";
import NewDoRank from "./newDoRank";
import AllRank from "./allRank";
import styles from "./rankList.module.scss";

export default class RankList extends Component {
  state = {
    readRank: [],
    readRankload: false,
    newDoRank: [],
    newDoRankload: false,
    allRank: [],
    allRankload: false,
    rankTab: ["阅读榜", "新作榜", "综合榜"],
    activeTabIndex: 0,
  };

  async componentDidMount() {
    // 阅读榜数据
    let readRank = await getReadRank();
    readRank = readRank.data.week;
    console.log(readRank);

    // 新作榜数据
    let newDoRank = await getNewDoRank();
    newDoRank = newDoRank.data.week;
    console.log(newDoRank);

    // 综合榜数据
    let allRank = await getAllRank();
    allRank = allRank.data.week;
    console.log(allRank);

    this.setState({
      readRank,
      readRankload: true,
      newDoRank,
      newDoRankload: true,
      allRank,
      allRankload: true,
    });
  }

  changeTab = (index) => {
    this.setState({
      activeTabIndex: index,
    });
  };

  render() {
    return (
      <div className={styles.rankList}>
        <div className={styles.rank_list_nav}>
          <Header title="排行榜"></Header>
          <div className={styles.rank_list_title}>
            {this.state.rankTab.map((item, index) => {
              return (
                <div
                  className={
                    index === this.state.activeTabIndex
                      ? styles.list_title_item + " " + styles.list_title_color
                      : styles.list_title_item
                  }
                  onClick={this.changeTab.bind(this, index)}
                  key={index}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        {/* 漫画内容 */}
        {this.state.activeTabIndex === 0 ? (
          <ReadRank
            readRank={this.state.readRank}
            readRankload={this.state.readRankload}
          ></ReadRank>
        ) : null}

        {this.state.activeTabIndex === 1 ? (
          <NewDoRank
            newDoRank={this.state.newDoRank}
            newDoRankload={this.state.newDoRankload}
          ></NewDoRank>
        ) : null}

        {this.state.activeTabIndex === 2 ? (
          <AllRank allRank={this.state.allRank} allRankload={this.state.allRankload}></AllRank>
        ) : null}
      </div>
    );
  }
}

// 榜单有一个动漫标签：恋爱/校园/奇幻，通过一层一层数组刨开
/* 
let cateTitle1=readRank.map(item=> item.cate_list)
// console.log(cateTitle1);
let cateTitle2=cateTitle1.map(item=> item.map(ele=>ele.cate_cn_name))
// console.log(cateTitle2);
let cateTitle3=cateTitle2.map(v=>v.filter((vv,index)=>index<3))
// console.log(cateTitle3);
let cateTitle4=cateTitle3.map(vvv=>vvv.join("/"))
// console.log(cateTitle4); 
*/
