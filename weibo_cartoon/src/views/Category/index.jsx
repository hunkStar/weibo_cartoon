import React, { Component } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Icon } from "antd-mobile";
import styles from "./Classfiy.module.scss";
import { getClassifyName, getClassifyData } from "../../api";
import trange from "../../assets/images/th.png"

export default class Classfiy extends Component {
  async componentDidMount() {
    let classifyName = await getClassifyName();

    let classifyData = await getClassifyData({
      cate_id: this.state.catelist,
      end_status: 0,
      comic_pay_status: 0,
      page_num: 1,
      rows_num: 20,
      order: "",
      _type: "h5",
    });

    this.setState({
      classfiydata: classifyName.data,
      classifylist: classifyData.data.data,
    });
    console.log(this.state.classfiydata, this.state.classifylist);
  }

  state = {
    classifylist: [],
    classfiydata: [],
    catelist: 0,
    endstatus: 0,
    paystatus: 0,
    isActive: true,
  };

  //分类请求
  catelistClick = async (item) => {
    // console.log(item);

    let newData = await getClassifyData({
      cate_id: item.cate_id,
      end_status: 0,
      comic_pay_status: 0,
      page_num: 1,
      rows_num: 20,
      order: "",
      _type: "h5",
    });
    // console.log(newData);

    await this.setState({
      catelist: item.cate_id,
      classifylist: newData.data.data,
    });
    // console.log(newData.data.data);
  };

  // 选择是否付费请求
  paystatusClick = async (item) => {
    // console.log(item);
    let paydata = await getClassifyData({
      cate_id: this.state.catelist,
      comic_pay_status: item.comic_pay_status,
      end_status: this.state.end_status,
      page_num: 1,
      rows_num: 20,
      order: "",
      _type: "h5",
    });

    await this.setState({
      paystatus: item.comic_pay_status,
      classifylist: paydata.data.data,
    });
  };

  //是否完结请求
  endstatusClick = async (item) => {
    let endstatus = await getClassifyData({
      cate_id: this.state.catelist,
      comic_pay_status: this.state.comic_pay_status,
      end_status: item.end_status,
      page_num: 1,
      rows_num: 20,
      order: "",
      _type: "h5",
    });

    await this.setState({
      endstatus: item.end_status,
      classifylist: endstatus.data.data,
    });
  };

  //点击跳转详情页
  comicContClick = async (item) => {
    let id = item.comic_id;
    this.props.history.push(`/comicDetail/${id}`);
  };
  render() {
    const {
      cate_list,
      comic_pay_status_list,
      end_status_list,
    } = this.state.classfiydata;

    // console.log(cate_list);
    return (
      <div className={styles.classfiy}>
        <div className={styles.header}>
          <div className={styles.heade}>
            <div className={styles.header_left}>
              <Icon type="left" onClick={() => this.props.history.go(-1)} />
            </div>
            <div className={styles.header_center}>分类</div>
            <div className={styles.header_right}></div>
          </div>

          {/* 选择分类 */}
          <div className={styles.cate_list}>
            {cate_list &&
              cate_list.map((item, index) => (
                <div
                  key={index}
                  className={
                    this.state.catelist === item.cate_id
                      ? styles.item_list + " " + styles.active
                      : styles.item_list
                  }
                  onClick={() => {
                    return this.catelistClick(item);
                  }}
                >
                  {item.cate_cn_name}
                </div>
              ))}
          </div>

          {/* 选择是否付费 */}
          <div className={styles.comic_pay_status_list}>
            {comic_pay_status_list &&
              comic_pay_status_list.map((item, index) => (
                <div
                  key={index}
                  className={
                    this.state.paystatus === item.comic_pay_status
                      ? styles.item_list + " " + styles.active
                      : styles.item_list
                  }
                  onClick={() => {
                    this.paystatusClick(item);
                  }}
                >
                  {item.comic_pay_status_name}
                </div>
              ))}
          </div>

          {/* 选择是否完结 */}
          <div className={styles.end_status_list}>
            {end_status_list &&
              end_status_list.map((item, index) => (
                <div
                  key={index}
                  className={
                    this.state.endstatus === item.end_status
                      ? styles.item_list + " " + styles.active
                      : styles.item_list
                  }
                  onClick={() => {
                    this.endstatusClick(item);
                  }}
                >
                  {item.end_status_name}
                </div>
              ))}
          </div>
        </div>

        <div className={styles.content}>
          {this.state.classifylist &&
            this.state.classifylist.map((item, index) => {
              // console.log(item.comic_cover);
              return (
                <div
                  className={styles.comic_content}
                  key={index}
                  onClick={() => {
                    this.comicContClick(item);
                  }}
                >
                  <div className={styles.comic_cover}>
                    <LazyLoadImage
                      src={item.comic_hcover?item.comic_hcover:trange}
                      alt=""
                    ></LazyLoadImage>
                  </div>
                  <div className={styles.comic_name}>{item.comic_name}</div>
                  <div className={styles.comic_desc}>{item.comic_desc}</div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
