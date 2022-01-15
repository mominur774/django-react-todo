from .serializers import ItemSerializer
from .models import Item
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView


class ItemViewAPI(ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemRetrieveView(RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemCreateView(CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemDeleteView(DestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemUpdateView(UpdateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
