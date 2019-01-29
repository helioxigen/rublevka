from sqlalchemy import Column, Index, ForeignKey, ARRAY, BigInteger, Boolean, CheckConstraint, Date, DateTime, Float, \
    ForeignKeyConstraint, Integer, LargeBinary, SmallInteger, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import ENUM, JSON, UUID, VARCHAR, HSTORE
from sqlalchemy.schema import FetchedValue
from sqlalchemy.orm import relationship

from sqlalchemy.sql.sqltypes import NullType

from .core import db
from .types import ArrayForEnum, ArrayForCIText, CIText


class Application(db.Model):
    __tablename__ = 'applications'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(String(255), nullable=False, unique=True)
    token = Column(String(255), nullable=False, unique=True)
    state = Column(ENUM('disabled', 'enabled', name='status_state'), nullable=False)

    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())

    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    created_by_user = relationship('StaffUser', foreign_keys=created_by_user_id, backref='applications_created_by_user')

    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    updated_by_user = relationship('StaffUser', foreign_keys=updated_by_user_id, backref='applications_updated_by_user')

    responsible_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    responsible_user = relationship('StaffUser', foreign_keys=responsible_user_id, backref='my_applications')

    role_id = Column(ForeignKey('roles.id'))
    role = relationship('Role', backref='applications')


class CianSubway(db.Model):
    __tablename__ = 'cian_subways'

    id = Column(Integer, primary_key=True)
    subway_id = Column(ForeignKey('subways.id'), nullable=False)

    subway = relationship('Subway', backref='cian_subways')


class CityProperty(db.Model):
    __tablename__ = 'city_properties'
    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    ru_id = Column(Integer, nullable=False)
    state = Column(
        ENUM('draft', 'public', 'postponed', 'sold', 'rented', 'private', 'deleted', name='property_state'),
        nullable=False)
    kind = Column(
        ENUM('flat', 'room', 'house', 'land', 'office', 'warehouse', 'townhouse', 'apartment', 'private',
             'penthouse', 'commercial_space', name='property_kind'))
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())

    created_by_user_id = Column(Integer, nullable=False)
    updated_by_user_id = Column(Integer)

    images = Column(JSON, nullable=False, server_default=FetchedValue())
    client_lead_id = Column(Integer)

    category = Column(ENUM('commercial', 'city', 'country', name='property_category'), nullable=False,
                      server_default=FetchedValue())

    layout_images = Column(JSON, nullable=False, server_default=FetchedValue())
    ro_price = Column(BigInteger)
    ro_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    ro_agent_fee = Column(Float)
    ro_agent_fixed_price = Column(Integer)
    ro_agent_fixed_price_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    ro_deposit = Column(SmallInteger)
    ro_period = Column(ENUM('day', 'month', 'year', name='rent_period'))
    ro_is_allowed_pets = Column(Boolean)
    ro_is_allowed_children = Column(Boolean)

    so_price = Column(BigInteger)
    so_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    so_agent_fee = Column(Float)
    so_agent_fixed_price = Column(Integer)
    so_agent_fixed_price_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    so_kind = Column(ENUM('direct_sell', 'trade_in', 'changing', 'fl214', 'assignment', name='sale_offer_kind'))
    so_is_bargain = Column(Boolean)
    so_is_mortgage = Column(Boolean)
    so_is_installment = Column(Boolean)

    linked_contact_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())
    note = Column(Text)

    ru_department_id = Column(Integer, nullable=False)
    ru_division_id = Column(Integer)

    removal_order_id = Column(Integer)
    sd_reason = Column(Text)
    so_is_resale = Column(Boolean)
    external_id = Column(String(255))
    l_cadastral_number = Column(String(255))
    badge_id = Column(Integer)
    so_price_delta = Column(BigInteger)
    ro_price_delta = Column(BigInteger)
    so_is_disabled = Column(Boolean)
    ro_is_disabled = Column(Boolean)
    equipment = Column(ArrayForEnum(
        ENUM('internet', 'phone', 'tv', 'security_signaling', 'cable_tv', 'washmachine', 'intercom', 'fridge',
             'dishwasher', 'appliances', name='property_equipment')), nullable=False, server_default=FetchedValue())
    complex_building_id = Column(ForeignKey('complex_buildings.id'))
    s_layout = Column(ENUM('open', 'adjacent', 'isolated', name='property_layout'))
    s_ceil_height = Column(Float)
    s_total_area = Column(Float)
    s_living_area = Column(Float)
    s_rooms = Column(SmallInteger)
    s_wcs = Column(SmallInteger)
    s_loggias = Column(Integer)
    s_balconies = Column(Integer)
    s_floor = Column(SmallInteger)
    s_windows = Column(ENUM('both', 'street', 'courtyard', name='property_windows'))
    i_renovate = Column(
        ENUM('design', 'rough_finish', 'full_construction', 'partly_turnkey', 'for_finishing', 'raw',
             name='property_renovate'))
    i_conditioning = Column(ENUM('central', 'own', 'absent', name='property_conditioning'))
    i_condition = Column(ENUM('great', 'good', 'normal', 'bad', name='property_condition'))
    i_furniture = Column(ENUM('full', 'partial', 'absent', name='property_furniture'))
    i_ventilation = Column(ENUM('central', 'own', 'absent', name='property_ventilation'))
    l_country_id = Column(ForeignKey('countries.id'))
    l_region_id = Column(ForeignKey('regions.id'))
    l_locality_id = Column(ForeignKey('localities.id'))
    l_sub_locality_id = Column(ForeignKey('sub_localities.id'))
    l_street = Column(String(255))
    l_house = Column(String(255))
    l_housing = Column(String(255))
    l_building = Column(String(255))
    l_flat_number = Column(SmallInteger)
    l_postal_code = Column(Integer)
    l_kladr_id = Column(BigInteger)
    l_district_id = Column(ForeignKey('districts.id'))
    l_latitude = Column(String(255))
    l_longitude = Column(String(255))
    cbd_house_kind = Column(ENUM('new', 'khrushchevka', 'stalinka', name='complex_building_house_kind'))
    cbd_built_year = Column(SmallInteger)
    cbd_series = Column(String(255))
    cbd_construction_kind = Column(
        ENUM('brick', 'monolith', 'panel', 'brick_monolithic', name='complex_building_construction_kind'))
    cbd_floors = Column(SmallInteger)
    cbd_elevators = Column(SmallInteger)
    cbd_freight_elevators = Column(SmallInteger)
    cbd_parkings = Column(SmallInteger)
    cbd_underground_garages = Column(SmallInteger)
    cbd_security = Column(ENUM('protected_area', 'guarded', name='complex_building_security'))
    cbd_with_rubbish_chute = Column(Boolean)
    s_bedrooms = Column(SmallInteger)
    s_panoramic_glazing = Column(Boolean)
    l_entrance = Column(SmallInteger)
    cbd_with_waste_disposal_room = Column(Boolean)
    cbd_maintenance_costs = Column(BigInteger)
    complex_id = Column(Integer)
    l_subway_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())
    i_bathroom = Column(ENUM('separated', 'combined', name='bathroom'))
    s_kitchen_area = Column(Float)

    complex_building = relationship('ComplexBuilding',
                                    primaryjoin='CityProperty.complex_building_id == ComplexBuilding.id',
                                    backref='city_properties')
    l_country = relationship('Country', primaryjoin='CityProperty.l_country_id == Country.id',
                             backref='city_properties')
    l_district = relationship('District', primaryjoin='CityProperty.l_district_id == District.id',
                              backref='city_properties')
    l_locality = relationship('Locality', primaryjoin='CityProperty.l_locality_id == Locality.id',
                              backref='city_properties')
    l_region = relationship('Region', primaryjoin='CityProperty.l_region_id == Region.id', backref='city_properties')
    l_sub_locality = relationship('SubLocality', primaryjoin='CityProperty.l_sub_locality_id == SubLocality.id',
                                  backref='city_properties')


class ClientLeadSource(db.Model):
    __tablename__ = 'client_lead_sources'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    title = Column(String(255))
    slug = Column(String(255), nullable=False, unique=True)
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())

    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    created_by_user = relationship('StaffUser', foreign_keys=created_by_user_id,
                                   backref='client_lead_sources_created_by_user')

    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    updated_by_user = relationship('StaffUser', foreign_keys=updated_by_user_id,
                                   backref='client_lead_sources_updated_by_user')


