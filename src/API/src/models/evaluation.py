from service.database import Database
from models.db.classifications import DBResult
from sqlalchemy import func
from collections import Counter
from functools import reduce
from sqlalchemy.exc import ProgrammingError
from models.db.classifications import DBClassification
import json
import numpy as np


class Evaluation:

    @staticmethod
    def evaluate():
        """
        Sum up evaluation for current prediction results
        :return: amount of predictions of associated class, the corresponding accuracies and total amount
        of predictions
        """
        evaluation = {}
        try:
            total_amount_split, total_amount = DBClassification.total_predictions()
        except ProgrammingError:
            return
        accuracies = DBClassification.calc_accuracies()
        keys = ['amount', 'predictions', 'accuracies']

        evaluation.update({k: v for k, v in zip(keys, [total_amount, total_amount_split, accuracies])})

        analytics = Evaluation.durations()
        evaluation.update(analytics)

        return {'result': evaluation}

    @staticmethod
    def durations():

        analytic = {}
        with open('../data/evaluation.json', 'r') as json_file:
            evaluation = json.load(json_file)

        analytic.update(evaluation)

        return evaluation
