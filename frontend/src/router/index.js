import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MovieDetail from "../views/MovieDetail.vue";
import Signup from "../views/accounts/Signup.vue";
import Login from "../views/accounts/Login.vue";
import Logout from "../views/accounts/Logout.vue";
import MovieReviews from "../views/MovieReviews.vue";
import Reviews from "../views/Reviews.vue";
import ReviewDetail from "../views/ReviewDetail.vue";
import ReviewDelete from "../views/ReviewDelete.vue";
import ReviewCreate from "../views/ReviewCreate.vue";
import ReviewEdit from "../views/ReviewEdit.vue";
import Comments from "../views/Comments.vue";
import CommentCreate from "../views/CommentCreate.vue";
import CommentEdit from "../views/CommentEdit.vue"
import CommentDelete from "../views/CommentDelete.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/movies/:moviePK",
    name: "MovieDetail",
    component: MovieDetail,
  },
  {
    path: "/reviews",
    name: "Reviews",
    component: Reviews,
  },
  {
    path: "/movies/:moviePK/reviews",
    name: "MovieReviews",
    component: MovieReviews,
  },
  {
    path: "/movies/:moviePK/reviews/:reviewPK",
    name: "ReviewDetail",
    component: ReviewDetail,
  },
  {
    path: "/movies/:moviePK/reviews/:reviewPK/delete",
    name: "ReviewDelete",
    component: ReviewDelete,
  },
  {
    path: "/movies/:moviePK/reviews/create",
    name: "ReviewCreate",
    component: ReviewCreate,
  },
  {
    path: "/movies/:moviePK/reviews/:reviewPK/Edit",
    name: "ReviewEdit",
    component: ReviewEdit,
  },
  {
    path: '/comments',
    name: 'Comments',
    component: Comments,
  },
  {
    path: "/comment/create",
    name: "CommentCreate",
    component: CommentCreate,
  },
  {
    path: '/comment/1/edit',
    name: 'CommentEdit',
    component: CommentEdit,
  },
  {
    path: '/comment/:commentPK/delete',
    name: 'CommentDelete',
    component: CommentDelete,
  },
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
];

const router = new VueRouter({
  routes,
});

export default router;
