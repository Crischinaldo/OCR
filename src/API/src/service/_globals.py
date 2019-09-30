labels = [
    'central-zener-1',
    'central-zener-2',
    'diodes-zener',
    'mcc-zener',
    'rohm-zener-1',
    'rohm-zehner-2',
    'sharp-led-1',
    'sharp-led-2',
    'taiwan-schottky-1',
    'taiwan-shottky-2',
    'taiwan-switching',
    'taiwain-zener',
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
