<template>
  <transition name="slide">
  <div class="tag" :class="classObj">
    <span>{{ value }}</span>
    <span class="close" v-if="closable" @click.stop="onClickEventHandler">
     <i class="fa fa-times" aria-hidden="true"></i>
    </span>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'pkuTag',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    value: {
      type: String,
      default: '标签'
    },
    closable: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    classObj () {
      return {
        [this.classType]: true,
        'is-closable': this.closable,
      }
    }
  },
  data () {
    return {
      classType: 'tag-' + this.type
    }
  },
  methods: {
    onClickEventHandler (evt) {
      evt = evt.target
      while (evt.nodeName.toUpperCase() !== 'DIV') {
        evt = evt.parentNode
      }
      this.$emit('close', evt.children[0].innerText)
    }
  }
}
</script>
<style scoped>
  .tag {
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .tag.is-closable .close:hover {
    opacity: 0.5;
  }
  .close {
    cursor: pointer;
  }
  .tag-primary {
    color: rgb(25, 118, 210);
    background-color: rgba(25, 118, 210,.1);
    border: 1px solid rgba(25, 118, 210,.2);
  }
  .tag-default {
    color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0,.1);
    border: 1px solid rgba(0, 0, 0,.2);
  }
  .tag-warning {
    color: rgb(245, 124, 0);
    background-color: rgba(245, 124, 0,.1);
    border: 1px solid rgba(245, 124, 0,.2);
  }
  .tag-danger {
    color: rgb(211, 47, 47);
    background-color: rgba(211, 47, 47,.1);
    border: 1px solid rgba(211, 47, 47,.2);
  }
  .tag-success {
    color: rgb(56, 142, 60);
    background-color: rgba(56, 142, 60,.1);
    border: 1px solid rgba(56, 142, 60,.2);
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 300ms ease;
  }
  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
