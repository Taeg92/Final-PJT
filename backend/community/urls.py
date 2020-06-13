from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MovieList.as_view(), name='MovieList'),
    path('movies/<int:pk>/', views.MovieDetail.as_view(), name='MovieDetail'),
    path('reviews/', views.ReviewList.as_view(), name='ReviewList'),
    path('reviews/<int:pk>/', views.ReviewDetail.as_view(), name='ReviewDetail'),
    path('movies/<int:pk>/reviews/', views.MovieReviews.as_view(), name='MovieReviews'),
    path('reviews/<int:pk>/comments/', views.ReviewComments.as_view(), name='ReviewComments'),
    path('comments/<int:pk>/', views.CommentDetail.as_view(), name='CommentDetail'),
]