class ClientLead(db.Model):
    __tablename__ = 'client_leads'
    __table_args__ = (
        CheckConstraint("cd_kind_dictionary_kind = 'property_contact_link_type'::public.dictionary_kind"),
        ForeignKeyConstraint(['cd_kind_dictionary_id', 'cd_kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind'])
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM('in_progress', 'processed', 'rejected', 'new', 'spam', name='client_lead_state'),
                   nullable=False)
    kind = Column(ENUM('phone_call', 'online', 'recommendation', name='client_lead_kind'), nullable=False)
    note = Column(Text)
    utms = Column(JSON, nullable=False, server_default=FetchedValue())

    request_details = Column(JSON)
    property_id = Column(Integer)

    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())

    cd_first_name = Column(String(255))
    cd_last_name = Column(String(255))
    cd_phone_number = Column(String(255), index=True)
    cd_email = Column(String(255))
    cd_kind_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), server_default=FetchedValue())

    sd_to_approve = Column(ENUM('in_progress', 'processed', 'rejected', 'new', 'spam', name='client_lead_state'))
    sd_changes = Column(JSON, nullable=False, server_default=FetchedValue())
    pcd_status = Column(ENUM('in_progress', 'successful', 'unsuccessful', 'to_do', name='phone_call_status'))
    pcd_duration = Column(Integer)
    pcd_call_recording_url = Column(Text)
    pcd_reason = Column(String(255))
    request_kind = Column(ENUM('selling', 'purchase', name='client_lead_request_kind'))
    rd_property_ids = Column(ARRAY(Integer()), nullable=False, index=True, server_default=FetchedValue())
    search_query = Column(Text)
    ua_client_id = Column(String(255))
    call_session_id = Column(BigInteger, unique=True)
    is_repeated = Column(Boolean, nullable=False)

    contact_id = Column(ForeignKey('contacts.id'))
    contact = relationship('Contact', backref='client_leads')

    cbu_id = Column(ForeignKey('staff_users.id'), nullable=False)
    cbu = relationship('StaffUser', foreign_keys=cbu_id, backref='staffuser_staffuser_client_leads')

    cbu_department_id = Column(ForeignKey('departments.id'), nullable=False)
    cbu_department = relationship('Department', foreign_keys=cbu_department_id, backref='department_client_leads')

    cbu_division_id = Column(ForeignKey('divisions.id'))
    cbu_division = relationship('Division', foreign_keys=cbu_division_id, backref='division_client_leads')

    client_lead_source_id = Column(ForeignKey('client_lead_sources.id'))
    client_lead_source = relationship('ClientLeadSource', backref='client_leads')

    cd_kind_dictionary_id = Column(Integer)
    cd_kind_dictionary = relationship(
        'DictionaryItem', backref='dictionaryitem_client_leads',
        foreign_keys=[cd_kind_dictionary_id, cd_kind_dictionary_kind],
        # primaryjoin='and_(ClientLead.cd_kind_dictionary_id == DictionaryItem.id, ClientLead.cd_kind_dictionary_kind == DictionaryItem.kind)',
    )

    # deal_id = Column(ForeignKey('deals.id'))
    # deal = relationship('Deal', foreign_keys=deal_id, backref='client_leads')

    property_search_order_id = Column(ForeignKey('property_search_orders.id'))
    property_search_order = relationship('PropertySearchOrder', backref='client_leads')

    ru_department_id = Column(ForeignKey('departments.id'), nullable=False, index=True)
    ru_department = relationship('Department', foreign_keys=ru_department_id, backref='lead_clients')

    ru_division_id = Column(ForeignKey('divisions.id'), index=True)
    ru_division = relationship('Division', foreign_keys=ru_division_id, backref='lead_clients')

    ru_id = Column(ForeignKey('staff_users.id'), nullable=False, index=True)
    ru = relationship('StaffUser', foreign_keys=ru_id, backref='staffuser_staffuser_client_leads_0')

    sd_reason_id = Column(ForeignKey('dictionary_items.id'))
    sd_reason = relationship('DictionaryItem', foreign_keys=sd_reason_id, backref='dictionaryitem_client_leads_0')

    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    updated_by_user = relationship('StaffUser', foreign_keys=updated_by_user_id, backref='clients_lead_updated_by_user')


class Comment(db.Model):
    __tablename__ = 'comments'
    __table_args__ = (
        Index('comments_object_id_object_klass_idx', 'object_id', 'object_klass'),
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    text = Column(Text, nullable=False)
    state = Column(ENUM('available', 'deleted', name='comment_state'), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=FetchedValue())

    object_id = Column(Integer)
    object_klass = Column(
        ENUM('client_lead', 'deal', 'city_property', 'country_property', 'images_order', 'property_search_order',
             'property_removal_order', 'task', 'complex', 'complex_building', 'settlement', name='object_klass'))

    parent_id = Column(ForeignKey('comments.id'))
    parent = relationship('Comment', remote_side=[id], backref='comments')

    user_id = Column(ForeignKey('staff_users.id'))
    user = relationship('StaffUser', backref='comments')


class Company(db.Model):
    __tablename__ = 'companies'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)

    inn = Column(String(255), nullable=False)
    kpp = Column(String(255), nullable=False)
    opf = Column(String(255), nullable=False)
    ogrn = Column(String(255), nullable=False)

    address = Column(ARRAY(Text()), nullable=False, server_default=FetchedValue())
    phone_numbers = Column(HSTORE(Text()), nullable=False, server_default=FetchedValue())

    description = Column(Text)

    image = Column(String(255))

    registered_at = Column(Date, nullable=False)
    state = Column(ENUM('active', 'closed', name='company_state'), nullable=False)

    created_at = Column(DateTime(True), nullable=False)
    updated_at = Column(DateTime(True))

    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    created_by_user = relationship('StaffUser', foreign_keys=created_by_user_id, backref='companies_created_by_user')

    responsible_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    responsible_user = relationship('StaffUser', foreign_keys=responsible_user_id, backref='companies_responsible_user')

    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    updated_by_user = relationship('StaffUser', foreign_keys=updated_by_user_id, backref='companies_updated_by_user')


class ComplexBuildingDocument(db.Model):
    __tablename__ = 'complex_building_documents'
    __table_args__ = (
        CheckConstraint("kind_dictionary_kind = 'complex_building_document_type'::public.dictionary_kind"),
        ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind'])
    )

    id = Column(UUID, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM('available', 'deleted', name='document_state'), nullable=False)
    filename = Column(String(255))
    aes_key = Column(LargeBinary, nullable=False)
    iv_bytes = Column(LargeBinary, nullable=False)
    comment = Column(Text)

    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())

    uploader_id = Column(Integer, nullable=False)

    complex_building_id = Column(ForeignKey('complex_buildings.id'), nullable=False)
    complex_building = relationship('ComplexBuilding',
                                    primaryjoin='ComplexBuildingDocument.complex_building_id == ComplexBuilding.id',
                                    backref='complex_building_documents')

    kind_dictionary_id = Column(Integer)
    kind_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    kind_dictionary = relationship('DictionaryItem',
                                   primaryjoin='and_(ComplexBuildingDocument.kind_dictionary_id == DictionaryItem.id, ComplexBuildingDocument.kind_dictionary_kind == DictionaryItem.kind)',
                                   backref='complex_building_documents')


class ComplexBuilding(db.Model):
    __tablename__ = 'complex_buildings'
    __table_args__ = (
        Index('complex_buildings_complex_id_name_idx', 'complex_id', 'name'),
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(String(255))
    built_year = Column(SmallInteger)
    delivery_quarter = Column(ENUM('first', 'second', 'third', 'fourth', name='quarter'))
    stage = Column(SmallInteger)
    floors = Column(SmallInteger)
    parkings = Column(SmallInteger)
    underground_garages = Column(SmallInteger)
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    l_kladr_id = Column(BigInteger)
    house_kind = Column(ENUM('new', 'khrushchevka', 'stalinka', name='complex_building_house_kind'))
    construction_stage = Column(
        ENUM('in_progress', 'not_delivered_yet', 'done', name='complex_building_construction_stage'))
    security = Column(ENUM('protected_area', 'guarded', name='complex_building_security'))
    construction_kind = Column(
        ENUM('brick', 'monolith', 'panel', 'brick_monolithic', name='complex_building_construction_kind'))
    l_house = Column(String(255))
    l_housing = Column(String(255))
    l_building = Column(CIText)
    series = Column(String(255))
    elevators = Column(SmallInteger)
    freight_elevators = Column(SmallInteger)
    state = Column(ENUM('draft', 'public', name='complex_building_state'), nullable=False)
    images = Column(JSON, nullable=False, server_default=FetchedValue())
    l_latitude = Column(String(255))
    l_longitude = Column(String(255))
    pd_so_kind = Column(
        ENUM('direct_sell', 'trade_in', 'changing', 'fl214', 'assignment', name='sale_offer_kind'))
    pd_so_is_bargain = Column(Boolean)
    pd_so_is_installment = Column(Boolean)
    pd_so_is_mortgage = Column(Boolean)
    pd_so_agent_fee = Column(Float)
    pd_so_agent_fixed_price = Column(BigInteger)
    pd_so_agent_fixed_price_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    pds_condition = Column(ENUM('great', 'good', 'normal', 'bad', name='property_condition'))
    pds_renovate = Column(
        ENUM('design', 'rough_finish', 'full_construction', 'partly_turnkey', 'for_finishing', 'raw',
             name='property_renovate'))
    pds_furniture = Column(ENUM('full', 'partial', 'absent', name='property_furniture'))
    pds_conditioning = Column(ENUM('central', 'own', 'absent', name='property_conditioning'))
    pds_ventilation = Column(ENUM('central', 'own', 'absent', name='property_ventilation'))
    ru_department_id = Column(Integer, nullable=False)
    ru_division_id = Column(Integer)
    contract_type = Column(
        ENUM('ddu', 'dvou', 'assignation', 'dkp', 'pdkp', 'investment', name='complex_building_contract_type'))
    architect = Column(String(255))
    with_rubbish_chute = Column(Boolean)
    infrastructure_units = Column(JSON, nullable=False, server_default=FetchedValue())
    s_properties_count = Column(Integer, nullable=False, server_default=FetchedValue())
    s_mcp_from_usd = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_eur = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_rub = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_usd = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_eur = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_rub = Column(BigInteger, nullable=False, server_default=FetchedValue())
    with_waste_disposal_room = Column(Boolean)
    maintenance_costs = Column(BigInteger)
    s_properties_area_from = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_area_to = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_count_primary = Column(Integer, nullable=False, server_default=FetchedValue())
    s_properties_count_resale = Column(Integer, nullable=False, server_default=FetchedValue())
    s_properties_area_from_primary = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_area_to_primary = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_area_from_resale = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_area_to_resale = Column(Float, nullable=False, server_default=FetchedValue())
    s_mcp_from_rub_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_usd_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_eur_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_rub_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_usd_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_eur_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_rub_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_usd_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_eur_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_rub_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_usd_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_eur_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    flats = Column(Integer)

    l_subway_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())

    l_country_id = Column(ForeignKey('countries.id'))
    l_country = relationship('Country', backref='complex_buildings')

    l_region_id = Column(ForeignKey('regions.id'))
    l_region = relationship('Region', backref='complex_buildings')

    l_district_id = Column(ForeignKey('districts.id'))
    l_district = relationship('District', backref='complex_buildings')

    l_locality_id = Column(ForeignKey('localities.id'))
    l_locality = relationship('Locality', backref='complex_buildings')

    l_sub_locality_id = Column(ForeignKey('sub_localities.id'))
    l_sub_locality = relationship('SubLocality', backref='complex_buildings')

    l_street = Column(String(255))
    l_postal_code = Column(Integer)

    complex_id = Column(ForeignKey('complexes.id'), nullable=False)
    complex = relationship('Complex', backref='complex_buildings')

    contractor_id = Column(ForeignKey('companies.id'))
    contractor = relationship('Company', foreign_keys=contractor_id, backref='company_complex_buildings')

    developer_id = Column(ForeignKey('companies.id'))
    developer = relationship('Company', foreign_keys=developer_id, backref='company_complex_buildings_0')

    ru_id = Column(ForeignKey('staff_users.id'), nullable=False)
    ru = relationship('StaffUser', foreign_keys=ru_id, backref='staffuser_staffuser_complex_buildings_0')

    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    created_by_user = relationship('StaffUser', foreign_keys=created_by_user_id,
                                   backref='staffuser_staffuser_complex_buildings')

    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    updated_by_user = relationship('StaffUser', foreign_keys=updated_by_user_id,
                                   backref='complex_buildings_updated_by_user')


