#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Imports

from flask import Flask
import sys

#import os
#os.chdir('C:\\Users\\Chrus\\OCR\\src\\API\\src')
#import pdb; pdb.set_trace()
from controllers import home, extraction, classification
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(home.api)
app.register_blueprint(classification.api)
app.register_blueprint(extraction.api)

app.secret_key = 'voll geheimer schlüssel'
app.config['SESSION_TYPE'] = 'Sessiontyp'

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8090, debug=True)
