"""
Default, home route
"""
from src.model.document_classifying import DocumentClassifier
from flask import Blueprint, request

api = Blueprint('classify', __name__)


@api.route('/classify', methods=['GET', 'POST'])
def classifier():
    if request.method == 'GET':
        return 'document classifier'

    data = request.json
    document_classifier = DocumentClassifier()
    document_classifier.classify(img=data.get('img'))
    return "<h1> classify <h1>"
