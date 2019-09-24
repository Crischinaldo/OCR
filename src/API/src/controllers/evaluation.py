"""
evaluation route
"""

from flask import Blueprint, request, jsonify
from service.logging_ import Log
from models.evaluation import Evaluation

log = Log()
api = Blueprint('/evaluation', __name__)


@api.route('/evaluation', methods=['GET', 'POST'])
def classifier():
    log.info(msg='/evaluation - has been entered...')
    if request.method == 'GET':
        log.info('/evaluation - Request-method: "{method}"'.format(method=request.method))
        Evaluation.amount_classification()
        Evaluation.amount_label(label='central-zener-1')
        return jsonify('document classification')
