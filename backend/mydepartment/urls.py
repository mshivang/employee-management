from django.urls import path

from .views import MyDepartment

app_name = "mydepartment"
urlpatterns = [
    path("", MyDepartment.as_view(), name="index"),
]