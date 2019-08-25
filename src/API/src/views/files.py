"""file route"""


from src.service.logging_ import Log
from flask import Blueprint, request, jsonify
from src.controllers.file_controller import FileController

log = Log()
api = Blueprint('/files', __name__)


@api.route('/files', methods=['GET', 'POST'])
def files():
    log.info('files - has been entered...')
    if request.method == 'POST':
        log.info('files - Request-method: "{method}"'.format(method=request.method))
        data = request.form.to_dict()
        FileController.post(data)
        return jsonify("POST FILE SUCCED")

    if request.method == 'GET':
        log.info('files - Request-method: "{method}"'.format(method=request.method))
        images = FileController.get()
        log.info('files - Request-method: "{method}": return {resp}'.format(method=request.method, resp=images))
        return jsonify(images)
