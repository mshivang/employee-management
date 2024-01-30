from employees.models import Employee
from departments.models import Department
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

def getDepartment():
    return Department.objects.create(
        name = "HR",
        desc = "xyz description"
    )

def getEmployee():
    return Employee.objects.create(
            user = User.objects.get(username="dina"),
            fullName = "Shivang Mishra",
            phone = "4675837895",
            altPhone = "4675837895",
            currAddress = "xyz, shivpur colony",
            permAddress = "xyz, shivpur colony",
            aadhar = "awd-bhj-nkl",
            pan = "GMT123",
            department = getDepartment()
        )

class EmployeeIndexViewTests(TestCase):
    def test_no_employees(self):
        """
        If no employees exist, an appropriate message is displayed.
        """
        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        response = self.client.get(reverse("employees:index"), **headers)
        res_json = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_json["employees"], [])

    def test_returns_employees_if_found(self):
        """
        Returns employee list if employees are found.
        """

        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        getEmployee()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        response = self.client.get(reverse("employees:index"), **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(res_json["employees"]), 0)

    def test_does_not_create_employee_on_invalid_data(self):
        """
        Checks that employee not created on invalid data.
        """

        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        employee = {
            'user': User.objects.get(username="dina").id,
            'fullName': "",
            'phone': "4675837895",
            'altPhone': "4675837895",
            'currAddress': "xyz, shivpur colony",
            'permAddress': "xyz, shivpur colony",
            'aadhar': "awd-bhj-nkl",
            'pan': "GMT123",
            'department': getDepartment().id
        }

        response = self.client.post(reverse("employees:index"), employee, **headers)
        res_json = response.json()
        self.assertEqual(res_json["status"], "fail")
        self.assertEqual(response.status_code, 400)

    def test_create_employee_with_valid_data(self):
        """
        Creates employee if valid data is provided.
        """

        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        employee = {
            'user': User.objects.get(username="dina").id,
            'fullName': "Shivang Mishra",
            'phone': "4675837895",
            'altPhone': "4675837895",
            'currAddress': "xyz, shivpur colony",
            'permAddress': "xyz, shivpur colony",
            'aadhar': "awd-bhj-nkl",
            'pan': "GMT123",
            'department': getDepartment().id
        }

        response = self.client.post(reverse("employees:index"), employee, **headers)

        res_json = response.json()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(res_json["status"], "success")
        self.assertEqual(res_json["employee"]["fullName"], employee["fullName"])

class EmployeeDetailViewTests(TestCase):
    def test_employee_fetch_by_id(self):
        """
        Returns employee by given id.
        """
        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        employeeCreated = getEmployee()

        url = reverse("employees:detail", args=(employeeCreated.eid,))
        response = self.client.get(url, **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_json["status"], "success")

    def test_employee_delete(self):
        """
        Deletes employee by given id.
        """

        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        employeeCreated = getEmployee()

        url = reverse("employees:detail", args=(employeeCreated.eid,))
        response = self.client.delete(url, **headers)

        self.assertEqual(response.status_code, 204)

    def test_employee_update(self):
        """
        Updates employee by given id.
        """

        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        employeeCreated = getEmployee()

        updateValues = {
            "fullName": "Updated Name"
        }

        url = reverse("employees:detail", args=(employeeCreated.eid,))
        response = self.client.patch(url, updateValues, content_type='application/json', **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_json["status"], "success")

        updatedEmployee = Employee.objects.get(pk=employeeCreated.eid)

        self.assertEqual(updatedEmployee.fullName, updateValues["fullName"])

    def test_does_not_update_employee_with_invalid_data(self):
        """
        Prevents user from updating employee with invalid data.
        """

        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        getEmployee()

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        employeeCreated = getEmployee()
        updateValues = {
            "fullName": "",
        }

        url = reverse("employees:detail", args=(employeeCreated.eid,))
        response = self.client.patch(url, updateValues, content_type='application/json', **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertEqual(res_json["status"], "fail")

    def test_does_not_update_employee_with_invalid_id(self):
        """
        Prevents user from updating employee with invalid id.
        """

        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        getEmployee()

        updateValues = {
            "fullName": "Updated Name",
        }

        url = reverse("employees:detail", args=("random_id",))
        response = self.client.patch(url, updateValues, content_type='application/json', **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 404)
        self.assertEqual(res_json["status"], "fail")

    def test_does_not_delete_employee_with_invalid_id(self):
        """
        Prevents user from deleting employee with invalid id.
        """

        res = self.client.post("/dj-rest-auth/registration/", {
            "username": "dina",
            "password1": "QWERTY@ui",
            "password2": "QWERTY@ui",
            "email": "shivang@gmail.com",
        }, content_type="application/json")

        user = User.objects.get(username="dina")
        user.is_superuser = True
        user.save()

        access_token_res_json = res.json()
        access_token = access_token_res_json["access"]

        # Add the access token to the HTTP_AUTHORIZATION header
        headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(access_token)}

        getEmployee()

        url = reverse("employees:detail", args=("random_id",))
        response = self.client.delete(url, **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 404)
        self.assertEqual(res_json["status"], "fail")