class Complex(db.Model):
    __tablename__ = 'complexes'
    __table_args__ = (
        Index('complexes_l_locality_id_l_sub_locality_id_name_idx', 'l_locality_id', 'l_sub_locality_id', 'name'),
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)
    images = Column(JSON, nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False)
    updated_at = Column(DateTime(True))
    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    l_country_id = Column(Integer)
    l_region_id = Column(Integer)
    l_locality_id = Column(Integer)
    l_sub_locality_id = Column(Integer)
    l_street = Column(CIText)
    l_house = Column(String(255))
    l_housing = Column(String(255))
    l_building = Column(String(255))
    l_flat_number = Column(SmallInteger)
    l_postal_code = Column(Integer)
    l_kladr_id = Column(BigInteger)
    l_district_id = Column(Integer)
    l_latitude = Column(String(255))
    l_longitude = Column(String(255))
    ru_id = Column(ForeignKey('staff_users.id'), nullable=False)
    ru_department_id = Column(Integer, nullable=False)
    ru_division_id = Column(Integer)
    linked_contact_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())
    s_properties_count = Column(Integer, nullable=False, server_default=FetchedValue())
    s_mcp_from_usd = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_eur = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_rub = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_usd = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_eur = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_rub = Column(BigInteger, nullable=False, server_default=FetchedValue())
    state = Column(ENUM('draft', 'public', name='model_state'), server_default=FetchedValue())
    commissioning_quarter = Column(SmallInteger)
    commissioning_year = Column(SmallInteger)
    note = Column(Text)
    keys_issue_date = Column(Date)
    accreditors = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())
    at_area = Column(Integer)
    at_playgrounds = Column(SmallInteger)
    at_is_allowed_cars = Column(Boolean)
    at_is_access_open = Column(Boolean)
    at_is_greenery_planted = Column(Boolean)
    pc_oral_reservation = Column(SmallInteger)
    pc_agreement_preparation = Column(SmallInteger)
    pc_developer_agreement = Column(SmallInteger)
    pc_state_registration_preparation = Column(SmallInteger)
    pc_signing = Column(SmallInteger)
    pc_state_registration = Column(SmallInteger)
    pc_document_delivery = Column(SmallInteger)
    pc_payment = Column(SmallInteger)
    s_properties_area_from = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_area_to = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_count_primary = Column(Integer, nullable=False, server_default=FetchedValue())
    s_properties_count_resale = Column(Integer, nullable=False, server_default=FetchedValue())
    s_properties_area_from_primary = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_area_to_primary = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_area_from_resale = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_area_to_resale = Column(Float, nullable=False, server_default=FetchedValue())
    s_mcp_from_rub_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_usd_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_eur_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_rub_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_usd_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_eur_primary = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_rub_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_usd_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_from_eur_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_rub_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_usd_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_to_eur_resale = Column(BigInteger, nullable=False, server_default=FetchedValue())
    l_subway_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())

    created_by_user = relationship('StaffUser', primaryjoin='Complex.created_by_user_id == StaffUser.id',
                                   backref='complexes_created_by_user')
    ru = relationship('StaffUser', primaryjoin='Complex.ru_id == StaffUser.id',
                      backref='staffuser_staffuser_complexes_0')
    updated_by_user = relationship('StaffUser', primaryjoin='Complex.updated_by_user_id == StaffUser.id',
                                   backref='complexes_updated_by_user')


class ContactDocument(db.Model):
    __tablename__ = 'contact_documents'
    __table_args__ = (
        CheckConstraint("kind_dictionary_kind = 'contact_document_type'::public.dictionary_kind"),
        ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind'])
    )

    id = Column(UUID, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM('available', 'deleted', name='document_state'), nullable=False)
    filename = Column(String(255))
    aes_key = Column(LargeBinary, nullable=False)
    iv_bytes = Column(LargeBinary, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    uploader_id = Column(Integer, nullable=False)
    contact_id = Column(ForeignKey('contacts.id'), nullable=False)
    kind_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    kind_dictionary_id = Column(Integer)

    contact = relationship('Contact', primaryjoin='ContactDocument.contact_id == Contact.id',
                           backref='contact_documents')
    kind_dictionary = relationship('DictionaryItem',
                                   primaryjoin='and_(ContactDocument.kind_dictionary_id == DictionaryItem.id, ContactDocument.kind_dictionary_kind == DictionaryItem.kind)',
                                   backref='contact_documents')


class ContactLink(db.Model):
    __tablename__ = 'contact_links'
    __table_args__ = (
        CheckConstraint("kind_dictionary_kind = 'contact_link_type'::public.dictionary_kind"),
        CheckConstraint('linked_contact_id <> contact_id'),
        ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind']),
        ForeignKeyConstraint(['relationship_to_kind_dictionary_id', 'kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind'])
    )

    contact_id = Column(ForeignKey('contacts.id', ondelete='CASCADE'), primary_key=True, nullable=False)
    linked_contact_id = Column(ForeignKey('contacts.id', ondelete='CASCADE'), primary_key=True, nullable=False)
    kind_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    kind_dictionary_id = Column(Integer, nullable=False)
    relationship_to_kind_dictionary_id = Column(Integer, nullable=False)

    contact = relationship('Contact', primaryjoin='ContactLink.contact_id == Contact.id',
                           backref='contact_contact_links')
    kind_dictionary = relationship('DictionaryItem',
                                   primaryjoin='and_(ContactLink.kind_dictionary_id == DictionaryItem.id, ContactLink.kind_dictionary_kind == DictionaryItem.kind)',
                                   backref='dictionaryitem_contact_links')
    linked_contact = relationship('Contact', primaryjoin='ContactLink.linked_contact_id == Contact.id',
                                  backref='contact_contact_links_0')
    relationship_to_kind_dictionary = relationship('DictionaryItem',
                                                   primaryjoin='and_(ContactLink.relationship_to_kind_dictionary_id == DictionaryItem.id, ContactLink.kind_dictionary_kind == DictionaryItem.kind)',
                                                   backref='dictionaryitem_contact_links_0')


class Contact(db.Model):
    __tablename__ = 'contacts'
    __table_args__ = (
        CheckConstraint("auto_brand_dictionary_kind = 'auto_brand'::public.dictionary_kind"),
        CheckConstraint("auto_model_dictionary_kind = 'auto_model'::public.dictionary_kind"),
        CheckConstraint("job_role_dictionary_kind = 'contact_job_role'::public.dictionary_kind"),
        CheckConstraint("occupation_dictionary_kind = 'contact_occupation'::public.dictionary_kind"),
        CheckConstraint("position_dictionary_kind = 'contact_position'::public.dictionary_kind")
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    ru_ids = Column(ARRAY(Integer()), nullable=False, index=True)
    photo = Column(String(255))
    first_name = Column(CIText)
    last_name = Column(CIText)
    middle_name = Column(CIText)
    phone_number = Column(String(255), index=True)
    email = Column(CIText, index=True)
    facebook = Column(String(255))
    twitter = Column(String(255))
    instagram = Column(String(255))
    vk = Column(String(255))
    additional_phone_number = Column(String(255))
    additional_email = Column(String(255))
    auto_number = Column(String(255))
    auto_region = Column(Integer)
    company = Column(String(255))
    note = Column(Text)
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), server_default=FetchedValue())
    position_dictionary_id = Column(Integer)
    position_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    occupation_dictionary_id = Column(Integer)
    occupation_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    job_role_dictionary_id = Column(Integer)
    job_role_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    auto_model_dictionary_id = Column(Integer)
    auto_model_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    auto_brand_dictionary_id = Column(Integer)
    auto_brand_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    ru_department_ids = Column(ARRAY(Integer()), nullable=False, index=True, server_default=FetchedValue())
    ru_division_ids = Column(ARRAY(Integer()), nullable=False, index=True, server_default=FetchedValue())
    company_id = Column(ForeignKey('companies.id'))
    state = Column(ENUM('active', 'archive', name='contact_state'), nullable=False, index=True,
                   server_default=FetchedValue())
    source = Column(String(255))
    kind = Column(ENUM('client', 'agent', 'owner', 'spam', name='contact_kind'))

    company1 = relationship('Company', primaryjoin='Contact.company_id == Company.id', backref='contacts')


