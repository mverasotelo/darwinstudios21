from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="Home"),
    path('venues', views.venues, name="Venues"),
    path('venues/<int:venue_id>', views.venues_info),
    path('aboutUs/', views.aboutUs, name="AboutUs"),
    path('productions/<int:venue_id>', views.productions, name="Productions"),
    path('production/<int:prod_id>', views.prod_info),
    path('contact/', views.contact, name="ContactUs")
]