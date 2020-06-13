from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Movie, Review, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username']

class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster_path']

class MovieDetailSerializer(MovieSerializer):
    reviews = Movie.reviews
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

class ReviewSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(required=False)
    user = UserSerializer(required=False)
    class Meta:
        model = Review
        fields = ['id', 'title', 'content', 'movie', 'user']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    review = ReviewSerializer(required=False)
    class Meta:
        model = Comment
        fields = ('id', 'content', 'user', 'review')

class ReviewDetailSerializer(ReviewSerializer):
    reiview_comments = Review.comments
    comments = CommentSerializer(reiview_comments, required=False, many=True)
    class Meta(ReviewSerializer.Meta):
        fields = ReviewSerializer.Meta.fields + ['comments']

class MovieReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'title', 'content')

