import cv2
import numpy as np
import re, string, unicodedata
import nltk
# import contractions
import inflect
from bs4 import BeautifulSoup
from nltk import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import LancasterStemmer, WordNetLemmatizer
from PIL import Image
import cv2
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


class Preprocessor:

    @staticmethod
    def load():
        nltk.download('stopwords')
        nltk.download('punkt')
        nltk.download('wordnet')

    @staticmethod
    def preprocess_img(im):
        """
        binarize image to improve accuracy
            """
        _, im = cv2.threshold(np.array(im), 127, 255, cv2.THRESH_BINARY)
        return Image.fromarray(im)

    @staticmethod
    def preprocess_text(df):

        stemmer = LancasterStemmer()
        lemmatizer = WordNetLemmatizer()
        p = inflect.engine()
        import pdb;
        pdb.set_trace()
        # remove special characters
        df['text'].apply(lambda x: re.sub("(\\W)+", " ", x))

        # remove punctuation
        df['text'].apply(lambda x: re.sub(r'[^\w\s]', '', x))

        # tokenize
        df['text'].apply(lambda x: nltk.word_tokenize(x))

        # to lower case
        df['text'].apply(lambda x: [word.lower() for word in x])

        # filter special characters
        df['text'].apply(lambda x: [word.lower() for word in x])

        # filter stopwords
        df['text'].apply(lambda x: [item for item in x if item not in stopwords.words('german')])

        # remove punctuation
        df['text'].apply(lambda x: [re.sub(r'[^\w\s]', '', word) for word in x if word != ''])

        # Remove non-ASCII characters from list of tokenized words
        df['text'].apply(lambda x: [
            unicodedata.normalize('NFKD', word).encode('ascii', 'ignore').decode('utf-8', 'ignore')
            for word in x])

        # Replace all interger occurrences in list of tokenized words with textual representation
        df['text'].apply(lambda x: [p.number_to_words(word) for word in x if word.isdigit()])

        # stemming
        df['text'].apply(lambda x: [stemmer.stem(word) for word in x])

        # lemmatizing
        df['text'].apply(lambda x: [lemmatizer.lemmatize(word, pos='v') for word in x])

        return df


def convert_grayscale(img):
    """
    converts image it to grayscale.
    :param img: image
    :return: grayscaled image
    """
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
