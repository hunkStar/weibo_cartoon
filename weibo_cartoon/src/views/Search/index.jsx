import React, { Component } from "react";
import styles from "./search.module.scss";
import { getHotSearch, getSearchResult } from "../../api";
import SearchResult from "./searchResult";
import SearchContent from "./searchContent";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }

  state = {
    hotSearch: [], //搜索关键词
    hotSearchIsload: false, //显示热门搜索关键词
    searchHistory: [], //搜索历史
    hasInputVal: false, //输入框是否有值
    toSearchResult: false, //是否前往搜索的漫画页面
    searchResult: [], //搜索结果
    refreshCount: 0, //刷新次数
  };

  async componentDidMount() {
    //获取热门搜索 关键词
    let hotSearch = await getHotSearch();
    console.log(hotSearch.data);
    let hotSearchData = hotSearch.data;

    let filterSearch = hotSearchData.filter((item, index) => index < 12);
    console.log(filterSearch);

    this.setState({
      hotSearch: filterSearch,
      hotSearchIsload: true,
    });
  }

  // 点击“搜索”后的处理事件
  searchComic = async () => {
    let comic = this.searchRef.current.value;
    if (comic === "") {
      return;
    }
    // console.log(comic);

    // http://manhua.weibo.cn/wbcomic/home/search?word=斗罗大陆&page_num=1&_type=h5
    let searchResult = await getSearchResult({
      word: comic,
      page_num: 1,
      _type: "h5",
    });
    let searchResultData = searchResult.data.data;
    console.log(searchResultData);

    //存入历史记录
    this.state.searchHistory.push(comic); //push是会返回新数组的长度，不能用一个变量区接受，不然一直得到的是长度
    // console.log(this.state.searchHistory);

    let localArr = JSON.parse(localStorage.getItem("historyData")) || [];
    let localStorageSearch = [...this.state.searchHistory, ...localArr];
    let setSearch = [...new Set(localStorageSearch)];
    localStorage.setItem("historyData", JSON.stringify(setSearch));

    // console.log(setSearch);

    this.setState({
      searchHistory: setSearch,
      toSearchResult: true,
      searchResult: searchResultData,
    });
    console.log(this.state.searchHistory);
  };

  // 监听输入框的值
  watchInput = (e) => {
    // console.log(e.target.value);

    if (e.target.value.trim() === "") {
      this.setState({
        hasInputVal: false,
      });
    } else {
      this.setState({
        hasInputVal: true,
      });
    }
  };

  // 清空正在搜索的数据
  clearInput = () => {
    this.searchRef.current.value = "";
    this.setState({
      hasInputVal: false,
    });
  };

  // 清空history历史记录
  delAllHistory = () => {
    localStorage.removeItem("historyData");

    this.setState({
      searchHistory: [],
    });
  };

  // 刷新热门搜索关键词
  refreshHotSearch = () => {
    console.log("我在刷新关键词");

    this.setState(
      {
        refreshCount: this.state.refreshCount + 1,
      },
      async () => {
        console.log(this.state.refreshCount);

        let hotSearch = await getHotSearch();
        console.log(hotSearch.data);

        let newHot = hotSearch.data.filter((ele, i) => {
          if (i === hotSearch.data.length) {
            this.setState({
              refreshCount: 0,
            });
            return false;
          }
          return 12 * this.state.refreshCount <= i && i < 12 * (this.state.refreshCount + 1);
        });
        console.log(newHot);

        this.setState({
          hotSearch: newHot,
        });
      }
    );
  };

  // 跳转漫画列表
  toComicList = async (params) => {
    console.log("要看的漫画列表", params);
    let searchResult = await getSearchResult({
      word: params,
      page_num: 1,
      _type: "h5",
    });

    this.setState({
      toSearchResult: true,
      searchResult: searchResult.data.data,
    });
    console.log(this.state.searchResult);
  };

  render() {
    return (
      <div className={styles.search}>
        <div className={styles.search_header}>
          <div className={styles.search_ferame}>
            <span className={styles.search_ferame_icon}></span>
            <input
              type="text"
              placeholder="请输入搜索关键字"
              ref={this.searchRef}
              onChange={this.watchInput}
            />

            {this.state.hasInputVal ? (
              <span className={styles.search_clear_cion} onClick={this.clearInput}></span>
            ) : null}
          </div>

          {this.state.hasInputVal ? (
            <div className={styles.search_fix_btn}>
              <span onClick={this.searchComic}>搜索</span>
            </div>
          ) : (
            <div className={styles.search_fix_btn}>
              <span
                onClick={() => {
                  this.props.history.go(-1);
                }}
              >
                取消
              </span>
            </div>
          )}
        </div>

        {/* 搜索的结果页面，没搜索之前是隐藏的，搜索后search_footer部分隐藏 */}
        {this.state.toSearchResult ? (
          <SearchResult
            searchResult={this.state.searchResult}
          ></SearchResult>
        ) : (
          <div className={styles.search_footer}>
            <SearchContent
              hotSearch={this.state.hotSearch}
              hotSearchIsload={this.state.hotSearchIsload}
              onEvent2={() => {
                this.refreshHotSearch();
              }}
            ></SearchContent>

            {/* 历史记录 */}

            <div className={styles.history}>
              <div
                className={
                  localStorage.getItem("historyData") ? styles.hot_serch_header : styles.hidden
                }
              >
                <div className={styles.search_title}>搜索历史</div>
                <div
                  className={styles.search_icon + " " + styles.clear}
                  onClick={this.delAllHistory}
                ></div>
              </div>
              {localStorage.getItem("historyData") ? (
                <ul className={styles.hot_search_conent}>
                  {JSON.parse(localStorage.getItem("historyData")).map((item, index) => {
                    return (
                      <li className={styles.search_label} key={index}>
                        <span onClick={this.toComicList.bind(this, item)}>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}
