<template>
  <div class="table">
    <div :class="{'table-wrapper': true, 'table-scroll': scroll}">
      <table :style="{width: resize ? '100%' : 'unset'}">
        <thead>
          <tr>
            <th v-if="checkbox" style="width: 80px"><pku-checkbox ref="checkAll"  value="" @click.native="onCheckAllEventHandler($event)" v-show="currentPageData.length > 0"></pku-checkbox></th>
            <th v-if="method" style="width: 180px">操作</th>
            <th v-for="(val, id) in menu" :style="{width: cssWidth ? cssWidth[id] : 'unset'}">
              {{val.name}}
              <span class="table-sort" @click="onSortBy($event, val.key)" data-asc="false" v-show="val.key !== 'checkbox'">
                <i class="fa fa-sort-asc" aria-hidden="true"></i>
                <i class="fa fa-sort-desc" aria-hidden="true"></i>
              </span>
            </th>
          </tr>
        </thead>
        <transition-group
              name="list"
              tag="tbody"
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:leave="leave">
          <div v-if="currentPageData[0] === undefined" v-bind:key="0" class="table-nodata">
            暂无数据
          </div>
          <tr v-for="(item, $id) in currentPageData" v-bind:key="$id" v-bind:data-index="$id">
            <td v-if="checkbox">
                <pku-checkbox ref="mustUncheck"  value="" @callback="onCheckEventHandler(item['id'])"></pku-checkbox>
            </td>
            <td v-if="method" class="methods">
              <pku-dropdown 
                selected="操作"
                size="sm"
                :list="methodGroup[$id + csLen * (csActiveNum - 1)]"
                @callback="onMethodEventHandler($event, item['id'])"></pku-dropdown>
              <!-- <pku-cascader
                  selected="操作"
                  :list="methodGroup"
                  @callback="onMethodEventHandler($event, item['id'])"></pku-cascader> -->
              <!-- <span v-for="(val, $id_method) in methodGroup" @click="onMethodEventHandler($id_method, item['id'])"><a>{{ val }}</a></span> -->
            </td>
            <td v-for="(val, id) in menu" :title="item[val.key]">
                {{item[val.key]}}
            </td>
          </tr>
          </transition-group>
        </tbody>
      </table>
    </div>
    <pku-pagination 
        :class="{'table-pagination': true, 'pagination-scroll': scroll}"
        v-if="pagination" 
        @clickEvent="onClickEventHandler"
        @callback="renderdata"
        @clearCheckList="onClearEventHandler"
        :rawdata="tableData"
        :lens="lens"
        :tolen="tolen"
        :pageLen="pageLen"
        :exportdata="exportdata"
        :btnGroup="btnGroup"></pku-pagination>
  </div>
</template>