class Country(db.Model):
    __tablename__ = 'countries'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)
    kind_name = Column(String(255))
    aliases = Column(ArrayForCIText(CIText), nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    place_type = Column(
        ENUM('country', 'administrative_area', 'locality', 'sub_locality', 'route', 'district', 'settlement',
             'subway', name='place_type'), nullable=False, server_default=FetchedValue())
    property_categories = Column(ArrayForEnum(ENUM('commercial', 'city', 'country', name='property_category')),
                                 nullable=False, server_default=FetchedValue())


class CountryProperty(db.Model):
    __tablename__ = 'country_properties'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    ru_id = Column(Integer, nullable=False)
    responsible_user = relationship('StaffUser', primaryjoin='CountryProperty.ru_id == StaffUser.id',
                                    backref='managed_country_properties', foreign_keys=ru_id)
    state = Column(
        ENUM('draft', 'public', 'postponed', 'sold', 'rented', 'private', 'deleted', name='property_state'),
        nullable=False)
    kind = Column(
        ENUM('flat', 'room', 'house', 'land', 'office', 'warehouse', 'townhouse', 'apartment', 'private',
             'penthouse', 'commercial_space', name='property_kind'))
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    created_by_user_id = Column(Integer, nullable=False)
    updated_by_user_id = Column(Integer)
    images = Column(JSON, nullable=False, server_default=FetchedValue())
    client_lead_id = Column(Integer)
    category = Column(ENUM('commercial', 'city', 'country', name='property_category'), nullable=False,
                      server_default=FetchedValue())
    layout_images = Column(JSON, nullable=False, server_default=FetchedValue())
    ro_price = Column(BigInteger)
    ro_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    ro_agent_fee = Column(Float)
    ro_agent_fixed_price = Column(Integer)
    ro_agent_fixed_price_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    ro_deposit = Column(SmallInteger)
    ro_period = Column(ENUM('day', 'month', 'year', name='rent_period'))
    ro_is_allowed_pets = Column(Boolean)
    ro_is_allowed_children = Column(Boolean)
    so_price = Column(BigInteger)
    so_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    so_agent_fee = Column(Float)
    so_agent_fixed_price = Column(Integer)
    so_agent_fixed_price_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    so_kind = Column(ENUM('direct_sell', 'trade_in', 'changing', 'fl214', 'assignment', name='sale_offer_kind'))
    so_is_bargain = Column(Boolean)
    so_is_mortgage = Column(Boolean)
    so_is_installment = Column(Boolean)
    linked_contact_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())
    note = Column(Text)
    ru_department_id = Column(Integer, nullable=False)
    ru_division_id = Column(Integer)
    removal_order_id = Column(Integer)
    sd_reason = Column(Text)
    so_is_resale = Column(Boolean)
    external_id = Column(String(255))
    l_cadastral_number = Column(String(255))
    badge_id = Column(Integer)
    so_price_delta = Column(BigInteger)
    ro_price_delta = Column(BigInteger)
    so_is_disabled = Column(Boolean)
    ro_is_disabled = Column(Boolean)
    equipment = Column(ArrayForEnum(
        ENUM('internet', 'phone', 'tv', 'security_signaling', 'cable_tv', 'washmachine', 'intercom', 'fridge',
             'dishwasher', 'appliances', name='property_equipment')), nullable=False, server_default=FetchedValue())
    s_spaces = Column(JSON, nullable=False, server_default=FetchedValue())
    ad_security_house_area = Column(Float)
    ad_guest_house_area = Column(Float)
    ad_staff_house_area = Column(Float)
    ad_spa_area = Column(Float)
    ad_pool_width = Column(SmallInteger)
    ad_pool_height = Column(SmallInteger)
    ad_parking_area = Column(Float)
    ad_garage_area = Column(Float)
    c_power_supply = Column(SmallInteger)
    c_water_supply = Column(ENUM('purification', 'central', 'well', name='water_type'))
    c_gas_supply = Column(ENUM('without_gas', 'gas_holder', 'near_border', 'mains', 'diesel', name='gas_type'))
    c_sewerage_supply = Column(ENUM('central', 'septic', name='sewerage_type'))
    ld_landscaping = Column(Boolean)
    ld_landscape_kind = Column(
        ArrayForEnum(ENUM('field', 'near_forest', 'near_water', 'forest', name='landscape_kind')),
        nullable=False, server_default=FetchedValue())
    ld_area = Column(Float)
    l_street = Column(String(255))
    l_house = Column(String(255))
    s_bedrooms = Column(SmallInteger)
    s_area = Column(Float)
    s_wall_material = Column(
        ENUM('blue_max', 'wood', 'brick', 'block', 'monolith', 'canadian_sip', name='wall_material'))
    s_roof_material = Column(
        ENUM('steel', 'soft_tile', 'copper', 'metal_tile', 'slate', 'tile', 'rooftop', name='roof_material'))
    s_built_year = Column(SmallInteger)
    s_floors = Column(SmallInteger)
    s_loggias = Column(SmallInteger)
    s_balconies = Column(SmallInteger)
    s_elevators = Column(SmallInteger)
    s_ceiling_height = Column(Float)
    s_with_conditioning = Column(Boolean)
    s_with_ventilation = Column(Boolean)
    s_renovate = Column(
        ENUM('design', 'rough_finish', 'full_construction', 'partly_turnkey', 'for_finishing', 'raw',
             name='property_renovate'))
    s_condition = Column(ENUM('great', 'good', 'normal', 'bad', name='property_condition'))
    s_furniture = Column(ENUM('full', 'partial', 'absent', name='property_furniture'))
    l_settlement_id = Column(ForeignKey('settlements.id'))
    l_country_id = Column(ForeignKey('countries.id'))
    l_region_id = Column(ForeignKey('regions.id'))
    l_district_id = Column(ForeignKey('districts.id'))
    l_locality_id = Column(ForeignKey('localities.id'))
    ad_bathhouse_area = Column(Float)
    l_route_id = Column(ForeignKey('routes.id'))
    l_latitude = Column(String(255))
    l_longitude = Column(String(255))
    s_layouts = Column(HSTORE(Text()), nullable=False, server_default=FetchedValue())
    s_rooms = Column(SmallInteger)
    s_wcs = Column(SmallInteger)
    s_legacy_layouts = Column(JSON, nullable=False, server_default=FetchedValue())

    l_country = relationship('Country', primaryjoin='CountryProperty.l_country_id == Country.id',
                             backref='country_properties')
    l_district = relationship('District', primaryjoin='CountryProperty.l_district_id == District.id',
                              backref='country_properties')
    l_locality = relationship('Locality', primaryjoin='CountryProperty.l_locality_id == Locality.id',
                              backref='country_properties')
    l_region = relationship('Region', primaryjoin='CountryProperty.l_region_id == Region.id',
                            backref='country_properties')
    l_route = relationship('Route', primaryjoin='CountryProperty.l_route_id == Route.id',
                           backref='country_properties')
    l_settlement = relationship('Settlement', primaryjoin='CountryProperty.l_settlement_id == Settlement.id',
                                backref='country_properties')


class CsiAnswer(db.Model):
    __tablename__ = 'csi_answers'
    __table_args__ = (
        Index('csi_answers_question_id_object_id_object_klass_idx', 'question_id', 'object_id', 'object_klass'),
        Index('csi_answers_object_id_object_klass_idx', 'object_id', 'object_klass')
    )

    question_id = Column(ForeignKey('csi_questions.id'), nullable=False)
    object_id = Column(Integer, nullable=False)
    object_klass = Column(
        ENUM('client_lead', 'deal', 'city_property', 'country_property', 'images_order', 'property_search_order',
             'property_removal_order', 'task', 'complex', 'complex_building', 'settlement', name='object_klass'),
        nullable=False)
    rate = Column(SmallInteger, nullable=False)
    id = Column(Integer, primary_key=True, server_default=FetchedValue())

    question = relationship('CsiQuestion', primaryjoin='CsiAnswer.question_id == CsiQuestion.id',
                            backref='csi_answers')


class CsiQuestion(db.Model):
    __tablename__ = 'csi_questions'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    text = Column(Text)
    kind = Column(ENUM('image', 'selection', 'property_search_order', name='csi_question_kind'), nullable=False)


class DailyDuty(db.Model):
    __tablename__ = 'daily_duty'
    __table_args__ = (
        CheckConstraint('start_at < finish_at'),
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    staff_user_id = Column(ForeignKey('staff_users.id'))
    start_at = Column(DateTime(True), nullable=False)
    finish_at = Column(DateTime(True), nullable=False)

    staff_user = relationship('StaffUser', primaryjoin='DailyDuty.staff_user_id == StaffUser.id',
                              backref='daily_duties')


class Deal(db.Model):
    __tablename__ = 'deals'
    __table_args__ = (
        CheckConstraint("cd_kind_dictionary_kind = 'deal_contact_type'::public.dictionary_kind"),
        ForeignKeyConstraint(['cd_kind_dictionary_id', 'cd_kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind'])
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM(
        'presentation', 'negotiation', 'deposit_paid', 'agreement', 'successful', 'unsuccessful', name='deal_state'),
        nullable=False)
    client_lead_id = Column(ForeignKey('client_leads.id'))
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    ru_id = Column(ForeignKey('staff_users.id'), nullable=False, index=True)
    ru_department_id = Column(Integer, nullable=False, index=True)
    ru_division_id = Column(Integer, index=True)
    cd_id = Column(ForeignKey('contacts.id'), nullable=False)
    cd_phone_number = Column(String(255), index=True)
    cd_email = Column(String(255))
    sd_reason = Column(Text)
    sd_to_approve = Column(
        ENUM('presentation', 'negotiation', 'deposit_paid', 'agreement', 'successful', 'unsuccessful',
             name='deal_state'))
    sd_changes = Column(JSON, nullable=False, server_default=FetchedValue())
    d_offer_kind = Column(ENUM('rent', 'purchase', name='offer_kind'), nullable=False)
    d_budget = Column(BigInteger)
    d_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    d_expected_finish_date_at = Column(Date, nullable=False)
    d_expected_agent_fee = Column(Float)
    d_note = Column(Text)
    d_property_id = Column(Integer)
    d_expected_agent_fixed_price = Column(BigInteger)
    d_expected_agent_fixed_price_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    d_mcaf_rub = Column(BigInteger)
    d_mcaf_eur = Column(BigInteger)
    d_mcaf_usd = Column(BigInteger)
    cd_kind_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), server_default=FetchedValue())
    cd_kind_dictionary_id = Column(Integer)

    cd = relationship('Contact', primaryjoin='Deal.cd_id == Contact.id', backref='deals')
    cd_kind_dictionary = relationship('DictionaryItem',
                                      primaryjoin='and_(Deal.cd_kind_dictionary_id == DictionaryItem.id, Deal.cd_kind_dictionary_kind == DictionaryItem.kind)',
                                      backref='deals')
    client_lead = relationship('ClientLead', primaryjoin='Deal.client_lead_id == ClientLead.id', backref='deals')
    created_by_user = relationship('StaffUser', primaryjoin='Deal.created_by_user_id == StaffUser.id',
                                   backref='deals_created_by_user')
    ru = relationship('StaffUser', primaryjoin='Deal.ru_id == StaffUser.id', backref='staffuser_staffuser_deals_0')
    updated_by_user = relationship('StaffUser', primaryjoin='Deal.updated_by_user_id == StaffUser.id',
                                   backref='deals_updated_by_user')


