from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Movie
from .serializers import MovieListSerializer


@api_view(['GET'])
def movie_list(request):
    movies = Movie.objects.all()
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)