<template>
  <div class="pagination">
    <div class="pagination-input">
      <input type='text' placeholder='搜索框' v-model="sqlData"/>
    </div>
    <div class="pagination-refresh">
      <pku-button class="btn-default" value="导出" @callback="clickEvent" icon="floppy-o" v-if="exportdata"></pku-button>
      <pku-button class="btn-default" v-for="(callback, id) in btnGroup" v-if="id < 5" @callback="clickEvent(id)" :value="callback"></pku-button>
    </div>
    <div class="pagination-right">
      <ul class="pagination-list">
        <li :class="{'forbidden': activeNum === 1}" @click="onFirstPage()"><i class="fa fa-angle-double-left" aria-hidden="true"></i></li>
        <li :class="{'forbidden': activeNum === 1}" @click="onPrevPage()"><i class="fa fa-angle-left" aria-hidden="true"></i></li>
        <li v-for="(page, $index) in pages" :id="$index" :class="$index === gap? 'active' : ''" v-text="page" @click="onClickPage(page)"></li>
        <li :class="{'forbidden': activeNum >= pageNum}" @click="onNextPage()"><i class="fa fa-angle-right" aria-hidden="true"></i></li>
        <li :class="{'forbidden': activeNum >= pageNum}" @click="onLastPage()"><i class="fa fa-angle-double-right" aria-hidden="true"></i></li>
      </ul>
    </div>
    <div class="pagination-select">
      <pku-select :value="len" :list="lens" @callback="onSelect"></pku-select>
    </div>
    <div class="pagination-total">
      <span>共 {{this.data.length}} 条</span>, 
      <span> {{this.pageNum}} 页 </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pkuPagination',
  props: {
    rawdata: {
      type: Array,
      default () {
        return []
      }
    },
    tolen: {
      type: Number,
      default: 10
    },
    lens: {
      type: Array,
      default () {
        return [5, 10, 15]
      }
    },
    pageLen: {
      type: Number,
      default: 5
    },
    exportdata: {
      type: Boolean,
      default: false
    },
    btnGroup: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      data: this.rawdata,
      activeNum: 1,
      pages: [],
      gap: 0,
      len: this.tolen,
      sqlData: ''
    }
  },
  computed: {
    pageNum: function () {
      return Math.ceil(this.data.length / this.len)
    }
  },
  methods: {
    clickEvent (id) {
      this.$emit('clickEvent', id)
    },
    onSelect (val) {
      this.len = val
      this.$emit('clearCheckList', {activeNum: this.activeNum, len: this.len})
    },
    getPages () {
      this.pages = []
      if (this.pageNum < this.pageLen) {
        for (let i = 1; i <= this.pageNum; i++) {
          this.pages.push(i)
        }
      } else {
        for (let i = 1; i <= this.pageLen; i++) {
          this.pages.push(i)
        }
      }
    },
    getData () {
      let len = Number(this.len)
      let startIdx = (this.activeNum - 1) * len
      let newData = []
      for (let i = startIdx; i < startIdx + len && i < this.data.length; i++) {
        newData.push(this.data[i])
      }
      this.$emit('callback', newData)
    },
    onClickPage (idx) {
      this.activeNum = idx
      this.pages = []
      if (this.pageNum < this.pageLen) {
        for (let i = 1; i <= this.pageNum; i++) {
          this.pages.push(i)
        }
        this.gap = this.activeNum - 1
      } else if (this.activeNum <= Math.ceil(this.pageLen / 2)) {
        for (let i = 1; i <= this.pageLen; i++) {
          this.pages.push(i)
        }
        this.gap = this.activeNum - 1
      } else if (this.activeNum > (this.pageNum - Math.ceil(this.pageLen / 2))) {
        for (let i = this.pageNum - this.pageLen + 1; i <= this.pageNum; i++) {
          this.pages.push(i)
        }
        this.gap = this.activeNum - 1
      } else {
        let mid = Math.floor(this.pageLen / 2)
        for (let i = this.activeNum - mid; i <= this.activeNum + mid; i++) {
          this.pages.push(i)
        }
        this.gap = mid
      }
      this.$emit('clearCheckList', {activeNum: this.activeNum, len: this.len})
    },
    onFirstPage () {
      this.activeNum = 1
      this.gap = 0
      this.getPages()
      this.$emit('clearCheckList', {activeNum: this.activeNum, len: this.len})
    },
    onPrevPage () {
      if (this.activeNum <= 1) {
        return
      }
      this.activeNum--
      if (this.pages[0] > 1 && this.activeNum < this.pageNum - Math.floor(this.pageLen / 2)) {
        this.pages.unshift(this.pages[0] - 1)
        this.pages.pop()
        this.gap = Math.floor(this.pageLen / 2)
      } else {
        this.gap--
      }
      this.$emit('clearCheckList', {activeNum: this.activeNum, len: this.len})
    },
    onNextPage () {
      if (this.activeNum >= this.pageNum) {
        return
      }
      this.activeNum++
      if (this.pages.slice(-1) < this.pageNum && this.activeNum > Math.ceil(this.pageLen / 2)) {
        this.pages.shift()
        this.pages.push(this.pages.slice(-1)[0] + 1)
        this.gap = Math.floor(this.pageLen / 2)
      } else {
        this.gap++
      }
      this.$emit('clearCheckList', {activeNum: this.activeNum, len: this.len})
    },
    onLastPage () {
      this.$emit('clearCheckList', {activeNum: this.activeNum, len: this.len})
      this.activeNum = this.pageNum
      this.pages = []
      if (this.pageNum < this.pageLen) {
        for (let i = 0; i < this.pageNum; i++) {
          this.pages.push(this.pageNum - i)
        }
        this.gap = this.pageNum - 1
      } else {
        for (let i = 0; i < this.pageLen; i++) {
          this.pages.push(this.pageNum - i)
        }
        this.gap = this.pageLen - 1
      }
      this.pages.reverse()
    }
  },
  mounted () {
    this.getPages()
    this.getData()
  },
  watch: {
    'len' (newVal, oldVal) {
      this.len = newVal
      this.activeNum = 1
      this.gap = 0
      this.getPages()
      this.getData()
    },
    'activeNum' (newVal, oldVal) {
      this.getData()
    },
    'sqlData' (newVal, oldVal) {
      this.activeNum = 1
      this.gap = 0
      if (newVal === '') {
        this.data = this.rawdata
      } else {
        this.data = []
        this.data = this.rawdata.filter(function (item) {
          for (let key in item) {
            if (String(item[key]).indexOf(newVal) > -1) {
              return true
            }
          }
        })
      }
      this.getPages()
      this.getData()
    },
    'rawdata' (newVal, oldVal) {
      this.data = newVal
      this.activeNum = 1
      this.gap = 0
      this.getPages()
      this.getData()
    }
  }
}
</script>

