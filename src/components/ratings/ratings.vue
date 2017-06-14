<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <p class="score">{{seller.score}}</p>
          <p class="wholescore">综合评分</p>
          <p class="around">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <div class="serviceScore inline">
            <div class="title block">服务态度</div>
            <div class="star-wrapper block">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <div class="text block">{{seller.serviceScore}}</div>
          </div>
          <div class="foodScore inline">
            <div class="title block">食物评分</div>
            <div class="star-wrapper block">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <div class="text block">{{seller.foodScore}}</div>
          </div>
          <div class="arrive inline">
            <div class="title block">送达时间</div>
            <div class="time block">{{seller.deliveryTime}}分钟</div>
          </div>
        </div>
      </div>
      <div class="splitwrapper">
        <split></split>
      </div>
      <div class="ratingelectwrapper">
        <ratingselect :rateType="rateType" :selectType="selectType" :onlyContent="onlyContent"
                      @toggle="toggle" @select="selectRating" :ratings="ratings"></ratingselect>
      </div>
      <ul class="rating-detail" v-show="ratings && ratings.length">
        <li class="rating-list border-1px" v-for="rating in ratings" v-show="newShow(rating.rateType,rating.text)">
          <div class="avator">
            <img :src="rating.avatar" width="28" height="28" class="avatorimg"/>
            <div class="name-time">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
              </div>
              <span class="time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
          </div>
          <div class="ratingtime">
            <span class="time">{{rating.rateTime | formatDate}}</span>
          </div>
          <div class="text">
            <p>{{rating.text}}</p>
          </div>
          <div class="menu clearfix">
            <i :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></i>
            <span class="item" v-for="item in rating.recommend">{{item}}</span>
          </div>
        </li>
      </ul>
      <div class="norating" v-show="!ratings || !ratings.length"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';
  import Bscroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';
  const all = 2;
  const errok = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        rateType: {
          all: '全部',
          like: '满意',
          hate: '不满意'
        },
        selectType: all,
        onlyContent: false,
        ratings: []
      }
    },
    computed: {
      /*filterCommend(){
       let arr = [];
       for (let i = 0; i < this.ratings.length; i++) {
       let recommend = this.ratings[i].recommend;
       if (recommend.length > 3) {
       arr = recommend.slice(0, 3);
       console.log(arr);
       }
       }

       }*/
    },
    created(){
      this.$http.get('/api/ratings').then(response => {
        response = response.body;
        if (response.errno === errok) {
          this.ratings = response.data;
          this.$nextTick(() => {
            if (this.$refs.ratings) {//解决刷新报错的bug
              this.ratingScroll = new Bscroll(this.$refs.ratings, {
                click: true
              });
            }
          })
        }
      });
    },
    methods: {
      toggle(){
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        })
      },
      selectRating(type){
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        })
      },
      newShow(type, text){
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === all) {
          return true
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .ratings
    position: absolute
    top: 172px
    bottom: 0
    overflow: hidden
    width: 100%
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          color: rgb(255, 153, 0)
          line-height: 28px
          font-size: 24px
        .wholescore
          margin-top: 6px
          line-height: 12px
          color: rgb(7, 17, 27)
          font-size: 12px
        .around
          margin-top: 8px
          color: rgb(147, 153, 159)
          font-size: 10px
      .overview-right
        flex: 1
        padding-left: 24px
        @media only screen and (max-width: 320px)
          padding-left: 12px
          padding-left: 12px
        .inline
          font-size: 0
          .title
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
            margin-right: 12px
          .block
            display: inline-block
            vertical-align: top
          .text
            line-height: 18px
            margin-left: 12px
            color: rgb(255, 153, 0)
            font-size: 12px
        .foodScore
          margin-top: 8px
        .arrive
          margin-top: 8px
          .time
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 18px
    .ratingelectwrapper
      margin-top: 18px
    .rating-detail
      padding: 0 18px
      .rating-list
        position: relative
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avator
          font-size: 0
          .avatorimg
            border-radius: 50%
            display: inline-block
            vertical-align: top
          .name-time
            display: inline-block
            vertical-align: top
            margin-left: 12px
            .name
              line-height: 12px
              color: rgb(7, 17, 27)
              font-size: 10px
            .star-wrapper
              display: inline-block
              margin-top: 4px
            .time
              display: inline-block
              margin-left: 6px
              line-height: 12px
              color: rgb(147, 153, 159)
              font-size: 10px
        .ratingtime
          position: absolute
          top: 18px
          right: 0
          color: rgb(147, 153, 159)
          line-height: 12px
          font-size: 10px
        .text
          padding-left: 40px
          margin-top: 10px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
        .menu
          line-height: 16px
          font-size: 0
          padding-left:40px
          margin-top:8px
          .icon-thumb_up, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
</style>
