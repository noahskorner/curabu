from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from .serializers import *


@api_view(['GET'])
def clubs(request):
    if request.method == 'GET':
        serializer = ClubSerializer(Club.objects.all(), many=True)
        return Response(serializer.data)


@api_view(['GET'])
def club(request):
    if request.method == 'GET':
        try:
            club = Club.objects.get(id=request.data['club'])
            serializer = ClubSerializer(club, many=False)
            return Response(serializer.data)
        except:
            return Response({"error": f"Club with id:{request.data['club']} not found."}, 500)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def post(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save()
        return Response("Ok")
