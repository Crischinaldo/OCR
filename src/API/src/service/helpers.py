import base64
import numpy as np
from io import BytesIO
from cv2 import imdecode


def decode_hex_to_img(_hex):

    bytified_data = bytes.fromhex(_hex)

    #base64_encoded_str = base64.b64encode(bytified_data)

#    base64_decoded_str = base64_encoded_str.decode('utf-8')
    file_like = BytesIO(bytified_data)

    decoded_img = imdecode(np.frombuffer(file_like.getbuffer(), np.uint8), -1)

    return decoded_img
