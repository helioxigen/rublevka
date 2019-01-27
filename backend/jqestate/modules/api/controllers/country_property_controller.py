from flask import current_app, jsonify

from .. import util
from ..models import InlineResponse200
from ..mappers import DbCountryProperty_to_ResCountryProperty

from ...database.models import CountryProperty as DbCountryPropertyModel


def get_contry_property(id):  # noqa: E501
    """Return property with same id in same country

     # noqa: E501

    :param id: Parameter description in CommonMark or HTML.
    :type id: int

    :rtype: InlineResponse200
    """
    country_property: DbCountryPropertyModel = current_app.models.CountryProperty.query.get_or_404(
        id)

    return jsonify(DbCountryProperty_to_ResCountryProperty(country_property))
