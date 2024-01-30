from rest_framework.response import Response
from rest_framework import status, generics
from employees.models import Employee
from employees.serializers import EmployeeSerializer
import math
from datetime import datetime
from departments.models import Department
from .models import Employee
from django.contrib.auth.models import User, AnonymousUser

class Employees(generics.GenericAPIView):
    # Initialize serializer class. 
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

    '''
        Endpoint: /api/employees
        Method: GET
        Description: Returns list of all employees, or based on provided page, limit, search value.
    '''
    def get(self, request):
         #Authorize User
        user = self.request.user
        if type(user) == AnonymousUser or not user.is_superuser:
            return Response({
            "status": "fail",
            "message": "Unauthorized"
        }, 401)

        # Get page number and limit from request query params.
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))

        # Decide range of objects to send.
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num

        # Get search sting from query params
        search_param = request.GET.get("search")

        # Get all employees and their count.
        employees = Employee.objects.all()
        total_employees = employees.count()

        # Filter employees by search param.
        if search_param:
            employees = employees.filter(title__icontains=search_param)

        # Serialize data.
        serializer = self.serializer_class(employees[start_num:end_num], many=True)

        #Returns response.
        return Response({
            "status": "success",
            "total": total_employees,
            "page": page_num,
            "last_page": math.ceil(total_employees / limit_num),
            "employees": serializer.data
        })

    '''
        Endpoint: /api/employees
        Method: POST
        Description: Add a employee to database.
    '''
    def post(self, request):
         #Authorize User
        user = self.request.user
        if type(user) == AnonymousUser or not user.is_superuser:
            return Response({
            "status": "fail",
            "message": "Unauthorized"
        }, 401)

        # Serializes data provided.
        serializer = self.serializer_class(data=request.data)

        # Checks if provided details are valid.
        if serializer.is_valid():
            # Update employee and returns updated response if details are valid.
            serializer.validated_data['updatedAt'] = datetime.now()
            
            # Handle UUID fields (e.g., manager, department) if present in the request
            manager_uuid = request.data.get('manager')
            if manager_uuid:
                serializer.validated_data['manager'] = Employee.objects.get(eid=manager_uuid)

            department_uuid = request.data.get('department')
            if department_uuid:
                serializer.validated_data['department'] = Department.objects.get(id=department_uuid)

            uid = request.data.get('user')
            if uid:
                serializer.validated_data['user'] = User.objects.get(id=uid)

            serializer.save()
            return Response({"status": "success", "employee": serializer.data}, 201)

        # Returns error response if employee is not valid.
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class EmployeeDetail(generics.GenericAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    '''
        Method: get_employee
        Returns: Employee
        Description: Returns employee by id from database.
        Params: pk: primary key.
    '''
    def get_employee(self, pk):
        try:
            return Employee.objects.get(pk=pk)
        except:
            return None

    '''
        Endpoint: /api/employees/:pk
        Method: GET
        Description: Get a employee from database.
    '''
    def get(self, request, pk):
         #Authorize User
        user = self.request.user
        if type(user) == AnonymousUser or not user.is_superuser:
            return Response({
            "status": "fail",
            "message": "Unauthorized"
        }, 401)

        # Retrieves employee from database.
        employee = self.get_employee(pk=pk)

        # Returns error response if employee not found.
        if employee == None:
            return Response({"status": "fail", "message": f"Employee with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        # Seriialize employee data.
        serializer = self.serializer_class(employee)
        return Response({"status": "success", "employee": serializer.data})

    '''
        Endpoint: /api/employees/:pk
        Method: PATCH
        Description: Update a employee in database.
    '''
    def patch(self, request, pk):
         #Authorize User
        user = self.request.user
        if type(user) == AnonymousUser or not user.is_superuser:
            return Response({
            "status": "fail",
            "message": "Unauthorized"
        }, 401)

        # Retrieves employee from database.
        employee = self.get_employee(pk)

        # Returns error response if employee not found.
        if employee is None:
            return Response({"status": "fail", "message": f"Employee with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        # Serialize employee data.
        serializer = self.serializer_class(
            employee, data=request.data, partial=True)

        # Checks if provided details are valid.
        if serializer.is_valid():
            # Update employee and returns updated response if details are valid.
            serializer.validated_data['updatedAt'] = datetime.now()
            
            # Handle UUID fields (e.g., manager, department) if present in the request
            manager_uuid = request.data.get('manager')
            if manager_uuid:
                serializer.validated_data['manager'] = Employee.objects.get(eid=manager_uuid)

            department_uuid = request.data.get('department')
            if department_uuid:
                serializer.validated_data['department'] = Department.objects.get(id=department_uuid)

            uid = request.data.get('user')
            if uid:
                serializer.validated_data['user'] = User.objects.get(id=uid)

            serializer.save()
            return Response({"status": "success", "employee": serializer.data})

        # Returns error response if employee is not valid.
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    '''
        Endpoint: /api/employees/:pk
        Method: DELETE
        Description: Delete a employee from database.
    '''
    def delete(self, request, pk):
         #Authorize User
        user = self.request.user
        if type(user) == AnonymousUser or not user.is_superuser:
            return Response({
            "status": "fail",
            "message": "Unauthorized"
        }, 401)
        
        # Retrieves employee from database.
        employee = self.get_employee(pk)

        # Returns error response if employee does not exists.
        if employee == None:
            return Response({"status": "fail", "message": f"Employee with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        # Deletes employee from database.
        employee.delete()

        #Returns response to client
        return Response({"status": "success", "message": f"Employee with Id {pk} deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

