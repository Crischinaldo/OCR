from src.models.files import DBFile
from src.service.database import Database
from src.service.util import time_
from src.service.logging_ import Log
from flask import jsonify


class File:

    @staticmethod
    def post(req):
        sess = Database().session()

        sess.add(DBFile(created_at=time_(), base64_img=req.get('base64_img'), name=req.get('name')))
        sess.commit()

        sess.close()

    @staticmethod
    def get():
        sess = Database().session()
        images = sess.query(DBFile).all()

        dict_images = [x.__dict__ for x in images]
        for image in dict_images:
            del image['_sa_instance_state']

        if images is not None:
            return dict_images
