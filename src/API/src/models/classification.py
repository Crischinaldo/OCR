from keras.models import load_model
from keras.models import Sequential
import tensorflow as tf
from keras import backend as K


class ClassificationException(Exception):
    """General Exception handling for Classification"""


class Classification:

    def __init__(self, labels=None):
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
        K.clear_session()
        return y_classes
