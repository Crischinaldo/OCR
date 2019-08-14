# from keras.models import load_model
from src.models.invoice_classification import Classification

class Classifier:

    @staticmethod
    def post(img):
        classifier = Classification()
        pred = classifier.classify(img)

        return pred
