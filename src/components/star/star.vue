<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const Length = 5;
  const starOn = 'on';
  const starOff = 'off';
  const starhalf = 'half';

  export default{
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
      starType(){
        return 'star-' + this.size
      },
      itemClasses(){
        let itemArr = [];
        let starscore = Math.floor(this.score*2)/2;
        let halfscore = starscore % 1 !== 0;
        let onscore = Math.floor(starscore);
        for(let i = 0; i < onscore;i++){
          itemArr.push(starOn);
        }
        if(halfscore){
          itemArr.push(starhalf);
        }
        while(itemArr.length < 5){
          itemArr.push(starOff);
        }
        return itemArr
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        background-size: 20px 20px
        margin-right:22px
        &:last-child
          margin-right:0
        &.on
          bg-img('star48_on')
        &.half
          bg-img('star48_half')
        &.off
          bg-img('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        background-size: 15px 15px
        margin-right:4px
        &:last-child
          margin-right:0
        &.on
          bg-img('star36_on')
        &.half
          bg-img('star36_half')
        &.off
          bg-img('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        background-size: 10px 10px
        margin-right:3px
        &:last-child
          margin-right:0
        &.on
          bg-img('star24_on')
        &.half
          bg-img('star24_half')
        &.off
          bg-img('star24_off')
</style>
