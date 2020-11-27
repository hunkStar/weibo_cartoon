import React, { Component, Suspense } from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "../views/Home";
import MorefineWorks from "../views/Home/fine_works/more"
import MorePopularWorks from "../views/Home/popular_works/more"
import MoreNewArrival from "../views/Home/new_arrival/more"
import MoreHotSerial from "../views/Home/hot_serial/more"
import MoreXiaobianRecommend from "../views/Home/xiaobian_recommend/more"
import MoreWeekRecommend from "../views/Home/week_recommend/more"
import loading from "../assets/images/loading.gif"
import styles from './loading.module.scss'
// import Category from "../views/Category";
// import ComicEnd from "../views/ComicEnd";
// import Dayput from "../views/Dayput";
// import Login from "../views/Login";
// import My from "../views/My";
// import RankList from "../views/RankList";
// import Register from "../views/Register";
// import Search from "../views/Search";
// import ComicDetail from "../views/ComicDetail"

const Category =React.lazy(()=>import('../views/Category'))
const ComicEnd =React.lazy(()=>import('../views/ComicEnd'))
const Dayput =React.lazy(()=>import('../views/Dayput'))
const Login =React.lazy(()=>import('../views/Login'))
const My =React.lazy(()=>import('../views/My'))
const RankList =React.lazy(()=>import('../views/RankList'))
const Register =React.lazy(()=>import('../views/Register'))
const Search =React.lazy(()=>import('../views/Search'))
const ComicDetail =React.lazy(()=>import('../views/ComicDetail'))

export default class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Suspense fallback={<div className={styles.load}><img src={loading} alt=""/></div>}>
            <Switch>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/home/moreFineWorks" component={MorefineWorks}></Route>
              <Route exact path="/home/morePopularWorks" component={MorePopularWorks}></Route>
              <Route exact path="/home/moreNewArrival" component={MoreNewArrival}></Route>
              <Route exact path="/home/moreHotSerial" component={MoreHotSerial}></Route>
              <Route exact path="/home/moreXiaobianRecommend" component={MoreXiaobianRecommend}></Route>
              <Route exact path="/home/moreWeekRecommend" component={MoreWeekRecommend}></Route>            
              <Route exact path="/category" component={Category}></Route>
              <Route exact path="/comicDetail/:id" component={ComicDetail}></Route>
              <Route exact path="/comicEnd" component={ComicEnd}></Route>
              <Route exact path="/dayput" component={Dayput}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/my" component={My}></Route>
              <Route exact path="/rankList" component={RankList}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/search" component={Search}></Route>
              <Redirect from= "/" to="/home"></Redirect>
            </Switch>
          </Suspense>
        </HashRouter>
      </div>
    );
  }
}
