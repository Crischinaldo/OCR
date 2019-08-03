from keras.models import load_model


class DocumentClassifier:

    def __init__(self):
        self.model = load_model('invoice_classifier.h5')

    def classify(self, img):
        x_pred = self.model.predict_classes(img)
        print(x_pred)
