import Vue from "vue";
import Router from "vue-router";
import Questionnaire from "./views/questionnaire/index.vue";
import Questioncomplete from "./views/questionComplete/index.vue";
import Questionfail from "./views/questionFail/index.vue";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/questionnaire",
            name: "questionnaire",
            component: Questionnaire
        }, {
            path: "/questioncomplete",
            name: "questioncomplete",
            component: Questioncomplete
        },
        {
            path: "/questionfail",
            name: "questionfail",
            component: Questionfail
        }
    ]
});