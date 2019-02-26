from sqlalchemy import Table, Column, Index, ForeignKey, ARRAY, BigInteger, Boolean, CheckConstraint, Date, DateTime, \
    Float, ForeignKeyConstraint, Integer, LargeBinary, String, Text
from sqlalchemy.dialects.postgresql import ENUM, UUID, DOUBLE_PRECISION
from sqlalchemy.sql.sqltypes import NullType
from sqlalchemy.schema import FetchedValue

from .core import db

t_deleted_to = Table(
    'deleted_to', db.metadata,
    Column('persistence_id', String(255), nullable=False),
    Column('deleted_to', BigInteger, nullable=False)
)

t_export_error_logs = Table(
    'export_error_logs', db.metadata,
    Column('id', Integer, nullable=False, server_default=FetchedValue()),
    Column('package_id', Integer, nullable=False),
    Column('reason', String(255), nullable=False),
    Column('created_at', DateTime(True), nullable=False),
    Column('params', ARRAY(Text())),
    Column('property_ids', ARRAY(Integer()), nullable=False, server_default=FetchedValue()),
    Index('export_error_logs_package_id_params_created_at_idx', 'package_id', 'params', 'created_at')
)

t_property_contracts = Table(
    'property_contracts', db.metadata,
    Column('id', UUID, nullable=False, server_default=FetchedValue()),
    Column('state', ENUM('available', 'deleted', name='document_state'), nullable=False),
    Column('filename', String(255)),
    Column('aes_key', LargeBinary, nullable=False),
    Column('iv_bytes', LargeBinary, nullable=False),
    Column('comment', Text),
    Column('created_at', DateTime(True), nullable=False, server_default=FetchedValue()),
    Column('updated_at', DateTime(True), nullable=False, server_default=FetchedValue()),
    Column('uploader_id', Integer, nullable=False),
    Column('property_id', Integer, nullable=False),
    Column('valid_from', Date),
    Column('valid_to', Date),
    Column('signed_by_id', ForeignKey('staff_users.id')),
    Column('kind_dictionary_kind',
           ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
                'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation',
                'contact_job_role', 'contact_position', 'contact_document_type', 'complex_building_document_type',
                'settlement_type', 'settlement_external_infrastructure', 'settlement_internal_infrastructure',
                'settlement_document_type', 'deal_contact_type', 'property_contract_type', 'property_banner',
                'place_contact_type', 'client_lead_targeted_reject_reason',
                'client_lead_non_targeted_reject_reason', 'spam_reason', name='dictionary_kind'), nullable=False,
           server_default=FetchedValue()),
    Column('kind_dictionary_id', Integer),
    CheckConstraint("kind_dictionary_kind = 'property_contract_type'::public.dictionary_kind"),
    ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                         ['dictionary_items.id', 'dictionary_items.kind'])
)

t_property_documents = Table(
    'property_documents', db.metadata,
    Column('id', UUID, nullable=False, server_default=FetchedValue()),
    Column('state', ENUM('available', 'deleted', name='document_state'), nullable=False),
    Column('filename', String(255)),
    Column('aes_key', LargeBinary, nullable=False),
    Column('iv_bytes', LargeBinary, nullable=False),
    Column('comment', Text),
    Column('created_at', DateTime(True), nullable=False, server_default=FetchedValue()),
    Column('updated_at', DateTime(True), nullable=False, server_default=FetchedValue()),
    Column('uploader_id', Integer, nullable=False),
    Column('property_id', Integer, nullable=False),
    Column('kind_dictionary_kind',
           ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
                'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation',
                'contact_job_role', 'contact_position', 'contact_document_type', 'complex_building_document_type',
                'settlement_type', 'settlement_external_infrastructure', 'settlement_internal_infrastructure',
                'settlement_document_type', 'deal_contact_type', 'property_contract_type', 'property_banner',
                'place_contact_type', 'client_lead_targeted_reject_reason',
                'client_lead_non_targeted_reject_reason', 'spam_reason', name='dictionary_kind'), nullable=False,
           server_default=FetchedValue()),
    Column('kind_dictionary_id', Integer),
    CheckConstraint("kind_dictionary_kind = 'property_document_type'::public.dictionary_kind"),
    ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                         ['dictionary_items.id', 'dictionary_items.kind'])
)


t_settlement_documents = Table(
    'settlement_documents', db.metadata,
    Column('id', UUID, nullable=False, server_default=FetchedValue()),
    Column('state', ENUM('available', 'deleted', name='document_state'), nullable=False),
    Column('filename', String(255)),
    Column('aes_key', LargeBinary, nullable=False),
    Column('iv_bytes', LargeBinary, nullable=False),
    Column('comment', Text),
    Column('created_at', DateTime(True), nullable=False, server_default=FetchedValue()),
    Column('updated_at', DateTime(True), nullable=False, server_default=FetchedValue()),
    Column('uploader_id', Integer, nullable=False),
    Column('settlement_id', ForeignKey('settlements.id'), nullable=False),
    Column('kind_dictionary_kind',
           ENUM('staff_document_type', 'contact_link_type', 'department', 'position', 'property_document_type',
                'property_contact_link_type', 'auto_brand', 'auto_model', 'contact_occupation',
                'contact_job_role', 'contact_position', 'contact_document_type', 'complex_building_document_type',
                'settlement_type', 'settlement_external_infrastructure', 'settlement_internal_infrastructure',
                'settlement_document_type', 'deal_contact_type', 'property_contract_type', 'property_banner',
                'place_contact_type', 'client_lead_targeted_reject_reason',
                'client_lead_non_targeted_reject_reason', 'spam_reason', name='dictionary_kind'), nullable=False,
           server_default=FetchedValue()),
    Column('kind_dictionary_id', Integer),
    CheckConstraint("kind_dictionary_kind = 'settlement_document_type'::public.dictionary_kind"),
    ForeignKeyConstraint(['kind_dictionary_id', 'kind_dictionary_kind'],
                         ['dictionary_items.id', 'dictionary_items.kind'])
)
