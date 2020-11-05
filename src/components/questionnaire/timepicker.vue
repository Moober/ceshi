<template>
  <!-- 日期选择 -->
  <div>
    <div class="date-box">
      <p @click="openPicker">{{form[post]}}</p>
    </div>
    <mt-datetime-picker ref="picker" type="time" v-model="form[post]" @confirm="confirm" @visible-change="visbleChange">
    </mt-datetime-picker>
  </div>
</template>

<script>
export default {
  name: "EllDatePicker",
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
  },
  methods: {
    visbleChange(val) {
      if (val) {
        this.$emit("showPicker", true);
      } else {
        this.$emit("showPicker", false);
      }
    },
    openPicker() {
      this.$refs.picker.open();
    },
    confirm(v) {
      this.form[this.post] = v;
      console.log(this.form[this.post]);
    }
  }
};
</script>
<style lang='less' >
.date-box {
  width: 100%;
  padding: 0 10px 10px;
  p {
    background: #f1f1f1;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-size: 12px;
  }
}
.mint-datetime-action {
  color: #fcab37 !important;
}
</style>