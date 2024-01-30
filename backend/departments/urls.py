from django.urls import path

from .views import Departments, DepartmentDetail

app_name = "departments"
urlpatterns = [
    path("", Departments.as_view(), name="index"),
    path("<str:pk>", DepartmentDetail.as_view(), name="detail"),
]