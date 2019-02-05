import datetime
from flask import json

from decimal import Decimal

from .models.base_model_ import Model


class FlaskJSONEncoder(json.JSONEncoder):
    def __init__(self, *args, **kwargs):
        kwargs['ensure_ascii'] = False
        super().__init__(*args, **kwargs)

    def default(self, o):
        if isinstance(o, datetime.datetime):
            if o.tzinfo:
                # eg: '2015-09-25T23:14:42.588601+00:00'
                return o.isoformat('T')
            else:
                # No timezone present - assume UTC.
                # eg: '2015-09-25T23:14:42.588601Z'
                return o.isoformat('T') + 'Z'

        if isinstance(o, datetime.date):
            return o.isoformat()

        if isinstance(o, Decimal):
            return float(o)

        return super().default(o)


class JqestateJSONEncoder(FlaskJSONEncoder):
    def default(self, o):
        return {key: getattr(o, attr_name) for attr_name, key in o.attribute_map.items()} \
            if isinstance(o, Model) else super().default(o)
