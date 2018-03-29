<template>
  <div class="rate" @mouseleave.self="onLeaveEventHandler">
    <span v-for="(item, index) in max" v-bind:class="{ 'star-on': index <= nowValue, 'star-off': index > nowValue }">
      <i :class="{'don-ui-star': true, 'fa': true, 'fa-star-o': index > nowValue, 'fa-star': index <= nowValue}" aria-hidden="true" @click.self="onClickEventHandler(index)" @mouseover.self="onOverEventHandler(index)"></i>
    </span>
    <span v-if="voidShow && nowValue !== -1">{{start + nowValue}}</span>
  </div>
</template>

<script>
export default {
  name: 'pkuRate',
  props: {
    voidMax: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: true
    },
    voidShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    voidStart: {
      type: Number,
      default: 1
    },
    voidNum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      max: this.voidMax,
      start: this.voidStart,
      nowValue: this.voidNum === 0 ? -1 : this.voidNum,
      clickID: -1
    }
  },
  watch: {
    voidStart (val) {
      this.start = val
    },
    voidMax (val) {
      this.max = val
    },
    voidNum (val) {
      this.clickID = val
      this.nowValue = val
    }
  },
  mounted () {
  },
  methods: {
    onClickEventHandler (evt) {
      this.clickID = evt
      this.$emit('callback', evt)
    },
    onOverEventHandler (evt) {
      this.nowValue = evt
    },
    onLeaveEventHandler () {
      if (this.clickID === -1) {
        this.nowValue = -1
      } else {
        this.nowValue = this.clickID
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rate {
  display: inline-block;
  width: inherit;
}
.don-ui-star {
  margin-right: 6px;
  color: #c0c4cc;
  font-size: 18px;
  font-weight: 100;
  transition: 300ms;
  cursor: pointer;
}
.don-ui-star:hover {
  transform: scale(1.15);
}
.star-on i{
  color: rgb(247, 186, 42);
}
</style>
