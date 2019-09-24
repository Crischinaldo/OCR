"""
extraction route
"""

from flask import Blueprint, request, jsonify
from models.extraction import TextExtractor
from service.logging_ import Log

log = Log()
api = Blueprint('/machine-learning/extraction', __name__)


@api.route('/machine-learning/extraction', methods=['GET', 'POST'])
def extract():
    log.info(msg='extract - has been entered...')
    if request.method == 'GET':
        log.info('extract - Request-method: "{method}"'.format(method=request.method))
        return jsonify('document classifier')
    if request.method == 'POST':
        log.info('extract - Request-method: "{method}"'.format(method=request.method))
        data = request.form.to_dict()
        resp = TextExtractor().extract(req=data)

        return jsonify(resp)
