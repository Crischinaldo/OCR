"""
classify route
"""

from flask import Blueprint, request, jsonify
from models.classification import Classification
from service.logging_ import Log

log = Log()
api = Blueprint('/classification', __name__)


@api.route('/classification', methods=['GET', 'POST'])
def classifier():
    log.info(msg='/machine-learning/classification - has been entered...')
    if request.method == 'GET':
        log.info('/machine-learning/classification - Request-method: "{method}"'.format(method=request.method))
        return jsonify('document classification')
    if request.method == 'POST':

        log.info('classify - Request-method: "{method}"'.format(method=request.method))
        data = request.form.to_dict()
        resp = Classification().predict_class(req=data)

        return jsonify(resp)
