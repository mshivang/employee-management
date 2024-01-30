from django.db import models
import uuid

class Department(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    desc = models.CharField(max_length=500)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-createdAt']

    def __str__(self):
        return self.name
