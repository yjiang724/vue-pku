<template>
  <div class="don-ui-edit">
    <i class="fa fa-lg fa-pencil-square-o" aria-hidden="true" v-show="!show" @click="onShowEventHandler"></i>
    <i class="fa fa-lg fa-check" aria-hidden="true" v-show="show" @click="onSubmitEventHandler"></i>
    <i class="fa fa-lg fa-times" aria-hidden="true" v-show="show" @click="onCancelEventHandler"></i>
  </div>
</template>

<script>
export default {
  name: 'pkuEdit',
  props: {
    showFunc: {
      type: Function,
      default () {
        console.log('show')
      }
    },
    submitFunc: {
      type: Function,
      default () {
        console.log('submit')
      }
    },
    cancelFunc: {
      type: Function,
      default () {
        console.log('cancel')
      }
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    onShowEventHandler () {
      this.show = true
      this.showFunc()
    },
    onSubmitEventHandler () {
      this.show = false
      this.submitFunc()
    },
    onCancelEventHandler () {
      this.show = false
      this.cancelFunc()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.don-ui-edit{
  display: inline-block;
  padding: 0 20px;
  vertical-align: middle;
}
.fa-pencil-square-o {
  color: rgb(211, 47, 47);
  cursor: pointer;
}
.fa-pencil-square-o:hover {
  color: #700005;
}
.fa-check {
  color: rgb(56, 142, 60);
  cursor: pointer;
}
.fa-check:hover {
  color: rgba(56, 142, 60, 0.75);
}
.fa-times {
  color: rgb(211, 47, 47);
  cursor: pointer;
}
.fa-times:hover {
  color: rgb(211, 47, 47, 0.75);
}
</style>
