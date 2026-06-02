# Product Manager

A simple full-stack web application featuring a **Django (Django REST Framework) backend** and a **React + Vite frontend** to add, view, update, and delete products.

---

## Folder Structure

* `django_backend/` - The backend API application built with Django REST Framework.
* `react_frontend/` - The frontend UI application built with React and Vite.

---

## Getting Started

### 1. Backend Setup (Django)

Navigate to the `django_backend/` directory:
```bash
cd django_backend
```

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment:**
   * **Windows (Command Prompt):**
     ```cmd
     venv\Scripts\activate
     ```
   * **Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

3. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations to set up the database:**
   ```bash
   python manage.py migrate
   ```

5. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```
   The backend API will run on `http://127.0.0.1:8000/`.

---

### 2. Frontend Setup (React + Vite)

Navigate to the `react_frontend/frontend/` directory:
```bash
cd react_frontend/frontend
```

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run locally on `http://localhost:5173/`.
