from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from employees.models import Employee
from departments.models import Department

def getUser():
    return User.objects.create(
            username = "shivang",
            password = "QWERTY@1234",
            email = "shivangmishra0824@gmail.com",
        )

def getDepartment(name):
    return Department.objects.create(
        name = name,
        desc = "xyz description"
    )

def getEmployee(name, username, department):
    Employee.objects.create(
        user = User.objects.get(username=username),
        fullName = name,
        phone = "4675837895",
        altPhone = "4675837895",
        currAddress = "xyz, shivpur colony",
        permAddress = "xyz, shivpur colony",
        aadhar = "awd-bhj-nkl",
        pan = "GMT123",
        department = getDepartment(department)
    )

class MyDepartmentIndexViewTests(TestCase):
    def test_returns_users_department_if_found(self):
        """
        Returns user's department list if found.
        """

        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "dina@gmail.com",
        }, content_type="application/json")

        self.client.post("/dj-rest-auth/registration/", {
            "username": "shivang",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        self.client.post("/dj-rest-auth/registration/", {
            "username": "rahul",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "rahul@gmail.com",
        }, content_type="application/json")

        user1 = User.objects.get(username="dina")

        getEmployee("Dina Pratab", "dina", "HR")
        getEmployee("Shivang Mishra", "shivang", "HR")
        getEmployee("Rahul Singh", "rahul", "IT")

        user1.is_superuser = True
        user1.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        response = self.client.get(reverse("mydepartment:index"), **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_json["department"]["name"], "HR")
        self.assertEqual(res_json["status"], 'success')
        # self.assertEqual(len(res_json["employees"]), 2)