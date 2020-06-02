from rest_framework import serializers
from core.models import StockWatchList


class StockWatchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockWatchList
        fields = '__all__'
