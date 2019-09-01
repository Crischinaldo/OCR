"""
extraction route
"""

from flask import Blueprint, request, jsonify
from src.controllers.text_extraction_controller import ExtractionController
from src.service.logging_ import Log

log = Log()
api = Blueprint('/extract', __name__)


@api.route('/extract', methods=['GET', 'POST'])
def extract():
    log.info(msg='extract - has been entered...')
    if request.method == 'GET':
        log.info('extract - Request-method: "{method}"'.format(method=request.method))
        return jsonify('document classifier')
    if request.method == 'POST':
        log.info('extract - Request-method: "{method}"'.format(method=request.method))
        data = request.form.to_dict()
        resp = ExtractionController.post(req=data)

        return jsonify(resp)
