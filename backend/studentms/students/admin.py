from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'roll_no', 'email', 'department', 'year']
    search_fields = ['name', 'roll_no', 'email']
    list_filter = ['department', 'year']
