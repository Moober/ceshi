<template>
  <!-- 文本框 -->
  <div>
    <mt-field placeholder="请输入" type="textarea" rows="4" v-model="form[post]"></mt-field>
    <!-- <el-input type="textarea" v-model="form[post]" :disabled="disabled" placeholder="请输入"></el-input> -->
  </div>
</template>

<script>
export default {
  name: "EllTextarea",
  props: {
    form: {
      type: Object,
      default: () => {
        return {};
      }
    },
    post: {
      type: Number
    },
    name: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang='less' scoped>
/deep/.mint-field.is-textarea .mint-cell-value {
  background-color: #f1f1f1;
  border-radius: 4px;
}
/deep/.mint-field-core {
  background-color: #f1f1f1;
  padding: 0 9px;
  font-size: 12px;
}
/deep/.mint-cell-wrapper {
  margin-bottom: 10px;
}
</style>