<script>
export default {
  name: 'pkuTable',
  props: {
    cssWidth: {
      type: Array,
      default () {
        return []
      }
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    method: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Boolean,
      default: false
    },
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
        return [5, 10, 30, 50, 100]
      }
    },
    pageLen: {
      type: Number,
      default: 5
    },
    menu: {
      type: Array,
      default () {
        return []
      }
    },
    pagination: {
      type: Boolean,
      default: false
    },
    exportdata: {
      type: Boolean,
      default: false
    },
    btnGroup: {
      type: Array,
      default: () => []
    },
    methodGroup: {
      type: Array,
      default: () => [{label: '操作', disabled: false}]
    },
    scroll: {
      type: Boolean,
      default: false
    },
    params: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      csActiveNum: 1,
      csLen: 10,
      currentPageData: [],
      tableData: this.rawdata,
      checkboxList: '[]'
    }
  },
  watch: {
    rawdata (val) {
      let tmp = val
      if (this.params.length > 0 && val.length > 0) {
        this.params.forEach(item => {
          tmp = tmp.filter((data) => {
            if (item.opt === '=') {
              return data[item.key] === item.value
            }
          })
        })
        this.tableData = tmp.concat()
      } else {
        this.tableData = val
      }
    },
    tableData (val) {
      if (this.pagination === false) {
        this.currentPageData = this.tableData
      }
      if (this.$refs.mustUncheck) {
        this.$refs.mustUncheck.forEach(function (item) {
          item.unCheck()
        })
      }
    }
  },
  methods: {
    onCheckAllEventHandler (event) {
      if (event.target.tagName === 'SPAN') {
        if (JSON.parse(this.checkboxList).length < this.currentPageData.length) {
          this.checkboxList = '[]'
          this.$refs.mustUncheck.forEach(function (item) {
            item.unCheck()
            item.onCheck()
          })
        } else {
          this.checkboxList = '[]'
          this.$refs.mustUncheck.forEach(function (item) {
            item.unCheck()
          })
        }
        let tmp = JSON.parse(this.checkboxList)
        this.$emit('checkEvent', tmp)
      }
    },
    onClearEventHandler (evt) {
      if (evt) {
        this.csActiveNum = evt.activeNum
        this.csLen = evt.len
      }
      this.checkboxList = '[]'
      if (this.$refs.checkAll) {
        this.$refs.checkAll.unCheck()
      }
      if (this.$refs.mustUncheck) {
        this.$refs.mustUncheck.forEach(function (item) {
          item.unCheck()
        })
      }
      this.$emit('clearBtnGroup')
    },
    onCheckEventHandler (id) {
      let tmp = JSON.parse(this.checkboxList)
      if (tmp.indexOf(id) === -1) {
        tmp.push(id)
        this.checkboxList = JSON.stringify(tmp)
      } else {
        tmp.splice(tmp.indexOf(id), 1)
        this.checkboxList = JSON.stringify(tmp)
      }
      if (tmp.length === this.currentPageData.length) {
        this.$refs.checkAll.$data.checked = true
      } else {
        this.$refs.checkAll.$data.checked = false
      }
      this.$emit('checkEvent', tmp)
    },
    onClickEventHandler (id) {
      let checkboxList = this.checkboxList.concat()
      this.$emit('clickEvent', { id, checkboxList })
      if (this.refresh) {
        this.checkboxList = '[]'
      }
    },
    onMethodEventHandler (evt, item) {
      this.$emit('methodEvent', evt, item, this.checkboxList)
    },
    renderdata (data) {
      this.currentPageData = data
    },
    onSortBy (evt, key) {
      evt = evt.target
      while (evt.nodeName.toUpperCase() !== 'SPAN') {
        evt = evt.parentNode
      }
      Array.prototype.forEach.call(evt.parentNode.parentNode.children, function (item) {
        if (item.children.length > 0) {
          Array.prototype.forEach.call(item.children[0].children, function (node) {
            node.classList.remove('sorted')
          })
        }
      })
      if (evt.dataset.asc === 'true') {
        evt.dataset.asc = 'false'
        evt.children[1].classList.toggle('sorted')
      } else if (evt.dataset.asc === 'false') {
        evt.dataset.asc = 'true'
        evt.children[0].classList.toggle('sorted')
      }
      let data = this.rawdata.concat()
      data.sort(function (left, right) {
        if (typeof left[key] === 'number' || key === 'id') {
          let l = Number(left[key])
          let r = Number(right[key])
          if (l < r) {
            return (evt.dataset.asc === 'true') ? -1 : 1
          } else {
            return (evt.dataset.asc === 'true') ? 1 : -1
          }
        } else {
          if (left[key] < right[key]) {
            return (evt.dataset.asc === 'true') ? -1 : 1
          } else {
            return (evt.dataset.asc === 'true') ? 1 : -1
          }
        }
      })
      this.tableData = data
    },
    beforeEnter: function (el) {
      el.style.color = '#ffffff'
    },
    enter: function (el, done) {
      let delay = el.dataset.index * 50
      setTimeout(function () {
        el.style.color = null
      }, delay)
      done()
    },
    leave: function (el, done) {
      let delay = el.dataset.index * 100
      setTimeout(function () {
        el.style.color = '#ffffff'
      }, delay)
      done()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table {
    font-size: 14px;
    font-weight: 400;
    color: #5a5e66;
    -webkit-font-smoothing: antialiased;
  }
  .table-wrapper {
    // overflow-x: scroll;
    // white-space: nowrap;
    // padding-bottom: 100px;
  }
  table {
    max-width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    position: relative;
    min-width: 100%;
    min-height: 70px;
  }
  table th {
    // width: 120px;
  }
  .table table thead {
    background-color: #f5f7fa;
  }
  .table table tr {
    line-height: 32px;
    text-align: center;
    transition: all 500ms ease;
    border: 1px solid #e6ebf5;
  }
  .table table tr:hover {
    background-color: #f5f7fa;
  }
  table td {
    padding: 0 20px;
    border: 1px solid #e6ebf5;
    min-width: 60px;
  }
  table td:not(.methods) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .table-sort {
    position: relative;
  }
  .table-sort i {
    position: absolute;
    top: 3px;
    left: 6px;
    color: #cccccc;
    cursor: pointer;
  }
  i.sorted {
    color: #5a5e66;
  }
  table a {
    color: #8f000b;
    cursor: pointer;
    transition: color 300ms ease;
    padding: 0 10px;
  }
  table a:hover {
    color: #700005;
  }
  .table-nodata {
    width: 100%;
    position: absolute;
    text-align: center;
    line-height: 32px;
  }
  .table .methods >>> .dropdown {
    line-height: 20px;
    padding: 2px 0px;
  }
  .table .methods >>> .btn {
    line-height: 20px;
    padding: 2px 0px;
  }
  .table .table-pagination {
    position: relative;
  }
  .table-scroll {
    overflow: scroll;
    overflow-y:hidden
  }
  .table-scroll table {
    position: relative;
    max-width: 100%;
    min-width: 100%;
    // width: 100%;
    margin: 0 0 100px;
    border-collapse: collapse;
    table-layout: fixed;
  }
  .table-scroll::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  .table-scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #8f000b;
  }
  .table-scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #ffffff;
  }
  .pagination-scroll {
    top: -80px;
  }
</style>
