from typing import List

from flask import current_app, jsonify

from .. import util
from ..mappers import DbCountryModel_to_Country, DbRegionModel_to_Region, DbDistrictModel_to_District, \
    DdLocalityModel_to_Locality, DdLocalityModel_to_SubLocality, DbRouteModel_to_Route

from ...database.models import Country as DbCountryModel
from ...database.models import Region as DbRegionModel
from ...database.models import District as DbDistrictModel
from ...database.models import Locality as DbLocalityModel
from ...database.models import SubLocality as DbSubLocalityModel
from ...database.models import Route as DbRouteModel


def get_countries(limit=None, offset=None):  # noqa: E501
    """Return countries

     # noqa: E501

    :param limit: Maximum number of items to return.
    :type limit: int
    :param offset: Number of items to skip before returning the results.
    :type offset: int

    :rtype: str
    """
    count_countries = current_app.models.Country.query.count()

    countries: List[DbCountryModel] = current_app.models.Country.query.limit(limit).offset(offset)

    return jsonify(util.with_pagination(
        map(DbCountryModel_to_Country, countries), count_countries, limit, offset))


def get_regions(limit=None, offset=None):  # noqa: E501
    """Return regions

     # noqa: E501

    :param limit: Maximum number of items to return.
    :type limit: int
    :param offset: Number of items to skip before returning the results.
    :type offset: int

    :rtype: str
    """
    count_regions = current_app.models.Region.query.count()

    regions: List[DbRegionModel] = current_app.models.Region.query.limit(limit).offset(offset)

    return jsonify(util.with_pagination(
        map(DbRegionModel_to_Region, regions), count_regions, limit, offset))


def get_districts(limit=None, offset=None):  # noqa: E501
    """Return districts

     # noqa: E501

    :param limit: Maximum number of items to return.
    :type limit: int
    :param offset: Number of items to skip before returning the results.
    :type offset: int

    :rtype: str
    """
    count_districts = current_app.models.District.query.count()

    districts: List[DbDistrictModel] = current_app.models.District.query.limit(limit).offset(offset)

    return jsonify(util.with_pagination(
        map(DbDistrictModel_to_District, districts), count_districts, limit, offset))


def get_localities(limit=None, offset=None):  # noqa: E501
    """Return localities

     # noqa: E501

    :param limit: Maximum number of items to return.
    :type limit: int
    :param offset: Number of items to skip before returning the results.
    :type offset: int

    :rtype: str
    """
    count_localities = current_app.models.Locality.query.count()

    localities: List[DbLocalityModel] = current_app.models.Locality.query.limit(limit).offset(offset)

    return jsonify(util.with_pagination(
        map(DdLocalityModel_to_Locality, localities), count_localities, limit, offset))


def get_sub_localities(limit=None, offset=None):  # noqa: E501
    """Return sub_localities

     # noqa: E501

    :param limit: Maximum number of items to return.
    :type limit: int
    :param offset: Number of items to skip before returning the results.
    :type offset: int

    :rtype: str
    """
    count_sub_localities = current_app.models.SubLocality.query.count()

    sub_localities: List[DbSubLocalityModel] = current_app.models.SubLocality.query.limit(limit).offset(offset)

    return jsonify(util.with_pagination(
        map(DdLocalityModel_to_SubLocality, sub_localities), count_sub_localities, limit, offset))


def get_routes(limit=None, offset=None):  # noqa: E501
    """Return routes

     # noqa: E501

    :param limit: Maximum number of items to return.
    :type limit: int
    :param offset: Number of items to skip before returning the results.
    :type offset: int

    :rtype: str
    """
    count_routes = current_app.models.Route.query.count()

    routes: List[DbRouteModel] = current_app.models.Route.query.limit(limit).offset(offset)

    return jsonify(util.with_pagination(
        map(DbRouteModel_to_Route, routes), count_routes, limit, offset))
