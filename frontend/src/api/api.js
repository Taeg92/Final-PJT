export default {
  TMDB_BASE: "https://api.themoviedb.org/3/movie/",
  DB_BASE: "http://localhost:8000/",
  DB_ROUTES: {
    login: "accounts/rest-auth/login/",
    signup: "accounts/rest-auth/signup/",
    logout: "accounts/rest-auth/logout/",
    getUserData: "accounts/userinfo/",
    recommend: "community/recommend/",
    movies: (moviePK) => {
      if (moviePK) {
        return `community/movies/${moviePK}/`;
      } else {
        return "community/movies/";
      }
    },
    reviews: (moviePK) => {
      if (moviePK) {
        return `community/movies/${moviePK}/reviews/`;
      } else {
        return "community/reviews/";
      }
    },
    reviewDetail: (reviewPK) =>
      `community/reviews/${reviewPK}/`,
    comments: (commentPK) => {
      if (commentPK) {
        return `community/comments/${commentPK}/`;
      } else {
        return "community/reviews/1/comments/";
      }
    },
    commentCreate(reviewPK) {
      return `community/reviews/${reviewPK}/comments/`;
    },
  },
};
