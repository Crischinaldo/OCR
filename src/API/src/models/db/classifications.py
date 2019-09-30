from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from service.util import time_
import datetime
import base64
from sqlalchemy.orm import relationship
from service.database import Database

Base = declarative_base()


class DBImages(Base):

    # Set users as attribute for tablename
    __tablename__ = 'img'

    img_id = Column(Integer, primary_key=True, autoincrement=True)
    # Set Attributes
    b64string = Column(String(1000000))
    name = Column(String(150))

    # foreign key
    result_id = Column(Integer, ForeignKey('result.result_id'))
    result = relationship("DBResult", back_populates="img")

    def __init__(self, b64string, name):
        self.engine = Database().engine
        # create images table if not exist
        if not self.engine.dialect.has_table(self.engine, self.__tablename__):
            Base.metadata.create_all(self.engine)

        self.name = name
        self.b64string = b64string


class DBResult(Base):

    # Set users as attribute for tablename
    __tablename__ = 'result'

    result_id = Column(Integer, primary_key=True, autoincrement=True)

    # Set Attributes
    accuracy = Column(Float)
    label = Column(String(100))

    # foreign key
    classification_id = Column(Integer, ForeignKey('classification.classification_id'))
    classification = relationship("DBClassification", back_populates="result")

    img = relationship("DBImages", uselist=False, back_populates="result")

    def __init__(self, accuracy, label, img):
        self.engine = Database().engine
        # create images table if not exist
        if not self.engine.dialect.has_table(self.engine, self.__tablename__):
            Base.metadata.create_all(self.engine)

        self.accuracy = accuracy
        self.label = label
        self.img = img


class DBClassification(Base):

    # Set users as attribute for tablename
    __tablename__ = 'classification'

    classification_id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(Date)
    result = relationship("DBResult", uselist=False, back_populates="classification")

    def __init__(self, created_at, result):
        self.engine = Database().engine
        # create images table if not exist
        if not self.engine.dialect.has_table(self.engine, self.__tablename__):
            Base.metadata.create_all(self.engine)

        self.created_at = created_at
        self.result = result

    def create_classification(self):

        sess = Database().session()

        sess.add(DBClassification(
            created_at=self.created_at,
            result=self.result,
        ))

        sess.commit()
        sess.close()
