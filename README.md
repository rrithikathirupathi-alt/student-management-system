# Student Management System
live link:https://student-management-system-muv7.onrender.com/admin/

A full-stack CRUD web application built with **React**, **Django REST Framework**, and **SQLite**.

## Tech Stack
- Frontend: React, Axios
- Backend: Django, Django REST Framework
- Database: SQLite
- API testing: Postman (recommended)

## Project Structure
```
student-management-system/
├── backend/
│   ├── requirements.txt
│   └── studentms/
│       ├── manage.py
│       ├── studentms/        # project settings, urls
│       └── students/         # app: models, serializers, views, urls
└── frontend/
    ├── package.json
    ├── public/
    └── src/
        ├── api.js            # axios calls to backend
        ├── App.js
        └── components/
            ├── StudentForm.js
            └── StudentList.js
```

## Backend Setup (Django REST API)

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt

cd studentms
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser   # optional, for /admin access
python manage.py runserver
```

Backend runs at **http://127.0.0.1:8000**
API base: **http://127.0.0.1:8000/api/students/**

## Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Frontend runs at **http://localhost:3000**

> Make sure the Django backend is running first — the React app calls `http://127.0.0.1:8000/api`.

## API Endpoints

| Operation | Method | Endpoint                  |
|-----------|--------|----------------------------|
| List/Search | GET  | `/api/students/?search=xyz` |
| Create    | POST   | `/api/students/`           |
| Retrieve  | GET    | `/api/students/{id}/`      |
| Update    | PUT    | `/api/students/{id}/`      |
| Delete    | DELETE | `/api/students/{id}/`      |

## Student Fields
- `name` (required)
- `roll_no` (required, unique)
- `email` (required, unique, valid email)
- `department` (CSE / ECE / MECH / CIVIL / EEE)
- `year` (1–4)

## Testing with Postman
1. Import the endpoints above into a new Postman collection.
2. Test Create with valid data, then with a duplicate `roll_no` (should return 400).
3. Test Update on a valid and an invalid `id`.
4. Test Delete and confirm the record disappears from a subsequent GET.

## Next Steps / Possible Enhancements
- Add authentication (JWT) so only logged-in staff can modify records
- Add pagination controls in the UI
- Add filtering by department/year
- Deploy backend (Render/Railway) and frontend (Vercel/Netlify)
