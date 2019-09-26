import cv2
import numpy as np


# image = cv2.imread('./ocr-noise-text-1.png', 0)
# image = cv2.imread('./ocr-noise-text-1.png', 0)
# imgBlur = cv2.GaussianBlur(image, (9, 9), 0)
# kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
# imgTH = cv2.morphologyEx(imgBlur, cv2.MORPH_TOPHAT, kernel)
# imgBin = cv2.threshold(imgTH, 0, 250, cv2.THRESH_OTSU)
# imgdil = cv2.dilate(imgBin, kernel)
# imgBin_Inv = cv2.threshold(imgdil, 0, 250, cv2.THRESH_BINARY_INV)
# cv2.imwrite('./ocr-noise-text-2.png', imgBin_Inv)
# cv2.waitKey(0)

def binarize_img(img):
    return cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)


def convert_grayscale(img):
    """
    converts image it to grayscale.
    :param img: image
    :return: grayscaled image
    """
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
