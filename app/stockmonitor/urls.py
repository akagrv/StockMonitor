from .views import WatchListViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('watchlist', WatchListViewSet, 'watchlist')

urlpatterns = router.urls
