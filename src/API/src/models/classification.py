
from service._globals import labels
from service.helpers import decode_b64_to_img
import cv2
import numpy as np
from models.db.classifications import DBClassification, DBImages, DBResult
from service.util import time_
from base64 import b64encode
from models.extraction.extraction import TextExtractor
import joblib
from service.preprocessing import Preprocessor
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer

class ClassificationException(Exception):
    """General Exception handling for Classification"""


class Classification:
    text_clf = './text_clf.sav'

    def __init__(self, labels=labels):
        self.extractor = TextExtractor
        self.model = joblib.load(Classification.text_clf)
        self._labels = labels
        self.df = None


    @property
    def labels(self):
        return self._labels

    @labels.setter
    def labels(self, values):
        if type(values) is not list:
            raise TypeError('labels needs to be passed as list!')
        self._labels = values

    def classify(self, im):

        Preprocessor.load()

        df = TextExtractor().image_to_df(im=im)
        y = self.model.predict(df)
        y_proba = self.model.predict_proba(df)
        max_y_proba = y_proba[0][y_proba.argmax(axis=-1)[0]]
        max_percentage = round(float(max_y_proba) * 100, 2)

        return max_percentage, y[0]

    def predict_class(self, req):

        decoded_img = decode_b64_to_img(req.get('file'), file_type=req.get('type'))

        if decoded_img is None:
            return
        scaled_img = cv2.resize(decoded_img, (32, 32))

        max_y_prob, pred = self.classify(decoded_img)
        self.db_entry(result=DBResult(label=pred,
                                      accuracy=max_y_prob,
                                      img=DBImages(b64string=b64encode(scaled_img),
                                                   name=req.get('name'),
                                                   )))

        payload = {
            'result':
                {
                    'name': req.get('name'),
                    'pred_class': pred,
                    'accuracy': max_y_prob,
                }
        }

        return payload

    @staticmethod
    def db_entry(result):
        DBClassification(result=result,
                         created_at=time_(),
                         ).create_classification()
