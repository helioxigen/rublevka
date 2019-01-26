# encoding: utf-8
"""
Api
=======
Module enable registering endpoints
"""
from flask import Flask, Blueprint, request as req

from .encoder import JSONEncoder
from .controllers.country_properties_controller import get_country_properties


def init_app(app: Flask, **kwargs):
    api = Blueprint('rest_api', __name__, url_prefix='/v1')
    api.json_encoder = JSONEncoder

    api.add_url_rule(
        '/properties/country', None,
        lambda: get_country_properties(max(0, min(100,
                                                  int(req.args.get('pagination[limit]', 32)))),
                                                  int(req.args.get('pagination[offset]', 0)))
    )

    app.register_blueprint(api)
