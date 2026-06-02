from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list, name='product_list'),
    path('<int:id>/', views.product_detail, name='product_detail'),
    path('create/', views.productcreate, name='productcreate'),
    path('update/<int:id>', views.productupdate, name='productupdate'),
    path('delete/<int:id>', views.productdelete, name='productdelete'),
]