<style scoped>
.pagination {
  font-size: 14px;
  color: #262626;
  margin: 10px 0;
  -moz-user-select:none;
  -webkit-user-select:none;
  user-select:none;
}
.pagination::after {
  display: block;
  content: '\20';
  height: 0;
  clear: both;
}
.pagination > div{
  display: inline-block;
}
.pagination-input {
  float: left;
}
.pagination-input input {
  line-height: 24px;
  border: 1px solid #d8dce5;
  font-size: 14px;
  border-radius: 6px;
  height: 24px;
  padding: 4px 12px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1);
}
.pagination-input input:focus {
  outline: none;
  border-color: #409eff;
}
.pagination-right {
  float: right;
}
.pagination-refresh {
  float: left;
  padding: 0 10px;
}
.pagination-refresh button {
  min-width: 72px;
  outline: none;
}
.pagination-total {
  float: right;
  line-height: 40px;
  padding: 0 10px;
}
.pagination-select {
  float: right;
  line-height: 40px;
  padding: 0 20px;
}
.pagination-select select {
  height: 40px;
  width: 100px;
  outline: none;
  border: 1px solid #d8dce5;
  background-color: #ffffff;
}
.pagination-select select:focus {
  border-color: #409eff;
}
.pagination-list li{
  display: inline-block;
  list-style-type: none;
  padding: 5px 0;
  width: 20px;
  cursor: pointer;
  min-width: 20px;
  min-height: 40px;
  line-height: 30px;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-weight: 700;
  margin: 0 0 0 10px;
  transition: color 200ms ease;
}
.pagination-list li:hover{
  color: #409eff;
}
.pagination-list li a {
  text-decoration: blink;
}
.active {
  color: #409eff;
  cursor: default;
}
.forbidden {
  color: #ccc !important;
  cursor: not-allowed !important;
}
.pagination-refresh >>> button {
  margin-right: 10px;
}
</style>