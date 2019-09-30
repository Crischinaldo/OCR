#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Imports

from flask import Flask
from controllers import home, extraction, classification
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(home.api)
app.register_blueprint(classification.api)
app.register_blueprint(extraction.api)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8090, debug=True)
