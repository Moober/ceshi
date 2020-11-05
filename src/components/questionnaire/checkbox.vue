<template>
  <!-- 多选框 -->
  <div>
    <mt-checklist v-model="value" :options="checkDataList"></mt-checklist>
  </div>
</template>

<script>
export default {
  name: "EllCheckBox",
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
    return {
      options: [
        {
          label: "选项A",
          value: "值A"
        },
        {
          label: "选项B",
          value: "值B"
        }
      ],
      value: []
    };
  },
  computed: {
    checkDataList() {
      let newArr = [];
      this.pitem.checkList.forEach(item => {
        newArr.push({
          label: item.name,
          value: item.name
        });
      });
      return newArr;
    }
  },
  mounted() {
    if (this.form[this.post] === undefined) {
      this.value = [];
    }
  },
  watch: {
    value() {
      this.form[this.post] = this.value;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.mint-cell {
  min-height: 40px;
}
/deep/.mint-checklist-label {
  padding: 0;
}
/deep/.mint-checkbox-label {
  font-size: 12px;
  color: #666;
  margin-left: 10px;
}
/deep/.mint-checkbox-core {
  width: 12px;
  height: 12px;
}
/deep/.mint-checkbox-input:checked + .mint-checkbox-core {
  background: #fcab37;
  border: 2px solid #fcab37;
}
/deep/.mint-checkbox-core::after {
  top: -1px;
  left: 1px;
  width: 3px;
  height: 6px;
}
</style>