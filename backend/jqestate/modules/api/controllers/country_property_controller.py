from flask import current_app, jsonify, request, abort

from .. import util
from ..models import GetCountryProperty
from ..mappers import DbCountryProperty_to_ResCountryProperty, PostPutCountryProperty_to_DbCountryProperty

from ...database.models import CountryProperty as DbCountryPropertyModel


def get_contry_property(id):  # noqa: E501
    """Return property with same id in same country

     # noqa: E501

    :param id: Parameter description in CommonMark or HTML.
    :type id: int

    :rtype: str
    """
    country_property: DbCountryPropertyModel = current_app.models.CountryProperty.query.get_or_404(id)

    return jsonify(DbCountryProperty_to_ResCountryProperty(country_property))


def create_country_property():  # noqa: E501
    """Create new country property

    :rtype: str
    """
    from jqestate.modules.api.models import PostPutCountryProperty

    if not request.is_json: abort(400)

    post_put_country_property = PostPutCountryProperty.from_dict(request.get_json())
    country_property = PostPutCountryProperty_to_DbCountryProperty(post_put_country_property)

    current_app.db.session.add(country_property)
    current_app.db.session.commit()

    country_property = current_app.db.session.merge(country_property)  # Усталавнливаем relationships
    return jsonify(DbCountryProperty_to_ResCountryProperty(country_property))


def update_country_property(id):  # noqa: E501
    """Update country property

    :rtype: str
    """
    from jqestate.modules.api.models import PostPutCountryProperty

    if not request.is_json: abort(400)

    post_put_country_property = PostPutCountryProperty.from_dict(request.get_json())
    country_property = PostPutCountryProperty_to_DbCountryProperty(post_put_country_property, id)

    country_property = current_app.db.session.merge(country_property)
    current_app.db.session.commit()

    return jsonify(DbCountryProperty_to_ResCountryProperty(country_property))


def delete_country_property(id):
    """Delete country property

    :rtype: str
    """
    country_property = current_app.models.CountryProperty.query.get_or_404(id)
    country_property.state = 'deleted'

    current_app.db.session.commit()

    return jsonify(DbCountryProperty_to_ResCountryProperty(country_property))
