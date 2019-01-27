def DbCountryProperty_to_ResCountryProperty(property):
    from .models import CountryProperty as ResCountryProperty, Communication, Location, Specification, RentOffer, \
        SaleOffer, CountryPropertyAdditionalDetails, CountryPropertyStateDetails, CountryPropertyResponsibleUser, \
        CountryPropertyLandDetails
    return ResCountryProperty(
        id=property.id,
        created_by_user_id=property.created_by_user_id,
        created_at=property.created_at,
        updated_at=property.updated_at,
        communication=Communication(
            sewerage_supply=property.c_sewerage_supply,
            gas_supply=property.c_gas_supply,
            power_supply=property.c_power_supply,
            water_supply=property.c_water_supply,
        ),
        location=Location(
            latitude=property.l_latitude,
            longitude=property.l_longitude,
            country_id=property.l_country_id,
            country_name=property.l_country.name \
                if property.l_country_id is not None else None,
            district_id=property.l_district_id,
            district_name=property.l_district.name \
                if property.l_district_id is not None else None,
            locality_id=property.l_locality_id,
            locality_name=property.l_locality.name \
                if property.l_locality_id is not None else None,
            settlement_id=property.l_settlement_id,
            settlement_name=property.l_settlement.name \
                if property.l_settlement_id is not None else None,
            route_id=property.l_route_id,
            route_name=property.l_route.name \
                if property.l_route_id is not None else None,
            region_id=property.l_region_id,
            region_name=property.l_region.name \
                if property.l_region_id is not None else None,
            street=property.l_street,
            house=property.l_house,
            mkad_distance=property.l_settlement.l_mkad_distance \
                if property.l_settlement is not None else None
        ),
        specification=Specification(
            loggias=property.s_loggias,
            bedrooms=property.s_bedrooms,
            area=property.s_area,
            elevators=property.s_elevators,
            balconies=property.s_balconies,
            roof_material=property.s_roof_material,
            legacy_layouts=property.s_legacy_layouts,
            renovate=property.s_renovate,
            layouts=property.s_layouts,
            wcs=property.s_wcs,
            rooms=property.s_rooms,
            ceiling_height=property.s_ceiling_height,
            with_ventilation=property.s_with_ventilation,
            wall_material=property.s_wall_material,
            condition=property.s_condition,
            floors=property.s_floors,
            furniture=property.s_furniture,
            built_year=property.s_built_year,
            spaces=property.s_spaces,
            with_conditioning=property.s_with_conditioning
        ),
        external_id=property.external_id,
        rent_offer=RentOffer(
            price=property.ro_price,
            price_delta=property.ro_price_delta,
            agent_fee=property.ro_agent_fee,
            agent_fixed_price=property.ro_agent_fixed_price,
            # multi_currency_price=,
            currency=property.ro_currency,
            is_allowed_children=property.ro_is_allowed_children,
            is_allowed_pets=property.ro_is_allowed_pets,
            is_disabled=property.ro_is_disabled,
            deposit=property.ro_deposit,
            period=property.ro_period
        ),
        sale_offer=SaleOffer(
            price=property.so_price,
            price_delta=property.so_price_delta,
            agent_fixed_price=property.so_agent_fixed_price,
            agent_fee=property.so_agent_fee,
            kind=property.so_kind,
            # multi_currency_price=,
            is_bargain=property.so_is_bargain,
            is_resale=property.so_is_resale,
            is_disabled=property.so_is_disabled,
            is_mortgage=property.so_is_mortgage,
            is_installment=property.so_is_installment,
            currency=property.so_currency
        ),
        state=property.state,
        client_lead_id=property.client_lead_id,
        linked_contact_ids=property.linked_contact_ids,
        additional_details=CountryPropertyAdditionalDetails(
            garage_area=property.ad_garage_area,
            parking_area=property.ad_parking_area,
            bathhouse_area=property.ad_bathhouse_area,
            staff_house_area=property.ad_staff_house_area,
            spa_area=property.ad_spa_area,
            security_house_area=property.ad_security_house_area,
            guest_house_area=property.ad_guest_house_area
        ),
        state_details=CountryPropertyStateDetails(
            reason=property.sd_reason
        ),
        responsible_user=CountryPropertyResponsibleUser(
            id=property.responsible_user.id,
            department_id=property.responsible_user.department_id,
            division_id=property.responsible_user.division_id
        ),
        removal_order_id=property.removal_order_id,
        updated_by_user_id=property.updated_by_user_id,
        badge=property.badge_id,
        category=property.category,
        equipment=property.equipment,
        kind=property.kind,
        images=property.images,
        layout_images=property.layout_images,
        land_details=CountryPropertyLandDetails(
            area=property.ld_area,
            landscape_kind=property.ld_landscape_kind,
            landscaping=property.ld_landscaping,
        )
    )
