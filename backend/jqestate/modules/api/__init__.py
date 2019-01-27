# encoding: utf-8
"""
Api
=======
Module enable registering endpoints
"""
from flask import Flask, Blueprint, request as req

from .encoder import JSONEncoder
from .controllers.country_properties_controller import get_country_properties
from .controllers.country_property_controller import get_contry_property
from .util import bounds


def init_app(app: Flask, **kwargs):
    api = Blueprint('rest_api', __name__, url_prefix='/v1')
    api.json_encoder = JSONEncoder

    api.add_url_rule(
        '/properties/country', None,
        lambda: get_country_properties(
            bounds(0, 100, int(req.args.get('pagination[limit]', 32))),
            int(req.args.get('pagination[offset]', 0)))
    )
    api.add_url_rule(
        '/properties/country/<int:id>', None, get_contry_property
    )

    app.register_blueprint(api)
