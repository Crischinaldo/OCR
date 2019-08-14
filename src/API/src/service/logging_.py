import logging


class Log:

    def __init__(self):
        self.log = logging.getLogger(__name__)
        logging.basicConfig(level=logging.DEBUG,
                            format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
                            datefmt='%m-%d %H:%M',
                            filename='../API_log.log',
                            filemode='w')

    def info(self, msg, *args, **kwargs):
        self.log.info(msg)

    def exception(self, msg, *args, **kwargs):
        self.log.exception(msg)

    def warning(self, msg, *args, **kwargs):
        self.log.warning(msg)
