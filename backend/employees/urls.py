from django.urls import path

from .views import Employees, EmployeeDetail, CurrentEmployee

app_name = "employees"
urlpatterns = [
    path("", Employees.as_view(), name="index"),
    path("me", CurrentEmployee.as_view(), name="detail"),
    path("<str:pk>", EmployeeDetail.as_view(), name="detail")
]