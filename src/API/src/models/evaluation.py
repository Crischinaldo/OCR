from service.database import Database
from models.db.classifications import DBClassification
from sqlalchemy import select, func


class Evaluation:

    @staticmethod
    def amount_classification():
        sess = Database().session()
        rows = sess.query(func.count(DBClassification.classification_id)).scalar()
        sess.close()
        return rows

    @staticmethod
    def amount_label(label):
        sess = Database().session()
        amount = sess.query(func.count('*')
                            ).filter(DBClassification.pred_class == "{label}".format(label=label)).scalar()
        sess.close()

        return amount

    @staticmethod
    def prediction_rate(label):
        sess = Database().session()
        amount = sess.query(func.count('*')
                            ).filter(DBClassification.pred_class == "{label}".format(label=label)).scalar()
        sess.close()

        return amount