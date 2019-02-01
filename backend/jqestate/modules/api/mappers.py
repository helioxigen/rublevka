from datetime import datetime

from flask import current_app
from jqestate.modules.api.models import PostPutCountryProperty


def DbCountryProperty_to_ResCountryProperty(item):
    from .models import GetCountryProperty as ResCountryProperty, Communication, Location, Specification, RentOffer, \
        SaleOffer, GetCountryPropertyAdditionalDetails, GetCountryPropertyStateDetails, StaffUser, \
        GetCountryPropertyLandDetails
    return ResCountryProperty(
        id=item.id,
        created_by_user_id=item.created_by_user_id,
        created_at=item.created_at,
        updated_at=item.updated_at,
        communication=Communication(
            sewerage_supply=item.c_sewerage_supply,
            gas_supply=item.c_gas_supply,
            power_supply=item.c_power_supply,
            water_supply=item.c_water_supply,
        ),
        location=Location(
            latitude=item.l_latitude,
            longitude=item.l_longitude,
            country_id=item.l_country_id,
            country_name=item.l_country.name \
                if item.l_country_id is not None else None,
            district_id=item.l_district_id,
            district_name=item.l_district.name \
                if item.l_district_id is not None else None,
            locality_id=item.l_locality_id,
            locality_name=item.l_locality.name \
                if item.l_locality_id is not None else None,
            route_id=item.l_route_id,
            route_name=item.l_route.name \
                if item.l_route_id is not None else None,
            region_id=item.l_region_id,
            region_name=item.l_region.name \
                if item.l_region_id is not None else None,
            street=item.l_street,
            house=item.l_house,
            settlement_id=item.l_settlement_id,
            settlement_name=item.l_settlement.name \
                if item.l_settlement_id is not None else None,
            mkad_distance=item.l_settlement.l_mkad_distance \
                if item.l_settlement is not None else None
        ),
        specification=Specification(
            loggias=item.s_loggias,
            bedrooms=item.s_bedrooms,
            area=item.s_area,
            elevators=item.s_elevators,
            balconies=item.s_balconies,
            roof_material=item.s_roof_material,
            legacy_layouts=item.s_legacy_layouts,
            renovate=item.s_renovate,
            layouts=item.s_layouts,
            wcs=item.s_wcs,
            rooms=item.s_rooms,
            ceiling_height=item.s_ceiling_height,
            with_ventilation=item.s_with_ventilation,
            wall_material=item.s_wall_material,
            condition=item.s_condition,
            floors=item.s_floors,
            furniture=item.s_furniture,
            built_year=item.s_built_year,
            spaces=item.s_spaces,
            with_conditioning=item.s_with_conditioning
        ),
        external_id=item.external_id,
        rent_offer=RentOffer(
            price=item.ro_price,
            price_delta=item.ro_price_delta,
            agent_fee=item.ro_agent_fee,
            agent_fixed_price=item.ro_agent_fixed_price,
            # multi_currency_price=,
            currency=item.ro_currency,
            is_allowed_children=item.ro_is_allowed_children,
            is_allowed_pets=item.ro_is_allowed_pets,
            is_disabled=item.ro_is_disabled,
            deposit=item.ro_deposit,
            period=item.ro_period
        ),
        sale_offer=SaleOffer(
            price=item.so_price,
            price_delta=item.so_price_delta,
            agent_fixed_price=item.so_agent_fixed_price,
            agent_fee=item.so_agent_fee,
            kind=item.so_kind,
            # multi_currency_price=,
            is_bargain=item.so_is_bargain,
            is_resale=item.so_is_resale,
            is_disabled=item.so_is_disabled,
            is_mortgage=item.so_is_mortgage,
            is_installment=item.so_is_installment,
            currency=item.so_currency
        ),
        state=item.state,
        client_lead_id=item.client_lead_id,
        linked_contact_ids=item.linked_contact_ids,
        additional_details=GetCountryPropertyAdditionalDetails(
            garage_area=item.ad_garage_area,
            parking_area=item.ad_parking_area,
            bathhouse_area=item.ad_bathhouse_area,
            staff_house_area=item.ad_staff_house_area,
            spa_area=item.ad_spa_area,
            security_house_area=item.ad_security_house_area,
            guest_house_area=item.ad_guest_house_area
        ),
        state_details=GetCountryPropertyStateDetails(
            reason=item.sd_reason
        ),
        responsible_user=StaffUser(
            id=item.ru_id,
            department_id=item.ru_department_id,
            division_id=item.ru_division_id
        ),
        removal_order_id=item.removal_order_id,
        updated_by_user_id=item.updated_by_user_id,
        badge=item.badge_id,
        category=item.category,
        equipment=item.equipment,
        kind=item.kind,
        images=item.images,
        layout_images=item.layout_images,
        land_details=GetCountryPropertyLandDetails(
            area=item.ld_area,
            landscape_kind=item.ld_landscape_kind,
            landscaping=item.ld_landscaping,
        )
    )


