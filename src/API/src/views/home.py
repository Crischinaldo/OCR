"""
Default, home route
"""

from flask import Blueprint

api = Blueprint('/home', __name__)


@api.route('/')
def home():
    return "<h1> Home <h1>"
