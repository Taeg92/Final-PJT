# Final-PJT

## 1. 스크린

- 유저
  - 로그인
  - 로그아웃
  - 회원가입
  - 탈퇴
  - 프로필
- 최신 영화 목록 (Home)
- 커뮤니티
  - 영화별 리뷰
    - 댓글
  - 추천 영화



## 2. 기술 스택

### 1) 프론트엔드

- Vue, Vuex, Bootstrap (Grid), CSS 

### 2) 백엔드

- Django, Django REST Framework, sqlite3

### 3) 인프라

- 깃허브, (배포)

### 4) API

- TMDB



## 3. DB

- 유저
  - pk
  - username
  - password
  - email
  - 팔로우/블락 (optional)
  - 프로필사진 (optional)
- 영화
  - pk
  - movie_code
  - 좋아요/싫어요 (MTM)
  - api에서 주는 정보
- 리뷰
  - pk
  - title
  - content
  - user_pk (FK)
  - movie_pk (FK)
  - (태그)
- 댓글
  - pk
  - content
  - user_pk (FK)
  - review_pk (FK)



ERD + Tech Stack + Teck Log + README generator