from keras.models import load_model
from keras.models import Sequential

class ClassificationException(Exception):
    """General Exception handling for Classification"""

class Classification:

    def __init__(self):
        self.model = load_model('invoice_classifier.h5')

    def classify(self, img):


        y_prob = self.model.predict(img)
        y_classes = y_prob.argmax(axis=-1)

        return y_classes
