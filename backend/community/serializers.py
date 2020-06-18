from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Movie, Review, Comment, Genre
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'avatar']

class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster_path']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']

class ReviewSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(required=False)
    user = UserSerializer(required=False)
    created_at = serializers.DateTimeField(format="%Y년 %m월 %d일 %H:%M:%S", required=False)
    class Meta:
        model = Review
        fields = ['id', 'title', 'content', 'movie', 'user', 'created_at', 'rating']

class MovieDetailSerializer(MovieSerializer):
    reviews = Movie.reviews
    reviews = ReviewSerializer(reviews, many=True, required=False)
    genres = Movie.genres
    genres = GenreSerializer(genres, many=True, required=False)
    class Meta(MovieSerializer.Meta):
        fields = MovieSerializer.Meta.fields + [
            'release_date',
            'vote_average',
            'overview',
            'backdrop_path',
            'genres',
            'adult',
            'reviews',
        ]

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    review = ReviewSerializer(required=False)
    class Meta:
        model = Comment
        fields = ['id', 'content', 'user', 'review']

class ReviewDetailSerializer(ReviewSerializer):
    reiview_comments = Review.comments
    comments = CommentSerializer(reiview_comments, required=False, many=True)
    class Meta(ReviewSerializer.Meta):
        fields = ReviewSerializer.Meta.fields + ['comments']
