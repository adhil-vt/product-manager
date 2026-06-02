from rest_framework.decorators import api_view
from .models import product
from .serializer import product_serializer
from rest_framework.response import Response
from django.http import request


# Create your views here.
@api_view(['GET'])
def product_list(request):
    a=product.objects.all()
    b= product_serializer(a,many=True)
    return Response(b.data)
    

@api_view(['GET'])
def product_detail(request, id):
    a=product.objects.get(id=id)
    b= product_serializer(a)
    return Response(b.data)

@api_view(['PUT'])
def productupdate(request, id):
    a=product.objects.get(id=id)
    b= product_serializer(a,data=request.data)
    if b.is_valid():
        b.save()
        return Response(b.data)
    return Response(b.errors)

@api_view(['DELETE'])
def productdelete(request, id):
    a=product.objects.get(id=id)
    a.delete()
    return Response("Product deleted")

@api_view(['POST'])
def productcreate(request):
    a=product_serializer(data=request.data)
    if a.is_valid():
        a.save()
        return Response(a.data)
    return Response(a.errors)

