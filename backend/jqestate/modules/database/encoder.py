import datetime
from flask import json
from functools import partial

from decimal import Decimal


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


class DbJSONEncoder(FlaskJSONEncoder):
    include_nulls = True

    def default(self, o):
        return {key: getattr(o, attr_name) for attr_name, key in o.attribute_map.items()} \
            if all(map(partial(hasattr, o), ['to_dict', 'openapi_types', 'attribute_map'])) \
            else super().default(o)
