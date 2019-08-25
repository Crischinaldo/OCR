import pytesseract


class TextExtractor:
    tesseract_path = 'C:/Program Files/Tesseract-OCR/tesseract'

    def __init__(self):
        pytesseract.pytesseract.tesseract_cmd = self.tesseract_path
        self.extractor = pytesseract

    def __repr__(self):
        return self.extractor.get_tesseract_version

    def img_to_string(self, img):
        extracted_txt = self.extractor.image_to_string(img)
        return extracted_txt
