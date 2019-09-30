import base64
import numpy as np
from io import BytesIO
from cv2 import imdecode
from pdf2image import convert_from_bytes


def decode_b64_to_img(b64, file_type):

    try:
        b64_data = base64.decodestring(bytes(b64, 'utf8'))
    except ValueError:
        return
    if file_type == 'pdf':
        img_list = convert_from_bytes(bytes(b64_data))
        return np.asarray(img_list[0])

    if file_type == 'img':
        file_like = BytesIO(b64_data)
        decoded_img = imdecode(np.frombuffer(file_like.getbuffer(), np.uint8), -1)
        return decoded_img

    return None
