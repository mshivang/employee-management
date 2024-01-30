from rest_framework.response import Response
from rest_framework import status, generics
from urllib.request import urlopen
from employees.serializers import EmployeeSerializer
from departments.serializers import DepartmentSerializer
from employees.models import Employee
from departments.models import Department
from django.contrib.auth.models import AnonymousUser
import json
import os

class MyDepartment(generics.GenericAPIView):
    serializer_class = EmployeeSerializer
    department_serializer_class = DepartmentSerializer

    '''
        Endpoint: /api/mydepartment
        Method: GET
        Description: Fetches employees from other API.
    '''
    def get(self, request):
        #Authorize User
        user = self.request.user
        if type(user) == AnonymousUser:
            return Response({
            "status": "fail",
            "message": "Unauthorized"
        }, 401)

        emp = Employee.objects.get(user=user.pk)
        department = emp.department
        pk = department.pk

        # Retrieves department employees from node js API.
        url = os.environ.get('NODE_DEPARTMENT_API') + str(pk)

        try:
            res = urlopen(url).read()
            data = json.loads(res)
        except:
            return Response({"status": "fail", "message": f"Department with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        for employee in data["employees"]:
            manager_id = employee["manager_id"]
            department_id = employee["department_id"]

            if manager_id:
                manager = Employee.objects.get(eid=manager_id)
                employee["manager"] = manager

            if department_id:
                department = Department.objects.get(id=department_id)
                employee["department"] = department

        # Returns error response if department not found.
        if data["success"] == False:
            return Response({"status": "fail", "message": f"Department with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        # Seriialize department data.
        serializer = self.serializer_class(data["employees"], many=True)
        department_serializer = self.department_serializer_class(department)
        return Response({"status": "success", "department": department_serializer.data, "employees": serializer.data})
