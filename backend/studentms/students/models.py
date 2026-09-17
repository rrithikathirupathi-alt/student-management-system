from django.db import models


class Student(models.Model):
    DEPARTMENT_CHOICES = [
        ('CSE', 'Computer Science'),
        ('ECE', 'Electronics & Communication'),
        ('MECH', 'Mechanical'),
        ('CIVIL', 'Civil'),
        ('EEE', 'Electrical & Electronics'),
    ]

    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES)
    year = models.PositiveSmallIntegerField()  # 1-4
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.roll_no})"
