from rest_framework import viewsets, permissions

from .serializers import StockWatchListSerializer
from core.models import StockWatchList


class WatchListViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = StockWatchListSerializer

    def get_queryset(self):
        return self.request.user.stockwatchlist.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
