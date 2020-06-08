from rest_framework import viewsets, permissions

from .serializers import WatchListSerializer
from core.models import WatchList


class WatchListViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WatchListSerializer

    def get_queryset(self):
        return self.request.user.watchlist.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