def PostPutCountryProperty_to_DbCountryProperty(item: PostPutCountryProperty, id=None):
    from ..database.models import CountryProperty as DbCountryProperty
    model = DbCountryProperty(
        id=None,
        created_by_user_id=item.created_by_user_id,
        created_at=item.created_at or datetime.now(),
        updated_at=item.updated_at or datetime.now(),

        c_sewerage_supply=item.communication.sewerage_supply,
        c_gas_supply=item.communication.gas_supply,
        c_power_supply=item.communication.power_supply,
        c_water_supply=item.communication.water_supply,

        l_latitude=item.location.latitude,
        l_longitude=item.location.longitude,
        l_settlement_id=item.location.settlement_id,
        l_street=item.location.street,
        l_house=item.location.house,

        s_loggias=item.specification.loggias,
        s_bedrooms=item.specification.bedrooms,
        s_area=item.specification.area,
        s_elevators=item.specification.elevators,
        s_balconies=item.specification.balconies,
        s_roof_material=item.specification.roof_material,
        s_legacy_layouts=item.specification.legacy_layouts,
        s_renovate=item.specification.renovate,
        s_layouts=item.specification.layouts.to_dict(),
        s_wcs=item.specification.wcs,
        s_rooms=item.specification.rooms,
        s_ceiling_height=item.specification.ceiling_height,
        s_with_ventilation=item.specification.with_ventilation,
        s_wall_material=item.specification.wall_material,
        s_condition=item.specification.condition,
        s_floors=item.specification.floors,
        s_furniture=item.specification.furniture,
        s_built_year=item.specification.built_year,
        s_spaces=item.specification.spaces,
        s_with_conditioning=item.specification.with_conditioning,

        external_id=item.external_id,

        ro_price=item.rent_offer.price,
        ro_price_delta=item.rent_offer.price_delta,
        ro_agent_fee=item.rent_offer.agent_fee,
        ro_agent_fixed_price=item.rent_offer.agent_fixed_price,
        ro_currency=item.rent_offer.currency,
        ro_is_allowed_children=item.rent_offer.is_allowed_children,
        ro_is_allowed_pets=item.rent_offer.is_allowed_pets,
        ro_is_disabled=item.rent_offer.is_disabled,
        ro_deposit=item.rent_offer.deposit,
        ro_period=item.rent_offer.period,

        so_price=item.sale_offer.price,
        so_price_delta=item.sale_offer.price_delta,
        so_agent_fixed_price=item.sale_offer.agent_fixed_price,
        so_agent_fee=item.sale_offer.agent_fee,
        so_kind=item.sale_offer.kind,
        so_is_bargain=item.sale_offer.is_bargain,
        so_is_resale=item.sale_offer.is_resale,
        so_is_disabled=item.sale_offer.is_disabled,
        so_is_mortgage=item.sale_offer.is_mortgage,
        so_is_installment=item.sale_offer.is_installment,
        so_currency=item.sale_offer.currency,

        state=item.state,
        client_lead_id=item.client_lead_id,
        linked_contact_ids=item.linked_contact_ids,

        ad_garage_area=item.additional_details.garage_area,
        ad_parking_area=item.additional_details.parking_area,
        ad_bathhouse_area=item.additional_details.bathhouse_area,
        ad_staff_house_area=item.additional_details.staff_house_area,
        ad_spa_area=item.additional_details.spa_area,
        ad_security_house_area=item.additional_details.security_house_area,
        ad_guest_house_area=item.additional_details.guest_house_area,

        sd_reason=item.state_details.reason,

        ru_id=item.responsible_user.id,
        ru_department_id=item.responsible_user.department_id,
        ru_division_id=item.responsible_user.division_id,

        removal_order_id=item.removal_order_id,
        updated_by_user_id=item.updated_by_user_id,
        badge_id=item.badge,
        category=item.category,
        equipment=item.equipment,
        kind=item.kind,
        images=item.images,
        layout_images=item.layout_images,
        ld_area=item.land_details.area,
        ld_landscape_kind=item.land_details.landscape_kind,
        ld_landscaping=item.land_details.landscaping
    )
    settlement = current_app.models.Settlement.query.get(model.l_settlement_id)

    if settlement is None:
        raise ValueError("settlement was not found")

    model.l_country_id = settlement.l_country_id,
    model.l_district_id = settlement.l_district_id,
    model.l_locality_id = settlement.l_locality_id,
    model.l_region_id = settlement.l_region_id,
    model.l_route_id = settlement.l_route_id
    return model


