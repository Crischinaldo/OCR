from jsonschema import validate
from jsonschema.exceptions import ValidationError
from service._globals import Schemes


class Validator:

    def __init__(self, schema_type):
        if 'classification' == schema_type:
            self.schema = Schemes.classification
        if 'extraction' == schema_type:
            self.schema = Schemes.extraction
        self.validated = None

    def validate(self, req):
        try:
            validate(req, self.schema)
        except ValidationError:
            self.validated = False

        if self.validated is not False:
            self.validated = True
