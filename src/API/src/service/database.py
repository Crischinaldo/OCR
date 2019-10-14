from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class DatabaseException(Exception):
    """General error handling for Database"""


class Database:

    def __init__(self):
        self.engine = self._engine()

    def _engine(self):
        drivername = 'postgresql'
        user = 'postgres'
        password = 'postgres'
        host = '172.18.0.2'
        database = 'docrec1'

        connection = '{drivername}://{user}:{password}@{host}/{database}'.format(
            drivername=drivername,
            user=user,
            password=password,
            host=host,
            database=database,
        )
        return create_engine(connection)

    def session(self):

        if not self.engine:
            raise DatabaseException("Engine doesnt exist!")

        Session = sessionmaker(bind=self.engine)

        return Session()

