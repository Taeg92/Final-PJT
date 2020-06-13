from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Movie(models.Model):
    title = models.CharField(max_length=150)
    original_title = models.CharField(max_length=150)
    release_date = models.DateField()
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    adult = models.BooleanField()
    overview = models.TextField()
    original_language = models.CharField(max_length=150)
    poster_path = models.CharField(max_length=150)
    backdrop_path = models.CharField(max_length=150)
    genres = models.ManyToManyField("Genre")
    liked_users = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='like_movies')

class Genre(models.Model):
    name = models.CharField(max_length=150)
    
class Review(BaseModel):
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name='reviews')
    title = models.CharField(max_length=100)
    rating = models.CharField(max_length=4, validators=[
                            RegexValidator(r"^\d[.]\d{2}$")], help_text="입력 예시: 9.55")
    content = models.TextField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    liked_users = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='like_reviews')

    class Meta:
        ordering = [
            '-id',
        ]


class Comment(BaseModel):
    content = models.TextField()
    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='wrote_comments')

    def __str__(self):
        return self.content
        