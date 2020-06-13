from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MovieList.as_view(), name='MovieList'),
    path('movies/<int:pk>/', views.MovieDetail.as_view(), name='MovieDetail'),
    path('reviews/', views.ReviewList.as_view(), name='ReviewList'),
    path('movies/<int:pk>/reviews/', views.MovieReviews.as_view(), name='MovieReviews'),
<<<<<<< HEAD
    path('reviews/<int:pk>/comments/', views.ReviewComments.as_view(), name='ReviewComments'),
    path('comments/<int:pk>/', views.CommentDetail.as_view(), name='CommentDetail'),
=======
    path('comment/create/', views.comment_create, name='comment_create'),
>>>>>>> 7f5645863bf244dacdf8b16cfe05ecdac6bec47b
]