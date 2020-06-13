from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Movie, Review, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model
        fields = '__all__'

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
<<<<<<< HEAD
        fields = ('id', 'title', 'content')
=======
        fields = ('id', 'title', 'content')


class CommentSerializer(serializers.ModelSerializer):
    # review = ReviewSerializer()
    # user = get_user_model()
    class Meta:
        model = Comment
        fields = ('id', 'content', 'review')
>>>>>>> 7f5645863bf244dacdf8b16cfe05ecdac6bec47b
