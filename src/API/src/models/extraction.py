import pytesseract
from service.helpers import decode_b64_to_img
from service.preprocessing import convert_grayscale, binarize_img
import re
import cv2
import locale
import pandas as pd
from pytesseract import Output

locale.setlocale(locale.LC_ALL, 'german')


class TextExtractor:

    tesseract_path = 'C:/Program Files/Tesseract-OCR/tesseract'

    def __init__(self):
        pytesseract.pytesseract.tesseract_cmd = self.tesseract_path
        self.extractor = pytesseract
        self.patterns = {
            'balance_due': '\d{1,3}(?:[.]\d{3})*(?:[,]\d{2})',
            'iban': '[A-Z]{2}(?:[ ]?)[0-9]{2}(?:[ ]?[0-9]{4}){4}(?!(?:[ ]?[0-9]){3})(?:[ ]?[0-9]{1,2})?',
            'bic': '/[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?/i',
            'town':  '\d{3,}[ \-\/]+[a-zA-Z ]{3,}'
        }

    def __repr__(self):
        return self.extractor.get_tesseract_version

    def image_to_df(self, im):
        extracted = self.extractor.image_to_string(im, lang='deu')

        return pd.Series([extracted])


    def extract(self, req):
        extraction = {}
        decoded_img = decode_b64_to_img(req.get('file'), req.get('type'))
        if decoded_img is None:
            return
        grayscaled_img = convert_grayscale(decoded_img)

        extracted_text = self.extractor.image_to_string(grayscaled_img)
        text = extracted_text.replace('\n', ' ')

        iban, bic, x = self.apply_patterns(text)
        balance_due = 0
        floated_currencies = [float(locale.atof(i)) for i in x]
        if floated_currencies:
            max_floated_currency = max(floated_currencies)
            balance_due = locale.currency(max_floated_currency)

        extraction.update({k: v for k, v in zip(self.patterns.keys(), [balance_due, iban, bic])})

        return {'result': extraction}

    def apply_patterns(self, text):

        iban = re.findall(self.patterns['iban'], text)
        bic = re.findall(self.patterns['bic'], text)
        x = re.findall(self.patterns['balance_due'], text)

        return iban, bic, x

    def draw_bounding_box(self):
        pass