class Department(db.Model):
    __tablename__ = 'departments'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False, unique=True)
    staff_user_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())

    manager_staff_user_id = Column(ForeignKey('staff_users.id'), unique=True)
    manager_staff_user = relationship('StaffUser', foreign_keys=manager_staff_user_id, backref='departments')


class DictionaryItem(db.Model):
    __tablename__ = 'dictionary_items'
    __table_args__ = (
        UniqueConstraint('id', 'kind'),
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False)
    title = Column(String(255), nullable=False)
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    parent_id = Column(ForeignKey('dictionary_items.id'))

    parent = relationship('DictionaryItem', remote_side=[id],
                          primaryjoin='DictionaryItem.parent_id == DictionaryItem.id', backref='dictionary_items')


class District(db.Model):
    __tablename__ = 'districts'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)
    kind_name = Column(String(255))
    aliases = Column(ArrayForCIText(CIText), nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    place_type = Column(
        ENUM('country', 'administrative_area', 'locality', 'sub_locality', 'route', 'district', 'settlement',
             'subway', name='place_type'), nullable=False, server_default=FetchedValue())
    property_categories = Column(ArrayForEnum(ENUM('commercial', 'city', 'country', name='property_category')),
                                 nullable=False, server_default=FetchedValue())
    country_id = Column(ForeignKey('countries.id'), nullable=False)
    region_id = Column(ForeignKey('regions.id'), nullable=False)

    country = relationship('Country', primaryjoin='District.country_id == Country.id', backref='districts')
    region = relationship('Region', primaryjoin='District.region_id == Region.id', backref='districts')


class Division(db.Model):
    __tablename__ = 'divisions'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    department_id = Column(ForeignKey('departments.id'), nullable=False)
    name = Column(CIText, nullable=False, unique=True)
    manager_staff_user_id = Column(ForeignKey('staff_users.id'), unique=True)
    staff_user_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())

    department = relationship('Department', primaryjoin='Division.department_id == Department.id',
                              backref='divisions')
    manager_staff_user = relationship('StaffUser', primaryjoin='Division.manager_staff_user_id == StaffUser.id',
                                      backref='divisions')


class EncryptedDocument(db.Model):
    __tablename__ = 'encrypted_documents'

    id = Column(UUID, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM('available', 'deleted', name='document_state'), nullable=False)
    filename = Column(String(255))
    aes_key = Column(LargeBinary, nullable=False)
    iv_bytes = Column(LargeBinary, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    uploader_id = Column(ForeignKey('staff_users.id'), nullable=False)

    uploader = relationship('StaffUser', primaryjoin='EncryptedDocument.uploader_id == StaffUser.id',
                            backref='encrypted_documents')


class Event(db.Model):
    __tablename__ = 'events'
    __table_args__ = (
        Index('events_object_id_object_klass_idx', 'object_id', 'object_klass'),
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    object_id = Column(Integer, nullable=False)
    object_klass = Column(
        ENUM('client_lead', 'deal', 'city_property', 'country_property', 'images_order', 'property_search_order',
             'property_removal_order', 'task', 'complex', 'complex_building', 'settlement', name='object_klass'),
        nullable=False)
    kind = Column(ENUM('responsible_user_change', 'property_pdf_export', 'property_created', 'property_updated',
                       name='event_kind'), nullable=False)
    details = Column(JSON)
    event_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())


class ExportLocation(db.Model):
    __tablename__ = 'export_locations'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(Text, nullable=False)
    # pos = Column(NullType)  # type: geography(Point, 4326)
    format = Column(ENUM('avito', 'cian', 'yandex_realty', name='export_package_format'), nullable=False)


class ExportPackage(db.Model):
    __tablename__ = 'export_packages'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    title = Column(String(255), nullable=False)
    format = Column(ENUM('avito', 'cian', 'yandex_realty', name='export_package_format'), nullable=False)
    company_name = Column(String(255), nullable=False)
    company_email = Column(String(255), nullable=False)
    company_phone_number = Column(String(255), nullable=False)
    created_by_user_id = Column(Integer, nullable=False)
    updated_by_user_id = Column(Integer)
    last_export_at = Column(DateTime(True))
    updated_at = Column(DateTime(True))
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    filter = Column(HSTORE(Text()), nullable=False, server_default=FetchedValue())
    s_properties_count = Column(Integer, nullable=False, server_default=FetchedValue())
    state = Column(ENUM('active', 'deleted', name='export_package_state'), server_default=FetchedValue())
    cd_top = Column(ARRAY(Integer()))
    cd_premium = Column(ARRAY(Integer()))
    cd_highlight = Column(ARRAY(Integer()))
    s_ads_count = Column(Integer, nullable=False, server_default=FetchedValue())
    limit = Column(Integer)
    sort_order = Column(ENUM('asc', 'desc', name='sort_order'))
    sort_column = Column(String(64))
    watermark = Column(ENUM('jqestate', 'rublevka', 'riga', 'presentation', 'thumbnail', name='watermark'),
                       nullable=False, server_default=FetchedValue())


class FileDocument(db.Model):
    __tablename__ = 'file_documents'

    id = Column(UUID, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM('available', 'deleted', name='document_state'), nullable=False)
    filename = Column(String(255))
    uploader_id = Column(ForeignKey('staff_users.id'), nullable=False)
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())

    uploader = relationship('StaffUser', primaryjoin='FileDocument.uploader_id == StaffUser.id',
                            backref='file_documents')


class ImagesOrder(db.Model):
    __tablename__ = 'images_orders'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    object_id = Column(Integer, nullable=False)
    kind = Column(ENUM('image', 'layout', name='images_order_kind'), nullable=False)
    state = Column(
        ENUM('new', 'rejected', 'in_progress', 'done', 'finished', 'approved', name='images_order_state'),
        nullable=False)
    description = Column(Text, nullable=False)
    responsible_user_id = Column(ForeignKey('staff_users.id'))
    images = Column(JSON, nullable=False)
    created_at = Column(DateTime(True), nullable=False)
    updated_at = Column(DateTime(True), nullable=False)
    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    sd_changes = Column(JSON, nullable=False)
    sd_reason = Column(Text)
    object_klass = Column(
        ENUM('city_property', 'country_property', 'settlement', 'images_order', name='images_order_object_klass'),
        nullable=False)

    created_by_user = relationship('StaffUser', primaryjoin='ImagesOrder.created_by_user_id == StaffUser.id',
                                   backref='images_orders_created_by_user')
    responsible_user = relationship('StaffUser', primaryjoin='ImagesOrder.responsible_user_id == StaffUser.id',
                                    backref='images_orders_responsible_user')
    updated_by_user = relationship('StaffUser', primaryjoin='ImagesOrder.updated_by_user_id == StaffUser.id',
                                   backref='images_orders_updated_by_user')


class Journal(db.Model):
    __tablename__ = 'journal'

    ordering = Column(BigInteger, primary_key=True, nullable=False, server_default=FetchedValue())
    persistence_id = Column(String(255), primary_key=True, nullable=False)
    sequence_number = Column(BigInteger, primary_key=True, nullable=False)
    deleted = Column(Boolean, server_default=FetchedValue())
    tags = Column(String(255), server_default=FetchedValue())
    message = Column(LargeBinary, nullable=False)


