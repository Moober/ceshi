<template>
  <div class="questionnaire">
    <div class="questionnaire-name">
      <p class="title">{{title}}</p>
      <mt-progress :value="progressWidth">
        <div class="progress" slot="end">{{progressWidthTest}}</div>
      </mt-progress>
    </div>
    <div class="content">
      <div class="question-list" v-for="(item,index) in questionList" :key="item.keys">
        <div class="title">
          <span v-if="item.type==='Radio'" class="item-type">「单选题」</span>
          <span v-else-if="item.type==='CheckBox'" class="item-type">「多选题」</span>
          <span v-else-if="item.type==='Textarea'" class="item-type">「问答题」</span>
          <span v-else-if="item.type==='Datepicker'" class="item-type">「日期」</span>
          <span v-else class="item-type">「时间」</span>
          <span v-if="item.require==='true'" class="require-statu">*</span>
          <span>{{index+1}}.</span>
          {{item.name}}
        </div>
        <component
          :form="form"
          :is="'Ell' + item.type"
          :pitem="item"
          :post="item.keys"
          @showPicker="showPicker"
        />
      </div>
    </div>
    <div class="submit">
      <div class="button" @click="submit">提交问卷</div>
    </div>
  </div>
</template>

<script>
import EllRadio from "../../components/questionnaire/radio"; //单选
import EllTextarea from "../../components/questionnaire/textarea"; //问答
import EllCheckBox from "../../components/questionnaire/checkbox"; //多选
import EllDatepicker from "../../components/questionnaire/datepicker"; //日期
import EllTimepicker from "../../components/questionnaire/timepicker"; //时间
import { Toast } from "mint-ui";
import { isArray } from "util";
import qs from "qs";
export default {
  components: {
    EllRadio,
    EllTextarea,
    EllCheckBox,
    EllDatepicker,
    EllTimepicker
  },
  data() {
    return {
      form: {},
      title: "调查问卷",
      progressWidth: null,
      progressWidthTest: "",
      questionList: [],
      surveyQuestionId: ""
    };
  },

  mounted() {
    this.surveyQuestionId = this.$route.query.id;
    this.getData();
  },
  methods: {
    showPicker(val) {
      /*解决页面层级相互影响滑动的问题*/
      function bodyScroll(e) {
        e.preventDefault();
      }
      if (val) {
        document.body.addEventListener("touchmove", bodyScroll, false); //阻止默认事件
      } else {
        document.body.removeEventListener("touchmove", bodyScroll, false); //打开默认事件
      }
    },
    getData() {
      let dic = qs.stringify({
        surveyQuestionId: this.surveyQuestionId
      });

      this.$http
        .post(
          process.env.NODE_ENV === "development"
            ? "/api/api/surveyQuestionInfo"
            : "/api/surveyQuestionInfo",
          dic,
          {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        )
        .then(res => {
          this.questionList = [];
          this.title = res.data.data.surveyQuestionName;
          this.questionList = JSON.parse(res.data.data.surveyQuestionContent);
          this.questionList.forEach(item => {
            this.$set(this.form, item.keys, item.value);
          });
        });
    },

    //提交表单
    submit() {
      let isStop;
      this.questionList.forEach((item, index) => {
        if (
          item.require == "true" &&
          (item.value === undefined || item.value === "" || item.value === [])
        ) {
          //验证必填
          isStop = true;
          Toast(`第${index + 1}道题是必填项，请填写`);
          return;
        }
      });
      if (!isStop) {
        let dic = qs.stringify({
          surveyQuestionId: this.surveyQuestionId,
          surveyAnswerContent: JSON.stringify(this.questionList),
          loginIP: localStorage.getItem("Ip")
        });
        this.$http
          .post(
            process.env.NODE_ENV === "development"
              ? "/api/api/survey/saveSurveyAnswer"
              : "/api/survey/saveSurveyAnswer",
            dic,
            {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          )
          .then(res => {
            if (res.data.success) {
              this.$router.push({ name: "questioncomplete" });
            } else {
              this.$router.push({ name: "questionfail" });
            }
          });
      }
    }
  },
  watch: {
    form: {
      handler(val, oldVal) {
        // 监听表单变化
        let writeArr = [];
        this.questionList.forEach((item, index) => {
          console.log(item);
          item.value = this.form[item.keys]; //赋值
          //问题已填写
          if (
            item.value &&
            item.value !== ("" || undefined) &&
            item.value.length !== 0
          ) {
            writeArr.push(item);
          }
          //问题填写后又置空
          let state = writeArr.some(it => it.keys === item.keys);
          if (item.value === "" && state) {
            writeArr.forEach((items, index) => {
              if (items.keys === item.keys) {
                writeArr.splice(inde, 1);
              }
            });
          }
        });
        console.log(writeArr + "填写");
        this.progressWidth = (writeArr.length / this.questionList.length) * 100;
        this.progressWidthTest =
          writeArr.length + "/" + this.questionList.length;
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.questionnaire {
  width: 100%;
}
.questionnaire-name {
  width: 100%;
  padding: 0 15px 0px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 9;
  .title {
    font-size: 18px;
    font-weight: 600;
    margin: 22px 0 0;
  }
  .progress {
    font-size: 12px;
    color: #fcab37;
    margin-left: 7px;
  }
}
/deep/.mt-progress-runway {
  border-radius: 4px;
}
/deep/.mt-progress-progress {
  background-color: #fcab37;
}
.content {
  margin-top: 93px;
  // margin-bottom: 100px;
  padding-bottom: 100px;
}
.question-list {
  background: #fff;
  margin: 15px;
  padding: 13px 0 0 0;
  .require-statu {
    color: red;
  }
}
.question-list > .title {
  font-size: 14px;
  color: #333333;
  margin-bottom: 13px;
}
.question-list .item-type {
  color: #fd9e2f;
}
.submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  .button {
    width: 175px;
    background: #fcab37;
    height: 44px;
    border-radius: 22px;
    color: #fff;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dialog {
  z-index: 1000;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: red;
}
/deep/.mint-checklist .mint-cell,
/deep/.mint-radiolist .mint-cell {
  padding-left: 10px;
}
/deep/.mint-cell:last-child,
/deep/.mint-cell-wrapper {
  background-image: none;
  padding-left: 0;
}
/deep/.mint-cell-wrapper {
  border-bottom: 1px solid #f1f1f1;
}
/deep/.mint-cell:last-child {
  padding-left: 10px;
  .mint-cell-wrapper {
    border: 0;
  }
}
</style>