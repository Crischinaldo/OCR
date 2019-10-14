import pytesseract
from service.helpers import decode_b64_to_img
from service.preprocessing import convert_grayscale, binarize_img
import re
import cv2
import locale
import pandas as pd
from pytesseract import Output
from models.extraction.roi.coordinates import Coordinates
from models.extraction.roi.invoice import RegionOfInterest
locale.setlocale(locale.LC_ALL, 'german')


class TextExtractor:

    tesseract_path = 'C:/Program Files/Tesseract-OCR/tesseract'

    def __init__(self):
        pytesseract.pytesseract.tesseract_cmd = self.tesseract_path
        self.extractor = pytesseract
        self.patterns = {
            'balance_due': '\d{1,3}(?:[.]\d{3})*(?:[,]\d{2})',
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

        regions_of_interest = []

        for label, coords in Coordinates.DEMO.items():

            regions_of_interest.append(RegionOfInterest(*coords, label=label))

        for roi in regions_of_interest:
            cropped, label = roi.crop(grayscaled_img)

            if label == 'calculation':
                calc_text = self.extractor.image_to_string(cropped).replace('\n', ' ')
                balance_due = self.find_balance_due(calc_text)
                if balance_due:
                    extraction.update({label: balance_due})

            if label == 'recipient':
                rec_text = self.extractor.image_to_string(cropped)
                recipient = self.split_data(rec_text)
                keys = ['name', 'street', 'city']

                if recipient:
                    extraction.update({label: dict(zip(keys, recipient))})

            if label == 'bank_details':
                rec_text = self.extractor.image_to_string(cropped)
                bank_details = self.split_data(rec_text, labelled=True)
                if bank_details:
                    extraction.update({label: bank_details})

            if label == 'invoice_details':
                rec_text = self.extractor.image_to_string(cropped)
                invoice_details = self.split_data(rec_text, labelled=True)
                if invoice_details:
                    extraction.update({label: invoice_details})


        return {'result': extraction}

    def find_balance_due(self, text):
        currencies = re.findall(self.patterns['balance_due'], text)
        floated_currencies = [float(locale.atof(i)) for i in currencies]
        if floated_currencies:
            max_floated_currency = max(floated_currencies)
            balance_due = locale.currency(max_floated_currency)

        return balance_due

    def split_data(self, text, labelled=False):
        if labelled:
            x = [item for item in text.split('\n') if len(item) != 0]
            splitted = {}
            for item in x:
                y = item.split(':')
                splitted.update({y[0].strip(): y[1].strip()})

        else:
            splitted = [item for item in text.split('\n') if len(item) != 0]
        return splitted

