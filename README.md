# Custom Thobe Designer

A small Django project for showcasing and customizing a traditional thobe. The website includes a landing page and an interactive design page with selectable colors, fabrics, collars, sleeves, and model previews.

## Features

- Django-powered website
- Main landing page with project information and visual content
- Interactive thobe design interface
- Multiple fabric, color, collar, and sleeve choices
- 3D/model preview assets supported by Three.js
- Static CSS, JavaScript, and image assets
- SQLite database for local development

## Project structure

```text
myproject/
├── manage.py
├── db.sqlite3
├── basic_app/          # Django application
├── myproject/          # Django project settings and URLs
├── templates/
│   ├── Main.html
│   └── Design.html
└── static/
	  ├── Main Static/
	  └── Design Static/
```

## Requirements

- Python 3.10+
- Django

## Setup

1.  Open a terminal in the `myproject` directory.
2.  Create and activate a virtual environment:

    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

3.  Install Django:

    ```bash
    pip install django
    ```

4.  Apply database migrations:

    ```bash
    python manage.py migrate
    ```

5.  Start the development server:

    ```bash
    python manage.py runserver
    ```

6.  Open <http://127.0.0.1:8000/> in a browser.

## Development

Use `python manage.py makemigrations` and `python manage.py migrate` after changing models. Run the test suite with:

```bash
python manage.py test
```

This project is intended for local development and educational use.
