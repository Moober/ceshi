<template>
  <div class="questionComplete">
    <div class="success">
      <img class="image" src="~@/assets/fail.png" alt="">
      <div class="title">
        提交失败
      </div>
      <div class="subtitle">问卷已停止回收~</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.questionComplete {
  width: 100%;
  height: 100%;
}
.success {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.image {
  width: 84px;
  height: 69px;
}
.title {
  font-size: 16px;
  margin-top: 20px;
}

.subtitle {
  font-size: 14px;
}
</style>