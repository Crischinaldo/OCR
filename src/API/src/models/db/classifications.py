from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from service.util import time_
import datetime
import base64
from sqlalchemy.orm import relationship
from service.database import Database

Base = declarative_base()


class DBEvaluation(Base):

    # Set users as attribute for tablename
    __tablename__ = 'evaldata'

    eval_id = Column(Integer, primary_key=True, autoincrement=True)

    # Set Attributes
    accuracy = Column(Float)
    label = Column(String(100))

    classification_id = Column(Integer, ForeignKey('classification.classification_id'))
    classification = relationship("DBClassification", back_populates="evaldata")

    def __init__(self, accuracy, label):
        self.engine = Database().engine
        # create file table if not exist
        if not self.engine.dialect.has_table(self.engine, self.__tablename__):
            Base.metadata.create_all(self.engine)

        self.accuracy = accuracy
        self.label = label


class DBFile(Base):

    # Set users as attribute for tablename
    __tablename__ = 'file'

    file_id = Column(Integer, primary_key=True, autoincrement=True)
    # Set Attributes
    hexed_file = Column(String(1000000))
    name = Column(String(150))

    classification_id = Column(Integer, ForeignKey('classification.classification_id'))
    classification = relationship("DBClassification", back_populates="file")

    def __init__(self, hexed_file, name):
        self.engine = Database().engine
        # create file table if not exist
        if not self.engine.dialect.has_table(self.engine, self.__tablename__):
            Base.metadata.create_all(self.engine)

        self.name = name
        self.hexed_file = hexed_file


class DBClassification(Base):

    # Set users as attribute for tablename
    __tablename__ = 'classification'

    classification_id = Column(Integer, primary_key=True, autoincrement=True)

    # Set Attributes
    created_at = Column(Date)
    file = relationship("DBFile", uselist=False, back_populates="classification")
    evaldata = relationship("DBEvaluation", uselist=False, back_populates="classification")

    def __init__(self, created_at, file, evaldata):
        self.engine = Database().engine
        # create file table if not exist
        if not self.engine.dialect.has_table(self.engine, self.__tablename__):
            Base.metadata.create_all(self.engine)

        self.created_at = created_at
        self.file = file
        self.evaldata = evaldata

    def post(self):

        sess = Database().session()

        sess.add(DBClassification(
            created_at=self.created_at,
            evaldata=self.evaldata,
            file=self.file,
        ))

        sess.commit()
        sess.close()
