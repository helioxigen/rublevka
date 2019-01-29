def DbCountryProperty_to_ResCountryProperty(item):
    from .models import CountryProperty as ResCountryProperty, Communication, Location, Specification, RentOffer, \
        SaleOffer, CountryPropertyAdditionalDetails, CountryPropertyStateDetails, StaffUser, \
        CountryPropertyLandDetails
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
            settlement_id=item.l_settlement_id,
            settlement_name=item.l_settlement.name \
                if item.l_settlement_id is not None else None,
            route_id=item.l_route_id,
            route_name=item.l_route.name \
                if item.l_route_id is not None else None,
            region_id=item.l_region_id,
            region_name=item.l_region.name \
                if item.l_region_id is not None else None,
            street=item.l_street,
            house=item.l_house,
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
        additional_details=CountryPropertyAdditionalDetails(
            garage_area=item.ad_garage_area,
            parking_area=item.ad_parking_area,
            bathhouse_area=item.ad_bathhouse_area,
            staff_house_area=item.ad_staff_house_area,
            spa_area=item.ad_spa_area,
            security_house_area=item.ad_security_house_area,
            guest_house_area=item.ad_guest_house_area
        ),
        state_details=CountryPropertyStateDetails(
            reason=item.sd_reason
        ),
        responsible_user=StaffUser(
            id=item.responsible_user.id,
            department_id=item.responsible_user.department_id,
            division_id=item.responsible_user.division_id
        ),
        removal_order_id=item.removal_order_id,
        updated_by_user_id=item.updated_by_user_id,
        badge=item.badge_id,
        category=item.category,
        equipment=item.equipment,
        kind=item.kind,
        images=item.images,
        layout_images=item.layout_images,
        land_details=CountryPropertyLandDetails(
            area=item.ld_area,
            landscape_kind=item.ld_landscape_kind,
            landscaping=item.ld_landscaping,
        )
    )


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
