from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from service.util import time_
import datetime
import base64
from sqlalchemy.orm import relationship
from service.database import Database

Base = declarative_base()


class DBFile(Base):

    # Set users as attribute for tablename
    __tablename__ = 'file'

    file_id = Column(Integer, primary_key=True)

    # Set Attributes
    hexed_file = Column(String(500000))

    classification_id = Column(Integer, ForeignKey('classification.classification_id'))
    classification = relationship("DBClassification", back_populates="file")

    def __init__(self, hexed_file):
        self.engine = Database().engine
        # create file table if not exist
        if not self.engine.dialect.has_table(self.engine, self.__tablename__):
            Base.metadata.create_all(self.engine)

        self.hexed_file = hexed_file


class DBClassification(Base):

    # Set users as attribute for tablename
    __tablename__ = 'classification'

    classification_id = Column(Integer, primary_key=True)

    # Set Attributes
    created_at = Column(Date)
    pred_class = Column(String(100))
    accuracy = Column(Float)
    file = relationship("DBFile", uselist=False, back_populates="classification")

    def __init__(self, created_at, name, pred_class, accuracy, file):
        self.engine = Database().engine
        # create file table if not exist
        if not self.engine.dialect.has_table(self.engine, self.__tablename__):
            Base.metadata.create_all(self.engine)

        self.created_at = created_at

        self.file = file
        self.name = name
        self.pred_class = pred_class
        self.accuracy = accuracy

    def post(self):

        sess = Database().session()

        sess.add(DBClassification(
            created_at=self.created_at,
            name=self.name,
            file=self.file,
            pred_class=self.pred_class,
            accuracy=self.accuracy,
        ))

        sess.commit()
        sess.close()