class Locality(db.Model):
    __tablename__ = 'localities'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)
    kind_name = Column(String(255))
    aliases = Column(ArrayForCIText(CIText), nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    place_type = Column(
        ENUM('country', 'administrative_area', 'locality', 'sub_locality', 'route', 'district', 'settlement',
             'subway', name='place_type'), nullable=False, server_default=FetchedValue())
    property_categories = Column(ArrayForEnum(ENUM('commercial', 'city', 'country', name='property_category')),
                                 nullable=False, server_default=FetchedValue())

    country_id = Column(ForeignKey('countries.id'), nullable=False)
    country = relationship('Country', primaryjoin='Locality.country_id == Country.id', backref='localities')

    district_id = Column(ForeignKey('districts.id'))
    district = relationship('District', primaryjoin='Locality.district_id == District.id', backref='localities')

    region_id = Column(ForeignKey('regions.id'), nullable=False)
    region = relationship('Region', primaryjoin='Locality.region_id == Region.id', backref='localities')

    route_id = Column(ForeignKey('routes.id'))
    route = relationship('Route', primaryjoin='Locality.route_id == Route.id', backref='localities')


class Migration(db.Model):
    __tablename__ = 'migrations'

    version = Column(BigInteger, primary_key=True)
    name = Column(String(255), nullable=False)
    body = Column(Text, nullable=False)
    sha1 = Column(String(40), nullable=False)
    applied_at = Column(DateTime, nullable=False)
    options = Column(Text, nullable=False)


class Newsletter(db.Model):
    __tablename__ = 'newsletters'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    title = Column(String(255), nullable=False)
    state = Column(ENUM('scheduled', 'sent', 'draft', name='newsletter_state'), nullable=False)
    template = Column(Text, nullable=False)
    properties = Column(JSON, nullable=False)
    scheduled_at = Column(DateTime(True))
    created_at = Column(DateTime(True), nullable=False)
    updated_at = Column(DateTime(True))
    sent_at = Column(DateTime(True))
    list_id = Column(String(64), nullable=False)
    mailchimp_campaign_id = Column(String(64))
    from_title = Column(String(255))
    from_email = Column(String(255))


class ObjectNotification(db.Model):
    __tablename__ = 'object_notifications'

    object_id = Column(Integer, primary_key=True, nullable=False)
    object_klass = Column(
        ENUM('client_lead', 'deal', 'city_property', 'country_property', 'images_order', 'property_search_order',
             'property_removal_order', 'task', 'complex', 'complex_building', 'settlement', name='object_klass'),
        primary_key=True, nullable=False)
    user_id = Column(ForeignKey('staff_users.id'), primary_key=True, nullable=False)
    is_subscribed = Column(Boolean, nullable=False)

    user = relationship('StaffUser', primaryjoin='ObjectNotification.user_id == StaffUser.id',
                        backref='object_notifications')


class Place(db.Model):
    __tablename__ = 'places'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)
    kind_name = Column(String(255))
    aliases = Column(ArrayForCIText(CIText), nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    place_type = Column(
        ENUM('country', 'administrative_area', 'locality', 'sub_locality', 'route', 'district', 'settlement',
             'subway', name='place_type'), nullable=False)
    property_categories = Column(ArrayForEnum(ENUM('commercial', 'city', 'country', name='property_category')),
                                 nullable=False, server_default=FetchedValue())


class Property(db.Model):
    __tablename__ = 'properties'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    ru_id = Column(ForeignKey('staff_users.id'), nullable=False, index=True)
    state = Column(
        ENUM('draft', 'public', 'postponed', 'sold', 'rented', 'private', 'deleted', name='property_state'),
        nullable=False)
    kind = Column(
        ENUM('flat', 'room', 'house', 'land', 'office', 'warehouse', 'townhouse', 'apartment', 'private',
             'penthouse', 'commercial_space', name='property_kind'))
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    images = Column(JSON, nullable=False, server_default=FetchedValue())
    client_lead_id = Column(ForeignKey('client_leads.id'), unique=True)
    category = Column(ENUM('commercial', 'city', 'country', name='property_category'), nullable=False)
    layout_images = Column(JSON, nullable=False, server_default=FetchedValue())
    ro_price = Column(BigInteger)
    ro_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    ro_agent_fee = Column(Float)
    ro_agent_fixed_price = Column(Integer)
    ro_agent_fixed_price_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    ro_deposit = Column(SmallInteger)
    ro_period = Column(ENUM('day', 'month', 'year', name='rent_period'))
    ro_is_allowed_pets = Column(Boolean)
    ro_is_allowed_children = Column(Boolean)
    so_price = Column(BigInteger)
    so_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    so_agent_fee = Column(Float)
    so_agent_fixed_price = Column(Integer)
    so_agent_fixed_price_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    so_kind = Column(ENUM('direct_sell', 'trade_in', 'changing', 'fl214', 'assignment', name='sale_offer_kind'))
    so_is_bargain = Column(Boolean)
    so_is_mortgage = Column(Boolean)
    so_is_installment = Column(Boolean)
    linked_contact_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())
    note = Column(Text)
    ru_department_id = Column(ForeignKey('departments.id'), nullable=False)
    ru_division_id = Column(ForeignKey('divisions.id'))
    removal_order_id = Column(ForeignKey('property_removal_orders.id'))
    sd_reason = Column(Text)
    so_is_resale = Column(Boolean)
    external_id = Column(String(255))
    l_cadastral_number = Column(String(255))
    badge_id = Column(ForeignKey('property_badges.id'))
    so_price_delta = Column(BigInteger)
    ro_price_delta = Column(BigInteger)
    so_is_disabled = Column(Boolean)
    ro_is_disabled = Column(Boolean)

    badge = relationship('PropertyBadge', primaryjoin='Property.badge_id == PropertyBadge.id', backref='properties')
    client_lead = relationship('ClientLead', uselist=False, primaryjoin='Property.client_lead_id == ClientLead.id',
                               backref='properties')
    created_by_user = relationship('StaffUser', primaryjoin='Property.created_by_user_id == StaffUser.id',
                                   backref='properties_created_by_user')
    removal_order = relationship('PropertyRemovalOrder',
                                 primaryjoin='Property.removal_order_id == PropertyRemovalOrder.id',
                                 backref='properties')
    ru_department = relationship('Department', primaryjoin='Property.ru_department_id == Department.id',
                                 backref='properties')
    ru_division = relationship('Division', primaryjoin='Property.ru_division_id == Division.id',
                               backref='properties')
    ru = relationship('StaffUser', primaryjoin='Property.ru_id == StaffUser.id',
                      backref='staffuser_staffuser_properties_0')
    updated_by_user = relationship('StaffUser', primaryjoin='Property.updated_by_user_id == StaffUser.id',
                                   backref='properties_updated_by_user')


class PropertyBadge(db.Model):
    __tablename__ = 'property_badges'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    title = Column(CIText, nullable=False)
    color = Column(String(12), nullable=False)
    created_at = Column(DateTime(True), server_default=FetchedValue())
    updated_at = Column(DateTime(True))


class PropertyBanner(db.Model):
    __tablename__ = 'property_banners'
    __table_args__ = (
        CheckConstraint("kind_dictionary_kind = 'property_banner'::public.dictionary_kind"),
        ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind'])
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    property_id = Column(Integer, nullable=False)
    state = Column(ENUM('ordered', 'active', 'removed', 'denied', name='banner_state'), nullable=False)
    reason = Column(Text)
    kind_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    kind_dictionary_id = Column(Integer, nullable=False)
    ru_id = Column(ForeignKey('staff_users.id'))
    image = Column(JSON)
    expected_date_of_completion = Column(DateTime(True))
    date_of_completion = Column(DateTime(True))
    created_at = Column(DateTime(True), server_default=FetchedValue())
    created_by_user_id = Column(ForeignKey('staff_users.id'))
    updated_at = Column(DateTime(True))

    created_by_user = relationship('StaffUser', primaryjoin='PropertyBanner.created_by_user_id == StaffUser.id',
                                   backref='staffuser_property_banners')
    kind_dictionary = relationship('DictionaryItem',
                                   primaryjoin='and_(PropertyBanner.kind_dictionary_id == DictionaryItem.id, PropertyBanner.kind_dictionary_kind == DictionaryItem.kind)',
                                   backref='property_banners')
    ru = relationship('StaffUser', primaryjoin='PropertyBanner.ru_id == StaffUser.id',
                      backref='staffuser_property_banners_0')


class PropertyContactLink(db.Model):
    __tablename__ = 'property_contact_links'
    __table_args__ = (
        CheckConstraint("kind_dictionary_kind = 'property_contact_link_type'::public.dictionary_kind"),
        ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind'])
    )

    property_id = Column(Integer, primary_key=True, nullable=False)
    linked_contact_id = Column(ForeignKey('contacts.id', ondelete='CASCADE'), primary_key=True, nullable=False)
    kind_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    kind_dictionary_id = Column(Integer, nullable=False)

    kind_dictionary = relationship('DictionaryItem',
                                   primaryjoin='and_(PropertyContactLink.kind_dictionary_id == DictionaryItem.id, PropertyContactLink.kind_dictionary_kind == DictionaryItem.kind)',
                                   backref='property_contact_links')
    linked_contact = relationship('Contact', primaryjoin='PropertyContactLink.linked_contact_id == Contact.id',
                                  backref='property_contact_links')


class PropertyOfferPriceChange(db.Model):
    __tablename__ = 'property_offer_price_changes'
    __table_args__ = (
        Index('property_offer_price_changes_property_id_kind_idx', 'property_id', 'kind'),
    )

    property_id = Column(Integer, primary_key=True, nullable=False)
    kind = Column(ENUM('rent', 'purchase', name='offer_kind'), primary_key=True, nullable=False)
    change_at = Column(Date, primary_key=True, nullable=False)
    usd = Column(BigInteger, nullable=False)
    eur = Column(BigInteger, nullable=False)
    rub = Column(BigInteger, nullable=False)


class PropertyRemovalOrder(db.Model):
    __tablename__ = 'property_removal_orders'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    property_id = Column(Integer, nullable=False)
    property_category = Column(ENUM('commercial', 'city', 'country', name='property_category'), nullable=False)
    original_property_id = Column(Integer)
    state = Column(ENUM('new', 'rejected', 'approved', 'finished', name='property_removal_order_state'),
                   nullable=False)
    kind = Column(ENUM('lost', 'duplicate', name='property_removal_order_kind'), nullable=False)
    note = Column(Text, nullable=False)
    created_at = Column(DateTime(True), nullable=False)
    updated_at = Column(DateTime(True))
    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    sd_reason = Column(Text)

    created_by_user = relationship('StaffUser',
                                   primaryjoin='PropertyRemovalOrder.created_by_user_id == StaffUser.id',
                                   backref='staffuser_property_removal_orders')
    updated_by_user = relationship('StaffUser',
                                   primaryjoin='PropertyRemovalOrder.updated_by_user_id == StaffUser.id',
                                   backref='staffuser_property_removal_orders_0')


class PropertySearchOrder(db.Model):
    __tablename__ = 'property_search_orders'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    property_category = Column(ENUM('commercial', 'city', 'country', name='property_category'), nullable=False)
    state = Column(ENUM('new', 'rejected', 'approved', 'finished', 'assigned', 'in_progress', 'done',
                        name='property_search_order_state'), nullable=False)
    note = Column(Text, nullable=False)
    ru_id = Column(ForeignKey('staff_users.id'), index=True)
    created_at = Column(DateTime(True), nullable=False)
    updated_at = Column(DateTime(True))
    cbu_id = Column(ForeignKey('staff_users.id'), nullable=False)
    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    sd_reason = Column(Text)
    sd_changes = Column(JSON, nullable=False)
    property_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())
    cbu_department_id = Column(ForeignKey('departments.id'), nullable=False)
    cbu_division_id = Column(ForeignKey('divisions.id'))
    ru_department_id = Column(ForeignKey('departments.id'))
    ru_division_id = Column(ForeignKey('divisions.id'))

    cbu_department = relationship('Department', primaryjoin='PropertySearchOrder.cbu_department_id == Department.id',
                                  backref='department_property_search_orders')
    cbu_division = relationship('Division', primaryjoin='PropertySearchOrder.cbu_division_id == Division.id',
                                backref='division_property_search_orders')
    cbu = relationship('StaffUser', primaryjoin='PropertySearchOrder.cbu_id == StaffUser.id',
                       backref='staffuser_staffuser_property_search_orders')
    ru_department = relationship('Department', primaryjoin='PropertySearchOrder.ru_department_id == Department.id',
                                 backref='department_property_search_orders_0')
    ru_division = relationship('Division', primaryjoin='PropertySearchOrder.ru_division_id == Division.id',
                               backref='division_property_search_orders_0')
    ru = relationship('StaffUser', primaryjoin='PropertySearchOrder.ru_id == StaffUser.id',
                      backref='staffuser_staffuser_property_search_orders_0')
    updated_by_user = relationship('StaffUser', primaryjoin='PropertySearchOrder.updated_by_user_id == StaffUser.id',
                                   backref='properties_search_orders_updated_by_user')


