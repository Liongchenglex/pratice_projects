from django.shortcuts import render

from rest_framework import viewsets 

from .serializers import ClientSerializer
from .models import Client

from django.core.exceptions import PermissionDenied


class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

    def get_queryset(self):
        return self.queryset.filter(created_by=self.request.user)

    def perform_create(self, serializer):
         # make sure the created_by field is populated in the form otherwise it will be invalid
        serializer.save(created_by=self.request.user)
    
    # only allow user to amend
    def perform_update(self, serializer):
        obj = self.get_object()

        if self.request.user != obj.created_by:
            raise PermissionDenied('Wrong object owner')
    
        serializer.save()