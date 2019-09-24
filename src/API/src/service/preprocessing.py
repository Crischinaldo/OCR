import cv2
import numpy as np


def binarize_img(img):
    return cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)


def convert_grayscale(img):
    """
    converts image it to grayscale.
    :param img: image
    :return: grayscaled image
    """
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
