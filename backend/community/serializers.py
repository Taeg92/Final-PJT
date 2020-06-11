from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Movie, Review, Comment

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
    movie = MovieSerializer()
    class Meta:
        model = Review
        fields = ('id', 'title', 'content', 'movie')

class CommentSerializer(serializers.ModelSerializer):
    # review = ReviewSerializer()
    # user = get_user_model()
    class Meta:
        model = Comment
        fields = ('id', 'content', 'review')