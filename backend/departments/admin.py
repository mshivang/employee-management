from django.contrib import admin
from .models import Department

class DepartmentAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Department Info", {"fields": ["name", "desc"]}),
    ]
    list_display = ["name", "desc"]
    list_filter = ["createdAt"]
    search_fields = ["name"]

admin.site.register(Department, DepartmentAdmin)
