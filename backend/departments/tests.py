from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

from .models import Department

class DepartmentIndexViewTests(TestCase):
    def test_no_departments(self):
        """
        If no departments exist, an appropriate message is displayed.
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

        response = self.client.get(reverse("departments:index"), **headers)
        res_json = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_json["departments"], [])

    def test_returns_departments_if_found(self):
        """
        Returns department list if departments are found.
        """

        Department.objects.create(
            name="Technical",
            desc="Department Description."
        )

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

        response = self.client.get(reverse("departments:index"), **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(res_json["departments"]), 0)

    def test_does_not_create_department_on_invalid_data(self):
        """
        Checks that department not created on invalid data.
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

        department = {
            "name": "Technical",
           "description":"Department Description."
        }

        response = self.client.post(reverse("departments:index"), department, **headers)
        res_json = response.json()
        self.assertEqual(res_json["status"], "fail")
        self.assertEqual(response.status_code, 400)

    def test_create_department_with_valid_data(self):
        """
        Creates department if valid data is provided.
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

        department = {
            "name": "Technical",
            "desc": "Department Description"
        }

        response = self.client.post(reverse("departments:index"), department, **headers)

        res_json = response.json()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(res_json["status"], "success")
        self.assertEqual(res_json["department"]["name"], department["name"])

class DepartmentDetailViewTests(TestCase):
    def test_department_fetch_by_id(self):
        """
        Returns department by given id.
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

        departmentCreated = Department.objects.create(
            name = "Technical",
            desc = "This is description"
        )

        url = reverse("departments:detail", args=(departmentCreated.id,))
        response = self.client.get(url, **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_json["status"], "success")

    def test_department_delete(self):
        """
        Deletes department by given id.
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

        departmentCreated = Department.objects.create(
            name = "Technical",
            desc = "This is description"
        )

        url = reverse("departments:detail", args=(departmentCreated.id,))
        response = self.client.delete(url, **headers)

        self.assertEqual(response.status_code, 204)

    def test_department_update(self):
        """
        Updates department by given id.
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

        departmentCreated = Department.objects.create(
            name = "Technical",
             desc = "This is description"
        )

        updateValues = {
            "name": "Updated Name"
        }

        url = reverse("departments:detail", args=(departmentCreated.id,))
        response = self.client.patch(url, updateValues, content_type='application/json', **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_json["status"], "success")

        updatedDepartment = Department.objects.get(pk=departmentCreated.id)

        self.assertEqual(updatedDepartment.name, updateValues["name"])

    def test_does_not_update_department_with_invalid_data(self):
        """
        Prevents user from updating department with invalid data.
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

        departmentCreated = Department.objects.create(
            name = "Technical",
             desc = "This is description"
        )

        updateValues = {
            "name": "",
        }

        url = reverse("departments:detail", args=(departmentCreated.id,))
        response = self.client.patch(url, updateValues, content_type='application/json', **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertEqual(res_json["status"], "fail")

    def test_does_not_update_department_with_invalid_id(self):
        """
        Prevents user from updating department with invalid id.
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

        Department.objects.create(
            name = "Technical",
             desc = "This is description"
        )

        updateValues = {
            "name": "Updated Name",
        }

        url = reverse("departments:detail", args=("random_id",))
        response = self.client.patch(url, updateValues, content_type='application/json', **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 404)
        self.assertEqual(res_json["status"], "fail")

    def test_does_not_delete_department_with_invalid_id(self):
        """
        Prevents user from deleting department with invalid id.
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

        Department.objects.create(
            name = "Technical",
            desc = "This is description"
        )

        url = reverse("departments:detail", args=("random_id",))
        response = self.client.delete(url, **headers)
        res_json = response.json()

        self.assertEqual(response.status_code, 404)
        self.assertEqual(res_json["status"], "fail")

