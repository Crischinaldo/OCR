#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Imports

from flask import Flask
from src.views import home, files, extract, classify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(home.api)
app.register_blueprint(classify.api)
app.register_blueprint(files.api)
app.register_blueprint(extract.api)

app.secret_key = 'voll geheimer schlüssel'
app.config['SESSION_TYPE'] = 'Sessiontyp'

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8090, debug=True)
