<template>
  <!-- 单选 -->
  <div>
    <mt-radio v-model="form[post]" :options="radioDataList" @change="change"></mt-radio>
  </div>
</template>

<script>
export default {
  name: "EllRadio",
  props: {
    form: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pitem: {
      type: Object,
      default: () => {
        return {};
      }
    },
    post: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    change(v) {
      // console.log(v)
    }
  },
  computed: {
    radioDataList() {
      let newArr = [];
      this.pitem.radioList.map(item => {
        newArr.push(item.name);
      });
      return newArr;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.mint-cell {
  min-height: 40px;
}
/deep/.mint-radio-core {
  width: 12px;
  height: 12px;
}
/deep/.mint-radio-label {
  font-size: 12px;
  color: #666;
  margin-left: 10px;
}
/deep/.mint-radiolist-label {
  padding: 0;
}
/deep/.mint-radio-input:checked + .mint-radio-core {
  background: none;
  border: 2px solid #fcab37;
}
/deep/.mint-radio-core::after {
  width: 6px;
  height: 6px;
  top: 1px;
  left: 1px;
}
/deep/.mint-radio-input:checked + .mint-radio-core::after {
  background-color: #fcab37;
}
</style>