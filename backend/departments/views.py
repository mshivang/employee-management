from rest_framework.response import Response
from rest_framework import status, generics
from departments.models import Department
from departments.serializers import DepartmentSerializer
import math
from datetime import datetime
from django.contrib.auth.models import AnonymousUser

class Departments(generics.GenericAPIView):
    # Initialize serializer class. 
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()

    '''
        Endpoint: /api/departments
        Method: GET
        Description: Returns list of all departments, or based on provided page, limit, search value.
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

        # Get all departments and their count.
        departments = Department.objects.all()
        total_departments = departments.count()

        # Filter departments by search param.
        if search_param:
            departments = departments.filter(title__icontains=search_param)

        # Serialize data.
        serializer = self.serializer_class(departments[start_num:end_num], many=True)

        #Returns response.
        return Response({
            "status": "success",
            "total": total_departments,
            "page": page_num,
            "last_page": math.ceil(total_departments / limit_num),
            "departments": serializer.data
        })

    '''
        Endpoint: /api/departments
        Method: POST
        Description: Add a department to database.
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

        # Checks if data provided is valid.
        if serializer.is_valid():
            # Saves department if valid.
            serializer.save()
            return Response({"status": "success", "department": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            # Returns error response if data is invalid.
            return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class DepartmentDetail(generics.GenericAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    '''
        Method: get_department
        Returns: Department
        Description: Returns department by id from database.
        Params: pk: primary key.
    '''
    def get_department(self, pk):
        try:
            return Department.objects.get(pk=pk)
        except:
            return None

    '''
        Endpoint: /api/departments/:pk
        Method: GET
        Description: Get a department from database.
    '''
    def get(self, request, pk):
         #Authorize User
        user = self.request.user
        if type(user) == AnonymousUser or not user.is_superuser:
            return Response({
            "status": "fail",
            "message": "Unauthorized"
        }, 401)

        # Retrieves department from database.
        department = self.get_department(pk=pk)

        # Returns error response if department not found.
        if department == None:
            return Response({"status": "fail", "message": f"Department with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        # Seriialize department data.
        serializer = self.serializer_class(department)
        return Response({"status": "success", "department": serializer.data})

    '''
        Endpoint: /api/departments/:pk
        Method: PATCH
        Description: Update a department in database.
    '''
    def patch(self, request, pk):
         #Authorize User
        user = self.request.user
        if type(user) == AnonymousUser or not user.is_superuser:
            return Response({
            "status": "fail",
            "message": "Unauthorized"
        }, 401)

        # Retrieves department from database.
        department = self.get_department(pk)

        # Returns error response if department not found.
        if department == None:
            return Response({"status": "fail", "message": f"Department with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        # Seriialize department data.
        serializer = self.serializer_class(
            department, data=request.data, partial=True)
        
        # Checks if provided details are valid.
        if serializer.is_valid():
            # Update department and returns updated response if details are valid.
            serializer.validated_data['updatedAt'] = datetime.now()
            serializer.save()
            return Response({"status": "success", "department": serializer.data})
        
        # Returns error response if department is not valid.
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    '''
        Endpoint: /api/departments/:pk
        Method: DELETE
        Description: Delete a department from database.
    '''
    def delete(self, request, pk):
         #Authorize User
        user = self.request.user
        if type(user) == AnonymousUser or not user.is_superuser:
            return Response({
            "status": "fail",
            "message": "Unauthorized"
        }, 401)
        
        # Retrieves department from database.
        department = self.get_department(pk)

        # Returns error response if department does not exists.
        if department == None:
            return Response({"status": "fail", "message": f"Department with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        # Deletes department from database.
        department.delete()

        #Returns response to client
        return Response({"status": "success", "message": f"Department with Id {pk} deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

