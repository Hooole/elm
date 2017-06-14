<template>
  <div class="ratingselect">
    <div class="select-type">
      <div class="select-padd border-1px">
        <div class="select-num">
          <div class="all block bgb" :class="{'active':selectType===2}" @click="select(2,$event)"><span class="rate">{{rateType.all}}</span><span
            class="len">{{ratings.length}}</span></div>
          <div class="like block bgb" :class="{'active':selectType===0}" @click="select(0,$event)"><span class="rate">{{rateType.like}}</span><span
            class="len">{{like.length}}</span></div>
          <div class="hate block bgd" :class="{'active':selectType===1}" @click="select(1,$event)"><span class="rate">{{rateType.hate}}</span><span
            class="len">{{hate.length}}</span></div>
        </div>
      </div>
      <div class="only-content border-1px">
        <i class="icon-check_circle" :class="{'active':onlyContent}" @click="onlyClickContent"></i>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const all = 2;
  const likeFood = 0;
  const hateFood = 1;

  export default{
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: all
      },
      rateType: {
        type: Object,
        default(){
          return {
            all: '全部',
            like: '喜欢',
            hate: '不喜欢'
          }
        }
      },
      onlyContent: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      like(){
        return this.ratings.filter((rating) => {
          return rating.rateType === likeFood;
        })
      },
      hate(){
        return this.ratings.filter((rating) => {
          return rating.rateType === hateFood;
        })
      }
    },
    methods: {
      select(type, event){
        if (!event._constructed) {
          return
        }
        this.$emit('select', type)
      },
      onlyClickContent(event){
        if (!event._constructed) {
          return
        }
        this.$emit('toggle')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .select-padd
    padding: 0 18px
    .select-num
      padding:18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .block
        display: inline-block
        padding: 8px 12px
        border-radius: 2px
        margin-left: 8px
        font-size: 0
        &.bgb
          background-color: rgba(0, 160, 220, 0.2)
          &.active
            background-color: rgb(0, 160, 220)
            color: rgb(255, 255, 255)
        &.bgd
          background-color: rgba(77, 85, 93, 0.2)
          &.active
            background-color: rgb(77, 85, 93)
            color: rgb(255, 255, 255)
        .rate
          line-height: 16px
          display: inline-block
          vertical-align: bottom
          font-size: 12px
        .len
          display: inline-block
          vertical-align: middle
          margin-left: 6px
          font-size: 10px
          line-height: 12px

  .only-content
    padding: 6px 18px
    border-1px(rgba(7, 17, 27, 0.1))
    .icon-check_circle
      padding: 6px
      display: inline-block
      vertical-align: top
      font-size: 24px
      color: rgb(147, 153, 159)
      &.active
        color: rgb(0, 160, 220)
    .text
      font-size: 12px
      padding: 6px 0
      display: inline-block
      vertical-align: top
      color: rgb(147, 153, 159)
      line-height: 24px
</style>
