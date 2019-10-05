labels = [
    'invoice',
    'delivery',
    'regress',
]


class Schemes:
    classification = {
        "type": "object",
        "properties": {
            "file": {
                "type": "string",
                "description": "File in hex format.",
                "minLength": 40,
            },
            "type": {
                "type": "string",
                "description": "Type of sent file.",
                "minLength": 3,
                "maxLength": 3,
            },
            "name": {
                "type": "string",
                "description": "Name of sent file.",
                "maxLength": 150,
            },
        },
        "required": ["file", "type", "name"]
    }

    extraction = {
        "type": "object",
        "properties": {
            "file": {
                "type": "string",
                "minLength": 40,
                "description": "File in hex format."
            },
            "type": {
                "type": "string",
                "minLength": 3,
                "maxLength": 3,
                "description": "Type of sent file."
            },
        },
        "required": ["file", "type"]
    }
