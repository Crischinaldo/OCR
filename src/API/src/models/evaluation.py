from service.database import Database
from models.db.classifications import DBResult
from sqlalchemy import func
from collections import Counter
from functools import reduce
from sqlalchemy.exc import ProgrammingError


class Evaluation:

    @staticmethod
    def count_predictions(label):
        """
        count all predictions or all predictions associated to a specific label made.
        :param label:
        :return: total amount of classifications
        """
        sess = Database().session()
        if label:

            rows = sess.query(func.count('*')
                              .filter(DBResult.label == "{label}".format(label=label))).scalar()
        else:
            rows = sess.query(func.count(DBResult.eval_id)).scalar()
        sess.close()
        return rows

    @staticmethod
    def total_predictions():
        """
        counts the number of predictions of the corresponding classes
        :return: The amount of predictions belong to each corresponding class
        """
        predictions = {}

        sess = Database().session()

        amounts = []
        for label in sess.query(DBResult.label):
            amounts.append(label)

        sess.close()
        predictions.update({list(label)[0]: amount for label, amount in Counter(amounts).items()})

        total_amount = reduce(lambda x, y: x+y, Counter(amounts).values())

        return predictions, total_amount

    @staticmethod
    def calc_accuracies():
        """
        Calculates the accuracy with which the class was predicted.
        :param label: the class with which the associated precisions of the classifications are calculated
        :return: accuracy of associated predictions
        """
        accuracies = {}
        sess = Database().session()
        for label in sess.query(DBResult.label):
                label = list(label)[0]
                acc_sum = sess.query(func.sum(DBResult.accuracy)
                                     ).filter(DBResult.label == "{label}"
                                              .format(label=label)).scalar()

                accuracies.update({label: round(acc_sum / Evaluation.count_predictions(label), 2)})

        sess.close()

        return accuracies

    @staticmethod
    def evaluate():
        """
        Sum up evaluation for current prediction results
        :return: amount of predictions of associated class, the corresponding accuracies and total amount
        of predictions
        """
        evaluation = {}
        try:
            total_amount_split, total_amount = Evaluation.total_predictions()
        except ProgrammingError:
            return
        accuracies = Evaluation.calc_accuracies()
        keys = ['amount', 'predictions', 'accuracies']

        evaluation.update({k: v for k, v in zip(keys, [total_amount, total_amount_split, accuracies])})

        return {'result': evaluation}




