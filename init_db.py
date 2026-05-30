"""
Run this once on Railway to create tables and seed default data.
  railway run python init_db.py
"""
from app import init_db
init_db()
print("Database initialised successfully.")
