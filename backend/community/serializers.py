from rest_framework import serializers
from .models import Movie


class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id', 'title', 'vote_average', 'poster_path',)