
from src.models.classification import Classification
import cv2
import numpy as np
from src.service._globals import labels
from src.service.helpers import decode_hex_to_img


class ClassificationController:
    @staticmethod
    def post(req):
        decoded_img = decode_hex_to_img(req.get('hex_img'))
        scaled_img = cv2.resize(decoded_img, (32, 32))
        rgb_img = cv2.cvtColor(scaled_img, cv2.COLOR_RGB2BGR)
        image_4d = rgb_img[np.newaxis, ...]

       # im = Image.open(file_like)
        #im = im.resize((32, 32), Image.ANTIALIAS)
        #im.save("img1.png", "PNG")
        #im.show()
      #  im = cv2.imread(im)

        classifier = Classification()
        classifier.labels = labels
        pred = classifier.classify(image_4d)

        return {'result': classifier.labels[pred[0]]}
