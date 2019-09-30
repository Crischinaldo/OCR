"""
Default, home route
"""

from flask import Blueprint, jsonify

api = Blueprint('/home', __name__)


@api.route('/', methods=['GET'])
def home():
    return jsonify({'status': 'running', 'author:': 'ct'})
