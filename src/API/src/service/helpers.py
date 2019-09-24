import base64
import numpy as np
from io import BytesIO
from cv2 import imdecode
from pdf2image import convert_from_bytes


def decode_hex_to_img(_hex, file_type):

    bytified_data = bytes.fromhex(_hex)
    if file_type == 'pdf':
        img_list = convert_from_bytes(bytified_data)
        return np.asarray(img_list[0])

    if file_type == 'img':
        file_like = BytesIO(bytified_data)
        decoded_img = imdecode(np.frombuffer(file_like.getbuffer(), np.uint8), -1)
        return decoded_img

    return None