def DbCountryModel_to_Country(item):
    from .models.country import Country
    return Country(
        id=item.id,
        name=item.name,
        property_categories=item.property_categories,
        aliases=item.aliases,
        created_at=item.created_at,
        updated_at=item.updated_at
    )


def DbRegionModel_to_Region(item):
    from .models.region import Region, RegionLocation
    return Region(
        id=item.id,
        name=item.name,
        kind_name=item.kind_name,
        property_categories=item.property_categories,
        aliases=item.aliases,
        location=RegionLocation(
            country_id=item.country_id,
            country_name=item.country.name \
                if item.country_id else None,
        ),
        created_at=item.created_at,
        updated_at=item.updated_at
    )


def DbDistrictModel_to_District(item):
    from .models.district import District, DistrictLocation
    return District(
        id=item.id,
        name=item.name,
        kind_name=item.kind_name,
        property_categories=item.property_categories,
        aliases=item.aliases,
        location=DistrictLocation(
            country_id=item.country_id,
            country_name=item.country.name \
                if item.country_id else None,
            region_id=item.region_id,
            region_name=item.region.name \
                if item.country_id else None
        ),
        created_at=item.created_at,
        updated_at=item.updated_at
    )


def DdLocalityModel_to_Locality(item):
    from .models.locality import Locality, LocalityLocation
    return Locality(
        id=item.id,
        name=item.name,
        kind_name=item.kind_name,
        property_categories=item.property_categories,
        aliases=item.aliases,
        location=LocalityLocation(
            country_id=item.country_id,
            country_name=item.country.name \
                if item.country_id else None,
            region_id=item.region_id,
            region_name=item.region.name \
                if item.region_id else None,
            district_id=item.district_id,
            district_name=item.district.name \
                if item.district_id else None,
            route_id=item.route_id,
            route_name=item.route.name \
                if item.route_id else None
        ),
        created_at=item.created_at,
        updated_at=item.updated_at
    )


def DdLocalityModel_to_SubLocality(item):
    from .models.sub_locality import SubLocality, SubLocalityLocation
    return SubLocality(
        id=item.id,
        name=item.name,
        kind_name=item.kind_name,
        property_categories=item.property_categories,
        aliases=item.aliases,
        location=SubLocalityLocation(
            country_id=item.country_id,
            country_name=item.country.name \
                if item.country_id else None,
            region_id=item.region_id,
            region_name=item.region.name \
                if item.region_id else None,
            district_id=item.district_id,
            district_name=item.district.name \
                if item.district_id else None,
            locality_id=item.locality_id,
            locality_name=item.locality.name \
                if item.locality_id else None
        ),
        created_at=item.created_at,
        updated_at=item.updated_at
    )


def DbRouteModel_to_Route(item):
    from .models.route import Route, RegionLocation
    return Route(
        id=item.id,
        name=item.name,
        kind_name=item.kind_name,
        property_categories=item.property_categories,
        aliases=item.aliases,
        location=RegionLocation(
            country_id=item.country_id,
            country_name=item.country.name \
                if item.country_id else None,
            region_id=item.region_id,
            region_name=item.region.name \
                if item.region_id else None
        ),
        created_at=item.created_at,
        updated_at=item.updated_at
    )
