from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import TeamViewSet

router = DefaultRouter()
# allow the url of api/v1/teams
router.register("teams", TeamViewSet, basename="teams")

urlpatterns = [
    path('', include(router.urls)),
]