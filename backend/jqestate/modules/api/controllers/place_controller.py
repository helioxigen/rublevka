from flask import current_app, jsonify

from ..mappers import DbCountryModel_to_Country, DbRegionModel_to_Region, DbDistrictModel_to_District, \
    DdLocalityModel_to_Locality, DdLocalityModel_to_SubLocality, DbRouteModel_to_Route


def get_country(id):  # noqa: E501
    """Return countries

     # noqa: E501

    :param id: Id of country
    :type id: int

    :rtype: str
    """
    return jsonify(DbCountryModel_to_Country(current_app.models.Country.query.get_or_404(id)))


def get_region(id):  # noqa: E501
    """Return regions

     # noqa: E501

    :param id: Id of region
    :type id: int

    :rtype: Region
    """
    return jsonify(DbRegionModel_to_Region(current_app.models.Region.query.get_or_404(id)))


def get_district(id):  # noqa: E501
    """Return districts

     # noqa: E501

    :param id: Id of district
    :type id: int

    :rtype: District
    """
    return jsonify(DbDistrictModel_to_District(current_app.models.District.query.get_or_404(id)))


def get_locality(id):  # noqa: E501
    """Return localities

     # noqa: E501

    :param id: Id of locality
    :type id: int

    :rtype: Locality
    """
    return jsonify(DdLocalityModel_to_Locality(current_app.models.Locality.query.get_or_404(id)))


def get_sub_locality(id):  # noqa: E501
    """Return sub_localities

     # noqa: E501

    :param id: Id of sub locality
    :type id: int

    :rtype: Locality
    """
    return jsonify(DdLocalityModel_to_SubLocality(current_app.models.SubLocality.query.get_or_404(id)))


def get_route(id):  # noqa: E501
    """Return routes

     # noqa: E501

    :param id: Id of routes
    :type id: int

    :rtype: Route
    """
    return jsonify(DbRouteModel_to_Route(current_app.models.Route.query.get_or_404(id)))
