<template>
  <!-- 日期选择 -->
  <div>
    <div class="date-box">
      <p @click="openPicker">{{time}}</p>
    </div>
    <mt-datetime-picker ref="picker" type="date" v-model="form[post]" @confirm="confirm" year-format="{value}年"
      month-format="{value}月" date-format="{value}日" @visible-change="visbleChange"></mt-datetime-picker>
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
  data() {
    return {
      time: ""
    };
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
      let date = v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + v.getDate();
      this.form[this.post] = date;
      this.time = date;
    }
  }
};
</script>
<style lang='less' scoped>
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
</style>