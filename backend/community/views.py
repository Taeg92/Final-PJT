from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status

from .permissions import IsSuperUser
from .models import Movie, Review, Comment
from .serializers import (
    MovieSerializer, MovieDetailSerializer, 
    ReviewSerializer, ReviewDetailSerializer,
    CommentSerializer,
)
from django.http import Http404


class MovieList(APIView):

    def get(self, request, format=None):
        movies = Movie.objects.all()[:50]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

    @permission_classes([IsSuperUser])
    def post(self, request, format=None):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsSuperUser])
    def delete(self, request, pk, format=None):
        movie = get_object_or_404(Movie, pk=pk)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MovieRecommend(APIView):
    def get(self, request, format=None):
        movies = Movie.objects.all().order_by('?')[:10]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)


class MovieDetail(APIView):

    def get_object(self, pk):
        try:
            return Movie.objects.get(pk=pk)
        except Movie.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Movie = self.get_object(pk)
        serializer = MovieDetailSerializer(Movie)
        return Response(serializer.data)


class ReviewList(APIView):

    def get(self, request, format=None):
        reviews = Review.objects.all()
        serializer = ReviewDetailSerializer(reviews, many=True)
        return Response(serializer.data)


class ReviewDetail(APIView):

    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = ReviewDetailSerializer(review)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    def put(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = ReviewDetailSerializer(review, data=request.data)
        if request.user != review.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def delete(self, request, pk, format=None):
        review = self.get_object(pk)
        if request.user != review.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MovieReviews(APIView):

    def get_object(self, pk):
        try:
            return Movie.objects.get(pk=pk)
        except Movie.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        movie = self.get_object(pk)
        reviews = movie.reviews
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    def post(self, request, pk, format=None):
        movie = self.get_object(pk)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie=movie, user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewComments(APIView):

    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        review = self.get_object(pk)
        comments = review.comments
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    def post(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, review=review)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentDetail(APIView):
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    def put(self, request, pk, format=None):
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment, data=request.data)
        if request.user != comment.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def delete(self, request, pk, format=None):
        comment = self.get_object(pk)
        if request.user != comment.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
