"""
evaluation route
"""

from flask import Blueprint, request, jsonify
from service.logging_ import Log
from models.evaluation import Evaluation

log = Log()
api = Blueprint('/classification/evaluation', __name__)


@api.route('/classification/evaluation', methods=['GET', 'POST'])
def evaluation():
    log.info(msg='/evaluation - has been entered...')
    if request.method == 'GET':
        log.info('/evaluation - Request-method: "{method}"'.format(method=request.method))
        if 'label' in request.args:
            resp = Evaluation.evaluate(request.args['label'])
        else:
            resp = Evaluation.evaluate()

        return jsonify(resp)
