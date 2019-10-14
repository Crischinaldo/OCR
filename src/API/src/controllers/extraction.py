"""
extraction route
"""

from flask import Blueprint, request, jsonify
from models.extraction.extraction import TextExtractor
from service.logging_ import Log
from service.validation import Validator

log = Log()
api = Blueprint('/extraction', __name__)


@api.route('/extraction', methods=['POST'])
def extract():
    log.info(msg='extract - has been entered...')

    if request.method == 'POST':
        log.info('extract - Request-method: "{method}"'.format(method=request.method))

        data = request.form.to_dict()
        validator = Validator('extraction')
        validator.validate(data)

        if validator.validated:
            log.info('request has been validated')
            resp = TextExtractor().extract(req=data)
            if not resp:
                return jsonify({'status': 'bad request'}), 400
        else:
            log.info('validation of request failed')
            return jsonify({'status': 'validation failed'}), 422

        return jsonify(resp)
