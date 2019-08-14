import logging

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

log = logging.getLogger(__package__)

def init_engine():
    drivername = 'postgresql'
    user = 'postgres'
    password = 'postgres'
    host = 'localhost'
    database = 'Medi-Boerse'

    connection = '{drivername}://{user}:{password}@{host}/{database}'.format(
        drivername=drivername,
        user=user,
        password=password,
        host=host,
        database=database,
    )
    return create_engine(connection)


def init_db():

    init_engine()

    Session = sessionmaker(bind=engine)
    session = Session()

    return session
