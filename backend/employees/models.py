from django.db import models
import uuid
from departments.models import Department
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    eid = models.UUIDField(primary_key = True, default = uuid.uuid4, editable=False)
    fullName = models.CharField(max_length = 60)
    phone = models.CharField(max_length = 13)
    altPhone = models.CharField(max_length = 13)
    currAddress = models.CharField(max_length = 400)
    permAddress = models.CharField(max_length = 400)
    aadhar = models.CharField(max_length = 12)
    pan = models.CharField(max_length = 10)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, blank=True)
    manager = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ['-createdAt']

    def __str__(self):
        return self.fullName
    