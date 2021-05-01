from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *


@api_view(['GET'])
def clubs(request):
    if request.method == 'GET':
        serializer = ClubSerializer(Club.objects.all(), many=True)
        return Response(serializer.data)
