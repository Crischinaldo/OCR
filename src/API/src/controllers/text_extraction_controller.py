
from src.models.text_extraction import TextExtractor
from src.service.helpers import decode_hex_to_img


class ExtractionController:

    @staticmethod
    def post(req):
        decoded_img = decode_hex_to_img(req.get('hex_img'))

        extractor = TextExtractor()
        extracted_text = extractor.img_to_string(decoded_img)

        return {'result': extracted_text}

    @staticmethod
    def get():
        pass
