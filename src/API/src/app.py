#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Imports

from flask import Flask
from src.routes import home
from src.routes import document_analysis

app = Flask(__name__)
app.register_blueprint(home.api, url_prefix='/')
app.register_blueprint(document_analysis.api, url_prefix='/')
app.secret_key = 'voll geheimer schlüssel'
app.config['SESSION_TYPE'] = 'Sessiontyp'

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8090, debug=True)