class Region(db.Model):
    __tablename__ = 'regions'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)
    kind_name = Column(String(255))
    aliases = Column(ArrayForCIText(CIText), nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    place_type = Column(
        ENUM('country', 'administrative_area', 'locality', 'sub_locality', 'route', 'district', 'settlement',
             'subway', name='place_type'), nullable=False, server_default=FetchedValue())
    property_categories = Column(ArrayForEnum(ENUM('commercial', 'city', 'country', name='property_category')),
                                 nullable=False, server_default=FetchedValue())
    country_id = Column(ForeignKey('countries.id'), nullable=False)

    country = relationship('Country', primaryjoin='Region.country_id == Country.id', backref='regions')


class Right(db.Model):
    __tablename__ = 'rights'
    __table_args__ = (
        Index('idx_rights_resource_action_scope', 'resource', 'action'),
    )

    id = Column(UUID, primary_key=True, server_default=FetchedValue())
    name = Column(String(255), nullable=False, unique=True)
    resource = Column(ENUM('users', 'users_invite', 'any', name='right_resource'), nullable=False)
    action = Column(ENUM('list', 'show', 'create', 'update', 'destroy', 'any', name='right_action'),
                    nullable=False)
    scope = Column(ArrayForEnum(ENUM('all', 'own', name='right_scope')), nullable=False)


class Role(db.Model):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False, unique=True)
    permissions = Column(HSTORE(Text()), nullable=False)
    is_admin = Column(Boolean, nullable=False)


class Route(db.Model):
    __tablename__ = 'routes'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)
    kind_name = Column(String(255))
    aliases = Column(ArrayForCIText(CIText), nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    place_type = Column(
        ENUM('country', 'administrative_area', 'locality', 'sub_locality', 'route', 'district', 'settlement',
             'subway', name='place_type'), nullable=False, server_default=FetchedValue())
    property_categories = Column(ArrayForEnum(ENUM('commercial', 'city', 'country', name='property_category')),
                                 nullable=False, server_default=FetchedValue())
    region_id = Column(ForeignKey('regions.id'), nullable=False)
    country_id = Column(ForeignKey('countries.id'), nullable=False)
    meta = Column(JSON)

    country = relationship('Country', primaryjoin='Route.country_id == Country.id', backref='routes')
    region = relationship('Region', primaryjoin='Route.region_id == Region.id', backref='routes')


class Selection(db.Model):
    __tablename__ = 'selections'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False, unique=True)
    site = Column(ENUM('jqestate', 'rublevka', 'riga', 'minka', 'kievka', name='site'), nullable=False)
    property_category = Column(ENUM('commercial', 'city', 'country', name='property_category'), nullable=False)
    property_ids = Column(ARRAY(Integer()), nullable=False)
    ru_id = Column(ForeignKey('staff_users.id'), nullable=False)
    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    created_at = Column(DateTime(True), nullable=False)
    updated_at = Column(DateTime(True))
    pages = Column(ArrayForEnum(ENUM('index', 'properties', 'property', 'settlement', name='page')), nullable=False,
                   server_default=FetchedValue())
    photo = Column(String(255))
    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    state = Column(ENUM('draft', 'public', name='model_state'), nullable=False)
    description = Column(Text)
    title = Column(Text, nullable=False, server_default=FetchedValue())
    offer_kind = Column(ENUM('rent', 'purchase', name='offer_kind'), nullable=False,
                        server_default=FetchedValue())

    created_by_user = relationship('StaffUser', primaryjoin='Selection.created_by_user_id == StaffUser.id',
                                   backref='selections_created_by_user')
    ru = relationship('StaffUser', primaryjoin='Selection.ru_id == StaffUser.id',
                      backref='staffuser_staffuser_selections_0')
    updated_by_user = relationship('StaffUser', primaryjoin='Selection.updated_by_user_id == StaffUser.id',
                                   backref='selections_updated_by_user')


class SettlementContactLink(db.Model):
    __tablename__ = 'settlement_contact_links'

    settlement_id = Column(Integer, primary_key=True, nullable=False)
    linked_contact_id = Column(Integer, primary_key=True, nullable=False)
    kind_id = Column(Integer, nullable=False)


class Settlement(db.Model):
    __tablename__ = 'settlements'
    __table_args__ = (
        CheckConstraint("kind_dictionary_kind = 'settlement_type'::public.dictionary_kind"),
        ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind']),
        Index('settlements_l_locality_id_name_idx', 'l_locality_id', 'name')
    )

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False, index=True)
    kind_name = Column(String(255))
    aliases = Column(ArrayForCIText(CIText), nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    place_type = Column(
        ENUM('country', 'administrative_area', 'locality', 'sub_locality', 'route', 'district', 'settlement',
             'subway', name='place_type'), nullable=False, server_default=FetchedValue())
    property_categories = Column(ArrayForEnum(ENUM('commercial', 'city', 'country', name='property_category')),
                                 nullable=False, server_default=FetchedValue())
    state = Column(ENUM('draft', 'public', name='model_state'), nullable=False)
    kind_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    kind_dictionary_id = Column(Integer)
    main_sale_description = Column(Text)
    satellite_sale_description = Column(Text)
    images = Column(JSON, nullable=False, server_default=FetchedValue())
    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    updated_by_user_id = Column(ForeignKey('staff_users.id'))
    l_linked_locality_ids = Column(ARRAY(Integer()), nullable=False, server_default=FetchedValue())
    l_mkad_distance = Column(SmallInteger)
    l_country_id = Column(ForeignKey('countries.id'), nullable=False)
    l_region_id = Column(ForeignKey('regions.id'), nullable=False)
    l_district_id = Column(ForeignKey('districts.id'))
    l_locality_id = Column(ForeignKey('localities.id'), nullable=False)
    d_foundation_year = Column(SmallInteger)
    d_area = Column(Float)
    d_power_supply = Column(SmallInteger)
    d_water_supply = Column(ENUM('purification', 'central', 'well', name='water_type'))
    d_gas_supply = Column(ENUM('without_gas', 'gas_holder', 'near_border', 'mains', 'diesel', name='gas_type'))
    d_sewerage_supply = Column(ENUM('central', 'septic', name='sewerage_type'))
    d_external_infrastructure = Column(ARRAY(VARCHAR(length=255)), nullable=False, server_default=FetchedValue())
    d_internal_infrastructure = Column(ARRAY(VARCHAR(length=255)), nullable=False, server_default=FetchedValue())
    l_route_id = Column(ForeignKey('routes.id'))
    pd_so_kind = Column(ENUM('direct_sell', 'trade_in', 'changing', 'fl214', 'assignment', name='sale_offer_kind'))
    pd_so_is_bargain = Column(Boolean)
    pd_so_is_installment = Column(Boolean)
    pd_so_is_mortgage = Column(Boolean)
    pd_so_agent_fee = Column(Float)
    pd_so_agent_fixed_price = Column(BigInteger)
    pd_so_agent_fixed_price_currency = Column(ENUM('RUB', 'USD', 'EUR', name='currency'))
    ru_id = Column(ForeignKey('staff_users.id'))
    ru_department_id = Column(Integer)
    ru_division_id = Column(Integer)
    # l_pos = Column(NullType)  # type: geography
    s_land_area_from = Column(Float, nullable=False, server_default=FetchedValue())
    s_land_area_to = Column(Float, nullable=False, server_default=FetchedValue())
    s_house_area_from = Column(Float, nullable=False, server_default=FetchedValue())
    s_house_area_to = Column(Float, nullable=False, server_default=FetchedValue())
    s_properties_so_total = Column(Integer, nullable=False, server_default=FetchedValue())
    s_properties_so_primary = Column(Integer, nullable=False, server_default=FetchedValue())
    s_properties_so_resale = Column(Integer, nullable=False, server_default=FetchedValue())
    s_properties_ro_total = Column(Integer, nullable=False, server_default=FetchedValue())
    s_mcp_so_from_rub = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_so_from_usd = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_so_from_eur = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_so_to_rub = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_so_to_usd = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_so_to_eur = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_ro_from_rub = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_ro_from_usd = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_ro_from_eur = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_ro_to_rub = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_ro_to_usd = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_mcp_ro_to_eur = Column(BigInteger, nullable=False, server_default=FetchedValue())
    s_properties_total = Column(Integer, nullable=False, server_default=FetchedValue())
    d_land_state = Column(
        ArrayForEnum(ENUM('individual_housing', 'gardening_partnership', 'non_commercial_partnership',
                          name='settlement_land_state')), nullable=False, server_default=FetchedValue())
    main_rent_description = Column(Text)
    satellite_rent_description = Column(Text)
    meta = Column(JSON)

    created_by_user = relationship('StaffUser', primaryjoin='Settlement.created_by_user_id == StaffUser.id',
                                   backref='settlement_created_by_user')
    kind_dictionary = relationship('DictionaryItem',
                                   primaryjoin='and_(Settlement.kind_dictionary_id == DictionaryItem.id, Settlement.kind_dictionary_kind == DictionaryItem.kind)',
                                   backref='settlements')
    l_country = relationship('Country', primaryjoin='Settlement.l_country_id == Country.id', backref='settlements')
    l_district = relationship('District', primaryjoin='Settlement.l_district_id == District.id',
                              backref='settlements')
    l_locality = relationship('Locality', primaryjoin='Settlement.l_locality_id == Locality.id',
                              backref='settlements')
    l_region = relationship('Region', primaryjoin='Settlement.l_region_id == Region.id', backref='settlements')
    l_route = relationship('Route', primaryjoin='Settlement.l_route_id == Route.id', backref='settlements')
    ru = relationship('StaffUser', primaryjoin='Settlement.ru_id == StaffUser.id',
                      backref='staffuser_staffuser_settlements_0')
    updated_by_user = relationship('StaffUser', primaryjoin='Settlement.updated_by_user_id == StaffUser.id',
                                   backref='settlement_updated_by_user')


class SmsNotification(db.Model):
    __tablename__ = 'sms_notifications'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM('pending', 'sent', 'failed', name='sms_notification_state'), nullable=False)
    reject_reason = Column(Text)
    text = Column(Text, nullable=False)
    phone_number = Column(String(255), nullable=False)
    created_at = Column(DateTime(True), nullable=False)
    sent_at = Column(DateTime(True))


