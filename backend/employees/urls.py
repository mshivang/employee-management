from django.urls import path

from .views import Employees, EmployeeDetail

app_name = "employees"
urlpatterns = [
    path("", Employees.as_view(), name="index"),
    path("<str:pk>", EmployeeDetail.as_view(), name="detail")
]