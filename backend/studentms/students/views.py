from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    """
    Provides full CRUD:
      GET    /api/students/        -> list (supports ?search=)
      POST   /api/students/        -> create
      GET    /api/students/{id}/   -> retrieve
      PUT    /api/students/{id}/   -> update
      PATCH  /api/students/{id}/   -> partial update
      DELETE /api/students/{id}/   -> delete
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'roll_no', 'email', 'department']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_update(serializer)
        return Response(serializer.data)
