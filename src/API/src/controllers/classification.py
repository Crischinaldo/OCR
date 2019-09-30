"""
classify route
"""

from flask import Blueprint, request, jsonify
from models.classification import Classification
from service.logging_ import Log
from service.validation import Validator
from models.evaluation import Evaluation

log = Log()
api = Blueprint('/classification', __name__)


@api.route('/classification', methods=['GET', 'POST'])
def classifier():
    log.info(msg='/machine-learning/classification - has been entered...')
    if request.method == 'GET':
        log.info('/evaluation - Request-method: "{method}"'.format(method=request.method))

        resp = Evaluation.evaluate()
        if not resp:
            return jsonify({'status': 'not found'}), 404

        return jsonify(resp)

    if request.method == 'POST':

        log.info('classify - Request-method: "{method}"'.format(method=request.method))
        data = request.form.to_dict()
        validator = Validator(schema_type='classification')
        validator.validate(data)

        if validator.validated:
            log.info('request has been validated')
            resp = Classification().predict_class(req=data)
            if not resp:
                return jsonify({'status': 'bad request'}), 400
        else:
            log.info('validation of request failed')
            return jsonify({'status': 'validation failed'}), 422

        return jsonify(resp), 202
