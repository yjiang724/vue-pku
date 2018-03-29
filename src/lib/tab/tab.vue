<template>
  <div class="tab">
    <div class="tab-hr"></div>
    <div :class="{'tab-item': true, 'is_Active': index === is_Active}" v-for="(item, index) in list" @click.self="onSwitchEventHander($event, index)">
    {{ item }}
    </div>
    <div class="tab-content">
      <div :class="{'tab-slot': true, 'is_Active': index === is_Active}" v-for="(item, index) in list">
        <slot :name="'slot_' + index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pkuTab',
  props: {
    list: {
      type: Array,
      default () {
        return ['问题设置', '通用设置', '个性设置']
      }
    }
  },
  data () {
    return {
      is_Active: 0
    }
  },
  watch: {
  },
  methods: {
    onSwitchEventHander (evt, val) {
      this.is_Active = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
}
.tab-item {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
  padding: 0 20px;
  border-bottom: 3px solid transparent;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  transition: all .2s ease;
  cursor: pointer;
}
.tab-item.is_Active {
  color: rgb(25, 118, 210);
  border-bottom: 3px solid rgb(25, 118, 210);
}
.tab-item:nth-of-type(2) {
  padding-left: 0;
}
.tab-slot {
  display: none;
}
.tab-slot.is_Active {
  display: inline-block;
  width: 100%;
}
.tab-content {
  margin-top: 20px;
}
.tab-hr {
  position: relative;
  width: 100%;
  height: 3px;
  background-color: #e5e5e5;
  top: 43px;
  z-index: -1;
}
</style>
