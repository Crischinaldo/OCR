import pytesseract
from service.helpers import decode_hex_to_img
from service.preprocessing import convert_grayscale, binarize_img
import re


class TextExtractor:
    tesseract_path = 'C:/Program Files/Tesseract-OCR/tesseract'

    def __init__(self):
        pytesseract.pytesseract.tesseract_cmd = self.tesseract_path
        self.extractor = pytesseract

    def __repr__(self):
        return self.extractor.get_tesseract_version


    def extract(self, req):
        extraction = {}
        decoded_img = decode_hex_to_img(req.get('file'), req.get('type'))
        grayscaled_img = convert_grayscale(decoded_img)
       # preprocessed_img = binarize_img(grayscaled_img)

        extracted_text = self.extractor.image_to_string(grayscaled_img)
        queries = ['Rechnungsbetrag', 'IBAN']

      #  for line in extracted_text.split("\n"):
         #   for query in queries:

         #       if query in line:

         #           key = line.split(" ")[0]
         #           val = line.split(" ")[1]
          #          extraction.update({key: val})
        #if 'Rechnungsbetrag' in extracted_text:

        return {'result': extracted_text}
