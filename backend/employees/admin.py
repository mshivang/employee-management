from django.contrib import admin
from .models import Employee

class EmployeeAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Employee Details", {"fields": ["fullName", "pan", "aadhar", "department", "manager"]}),
        ("Contact Details", {"fields": ["phone", "altPhone"]}),
        ("Address Details", {"fields": ["currAddress", "permAddress"]}),
    ]
    list_display = ["fullName"]
    list_filter = ["createdAt"]
    search_fields = ["fullName"]

admin.site.register(Employee, EmployeeAdmin)