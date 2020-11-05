import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Progress,
  Radio,
  Field,
  Checklist,
  DatetimePicker,
} from 'mint-ui';
Vue.component(Progress.name, Progress);
Vue.component(Radio.name, Radio);
Vue.component(Field.name, Field);
Vue.component(Checklist.name, Checklist);
Vue.component(DatetimePicker.name, DatetimePicker);
import 'mint-ui/lib/style.css';
import './styles/index.less'

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, '$http', {
  value: axios
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");