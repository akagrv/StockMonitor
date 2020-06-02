from django.db import models
from django.contrib.auth.models import User


class StockWatchList(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='stockwatchlist')
    ticker = models.CharField(max_length=30, unique=True, blank=False)

    def __str__(self):
        return self.__repr__ticker
