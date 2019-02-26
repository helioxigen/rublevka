# encoding: utf-8
"""
Api
=======
Module enable registering endpoints
"""
from flask import Flask, Blueprint, request as req

from .controllers.country_properties_controller import get_country_properties
from .controllers.country_property_controller import \
    get_contry_property, \
    create_country_property, \
    update_country_property, \
    delete_country_property
from .controllers.places_controller import get_countries, get_districts, \
    get_localities, get_sub_localities, get_regions, get_routes
from .controllers.place_controller import get_country, get_district, \
    get_locality, get_sub_locality, get_region, get_route
from .util import bounds


def call_with_limit_and_offset(callable):
    limit = max(0, min(100, int(req.args.get('pagination[limit]', 32))))
    offset = int(req.args.get('pagination[offset]', 0))
    return callable(limit, offset)


def registering_json_encoder(app):
    from .encoder import JqestateJSONEncoder
    app.json_encoder = JqestateJSONEncoder


def init_app(app: Flask, **kwargs):
    if not hasattr(app, 'db'):
        from jqestate.exceptions import DependencyException
        raise DependencyException("Module database not loaded yet. Please load it before loading api")

    api = Blueprint('rest_api', __name__, url_prefix='/v1')
    registering_json_encoder(api)

    api.add_url_rule(
        '/properties/country', 'get_country_properties',
        lambda: call_with_limit_and_offset(get_country_properties)
    )

    api.add_url_rule(
        '/properties/country', None,
        create_country_property, methods=['POST']
    )

    api.add_url_rule(
        '/properties/country/<int:id>', None,
        get_contry_property
    )

    api.add_url_rule(
        '/properties/country/<int:id>', None,
        update_country_property, methods=['PUT']
    )

    api.add_url_rule(
        '/properties/country/<int:id>', None,
        delete_country_property, methods=['DELETE']
    )

    api.add_url_rule(
        '/places/countries', 'get_countries',
        lambda: call_with_limit_and_offset(get_countries)
    )

    api.add_url_rule(
        '/places/countries/<id>', None,
        get_country
    )

    api.add_url_rule(
        '/places/regions', 'get_regions',
        lambda: call_with_limit_and_offset(get_regions)
    )

    api.add_url_rule(
        '/places/regions/<id>', None,
        get_region
    )

    api.add_url_rule(
        '/places/districts', 'get_districts',
        lambda: call_with_limit_and_offset(get_districts)
    )

    api.add_url_rule(
        '/places/districts/<id>', None,
        get_district
    )

    api.add_url_rule(
        '/places/localities', 'get_localities',
        lambda: call_with_limit_and_offset(get_localities)
    )

    api.add_url_rule(
        '/places/localities/<id>', None,
        get_locality
    )

    api.add_url_rule(
        '/places/sub_localities', 'get_sub_localities',
        lambda: call_with_limit_and_offset(get_sub_localities)
    )

    api.add_url_rule(
        '/places/sub_localities/<id>', None,
        get_sub_locality
    )

    api.add_url_rule(
        '/places/routes', 'get_routes',
        lambda: call_with_limit_and_offset(get_routes)
    )

    api.add_url_rule(
        '/places/routes/<id>', None,
        get_route
    )

    app.register_blueprint(api)
