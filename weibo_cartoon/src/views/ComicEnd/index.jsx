import React, { Component } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getComicEndData } from "../../api";
import Header from "../../components/Header"
import trange from "../../assets/images/th.png"
import styles from "./ComicEnd.module.scss";

export default class ComicEnd extends Component {
  async componentDidMount() {
    let ComicEndData = await getComicEndData();

    this.setState({
      Comicenddata: ComicEndData.data.ending_works_list,
    });
  }

  state = {
    Comicenddata: [],
  };

  skipClick=(item)=>{
    console.log(item);
    let id=item.extra.comic_id
    this.props.history.push(`/comicDetail/${id}`)
  }
  render() {
    return (
      <div className={styles.ComicEnd}>
        <Header title="完结"></Header>
        <div className={styles.endcontent}>
          {this.state.Comicenddata.map((item, index) => {
              // console.log(item);
            return (
              <div className={styles.endbox} key={index}>
                <div className={styles.banner}>
                    <LazyLoadImage src={item.extra.hcover?item.extra.hcover:trange} alt="" onClick={()=>{
                      this.skipClick(item)
                    }}></LazyLoadImage>
                </div>
                <div className={styles.endcoverinfo}>
                  <div className={styles.endlabel}>
                      {
                          item.cate_list[0].cate_cn_name
                      }
                  </div>
                  <div className={styles.endname}>
                      {
                          item.extra.name
                      }
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
