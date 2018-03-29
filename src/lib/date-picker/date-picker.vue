<template>
  <div class="datepicker" @click.stop>
    <div class="datepicker-main">
      <i class="fa fa-calendar" aria-hidden="true"></i>
      <input type="text" :placeholder="value" @focus="onShowDate" :value="date"/>
    </div>
    <transition name="fade">
    <div class="datepicker-list" v-if="datepickerShow">
      <ul class="datepicker-list-header">
        <li class="arrow-left" @click="reduceYear"><i class="fa fa-angle-double-left" aria-hidden="true"></i></li>
        <li class="arrow-left" @click="reduceMonth"><i class="fa fa-angle-left" aria-hidden="true"></i></li>
        <!-- <li class="date" @click="selected" v-model="year">{{year}} 年</li>
        <li class="date" @click="selected" v-model="month">{{month}} 月</li> -->
        <input class="date" type="text" @click="selected" v-model="year" />年
        <input class="date" type="text" @click="selected" v-model="month" />月
        <li class="arrow-right" @click="addYear"><i class="fa fa-angle-double-right" aria-hidden="true"></i></li>
        <li class="arrow-right" @click="addMonth"><i class="fa fa-angle-right" aria-hidden="true"></i></li>
      </ul>
      <div class="datepicker-list-table">
        <div class="table">
          <div class="thead">
            <span v-for="day in week">{{day}}</span>
          </div>
          <div class="tbody" @click="selectDay">
            <div class="prev-month" v-for="day in previousMonth"><span>{{day}}</span></div>
            <div v-for="day in monthDay[month - 1]" v-bind:class="isActive(day)" class="current-month"><span>{{day}}</span></div>
            <div class="next-month" v-for="day in nextMonth"><span>{{day}}</span></div>
          </div>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'pkuDatePicker',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      clickID: 0,
      day: 0,
      month: 0,
      year: 0,
      previousMonth: [],
      nextMonth: [],
      monthDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      week: ['日', '一', '二', '三', '四', '五', '六'],
      datepickerShow: false
    }
  },
  computed: {
    date () {
      if (this.year === 0 || this.month === 0 || this.day === 0 || this.clickID === 0) {
        return ''
      }
      return this.year + '-' + this.month + '-' + this.day
    }
  },
  mounted () {
    document.children[0].addEventListener('click', this.handleClickOut, false)
  },
  beforeDestroy () {
    document.children[0].removeEventListener('click', this.handleClickOut)
  },
  watch: {
    year: function (val) {
      let reg = /^[1-9]\d*$/g
      if (!reg.test(val)) {
        let date = new Date()
        this.year = date.getFullYear()
      }
      if (val < 0) {
        this.year = 1
      }
      if (val > 10000) {
        this.year = 10000
      }
      this.dayScreen()
    },
    month: function (val) {
      let reg = /^[1-9]\d*$/g
      if (!reg.test(val)) {
        let date = new Date()
        this.month = date.getMonth() + 1
      }
      if (val < 1) {
        this.month = 1
      }
      if (val > 12) {
        this.month = 12
      }
      this.dayScreen()
    }
  },
  methods: {
    handleClickOut () {
      this.datepickerShow = false
    },
    // 突出显示当前日期
    isActive (index) {
      if (index === this.day) {
        return {
          active: true
        }
      }
    },
    // 增减年份
    addYear () {
      this.year++
      if (this.isLeapYear(this.year)) {
        this.monthDay[1] = 29
      } else {
        this.monthDay[1] = 28
      }
    },
    reduceYear () {
      this.year--
      if (this.isLeapYear(this.year)) {
        this.monthDay[1] = 29
      } else {
        this.monthDay[1] = 28
      }
    },
    // 增减月份
    addMonth () {
      this.month++
      if (this.month > 12) {
        this.month = 1
        this.year++
      }
    },
    reduceMonth () {
      this.month--
      if (this.month < 1) {
        this.month = 12
        this.year--
      }
    },
    onShowDate () {
      if (this.date === '') {
        let date = new Date()
        this.year = date.getFullYear()
        if (this.isLeapYear(this.year)) {
          this.monthDay[1] = 29
        } else {
          this.monthDay[1] = 28
        }
        this.month = date.getMonth() + 1
        this.day = date.getDate()
      }
      this.dayScreen()
      this.datepickerShow = true
    },
    selected (e) {
      e.target.select()
    },
    // 选择日期
    selectDay (e) {
      this.clickID++
      let targetClass = e.target.parentNode.className
      if (targetClass === 'prev-month') {
        if (this.month === 1) {
          this.month = 12
          this.year--
        } else {
          this.month = this.month - 1
        }
        this.day = parseInt(e.target.innerText)
      } else if (targetClass === 'next-month') {
        if (this.month === 12) {
          this.month = 1
          this.year++
        } else {
          this.month = this.month + 1
        }
        this.day = parseInt(e.target.innerText)
      } else {
        this.day = parseInt(e.target.innerText)
      }
    //   let that = this
      setTimeout(() => {
        this.datepickerShow = false
        this.$emit('callback', this.date)
      }, 0)
      // this.datepickerShow = false
    },
    dayScreen () {
      // 上一个月
      let firstDate = new Date(this.year, this.month - 1, 1)
      let firstWeek = firstDate.getDay()
      let preMonthDay = null
      if (this.month === 1) {
        preMonthDay = this.monthDay[11]
      } else {
        preMonthDay = this.monthDay[this.month - 2]
      }
      for (let i = 0; i < preMonthDay; i++) {
        this.previousMonth[i] = i + 1
      }
      if (firstWeek === 0) {
        this.previousMonth = this.previousMonth.slice(-7)
      } else {
        this.previousMonth = this.previousMonth.slice(-firstWeek)
      }
      // 下一个月
      let endDate = new Date(this.year, this.month - 1, this.monthDay[this.month - 1])
      let endWeek = endDate.getDay()
      let nextMonthDay = null
      if (this.month === 12) {
        nextMonthDay = this.monthDay[0]
      } else {
        nextMonthDay = this.monthDay[this.month]
      }
      for (let i = 0; i < nextMonthDay; i++) {
        this.nextMonth[i] = i + 1
      }
      if (endWeek === 6) {
        this.nextMonth = this.nextMonth.slice(0, 7)
      } else {
        this.nextMonth = this.nextMonth.slice(0, 6 - endWeek)
      }
    },
    isLeapYear (year) {
      if (year % 100 === 0 || year % 400 === 0 || year % 4 === 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .datepicker {
    // position: relative;
    display: inline-block;
    font-size: 14px;
    z-index: 2;
  }
  .datepicker .datepicker-main i {
    position: absolute;
    color: rgba(0, 0, 0, 0.4);
    line-height: 34px;
    width: 30px;
    text-align: center;
  }
  .datepicker input {
    color: #5a5e66;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: none;
    box-sizing: border-box;
    display: inline-block;
    font-size: inherit;
    height: 34px;
    line-height: 34px;
    outline: none;
    padding: 0 30px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    width: 100%;
  }
  .datepicker input:focus {
    box-shadow: #409eff 1px 1px 2px, #409eff -1px -1px 0px;
  }
  .datepicker .datepicker-list {
    position: absolute;
    width: 320px;
    color: #5a5e66;
    border: 1px solid #dfe4ed;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    margin: 8px 0;
    box-shadow: rgba(0, 0, 0, 0.14) 0px -4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
    z-index: 2;
  }
  .datepicker .datepicker-list::before {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 6px solid #ffffff;
    content: "\20";
    display: block;
    left: 20px;
    position: absolute;
    top: -6px;
  }
  .datepicker-list-header {
    margin: 12px;
    font-size: 16px;
    text-align: center;
  }
  .datepicker-list-header li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
  }
  .datepicker-list-header .arrow-left {
    float: left;
  }
  .datepicker-list-header .arrow-right {
    float: right;
  }
  .datepicker-list-header .date {
    font-weight: 500;
    display: inline-block;
    width: 50px;
    padding: 0;
    border: none;
    text-align: center;
    line-height: 30px;
    height: 30px;
    box-shadow: none;
    cursor: pointer;
  }
  .datepicker-list-header input:hover {
    color: #409eff;
  }
  .datepicker-list-header li:hover {
    color: #409eff;
  }
  .datepicker-list-table {
    margin: 0 12px 5px;
    font-size: 12px;
    user-select: none;
  }
  .datepicker-list-table .thead, .tbody{
    font-size: 0;
  }

  .datepicker-list-table .thead span{
    display: inline-block;
    padding: 5px;
    width: 32px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #5a5e66;
    font-size: 12px;
    font-weight: 400;
    border-bottom: 1px solid #e6ebf5;
  }
  .datepicker-list-table .tbody div {
    display: inline-block;
    padding: 5px 0;
    width: 42px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    color: #5a5e66;
    cursor: pointer;
  }
  .datepicker-list-table .tbody span {
    height: 24px;
    width: 24px;
    display: inline-block;
  }
  .datepicker-list-table .tbody span:hover {
    color: #409eff;
  }
  .datepicker-list-table .tbody div.prev-month, .datepicker-list-table .tbody div.next-month {
    color: #b4bccc;
  }
  .datepicker-list-table .tbody .active span{
    border-radius: 30px;
    color: #fff;
    background-color: #409eff;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 500ms ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateY(-10px);
  }
  input::-webkit-input-placeholder { /* WebKit browsers */
    color: rgba(0, 0, 0, 0.4);
  }
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(0, 0, 0, 0.4);
  }
  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(0, 0, 0, 0.4);
  }
  input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: rgba(0, 0, 0, 0.4);
  }
</style>