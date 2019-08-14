from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date
from src.service.util import time_
import datetime
import base64
from src.service.database import Database

Base = declarative_base()


class DBFile(Base):

    # Set users as attribute for tablename
    __tablename__ = 'files'

    # ID as Integer which increments TODO: Randomize ID
    id = Column(Integer, primary_key=True)

    # Set Attributes
    created_at = Column(Date)
    base64_img = Column(String(500000))
    name = Column(String(100))

    def __init__(self, created_at, base64_img, name):
        self.engine = Database().engine
        # create file table if not exist
        if not self.engine.dialect.has_table(self.engine, self.__tablename__):
            Base.metadata.create_all(self.engine)

        self.created_at = created_at
        self.base64_img = base64_img
        self.name = name
