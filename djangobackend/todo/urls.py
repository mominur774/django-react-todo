from django.urls import path
from . import views

urlpatterns = [
    path("list/", views.ItemViewAPI.as_view()),
    path("create/", views.ItemCreateView.as_view()),
    path("delete/<int:pk>/", views.ItemDeleteView.as_view()),
    path("update/<int:pk>/", views.ItemUpdateView.as_view()),
    path("retrieve/<int:pk>/", views.ItemRetrieveView.as_view()),
]