class Snapshot(db.Model):
    __tablename__ = 'snapshot'

    persistence_id = Column(String(255), primary_key=True, nullable=False)
    sequence_number = Column(BigInteger, primary_key=True, nullable=False)
    created = Column(BigInteger, nullable=False)
    snapshot = Column(LargeBinary, nullable=False)


class SpatialRefSy(db.Model):
    __tablename__ = 'spatial_ref_sys'
    __table_args__ = (
        CheckConstraint('(srid > 0) AND (srid <= 998999)'),
    )

    srid = Column(Integer, primary_key=True)
    auth_name = Column(String(256))
    auth_srid = Column(Integer)
    srtext = Column(String(2048))
    proj4text = Column(String(2048))


class StaffUserDocument(db.Model):
    __tablename__ = 'staff_user_documents'
    __table_args__ = (
        CheckConstraint("kind_dictionary_kind = 'staff_document_type'::public.dictionary_kind"),
        ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                             ['dictionary_items.id', 'dictionary_items.kind'])
    )

    id = Column(UUID, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM('available', 'deleted', name='document_state'), nullable=False)
    filename = Column(String(255))
    aes_key = Column(LargeBinary, nullable=False)
    iv_bytes = Column(LargeBinary, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    uploader_id = Column(Integer, nullable=False)
    user_id = Column(ForeignKey('staff_users.id', ondelete='CASCADE'), nullable=False)
    kind_dictionary_kind = Column(
        ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
             'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation', 'contact_job_role',
             'contact_position', 'contact_document_type', 'complex_building_document_type', 'settlement_type',
             'settlement_external_infrastructure', 'settlement_internal_infrastructure', 'settlement_document_type',
             'deal_contact_type', 'property_contract_type', 'property_banner', 'place_contact_type',
             'client_lead_targeted_reject_reason', 'client_lead_non_targeted_reject_reason', 'spam_reason',
             name='dictionary_kind'), nullable=False, server_default=FetchedValue())
    kind_dictionary_id = Column(Integer)

    kind_dictionary = relationship('DictionaryItem',
                                   primaryjoin='and_(StaffUserDocument.kind_dictionary_id == DictionaryItem.id, StaffUserDocument.kind_dictionary_kind == DictionaryItem.kind)',
                                   backref='staff_user_documents')
    user = relationship('StaffUser', primaryjoin='StaffUserDocument.user_id == StaffUser.id',
                        backref='staff_user_documents')


class StaffUser(db.Model):
    __tablename__ = 'staff_users'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    email = Column(String(255), nullable=False)
    state = Column(ENUM('active', 'inactive', 'invited', name='user_state'), nullable=False)
    password_hash = Column(String(255))
    photo = Column(String(255))
    first_name = Column(CIText)
    last_name = Column(CIText)
    work_phone_number = Column(String(25))
    personal_phone_number = Column(String(255))
    personal_email = Column(String(255))
    middle_name = Column(String(255))
    started_work_at = Column(Date, nullable=False)
    finished_work_at = Column(Date)
    is_manager = Column(Boolean, nullable=False, server_default=FetchedValue())
    d_ad_phone_numbers = Column(ARRAY(VARCHAR(length=255)), nullable=False, server_default=FetchedValue())
    d_notifications = Column(HSTORE(Text()), nullable=False, server_default=FetchedValue())
    member = Column(ENUM('agent', 'top_manager', 'back_office', name='staff_user_member'))
    experience_years = Column(SmallInteger)
    education = Column(String(255))
    description = Column(Text)
    is_public = Column(Boolean, nullable=False, server_default=FetchedValue())

    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())

    department_id = Column(ForeignKey('departments.id'), nullable=False)
    department = relationship('Department', foreign_keys=department_id, backref='staff_users')

    division_id = Column(ForeignKey('divisions.id'))
    division = relationship('Division', foreign_keys=division_id, backref='staff_users')

    role_id = Column(ForeignKey('roles.id'))
    role = relationship('Role', foreign_keys=role_id, backref='staff_users')


class SubLocality(db.Model):
    __tablename__ = 'sub_localities'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)
    kind_name = Column(String(255))
    aliases = Column(ArrayForCIText(CIText), nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    place_type = Column(
        ENUM('country', 'administrative_area', 'locality', 'sub_locality', 'route', 'district', 'settlement',
             'subway', name='place_type'), nullable=False, server_default=FetchedValue())
    property_categories = Column(ArrayForEnum(ENUM('commercial', 'city', 'country', name='property_category')),
                                 nullable=False, server_default=FetchedValue())

    country_id = Column(ForeignKey('countries.id'), nullable=False)
    country = relationship('Country', foreign_keys=country_id, backref='sub_localities')

    region_id = Column(ForeignKey('regions.id'), nullable=False)
    region = relationship('Region', foreign_keys=region_id, backref='sub_localities')

    district_id = Column(ForeignKey('districts.id'))
    district = relationship('District', foreign_keys=district_id, backref='sub_localities')

    locality_id = Column(ForeignKey('localities.id'), nullable=False)
    locality = relationship('Locality', foreign_keys=locality_id, backref='sub_localities')


class Subway(db.Model):
    __tablename__ = 'subways'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    name = Column(CIText, nullable=False)
    kind_name = Column(String(255))
    aliases = Column(ArrayForCIText(CIText), nullable=False, server_default=FetchedValue())
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    place_type = Column(
        ENUM('country', 'administrative_area', 'locality', 'sub_locality', 'route', 'district', 'settlement',
             'subway', name='place_type'), nullable=False, server_default=FetchedValue())
    property_categories = Column(ArrayForEnum(ENUM('commercial', 'city', 'country', name='property_category')),
                                 nullable=False, server_default=FetchedValue())
    sub_locality_id = Column(ForeignKey('sub_localities.id'), nullable=False)

    sub_locality = relationship('SubLocality', primaryjoin='Subway.sub_locality_id == SubLocality.id',
                                backref='subways')


class TaskDocument(db.Model):
    __tablename__ = 'task_documents'

    id = Column(UUID, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM('available', 'deleted', name='document_state'), nullable=False)
    filename = Column(String(255))
    aes_key = Column(LargeBinary, nullable=False)
    iv_bytes = Column(LargeBinary, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    uploader_id = Column(Integer, nullable=False)
    task_id = Column(ForeignKey('tasks.id'), nullable=False)
    archiver_id = Column(ForeignKey('staff_users.id'))
    archived_at = Column(DateTime(True))

    archiver = relationship('StaffUser', primaryjoin='TaskDocument.archiver_id == StaffUser.id',
                            backref='task_documents')
    task = relationship('Task', primaryjoin='TaskDocument.task_id == Task.id', backref='task_documents')


class Task(db.Model):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    state = Column(ENUM('to_do', 'done', 'canceled', name='task_state'), nullable=False)
    result = Column(Text)
    d_goal = Column(Text)
    d_property_id = Column(Integer)
    deadline = Column(DateTime(True), nullable=False)
    kind = Column(ENUM('preview', 'call', 'email', 'sms', 'meeting', 'free', 'negotiation', name='task_kind'),
                  nullable=False)
    d_link_kind = Column(ENUM('client_lead', 'property', 'deal', name='task_link_kind'))
    d_property_category = Column(ENUM('commercial', 'city', 'country', name='property_category'))
    d_title = Column(String(255))
    sd_to_approve = Column(ENUM('to_do', 'done', 'canceled', name='task_state'))
    d_is_document_attached = Column(Boolean)
    weight = Column(SmallInteger, nullable=False)
    pcd_status = Column(ENUM('in_progress', 'successful', 'unsuccessful', 'to_do', name='phone_call_status'))
    pcd_duration = Column(Integer)
    pcd_call_recording_url = Column(Text)
    pcd_reason = Column(String(255))

    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())

    d_archived_document_id = Column(ForeignKey('task_documents.id'))
    d_archived_document = relationship('TaskDocument', foreign_keys=d_archived_document_id, backref='tasks')

    # d_client_lead_id = Column(ForeignKey('client_leads.id'))
    # d_client_lead = relationship('ClientLead', backref='tasks')

    d_contact_id = Column(ForeignKey('contacts.id'))
    d_contact = relationship('Contact', foreign_keys=d_contact_id, backref='tasks')

    d_deal_id = Column(ForeignKey('deals.id'))
    d_deal = relationship('Deal', foreign_keys=d_deal_id, backref='tasks')

    ru_id = Column(ForeignKey('staff_users.id'), nullable=False, index=True)
    ru = relationship('StaffUser', foreign_keys=ru_id, backref='tasks')

    ru_department_id = Column(ForeignKey('departments.id'), index=True)
    ru_department = relationship('Department', foreign_keys=ru_department_id, backref='tasks')

    ru_division_id = Column(ForeignKey('divisions.id'), index=True)
    ru_division = relationship('Division', foreign_keys=ru_division_id, backref='tasks')

    created_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    created_by_user = relationship('StaffUser', foreign_keys=created_by_user_id, backref='staffuser_tasks')

    reported_by_user_id = Column(ForeignKey('staff_users.id'), nullable=False)
    reported_by_user = relationship('StaffUser', foreign_keys=reported_by_user_id, backref='tasts_reported_by_me')


class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, server_default=FetchedValue())
    email = Column(String(255), nullable=False)
    state = Column(ENUM('active', 'inactive', 'invited', name='user_state'), nullable=False)
    password_hash = Column(String(255))
    photo = Column(String(255))
    first_name = Column(CIText)
    last_name = Column(CIText)
    work_phone_number = Column(String(25))
    personal_phone_number = Column(String(255))
    personal_email = Column(String(255))
    middle_name = Column(String(255))
    created_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
    updated_at = Column(DateTime(True), nullable=False, server_default=FetchedValue())
