from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MovieList.as_view(), name='MovieList'),
    path('movies/<int:pk>/', views.MovieDetail.as_view(), name='MovieDetail'),
    path('reviews/', views.ReviewList.as_view(), name='ReviewList'),
    path('movies/<int:pk>/reviews/', views.MovieReviews.as_view(), name='MovieReviews'),
    path('comment/create/', views.comment_create, name='comment_create'),
]