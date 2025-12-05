"""
WSGI configuration for Pomodoro Timer application on Azure App Service
"""
import os
import sys
def is_prime(n):
    """Return True if n is a prime number, else False."""
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

# Invoice class with amount, tax, and total calculation
class Invoice:
    def __init__(self, amount, tax):
        self.amount = amount
        self.tax = tax

    def calculate_total(self):
        """Return the total amount including tax."""
        return self.amount + self.tax

# Add the project directory to the sys.path
project_home = os.path.dirname(os.path.abspath(__file__))
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Import the Flask application
from dataclasses import dataclass
from pomodoro_app.app import app

# Simplified Invoice class using dataclass
@dataclass
class Invoice:
    amount: float
    tax: float

    def calculate_total(self) -> float:
        return self.amount + self.tax

# This is the WSGI application object that Azure App Service will use
application = app

if __name__ == "__main__":
    application.run()