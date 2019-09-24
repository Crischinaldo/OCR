from keras.models import load_model
from keras import backend as K
from service._globals import labels
from service.helpers import decode_hex_to_img
import cv2
import numpy as np
from models.db.classifications import DBClassification, DBFile
from service.util import time_
import math


class ClassificationException(Exception):
    """General Exception handling for Classification"""


class Classification:

    def __init__(self, labels=labels):
        self.model = load_model('../../invoice_classifier.h5')
        self._labels = labels

    @property
    def labels(self):
        return self._labels

    @labels.setter
    def labels(self, values):
        if type(values) is not list:
            raise TypeError('labels needs to be passed as list!')
        self._labels = values

    def classify(self, img):
        y_prob = self.model.predict(img)

        y_classes = y_prob.argmax(axis=-1)

        max_y_prob = y_prob[0][y_prob.argmax(axis=-1)[0]]
        K.clear_session()
        max_percentage = round(float(max_y_prob) * 100, 2)
        return max_percentage, y_classes

    def predict_class(self, req):

        decoded_img = decode_hex_to_img(req.get('file'), file_type=req.get('type'))

        scaled_img = cv2.resize(decoded_img, (32, 32))
        rgb_img = cv2.cvtColor(scaled_img, cv2.COLOR_RGB2BGR)
        image_4d = rgb_img[np.newaxis, ...]

    # im = Image.open(file_like)
    # im = im.resize((32, 32), Image.ANTIALIAS)
    # im.save("img1.png", "PNG")
    # im.show()
    #  im = cv2.imread(im)

        max_y_prob, pred = self.classify(image_4d)
        self.db_entry(name=req.get('name'),
                      file=DBFile(hexed_file=req.get('file')),
                      pred_class=self.labels[pred[0]],
                      accuracy=max_y_prob,
                      )
        payload = {
            'result':
                {
                    'name': req.get('name'),
                    'pred_class': self.labels[pred[0]],
                    'accuracy': max_y_prob,
                }
        }

        return payload

    @staticmethod
    def db_entry(name, file, pred_class, accuracy):
        DBClassification(name=name,
                         file=file,
                         pred_class=pred_class,
                         accuracy=accuracy,
                         created_at=time_(),
                         ).post()
