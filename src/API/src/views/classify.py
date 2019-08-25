"""
classify route
"""

from flask import Blueprint, request, jsonify
from src.controllers.classification_controller import ClassificationController
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
        data = request.form.to_dict()
        resp = ClassificationController.post(req=data)

        return jsonify(resp)
