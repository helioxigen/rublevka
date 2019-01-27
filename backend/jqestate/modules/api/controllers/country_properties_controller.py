from typing import List

from flask import current_app, jsonify

from .. import util
from ..models import InlineResponse200, Pagination
from ..mappers import DbCountryProperty_to_ResCountryProperty

from ...database.models import CountryProperty as DbCountryPropertyModel


def get_country_properties(limit=32, offset=0):  # noqa: E501
    """Return houses in same country

     # noqa: E501

    :param limit: The numbers of items to return
    :type limit: int
    :param offset: The number of items to skip before starting to collect the result set
    :type offset: int

    :rtype: InlineResponse200
    """
    count = current_app.models.CountryProperty.query.count()

    countries_properties: List[DbCountryPropertyModel] = current_app.models.CountryProperty \
        .query.limit(limit).offset(offset).all()

    return jsonify(InlineResponse200(
        list(map(DbCountryProperty_to_ResCountryProperty, countries_properties)),
        Pagination(
            total=count,
            limit=limit,
            offset=offset
        )
    ))
