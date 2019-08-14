"""
classify route
"""

from flask import Blueprint, request, jsonify
from src.controllers.classify import Classifier
from src.service.logging_ import Log

log = Log()
api = Blueprint('/classify', __name__)


@api.route('/classify', methods=['GET', 'POST'])
def classifier():
    log.info(msg='classify - has been entered...')
    if request.method == 'GET':
        log.info('classify - Request-method: "{method}"'.format(method=request.method))
        return jsonify('document classifier')
    if request.method == 'POST':
        log.info('classify - Request-method: "{method}"'.format(method=request.method))
        data = request.json
       # Classifier.post(img=data)
        return jsonify("<h1> classify <h1>")
