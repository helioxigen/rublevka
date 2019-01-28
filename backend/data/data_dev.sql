--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1 (Debian 11.1-1.pgdg90+1)
-- Dumped by pg_dump version 11.1 (Debian 11.1-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: banner_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.banner_state AS ENUM (
    'ordered',
    'active',
    'removed',
    'denied'
);


ALTER TYPE public.banner_state OWNER TO postgres;

--
-- Name: bathroom; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.bathroom AS ENUM (
    'separated',
    'combined'
);


ALTER TYPE public.bathroom OWNER TO jq;

--
-- Name: client_lead_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.client_lead_kind AS ENUM (
    'phone_call',
    'online',
    'recommendation'
);


ALTER TYPE public.client_lead_kind OWNER TO postgres;

--
-- Name: client_lead_request_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.client_lead_request_kind AS ENUM (
    'selling',
    'purchase'
);


ALTER TYPE public.client_lead_request_kind OWNER TO postgres;

--
-- Name: client_lead_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.client_lead_state AS ENUM (
    'in_progress',
    'processed',
    'rejected',
    'new',
    'spam'
);


ALTER TYPE public.client_lead_state OWNER TO postgres;

--
-- Name: comment_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.comment_state AS ENUM (
    'available',
    'deleted'
);


ALTER TYPE public.comment_state OWNER TO postgres;

--
-- Name: company_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.company_state AS ENUM (
    'active',
    'closed'
);


ALTER TYPE public.company_state OWNER TO postgres;

--
-- Name: complex_building_construction_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.complex_building_construction_kind AS ENUM (
    'brick',
    'monolith',
    'panel',
    'brick_monolithic'
);


ALTER TYPE public.complex_building_construction_kind OWNER TO postgres;

--
-- Name: complex_building_construction_stage; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.complex_building_construction_stage AS ENUM (
    'in_progress',
    'not_delivered_yet',
    'done'
);


ALTER TYPE public.complex_building_construction_stage OWNER TO postgres;

--
-- Name: complex_building_contract_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.complex_building_contract_type AS ENUM (
    'ddu',
    'dvou',
    'assignation',
    'dkp',
    'pdkp',
    'investment'
);


ALTER TYPE public.complex_building_contract_type OWNER TO postgres;

--
-- Name: complex_building_house_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.complex_building_house_kind AS ENUM (
    'new',
    'khrushchevka',
    'stalinka'
);


ALTER TYPE public.complex_building_house_kind OWNER TO postgres;

--
-- Name: complex_building_security; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.complex_building_security AS ENUM (
    'protected_area',
    'guarded'
);


ALTER TYPE public.complex_building_security OWNER TO postgres;

--
-- Name: complex_building_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.complex_building_state AS ENUM (
    'draft',
    'public'
);


ALTER TYPE public.complex_building_state OWNER TO postgres;

--
-- Name: contact_kind; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.contact_kind AS ENUM (
    'client',
    'agent',
    'owner',
    'spam'
);


ALTER TYPE public.contact_kind OWNER TO jq;

--
-- Name: contact_state; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.contact_state AS ENUM (
    'active',
    'archive'
);


ALTER TYPE public.contact_state OWNER TO jq;

--
-- Name: csi_question_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.csi_question_kind AS ENUM (
    'image',
    'selection',
    'property_search_order'
);


ALTER TYPE public.csi_question_kind OWNER TO postgres;

--
-- Name: currency; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.currency AS ENUM (
    'RUB',
    'USD',
    'EUR'
);


ALTER TYPE public.currency OWNER TO postgres;

--
-- Name: deal_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.deal_state AS ENUM (
    'presentation',
    'negotiation',
    'deposit_paid',
    'agreement',
    'successful',
    'unsuccessful'
);


ALTER TYPE public.deal_state OWNER TO postgres;

--
-- Name: dictionary_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.dictionary_kind AS ENUM (
    'staff_document_type',
    'contact_link_type',
    'department',
    'position',
    'property_document_type',
    'property_contact_link_type',
    'auto_brand',
    'auto_model',
    'contact_occupation',
    'contact_job_role',
    'contact_position',
    'contact_document_type',
    'complex_building_document_type',
    'settlement_type',
    'settlement_external_infrastructure',
    'settlement_internal_infrastructure',
    'settlement_document_type',
    'deal_contact_type',
    'property_contract_type',
    'property_banner',
    'place_contact_type',
    'client_lead_targeted_reject_reason',
    'client_lead_non_targeted_reject_reason',
    'spam_reason'
);


ALTER TYPE public.dictionary_kind OWNER TO postgres;

--
-- Name: document_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.document_state AS ENUM (
    'available',
    'deleted'
);


ALTER TYPE public.document_state OWNER TO postgres;

--
-- Name: event_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.event_kind AS ENUM (
    'responsible_user_change',
    'property_pdf_export',
    'property_created',
    'property_updated'
);


ALTER TYPE public.event_kind OWNER TO postgres;

--
-- Name: export_package_format; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.export_package_format AS ENUM (
    'avito',
    'cian',
    'yandex_realty'
);


ALTER TYPE public.export_package_format OWNER TO postgres;

--
-- Name: export_package_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.export_package_state AS ENUM (
    'active',
    'deleted'
);


ALTER TYPE public.export_package_state OWNER TO postgres;

--
-- Name: gas_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gas_type AS ENUM (
    'without_gas',
    'gas_holder',
    'near_border',
    'mains',
    'diesel'
);


ALTER TYPE public.gas_type OWNER TO postgres;

--
-- Name: images_order_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.images_order_kind AS ENUM (
    'image',
    'layout'
);


ALTER TYPE public.images_order_kind OWNER TO postgres;

--
-- Name: images_order_object_klass; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.images_order_object_klass AS ENUM (
    'city_property',
    'country_property',
    'settlement',
    'images_order'
);


ALTER TYPE public.images_order_object_klass OWNER TO jq;

--
-- Name: images_order_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.images_order_state AS ENUM (
    'new',
    'rejected',
    'in_progress',
    'done',
    'finished',
    'approved'
);


ALTER TYPE public.images_order_state OWNER TO postgres;

--
-- Name: landscape_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.landscape_kind AS ENUM (
    'field',
    'near_forest',
    'near_water',
    'forest'
);


ALTER TYPE public.landscape_kind OWNER TO postgres;

--
-- Name: layout_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.layout_kind AS ENUM (
    'attic',
    'base',
    'floor'
);


ALTER TYPE public.layout_kind OWNER TO postgres;

--
-- Name: model_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.model_state AS ENUM (
    'draft',
    'public'
);


ALTER TYPE public.model_state OWNER TO postgres;

--
-- Name: newsletter_state; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.newsletter_state AS ENUM (
    'scheduled',
    'sent',
    'draft'
);


ALTER TYPE public.newsletter_state OWNER TO jq;

--
-- Name: object_klass; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.object_klass AS ENUM (
    'client_lead',
    'deal',
    'city_property',
    'country_property',
    'images_order',
    'property_search_order',
    'property_removal_order',
    'task',
    'complex',
    'complex_building',
    'settlement'
);


ALTER TYPE public.object_klass OWNER TO postgres;

--
-- Name: offer_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.offer_kind AS ENUM (
    'rent',
    'purchase'
);


ALTER TYPE public.offer_kind OWNER TO postgres;

--
-- Name: page; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.page AS ENUM (
    'index',
    'properties',
    'property',
    'settlement'
);


ALTER TYPE public.page OWNER TO jq;

--
-- Name: phone_call_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.phone_call_status AS ENUM (
    'in_progress',
    'successful',
    'unsuccessful',
    'to_do'
);


ALTER TYPE public.phone_call_status OWNER TO postgres;

--
-- Name: place_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.place_type AS ENUM (
    'country',
    'administrative_area',
    'locality',
    'sub_locality',
    'route',
    'district',
    'settlement',
    'subway'
);


ALTER TYPE public.place_type OWNER TO postgres;

--
-- Name: property_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_category AS ENUM (
    'commercial',
    'city',
    'country'
);


ALTER TYPE public.property_category OWNER TO postgres;

--
-- Name: property_condition; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_condition AS ENUM (
    'great',
    'good',
    'normal',
    'bad'
);


ALTER TYPE public.property_condition OWNER TO postgres;

--
-- Name: property_conditioning; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_conditioning AS ENUM (
    'central',
    'own',
    'absent'
);


ALTER TYPE public.property_conditioning OWNER TO postgres;

--
-- Name: property_equipment; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_equipment AS ENUM (
    'internet',
    'phone',
    'tv',
    'security_signaling',
    'cable_tv',
    'washmachine',
    'intercom',
    'fridge',
    'dishwasher',
    'appliances'
);


ALTER TYPE public.property_equipment OWNER TO postgres;

--
-- Name: property_furniture; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_furniture AS ENUM (
    'full',
    'partial',
    'absent'
);


ALTER TYPE public.property_furniture OWNER TO postgres;

--
-- Name: property_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_kind AS ENUM (
    'flat',
    'room',
    'house',
    'land',
    'office',
    'warehouse',
    'townhouse',
    'apartment',
    'private',
    'penthouse',
    'commercial_space'
);


ALTER TYPE public.property_kind OWNER TO postgres;

--
-- Name: property_layout; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_layout AS ENUM (
    'open',
    'adjacent',
    'isolated'
);


ALTER TYPE public.property_layout OWNER TO postgres;

--
-- Name: property_removal_order_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_removal_order_kind AS ENUM (
    'lost',
    'duplicate'
);


ALTER TYPE public.property_removal_order_kind OWNER TO postgres;

--
-- Name: property_removal_order_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_removal_order_state AS ENUM (
    'new',
    'rejected',
    'approved',
    'finished'
);


ALTER TYPE public.property_removal_order_state OWNER TO postgres;

--
-- Name: property_renovate; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_renovate AS ENUM (
    'design',
    'rough_finish',
    'full_construction',
    'partly_turnkey',
    'for_finishing',
    'raw'
);


ALTER TYPE public.property_renovate OWNER TO postgres;

--
-- Name: property_search_order_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_search_order_state AS ENUM (
    'new',
    'rejected',
    'approved',
    'finished',
    'assigned',
    'in_progress',
    'done'
);


ALTER TYPE public.property_search_order_state OWNER TO postgres;

--
-- Name: property_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_state AS ENUM (
    'draft',
    'public',
    'postponed',
    'sold',
    'rented',
    'private',
    'deleted'
);


ALTER TYPE public.property_state OWNER TO postgres;

--
-- Name: property_ventilation; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_ventilation AS ENUM (
    'central',
    'own',
    'absent'
);


ALTER TYPE public.property_ventilation OWNER TO postgres;

--
-- Name: property_windows; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_windows AS ENUM (
    'both',
    'street',
    'courtyard'
);


ALTER TYPE public.property_windows OWNER TO postgres;

--
-- Name: quarter; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.quarter AS ENUM (
    'first',
    'second',
    'third',
    'fourth'
);


ALTER TYPE public.quarter OWNER TO postgres;

--
-- Name: rent_period; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.rent_period AS ENUM (
    'day',
    'month',
    'year'
);


ALTER TYPE public.rent_period OWNER TO postgres;

--
-- Name: right_action; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.right_action AS ENUM (
    'list',
    'show',
    'create',
    'update',
    'destroy',
    'any'
);


ALTER TYPE public.right_action OWNER TO postgres;

--
-- Name: right_resource; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.right_resource AS ENUM (
    'users',
    'users_invite',
    'any'
);


ALTER TYPE public.right_resource OWNER TO postgres;

--
-- Name: right_scope; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.right_scope AS ENUM (
    'all',
    'own'
);


ALTER TYPE public.right_scope OWNER TO postgres;

--
-- Name: roof_material; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.roof_material AS ENUM (
    'steel',
    'soft_tile',
    'copper',
    'metal_tile',
    'slate',
    'tile',
    'rooftop'
);


ALTER TYPE public.roof_material OWNER TO postgres;

--
-- Name: sale_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.sale_kind AS ENUM (
    'primary',
    'resell'
);


ALTER TYPE public.sale_kind OWNER TO postgres;

--
-- Name: sale_offer_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.sale_offer_kind AS ENUM (
    'direct_sell',
    'trade_in',
    'changing',
    'fl214',
    'assignment'
);


ALTER TYPE public.sale_offer_kind OWNER TO postgres;

--
-- Name: settlement_land_state; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.settlement_land_state AS ENUM (
    'individual_housing',
    'gardening_partnership',
    'non_commercial_partnership'
);


ALTER TYPE public.settlement_land_state OWNER TO jq;

--
-- Name: sewerage_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.sewerage_type AS ENUM (
    'central',
    'septic'
);


ALTER TYPE public.sewerage_type OWNER TO postgres;

--
-- Name: site; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.site AS ENUM (
    'jqestate',
    'rublevka',
    'riga',
    'minka',
    'kievka'
);


ALTER TYPE public.site OWNER TO jq;

--
-- Name: sms_notification_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.sms_notification_state AS ENUM (
    'pending',
    'sent',
    'failed'
);


ALTER TYPE public.sms_notification_state OWNER TO postgres;

--
-- Name: sort_order; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.sort_order AS ENUM (
    'asc',
    'desc'
);


ALTER TYPE public.sort_order OWNER TO jq;

--
-- Name: staff_user_member; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.staff_user_member AS ENUM (
    'agent',
    'top_manager',
    'back_office'
);


ALTER TYPE public.staff_user_member OWNER TO jq;

--
-- Name: status_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_state AS ENUM (
    'disabled',
    'enabled'
);


ALTER TYPE public.status_state OWNER TO postgres;

--
-- Name: task_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_kind AS ENUM (
    'preview',
    'call',
    'email',
    'sms',
    'meeting',
    'free',
    'negotiation'
);


ALTER TYPE public.task_kind OWNER TO postgres;

--
-- Name: task_link_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_link_kind AS ENUM (
    'client_lead',
    'property',
    'deal'
);


ALTER TYPE public.task_link_kind OWNER TO postgres;

--
-- Name: task_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_state AS ENUM (
    'to_do',
    'done',
    'canceled'
);


ALTER TYPE public.task_state OWNER TO postgres;

--
-- Name: user_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_state AS ENUM (
    'active',
    'inactive',
    'invited'
);


ALTER TYPE public.user_state OWNER TO postgres;

--
-- Name: wall_material; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.wall_material AS ENUM (
    'blue_max',
    'wood',
    'brick',
    'block',
    'monolith',
    'canadian_sip'
);


ALTER TYPE public.wall_material OWNER TO postgres;

--
-- Name: water_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.water_type AS ENUM (
    'purification',
    'central',
    'well'
);


ALTER TYPE public.water_type OWNER TO postgres;

--
-- Name: watermark; Type: TYPE; Schema: public; Owner: jq
--

CREATE TYPE public.watermark AS ENUM (
    'jqestate',
    'rublevka',
    'riga',
    'presentation',
    'thumbnail'
);


ALTER TYPE public.watermark OWNER TO jq;

--
-- Name: zipal_package_predef_kind; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.zipal_package_predef_kind AS ENUM (
    'city',
    'country',
    'country_within_rublevskoe_and_illinskoe_routes'
);


ALTER TYPE public.zipal_package_predef_kind OWNER TO postgres;

--
-- Name: array_cat_agg(anyarray); Type: AGGREGATE; Schema: public; Owner: postgres
--

CREATE AGGREGATE public.array_cat_agg(anyarray) (
    SFUNC = array_cat,
    STYPE = anyarray
);


ALTER AGGREGATE public.array_cat_agg(anyarray) OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.applications (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    state public.status_state NOT NULL,
    token character varying(255) NOT NULL,
    role_id integer,
    responsible_user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer
);


ALTER TABLE public.applications OWNER TO postgres;

--
-- Name: applications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.applications_id_seq OWNER TO postgres;

--
-- Name: applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;


--
-- Name: cian_subways; Type: TABLE; Schema: public; Owner: jq
--

CREATE TABLE public.cian_subways (
    id integer NOT NULL,
    subway_id integer NOT NULL
);


ALTER TABLE public.cian_subways OWNER TO jq;

--
-- Name: properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.properties (
    id integer NOT NULL,
    ru_id integer NOT NULL,
    state public.property_state NOT NULL,
    kind public.property_kind,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer,
    images jsonb DEFAULT '[]'::json NOT NULL,
    client_lead_id integer,
    category public.property_category NOT NULL,
    layout_images jsonb DEFAULT '[]'::json NOT NULL,
    ro_price bigint,
    ro_currency public.currency,
    ro_agent_fee real,
    ro_agent_fixed_price integer,
    ro_agent_fixed_price_currency public.currency,
    ro_deposit smallint,
    ro_period public.rent_period,
    ro_is_allowed_pets boolean,
    ro_is_allowed_children boolean,
    so_price bigint,
    so_currency public.currency,
    so_agent_fee real,
    so_agent_fixed_price integer,
    so_agent_fixed_price_currency public.currency,
    so_kind public.sale_offer_kind,
    so_is_bargain boolean,
    so_is_mortgage boolean,
    so_is_installment boolean,
    linked_contact_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    note text,
    ru_department_id integer NOT NULL,
    ru_division_id integer,
    removal_order_id integer,
    sd_reason text,
    so_is_resale boolean,
    external_id character varying(255),
    l_cadastral_number character varying(255),
    badge_id integer,
    so_price_delta bigint,
    ro_price_delta bigint,
    so_is_disabled boolean,
    ro_is_disabled boolean
);


ALTER TABLE public.properties OWNER TO postgres;

--
-- Name: properties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.properties_id_seq OWNER TO postgres;

--
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.properties_id_seq OWNED BY public.properties.id;


--
-- Name: city_properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city_properties (
    id integer DEFAULT nextval('public.properties_id_seq'::regclass),
    equipment public.property_equipment[] DEFAULT ARRAY[]::public.property_equipment[] NOT NULL,
    complex_building_id integer,
    s_layout public.property_layout,
    s_ceil_height real,
    s_total_area real,
    s_living_area real,
    s_rooms smallint,
    s_wcs smallint,
    s_loggias integer,
    s_balconies integer,
    s_floor smallint,
    s_windows public.property_windows,
    i_renovate public.property_renovate,
    i_conditioning public.property_conditioning,
    i_condition public.property_condition,
    i_furniture public.property_furniture,
    i_ventilation public.property_ventilation,
    l_country_id integer,
    l_region_id integer,
    l_locality_id integer,
    l_sub_locality_id integer,
    l_street character varying(255),
    l_house character varying(255),
    l_housing character varying(255),
    l_building character varying(255),
    l_flat_number smallint,
    l_postal_code integer,
    l_kladr_id bigint,
    l_district_id integer,
    l_latitude character varying(255),
    l_longitude character varying(255),
    cbd_house_kind public.complex_building_house_kind,
    cbd_built_year smallint,
    cbd_series character varying(255),
    cbd_construction_kind public.complex_building_construction_kind,
    cbd_floors smallint,
    cbd_elevators smallint,
    cbd_freight_elevators smallint,
    cbd_parkings smallint,
    cbd_underground_garages smallint,
    cbd_security public.complex_building_security,
    cbd_with_rubbish_chute boolean,
    s_bedrooms smallint,
    s_panoramic_glazing boolean,
    l_entrance smallint,
    cbd_with_waste_disposal_room boolean,
    cbd_maintenance_costs bigint,
    complex_id integer,
    l_subway_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    i_bathroom public.bathroom,
    s_kitchen_area real
)
INHERITS (public.properties);


ALTER TABLE public.city_properties OWNER TO postgres;

--
-- Name: client_lead_sources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client_lead_sources (
    id integer NOT NULL,
    title character varying(255),
    slug character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer
);


ALTER TABLE public.client_lead_sources OWNER TO postgres;

--
-- Name: client_lead_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_lead_sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_lead_sources_id_seq OWNER TO postgres;

--
-- Name: client_lead_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_lead_sources_id_seq OWNED BY public.client_lead_sources.id;


--
-- Name: client_leads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client_leads (
    id integer NOT NULL,
    state public.client_lead_state NOT NULL,
    request_details jsonb,
    cbu_id integer NOT NULL,
    property_id integer,
    contact_id integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    cd_first_name character varying(255),
    cd_last_name character varying(255),
    cd_phone_number character varying(255),
    cd_email character varying(255),
    cd_kind_dictionary_kind public.dictionary_kind DEFAULT 'property_contact_link_type'::public.dictionary_kind,
    cd_kind_dictionary_id integer,
    ru_id integer NOT NULL,
    kind public.client_lead_kind NOT NULL,
    client_lead_source_id integer,
    note text,
    updated_by_user_id integer,
    utms jsonb DEFAULT '{}'::json NOT NULL,
    sd_to_approve public.client_lead_state,
    sd_changes jsonb DEFAULT '{}'::json NOT NULL,
    pcd_status public.phone_call_status,
    pcd_duration integer,
    pcd_call_recording_url text,
    pcd_reason character varying(255),
    ru_department_id integer NOT NULL,
    ru_division_id integer,
    deal_id integer,
    request_kind public.client_lead_request_kind,
    property_search_order_id integer,
    cbu_department_id integer NOT NULL,
    cbu_division_id integer,
    rd_property_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    search_query text,
    ua_client_id character varying(255),
    call_session_id bigint,
    sd_reason_id integer,
    is_repeated boolean NOT NULL,
    CONSTRAINT client_leads_cd_kind_dictionary_kind_check CHECK ((cd_kind_dictionary_kind = 'property_contact_link_type'::public.dictionary_kind))
);


ALTER TABLE public.client_leads OWNER TO postgres;

--
-- Name: client_leads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_leads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_leads_id_seq OWNER TO postgres;

--
-- Name: client_leads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_leads_id_seq OWNED BY public.client_leads.id;


--
-- Name: client_leads_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.client_leads_view AS
SELECT
    NULL::integer AS id,
    NULL::bigint AS call_session_id,
    NULL::integer AS cbu_id,
    NULL::integer AS cbu_department_id,
    NULL::integer AS cbu_division_id,
    NULL::character varying(255) AS cd_email,
    NULL::character varying(255) AS cd_first_name,
    NULL::integer AS cd_kind_dictionary_id,
    NULL::character varying(255) AS cd_last_name,
    NULL::character varying(255) AS cd_phone_number,
    NULL::integer AS client_lead_source_id,
    NULL::integer AS contact_id,
    NULL::timestamp with time zone AS created_at,
    NULL::integer AS deal_id,
    NULL::boolean AS is_repeated,
    NULL::public.client_lead_kind AS kind,
    NULL::text AS note,
    NULL::text AS pcd_call_recording_url,
    NULL::integer AS pcd_duration,
    NULL::character varying(255) AS pcd_reason,
    NULL::public.phone_call_status AS pcd_status,
    NULL::integer AS property_id,
    NULL::public.client_lead_request_kind AS request_kind,
    NULL::integer AS ru_id,
    NULL::integer AS ru_department_id,
    NULL::integer AS ru_division_id,
    NULL::integer AS sd_reason_id,
    NULL::public.client_lead_state AS sd_to_approve,
    NULL::text AS search_query,
    NULL::public.client_lead_state AS state,
    NULL::character varying(255) AS ua_client_id,
    NULL::timestamp with time zone AS updated_at,
    NULL::integer AS updated_by_user_id,
    NULL::text AS rd_objects,
    NULL::text AS rd_offer_kind,
    NULL::text AS rd_category,
    NULL::text AS rd_kind,
    NULL::jsonb AS rd_price_from,
    NULL::jsonb AS rd_price_to,
    NULL::text AS rd_currency,
    NULL::text AS rd_renovate,
    NULL::text AS rd_condition,
    NULL::text AS rd_furniture,
    NULL::jsonb AS rd_country_area_from,
    NULL::jsonb AS rd_country_area_to,
    NULL::jsonb AS rd_country_bedrooms_from,
    NULL::jsonb AS rd_country_bedrooms_to,
    NULL::jsonb AS rd_country_land_area_from,
    NULL::jsonb AS rd_country_land_area_to,
    NULL::jsonb AS rd_country_location_route_id,
    NULL::jsonb AS rd_country_location_locality_id,
    NULL::jsonb AS rd_country_location_settlement_id,
    NULL::jsonb AS rd_country_location_mkad_distance_from,
    NULL::jsonb AS rd_country_location_mkad_distance_to,
    NULL::jsonb AS rd_city_,
    NULL::jsonb AS rd_city_area_from,
    NULL::jsonb AS rd_city_area_to,
    NULL::jsonb AS rd_city_living_area_from,
    NULL::jsonb AS rd_city_living_area_to,
    NULL::jsonb AS rd_city_rooms_from,
    NULL::jsonb AS rd_city_rooms_to,
    NULL::jsonb AS rd_city_sublocality_id,
    NULL::jsonb AS rd_city_street,
    NULL::jsonb AS rd_rent_offer_price,
    NULL::jsonb AS rd_rent_offer_currency,
    NULL::jsonb AS rd_rent_offer_agent_fee,
    NULL::text AS rd_rent_offer_agent_fixed_price_currency,
    NULL::jsonb AS rd_rent_offer_agent_fixed_price_price,
    NULL::jsonb AS rd_rent_offer_deposit,
    NULL::jsonb AS rd_rent_offer_period,
    NULL::jsonb AS rd_rent_offer_is_allowed_pets,
    NULL::jsonb AS rd_rent_offer_is_allowed_children,
    NULL::jsonb AS rd_sale_offer_price,
    NULL::text AS rd_sale_offer_currency,
    NULL::jsonb AS rd_sale_offer_agent_fee,
    NULL::text AS rd_sale_offer_agent_fixed_price_currency,
    NULL::jsonb AS rd_sale_offer_agent_fixed_price_price,
    NULL::text AS rd_sale_offer_kind,
    NULL::jsonb AS rd_sale_offer_is_bargain,
    NULL::jsonb AS rd_sale_offer_is_mortgage,
    NULL::jsonb AS rd_sale_offer_is_installment,
    NULL::jsonb AS rd_sale_offer_is_resale,
    NULL::text AS utm_campaign,
    NULL::text AS utm_source,
    NULL::text AS utm_term,
    NULL::text AS utm_content,
    NULL::text AS utm_medium;


ALTER TABLE public.client_leads_view OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    parent_id integer,
    state public.comment_state NOT NULL,
    user_id integer,
    text text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    object_id integer,
    object_klass public.object_klass
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name public.citext NOT NULL,
    inn character varying(255) NOT NULL,
    ogrn character varying(255) NOT NULL,
    registered_at date NOT NULL,
    state public.company_state NOT NULL,
    kpp character varying(255) NOT NULL,
    opf character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer,
    responsible_user_id integer NOT NULL,
    address text[] DEFAULT ARRAY[]::text[] NOT NULL,
    phone_numbers public.hstore DEFAULT ''::public.hstore NOT NULL,
    image character varying(255),
    description text
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: encrypted_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.encrypted_documents (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    state public.document_state NOT NULL,
    filename character varying(255),
    aes_key bytea NOT NULL,
    iv_bytes bytea NOT NULL,
    comment text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    uploader_id integer NOT NULL
);


ALTER TABLE public.encrypted_documents OWNER TO postgres;

--
-- Name: complex_building_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complex_building_documents (
    id uuid DEFAULT public.uuid_generate_v4(),
    complex_building_id integer NOT NULL,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'complex_building_document_type'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer,
    CONSTRAINT residential_complex_documents_kind_dictionary_kind_check CHECK ((kind_dictionary_kind = 'complex_building_document_type'::public.dictionary_kind))
)
INHERITS (public.encrypted_documents);


ALTER TABLE public.complex_building_documents OWNER TO postgres;

--
-- Name: complex_buildings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complex_buildings (
    id integer NOT NULL,
    name character varying(255),
    built_year smallint,
    delivery_quarter public.quarter,
    stage smallint,
    floors smallint,
    parkings smallint,
    underground_garages smallint,
    l_country_id integer,
    l_region_id integer,
    l_locality_id integer,
    l_sub_locality_id integer,
    l_street character varying(255),
    l_postal_code integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    l_kladr_id bigint,
    house_kind public.complex_building_house_kind,
    construction_stage public.complex_building_construction_stage,
    security public.complex_building_security,
    construction_kind public.complex_building_construction_kind,
    l_house character varying(255),
    l_housing character varying(255),
    l_building public.citext,
    series character varying(255),
    elevators smallint,
    freight_elevators smallint,
    state public.complex_building_state NOT NULL,
    images jsonb DEFAULT '[]'::json NOT NULL,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer,
    l_district_id integer,
    l_latitude character varying(255),
    l_longitude character varying(255),
    pd_so_kind public.sale_offer_kind,
    pd_so_is_bargain boolean,
    pd_so_is_installment boolean,
    pd_so_is_mortgage boolean,
    pd_so_agent_fee real,
    pd_so_agent_fixed_price bigint,
    pd_so_agent_fixed_price_currency public.currency,
    pds_condition public.property_condition,
    pds_renovate public.property_renovate,
    pds_furniture public.property_furniture,
    pds_conditioning public.property_conditioning,
    pds_ventilation public.property_ventilation,
    ru_id integer NOT NULL,
    ru_department_id integer NOT NULL,
    ru_division_id integer,
    contract_type public.complex_building_contract_type,
    architect character varying(255),
    developer_id integer,
    contractor_id integer,
    with_rubbish_chute boolean,
    infrastructure_units jsonb DEFAULT '[]'::json NOT NULL,
    complex_id integer NOT NULL,
    s_properties_count integer DEFAULT 0 NOT NULL,
    s_mcp_from_usd bigint DEFAULT 0 NOT NULL,
    s_mcp_from_eur bigint DEFAULT 0 NOT NULL,
    s_mcp_from_rub bigint DEFAULT 0 NOT NULL,
    s_mcp_to_usd bigint DEFAULT 0 NOT NULL,
    s_mcp_to_eur bigint DEFAULT 0 NOT NULL,
    s_mcp_to_rub bigint DEFAULT 0 NOT NULL,
    with_waste_disposal_room boolean,
    maintenance_costs bigint,
    s_properties_area_from real DEFAULT 0 NOT NULL,
    s_properties_area_to real DEFAULT 0 NOT NULL,
    s_properties_count_primary integer DEFAULT 0 NOT NULL,
    s_properties_count_resale integer DEFAULT 0 NOT NULL,
    s_properties_area_from_primary real DEFAULT 0 NOT NULL,
    s_properties_area_to_primary real DEFAULT 0 NOT NULL,
    s_properties_area_from_resale real DEFAULT 0 NOT NULL,
    s_properties_area_to_resale real DEFAULT 0 NOT NULL,
    s_mcp_from_rub_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_from_usd_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_from_eur_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_to_rub_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_to_usd_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_to_eur_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_from_rub_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_from_usd_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_from_eur_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_to_rub_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_to_usd_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_to_eur_resale bigint DEFAULT 0 NOT NULL,
    flats integer,
    l_subway_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL
);


ALTER TABLE public.complex_buildings OWNER TO postgres;

--
-- Name: complexes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complexes (
    id integer NOT NULL,
    name public.citext NOT NULL,
    images jsonb DEFAULT '[]'::json NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer,
    l_country_id integer,
    l_region_id integer,
    l_locality_id integer,
    l_sub_locality_id integer,
    l_street public.citext,
    l_house character varying(255),
    l_housing character varying(255),
    l_building character varying(255),
    l_flat_number smallint,
    l_postal_code integer,
    l_kladr_id bigint,
    l_district_id integer,
    l_latitude character varying(255),
    l_longitude character varying(255),
    ru_id integer NOT NULL,
    ru_department_id integer NOT NULL,
    ru_division_id integer,
    linked_contact_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    s_properties_count integer DEFAULT 0 NOT NULL,
    s_mcp_from_usd bigint DEFAULT 0 NOT NULL,
    s_mcp_from_eur bigint DEFAULT 0 NOT NULL,
    s_mcp_from_rub bigint DEFAULT 0 NOT NULL,
    s_mcp_to_usd bigint DEFAULT 0 NOT NULL,
    s_mcp_to_eur bigint DEFAULT 0 NOT NULL,
    s_mcp_to_rub bigint DEFAULT 0 NOT NULL,
    state public.model_state DEFAULT 'draft'::public.model_state,
    commissioning_quarter smallint,
    commissioning_year smallint,
    note text,
    keys_issue_date date,
    accreditors integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    at_area integer,
    at_playgrounds smallint,
    at_is_allowed_cars boolean,
    at_is_access_open boolean,
    at_is_greenery_planted boolean,
    pc_oral_reservation smallint,
    pc_agreement_preparation smallint,
    pc_developer_agreement smallint,
    pc_state_registration_preparation smallint,
    pc_signing smallint,
    pc_state_registration smallint,
    pc_document_delivery smallint,
    pc_payment smallint,
    s_properties_area_from real DEFAULT 0 NOT NULL,
    s_properties_area_to real DEFAULT 0 NOT NULL,
    s_properties_count_primary integer DEFAULT 0 NOT NULL,
    s_properties_count_resale integer DEFAULT 0 NOT NULL,
    s_properties_area_from_primary real DEFAULT 0 NOT NULL,
    s_properties_area_to_primary real DEFAULT 0 NOT NULL,
    s_properties_area_from_resale real DEFAULT 0 NOT NULL,
    s_properties_area_to_resale real DEFAULT 0 NOT NULL,
    s_mcp_from_rub_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_from_usd_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_from_eur_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_to_rub_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_to_usd_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_to_eur_primary bigint DEFAULT 0 NOT NULL,
    s_mcp_from_rub_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_from_usd_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_from_eur_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_to_rub_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_to_usd_resale bigint DEFAULT 0 NOT NULL,
    s_mcp_to_eur_resale bigint DEFAULT 0 NOT NULL,
    l_subway_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL
);


ALTER TABLE public.complexes OWNER TO postgres;

--
-- Name: complexes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.complexes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.complexes_id_seq OWNER TO postgres;

--
-- Name: complexes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.complexes_id_seq OWNED BY public.complexes.id;


--
-- Name: contact_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_documents (
    id uuid DEFAULT public.uuid_generate_v4(),
    contact_id integer NOT NULL,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'contact_document_type'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer,
    CONSTRAINT contact_documents_dictionary_kind_check CHECK ((kind_dictionary_kind = 'contact_document_type'::public.dictionary_kind))
)
INHERITS (public.encrypted_documents);


ALTER TABLE public.contact_documents OWNER TO postgres;

--
-- Name: contact_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_links (
    contact_id integer NOT NULL,
    linked_contact_id integer NOT NULL,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'contact_link_type'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer NOT NULL,
    relationship_to_kind_dictionary_id integer NOT NULL,
    CONSTRAINT contact_links_check CHECK ((linked_contact_id <> contact_id)),
    CONSTRAINT contact_links_document_dictionary_kind_check CHECK ((kind_dictionary_kind = 'contact_link_type'::public.dictionary_kind))
);


ALTER TABLE public.contact_links OWNER TO postgres;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    ru_ids integer[] NOT NULL,
    photo character varying(255),
    first_name public.citext,
    last_name public.citext,
    middle_name public.citext,
    phone_number character varying(255),
    email public.citext,
    facebook character varying(255),
    twitter character varying(255),
    instagram character varying(255),
    vk character varying(255),
    additional_phone_number character varying(255),
    additional_email character varying(255),
    auto_number character varying(255),
    auto_region integer,
    company character varying(255),
    note text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    position_dictionary_id integer,
    position_dictionary_kind public.dictionary_kind DEFAULT 'contact_position'::public.dictionary_kind NOT NULL,
    occupation_dictionary_id integer,
    occupation_dictionary_kind public.dictionary_kind DEFAULT 'contact_occupation'::public.dictionary_kind NOT NULL,
    job_role_dictionary_id integer,
    job_role_dictionary_kind public.dictionary_kind DEFAULT 'contact_job_role'::public.dictionary_kind NOT NULL,
    auto_model_dictionary_id integer,
    auto_model_dictionary_kind public.dictionary_kind DEFAULT 'auto_model'::public.dictionary_kind NOT NULL,
    auto_brand_dictionary_id integer,
    auto_brand_dictionary_kind public.dictionary_kind DEFAULT 'auto_brand'::public.dictionary_kind NOT NULL,
    ru_department_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    ru_division_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    company_id integer,
    state public.contact_state DEFAULT 'active'::public.contact_state NOT NULL,
    source character varying(255),
    kind public.contact_kind,
    CONSTRAINT contacts_auto_brand_dictionary_kind_check CHECK ((auto_brand_dictionary_kind = 'auto_brand'::public.dictionary_kind)),
    CONSTRAINT contacts_auto_model_dictionary_kind_check CHECK ((auto_model_dictionary_kind = 'auto_model'::public.dictionary_kind)),
    CONSTRAINT contacts_job_role_dictionary_kind_check CHECK ((job_role_dictionary_kind = 'contact_job_role'::public.dictionary_kind)),
    CONSTRAINT contacts_occupation_dictionary_kind_check CHECK ((occupation_dictionary_kind = 'contact_occupation'::public.dictionary_kind)),
    CONSTRAINT contacts_position_dictionary_kind_check CHECK ((position_dictionary_kind = 'contact_position'::public.dictionary_kind))
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.places (
    id integer NOT NULL,
    name public.citext NOT NULL,
    kind_name character varying(255),
    aliases public.citext[] DEFAULT ARRAY[]::public.citext[] NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    place_type public.place_type NOT NULL,
    property_categories public.property_category[] DEFAULT ARRAY[]::public.property_category[] NOT NULL
);


ALTER TABLE public.places OWNER TO postgres;

--
-- Name: places_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.places_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.places_id_seq OWNER TO postgres;

--
-- Name: places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.places_id_seq OWNED BY public.places.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer DEFAULT nextval('public.places_id_seq'::regclass)
)
INHERITS (public.places);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: country_properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country_properties (
    id integer DEFAULT nextval('public.properties_id_seq'::regclass),
    equipment public.property_equipment[] DEFAULT ARRAY[]::public.property_equipment[] NOT NULL,
    s_spaces jsonb DEFAULT '[]'::json NOT NULL,
    ad_security_house_area real,
    ad_guest_house_area real,
    ad_staff_house_area real,
    ad_spa_area real,
    ad_pool_width smallint,
    ad_pool_height smallint,
    ad_parking_area real,
    ad_garage_area real,
    c_power_supply smallint,
    c_water_supply public.water_type,
    c_gas_supply public.gas_type,
    c_sewerage_supply public.sewerage_type,
    ld_landscaping boolean,
    ld_landscape_kind public.landscape_kind[] DEFAULT ARRAY[]::public.landscape_kind[] NOT NULL,
    ld_area real,
    l_street character varying(255),
    l_house character varying(255),
    s_bedrooms smallint,
    s_area real,
    s_wall_material public.wall_material,
    s_roof_material public.roof_material,
    s_built_year smallint,
    s_floors smallint,
    s_loggias smallint,
    s_balconies smallint,
    s_elevators smallint,
    s_ceiling_height real,
    s_with_conditioning boolean,
    s_with_ventilation boolean,
    s_renovate public.property_renovate,
    s_condition public.property_condition,
    s_furniture public.property_furniture,
    l_settlement_id integer,
    l_country_id integer,
    l_region_id integer,
    l_district_id integer,
    l_locality_id integer,
    ad_bathhouse_area real,
    l_route_id integer,
    l_latitude character varying(255),
    l_longitude character varying(255),
    s_layouts public.hstore DEFAULT ''::public.hstore NOT NULL,
    s_rooms smallint,
    s_wcs smallint,
    s_legacy_layouts jsonb DEFAULT '[]'::json NOT NULL
)
INHERITS (public.properties);


ALTER TABLE public.country_properties OWNER TO postgres;

--
-- Name: country_properties_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.country_properties_view AS
SELECT
    NULL::integer AS id,
    NULL::integer AS ru_id,
    NULL::public.property_state AS state,
    NULL::public.property_kind AS kind,
    NULL::timestamp with time zone AS created_at,
    NULL::timestamp with time zone AS updated_at,
    NULL::integer AS created_by_user_id,
    NULL::integer AS updated_by_user_id,
    NULL::integer AS client_lead_id,
    NULL::public.property_category AS category,
    NULL::bigint AS ro_price,
    NULL::public.currency AS ro_currency,
    NULL::real AS ro_agent_fee,
    NULL::integer AS ro_agent_fixed_price,
    NULL::public.currency AS ro_agent_fixed_price_currency,
    NULL::smallint AS ro_deposit,
    NULL::public.rent_period AS ro_period,
    NULL::boolean AS ro_is_allowed_pets,
    NULL::boolean AS ro_is_allowed_children,
    NULL::bigint AS so_price,
    NULL::public.currency AS so_currency,
    NULL::real AS so_agent_fee,
    NULL::integer AS so_agent_fixed_price,
    NULL::public.currency AS so_agent_fixed_price_currency,
    NULL::public.sale_offer_kind AS so_kind,
    NULL::boolean AS so_is_bargain,
    NULL::boolean AS so_is_mortgage,
    NULL::boolean AS so_is_installment,
    NULL::text AS note,
    NULL::integer AS ru_department_id,
    NULL::integer AS ru_division_id,
    NULL::integer AS removal_order_id,
    NULL::text AS sd_reason,
    NULL::boolean AS so_is_resale,
    NULL::character varying(255) AS external_id,
    NULL::character varying(255) AS l_cadastral_number,
    NULL::integer AS badge_id,
    NULL::bigint AS so_price_delta,
    NULL::bigint AS ro_price_delta,
    NULL::real AS ad_security_house_area,
    NULL::real AS ad_guest_house_area,
    NULL::real AS ad_staff_house_area,
    NULL::real AS ad_spa_area,
    NULL::smallint AS ad_pool_width,
    NULL::smallint AS ad_pool_height,
    NULL::real AS ad_parking_area,
    NULL::real AS ad_garage_area,
    NULL::smallint AS c_power_supply,
    NULL::public.water_type AS c_water_supply,
    NULL::public.gas_type AS c_gas_supply,
    NULL::public.sewerage_type AS c_sewerage_supply,
    NULL::boolean AS ld_landscaping,
    NULL::real AS ld_area,
    NULL::character varying(255) AS l_street,
    NULL::character varying(255) AS l_house,
    NULL::smallint AS s_bedrooms,
    NULL::real AS s_area,
    NULL::public.wall_material AS s_wall_material,
    NULL::public.roof_material AS s_roof_material,
    NULL::smallint AS s_built_year,
    NULL::smallint AS s_floors,
    NULL::smallint AS s_loggias,
    NULL::smallint AS s_balconies,
    NULL::smallint AS s_elevators,
    NULL::real AS s_ceiling_height,
    NULL::boolean AS s_with_conditioning,
    NULL::boolean AS s_with_ventilation,
    NULL::public.property_renovate AS s_renovate,
    NULL::public.property_condition AS s_condition,
    NULL::public.property_furniture AS s_furniture,
    NULL::integer AS l_settlement_id,
    NULL::integer AS l_country_id,
    NULL::integer AS l_region_id,
    NULL::integer AS l_district_id,
    NULL::integer AS l_locality_id,
    NULL::real AS ad_bathhouse_area,
    NULL::integer AS l_route_id,
    NULL::character varying(255) AS l_latitude,
    NULL::character varying(255) AS l_longitude,
    NULL::smallint AS s_rooms,
    NULL::smallint AS s_wcs,
    NULL::boolean AS equipment_internet,
    NULL::boolean AS equipment_phone,
    NULL::boolean AS equipment_tv,
    NULL::boolean AS equipment_security_signaling,
    NULL::boolean AS equipment_cable_tv,
    NULL::boolean AS equipment_washmachine,
    NULL::boolean AS equipment_intercom,
    NULL::boolean AS equipment_fridge,
    NULL::boolean AS equipment_dishwasher,
    NULL::boolean AS equipment_appliances,
    NULL::text AS ld_landscape_kind,
    NULL::integer AS s_layouts_wine_rooms,
    NULL::integer AS s_layouts_dressing_rooms,
    NULL::integer AS s_layouts_living_rooms,
    NULL::integer AS s_layouts_childrens_rooms,
    NULL::integer AS s_layouts_movie_theaters,
    NULL::integer AS s_layouts_winter_gardens,
    NULL::integer AS s_layouts_gamerooms,
    NULL::integer AS s_layouts_offices,
    NULL::integer AS s_layouts_storages,
    NULL::integer AS s_layouts_kitchens,
    NULL::integer AS s_layouts_staff_rooms,
    NULL::integer AS s_layouts_working_kitchens,
    NULL::integer AS s_layouts_spa_zones,
    NULL::integer AS s_layouts_dining_rooms,
    NULL::integer AS s_layouts_technical_rooms,
    NULL::integer AS s_layouts_gyms,
    NULL::integer AS s_layouts_utility_rooms,
    NULL::integer AS s_layouts_lofts,
    NULL::integer AS owner_contact_id,
    NULL::integer AS representative_contact_id,
    NULL::text AS images,
    NULL::text AS layout_images;


ALTER TABLE public.country_properties_view OWNER TO postgres;

--
-- Name: csi_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.csi_answers (
    question_id integer NOT NULL,
    object_id integer NOT NULL,
    object_klass public.object_klass NOT NULL,
    rate smallint NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.csi_answers OWNER TO postgres;

--
-- Name: csi_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.csi_answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.csi_answers_id_seq OWNER TO postgres;

--
-- Name: csi_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.csi_answers_id_seq OWNED BY public.csi_answers.id;


--
-- Name: csi_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.csi_questions (
    id integer NOT NULL,
    text text,
    kind public.csi_question_kind NOT NULL
);


ALTER TABLE public.csi_questions OWNER TO postgres;

--
-- Name: csi_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.csi_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.csi_questions_id_seq OWNER TO postgres;

--
-- Name: csi_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.csi_questions_id_seq OWNED BY public.csi_questions.id;


--
-- Name: daily_duty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.daily_duty (
    id integer NOT NULL,
    staff_user_id integer,
    start_at timestamp with time zone NOT NULL,
    finish_at timestamp with time zone NOT NULL,
    CONSTRAINT daily_duty_check CHECK ((start_at < finish_at))
);


ALTER TABLE public.daily_duty OWNER TO postgres;

--
-- Name: daily_duty_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.daily_duty_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.daily_duty_id_seq OWNER TO postgres;

--
-- Name: daily_duty_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.daily_duty_id_seq OWNED BY public.daily_duty.id;


--
-- Name: deals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deals (
    id integer NOT NULL,
    state public.deal_state NOT NULL,
    client_lead_id integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer,
    ru_id integer NOT NULL,
    ru_department_id integer NOT NULL,
    ru_division_id integer,
    cd_id integer NOT NULL,
    cd_phone_number character varying(255),
    cd_email character varying(255),
    sd_reason text,
    sd_to_approve public.deal_state,
    sd_changes jsonb DEFAULT '{}'::json NOT NULL,
    d_offer_kind public.offer_kind NOT NULL,
    d_budget bigint,
    d_currency public.currency,
    d_expected_finish_date_at date NOT NULL,
    d_expected_agent_fee real,
    d_note text,
    d_property_id integer,
    d_expected_agent_fixed_price bigint,
    d_expected_agent_fixed_price_currency public.currency,
    d_mcaf_rub bigint,
    d_mcaf_eur bigint,
    d_mcaf_usd bigint,
    cd_kind_dictionary_kind public.dictionary_kind DEFAULT 'deal_contact_type'::public.dictionary_kind,
    cd_kind_dictionary_id integer,
    CONSTRAINT deals_cd_kind_dictionary_kind_check CHECK ((cd_kind_dictionary_kind = 'deal_contact_type'::public.dictionary_kind))
);


ALTER TABLE public.deals OWNER TO postgres;

--
-- Name: deals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deals_id_seq OWNER TO postgres;

--
-- Name: deals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deals_id_seq OWNED BY public.deals.id;


--
-- Name: deleted_to; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deleted_to (
    persistence_id character varying(255) NOT NULL,
    deleted_to bigint NOT NULL
);


ALTER TABLE public.deleted_to OWNER TO postgres;

--
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    name public.citext NOT NULL,
    manager_staff_user_id integer,
    staff_user_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.departments_id_seq OWNER TO postgres;

--
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- Name: dictionary_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dictionary_items (
    id integer NOT NULL,
    kind public.dictionary_kind NOT NULL,
    title character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    parent_id integer
);


ALTER TABLE public.dictionary_items OWNER TO postgres;

--
-- Name: dictionary_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dictionary_items_id_seq
    START WITH 10000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dictionary_items_id_seq OWNER TO postgres;

--
-- Name: dictionary_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dictionary_items_id_seq OWNED BY public.dictionary_items.id;


--
-- Name: districts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.districts (
    id integer DEFAULT nextval('public.places_id_seq'::regclass),
    country_id integer NOT NULL,
    region_id integer NOT NULL
)
INHERITS (public.places);


ALTER TABLE public.districts OWNER TO postgres;

--
-- Name: divisions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.divisions (
    id integer NOT NULL,
    department_id integer NOT NULL,
    name public.citext NOT NULL,
    manager_staff_user_id integer,
    staff_user_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL
);


ALTER TABLE public.divisions OWNER TO postgres;

--
-- Name: divisions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.divisions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.divisions_id_seq OWNER TO postgres;

--
-- Name: divisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.divisions_id_seq OWNED BY public.divisions.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    object_id integer NOT NULL,
    object_klass public.object_klass NOT NULL,
    kind public.event_kind NOT NULL,
    details jsonb,
    event_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: export_error_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.export_error_logs (
    id integer NOT NULL,
    package_id integer NOT NULL,
    reason character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    params text[],
    property_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL
);


ALTER TABLE public.export_error_logs OWNER TO postgres;

--
-- Name: export_error_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.export_error_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.export_error_logs_id_seq OWNER TO postgres;

--
-- Name: export_error_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.export_error_logs_id_seq OWNED BY public.export_error_logs.id;


--
-- Name: export_locations; Type: TABLE; Schema: public; Owner: jq
--

CREATE TABLE public.export_locations (
    id integer NOT NULL,
    name text NOT NULL,
    pos public.geography(Point,4326),
    format public.export_package_format NOT NULL
);


ALTER TABLE public.export_locations OWNER TO jq;

--
-- Name: export_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: jq
--

CREATE SEQUENCE public.export_locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.export_locations_id_seq OWNER TO jq;

--
-- Name: export_locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jq
--

ALTER SEQUENCE public.export_locations_id_seq OWNED BY public.export_locations.id;


--
-- Name: export_packages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.export_packages (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    format public.export_package_format NOT NULL,
    company_name character varying(255) NOT NULL,
    company_email character varying(255) NOT NULL,
    company_phone_number character varying(255) NOT NULL,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer,
    last_export_at timestamp with time zone,
    updated_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    filter public.hstore DEFAULT ''::public.hstore NOT NULL,
    s_properties_count integer DEFAULT 0 NOT NULL,
    state public.export_package_state DEFAULT 'active'::public.export_package_state,
    cd_top integer[],
    cd_premium integer[],
    cd_highlight integer[],
    s_ads_count integer DEFAULT 0 NOT NULL,
    "limit" integer,
    sort_order public.sort_order,
    sort_column character varying(64),
    watermark public.watermark DEFAULT 'jqestate'::public.watermark NOT NULL
);


ALTER TABLE public.export_packages OWNER TO postgres;

--
-- Name: export_packages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.export_packages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.export_packages_id_seq OWNER TO postgres;

--
-- Name: export_packages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.export_packages_id_seq OWNED BY public.export_packages.id;


--
-- Name: file_documents; Type: TABLE; Schema: public; Owner: jq
--

CREATE TABLE public.file_documents (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    state public.document_state NOT NULL,
    filename character varying(255),
    uploader_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.file_documents OWNER TO jq;

--
-- Name: images_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images_orders (
    id integer NOT NULL,
    object_id integer NOT NULL,
    kind public.images_order_kind NOT NULL,
    state public.images_order_state NOT NULL,
    description text NOT NULL,
    responsible_user_id integer,
    images jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer,
    sd_changes jsonb NOT NULL,
    sd_reason text,
    object_klass public.images_order_object_klass NOT NULL
);


ALTER TABLE public.images_orders OWNER TO postgres;

--
-- Name: journal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.journal (
    ordering bigint NOT NULL,
    persistence_id character varying(255) NOT NULL,
    sequence_number bigint NOT NULL,
    deleted boolean DEFAULT false,
    tags character varying(255) DEFAULT NULL::character varying,
    message bytea NOT NULL
);


ALTER TABLE public.journal OWNER TO postgres;

--
-- Name: journal_ordering_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.journal_ordering_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.journal_ordering_seq OWNER TO postgres;

--
-- Name: journal_ordering_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.journal_ordering_seq OWNED BY public.journal.ordering;


--
-- Name: localities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.localities (
    id integer DEFAULT nextval('public.places_id_seq'::regclass),
    region_id integer NOT NULL,
    district_id integer,
    country_id integer NOT NULL,
    route_id integer
)
INHERITS (public.places);


ALTER TABLE public.localities OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    version bigint NOT NULL,
    name character varying(255) NOT NULL,
    body text NOT NULL,
    sha1 character(40) NOT NULL,
    applied_at timestamp without time zone NOT NULL,
    options text NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: newsletters; Type: TABLE; Schema: public; Owner: jq
--

CREATE TABLE public.newsletters (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    state public.newsletter_state NOT NULL,
    template text NOT NULL,
    properties jsonb NOT NULL,
    scheduled_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    sent_at timestamp with time zone,
    list_id character varying(64) NOT NULL,
    mailchimp_campaign_id character varying(64),
    from_title character varying(255),
    from_email character varying(255)
);


ALTER TABLE public.newsletters OWNER TO jq;

--
-- Name: newsletters_id_seq; Type: SEQUENCE; Schema: public; Owner: jq
--

CREATE SEQUENCE public.newsletters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.newsletters_id_seq OWNER TO jq;

--
-- Name: newsletters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jq
--

ALTER SEQUENCE public.newsletters_id_seq OWNED BY public.newsletters.id;


--
-- Name: object_notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.object_notifications (
    object_id integer NOT NULL,
    object_klass public.object_klass NOT NULL,
    user_id integer NOT NULL,
    is_subscribed boolean NOT NULL
);


ALTER TABLE public.object_notifications OWNER TO postgres;

--
-- Name: popular_properties; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.popular_properties AS
 SELECT properties.id,
    properties.category,
    COALESCE(d.count, (0)::bigint) AS deals_count,
    COALESCE(cl.count, (0)::bigint) AS client_leads_count
   FROM ((public.properties
     LEFT JOIN ( SELECT count(*) AS count,
            deals.d_property_id
           FROM public.deals
          WHERE (date(deals.created_at) >= '2016-01-01'::date)
          GROUP BY deals.d_property_id) d ON ((d.d_property_id = properties.id)))
     LEFT JOIN ( SELECT cl_1.property_id,
            count(cl_1.id) AS count
           FROM ( SELECT client_leads.id,
                    client_leads.created_at,
                    unnest(client_leads.rd_property_ids) AS property_id
                   FROM public.client_leads
                  WHERE (date(client_leads.created_at) >= '2016-01-01'::date)) cl_1
          GROUP BY cl_1.property_id) cl ON ((cl.property_id = properties.id)))
  WHERE ((properties.state = 'public'::public.property_state) AND ((d.count > 0) OR (cl.count > 0)))
  ORDER BY COALESCE(cl.count, (0)::bigint), COALESCE(d.count, (0)::bigint);


ALTER TABLE public.popular_properties OWNER TO postgres;

--
-- Name: property_badges; Type: TABLE; Schema: public; Owner: jq
--

CREATE TABLE public.property_badges (
    id integer NOT NULL,
    title public.citext NOT NULL,
    color character varying(12) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.property_badges OWNER TO jq;

--
-- Name: property_badges_id_seq; Type: SEQUENCE; Schema: public; Owner: jq
--

CREATE SEQUENCE public.property_badges_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.property_badges_id_seq OWNER TO jq;

--
-- Name: property_badges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jq
--

ALTER SEQUENCE public.property_badges_id_seq OWNED BY public.property_badges.id;


--
-- Name: property_banners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_banners (
    id integer NOT NULL,
    property_id integer NOT NULL,
    state public.banner_state NOT NULL,
    reason text,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'property_banner'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer NOT NULL,
    ru_id integer,
    image jsonb,
    expected_date_of_completion timestamp with time zone,
    date_of_completion timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    created_by_user_id integer,
    updated_at timestamp with time zone,
    CONSTRAINT property_banners_dictionary_kind_check CHECK ((kind_dictionary_kind = 'property_banner'::public.dictionary_kind))
);


ALTER TABLE public.property_banners OWNER TO postgres;

--
-- Name: property_banners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.property_banners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.property_banners_id_seq OWNER TO postgres;

--
-- Name: property_banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_banners_id_seq OWNED BY public.property_banners.id;


--
-- Name: property_contact_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_contact_links (
    property_id integer NOT NULL,
    linked_contact_id integer NOT NULL,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'property_contact_link_type'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer NOT NULL,
    CONSTRAINT property_contact_links_document_dictionary_kind_check CHECK ((kind_dictionary_kind = 'property_contact_link_type'::public.dictionary_kind))
);


ALTER TABLE public.property_contact_links OWNER TO postgres;

--
-- Name: property_contracts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_contracts (
    property_id integer NOT NULL,
    valid_from date,
    valid_to date,
    signed_by_id integer,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'property_contract_type'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer,
    CONSTRAINT property_contracts_kind_dictionary_kind_check CHECK ((kind_dictionary_kind = 'property_contract_type'::public.dictionary_kind))
)
INHERITS (public.encrypted_documents);


ALTER TABLE public.property_contracts OWNER TO postgres;

--
-- Name: property_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_documents (
    property_id integer NOT NULL,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'property_document_type'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer,
    CONSTRAINT property_documents_document_dictionary_kind_check CHECK ((kind_dictionary_kind = 'property_document_type'::public.dictionary_kind))
)
INHERITS (public.encrypted_documents);


ALTER TABLE public.property_documents OWNER TO postgres;

--
-- Name: property_offer_price_changes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_offer_price_changes (
    property_id integer NOT NULL,
    kind public.offer_kind NOT NULL,
    change_at date NOT NULL,
    usd bigint NOT NULL,
    eur bigint NOT NULL,
    rub bigint NOT NULL
);


ALTER TABLE public.property_offer_price_changes OWNER TO postgres;

--
-- Name: property_photos_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.property_photos_orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.property_photos_orders_id_seq OWNER TO postgres;

--
-- Name: property_photos_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_photos_orders_id_seq OWNED BY public.images_orders.id;


--
-- Name: property_removal_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_removal_orders (
    id integer NOT NULL,
    property_id integer NOT NULL,
    property_category public.property_category NOT NULL,
    original_property_id integer,
    state public.property_removal_order_state NOT NULL,
    kind public.property_removal_order_kind NOT NULL,
    note text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer,
    sd_reason text
);


ALTER TABLE public.property_removal_orders OWNER TO postgres;

--
-- Name: property_removal_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.property_removal_orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.property_removal_orders_id_seq OWNER TO postgres;

--
-- Name: property_removal_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_removal_orders_id_seq OWNED BY public.property_removal_orders.id;


--
-- Name: property_search_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_search_orders (
    id integer NOT NULL,
    property_category public.property_category NOT NULL,
    state public.property_search_order_state NOT NULL,
    note text NOT NULL,
    ru_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    cbu_id integer NOT NULL,
    updated_by_user_id integer,
    sd_reason text,
    sd_changes jsonb NOT NULL,
    property_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    cbu_department_id integer NOT NULL,
    cbu_division_id integer,
    ru_department_id integer,
    ru_division_id integer
);


ALTER TABLE public.property_search_orders OWNER TO postgres;

--
-- Name: property_search_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.property_search_orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.property_search_orders_id_seq OWNER TO postgres;

--
-- Name: property_search_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_search_orders_id_seq OWNED BY public.property_search_orders.id;


--
-- Name: regions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.regions (
    id integer DEFAULT nextval('public.places_id_seq'::regclass),
    country_id integer NOT NULL
)
INHERITS (public.places);


ALTER TABLE public.regions OWNER TO postgres;

--
-- Name: residential_complexes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.residential_complexes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.residential_complexes_id_seq OWNER TO postgres;

--
-- Name: residential_complexes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.residential_complexes_id_seq OWNED BY public.complex_buildings.id;


--
-- Name: rights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rights (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    resource public.right_resource NOT NULL,
    action public.right_action NOT NULL,
    scope public.right_scope[] NOT NULL
);


ALTER TABLE public.rights OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name public.citext NOT NULL,
    permissions public.hstore NOT NULL,
    is_admin boolean NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.routes (
    id integer DEFAULT nextval('public.places_id_seq'::regclass),
    region_id integer NOT NULL,
    country_id integer NOT NULL,
    meta jsonb
)
INHERITS (public.places);


ALTER TABLE public.routes OWNER TO postgres;

--
-- Name: selections; Type: TABLE; Schema: public; Owner: jq
--

CREATE TABLE public.selections (
    id integer NOT NULL,
    name public.citext NOT NULL,
    site public.site NOT NULL,
    property_category public.property_category NOT NULL,
    property_ids integer[] NOT NULL,
    ru_id integer NOT NULL,
    created_by_user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    pages public.page[] DEFAULT ARRAY[]::public.page[] NOT NULL,
    photo character varying(255),
    updated_by_user_id integer,
    state public.model_state NOT NULL,
    description text,
    title text DEFAULT ''::text NOT NULL,
    offer_kind public.offer_kind DEFAULT 'purchase'::public.offer_kind NOT NULL
);


ALTER TABLE public.selections OWNER TO jq;

--
-- Name: selections_id_seq; Type: SEQUENCE; Schema: public; Owner: jq
--

CREATE SEQUENCE public.selections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.selections_id_seq OWNER TO jq;

--
-- Name: selections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jq
--

ALTER SEQUENCE public.selections_id_seq OWNED BY public.selections.id;


--
-- Name: settlement_contact_links; Type: TABLE; Schema: public; Owner: jq
--

CREATE TABLE public.settlement_contact_links (
    settlement_id integer NOT NULL,
    linked_contact_id integer NOT NULL,
    kind_id integer NOT NULL
);


ALTER TABLE public.settlement_contact_links OWNER TO jq;

--
-- Name: settlement_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settlement_documents (
    settlement_id integer NOT NULL,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'settlement_document_type'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer,
    CONSTRAINT settlement_documents_kind_dictionary_kind_check CHECK ((kind_dictionary_kind = 'settlement_document_type'::public.dictionary_kind))
)
INHERITS (public.encrypted_documents);


ALTER TABLE public.settlement_documents OWNER TO postgres;

--
-- Name: settlements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settlements (
    id integer DEFAULT nextval('public.places_id_seq'::regclass),
    place_type public.place_type DEFAULT 'settlement'::public.place_type,
    state public.model_state NOT NULL,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'settlement_type'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer,
    main_sale_description text,
    satellite_sale_description text,
    images jsonb DEFAULT '[]'::json NOT NULL,
    created_by_user_id integer NOT NULL,
    updated_by_user_id integer,
    l_linked_locality_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    l_mkad_distance smallint,
    l_country_id integer NOT NULL,
    l_region_id integer NOT NULL,
    l_district_id integer,
    l_locality_id integer NOT NULL,
    d_foundation_year smallint,
    d_area real,
    d_power_supply smallint,
    d_water_supply public.water_type,
    d_gas_supply public.gas_type,
    d_sewerage_supply public.sewerage_type,
    d_external_infrastructure character varying(255)[] DEFAULT ARRAY[]::character varying[] NOT NULL,
    d_internal_infrastructure character varying(255)[] DEFAULT ARRAY[]::character varying[] NOT NULL,
    l_route_id integer,
    pd_so_kind public.sale_offer_kind,
    pd_so_is_bargain boolean,
    pd_so_is_installment boolean,
    pd_so_is_mortgage boolean,
    pd_so_agent_fee real,
    pd_so_agent_fixed_price bigint,
    pd_so_agent_fixed_price_currency public.currency,
    ru_id integer,
    ru_department_id integer,
    ru_division_id integer,
    l_pos public.geography(Point,4326),
    s_land_area_from real DEFAULT 0 NOT NULL,
    s_land_area_to real DEFAULT 0 NOT NULL,
    s_house_area_from real DEFAULT 0 NOT NULL,
    s_house_area_to real DEFAULT 0 NOT NULL,
    s_properties_so_total integer DEFAULT 0 NOT NULL,
    s_properties_so_primary integer DEFAULT 0 NOT NULL,
    s_properties_so_resale integer DEFAULT 0 NOT NULL,
    s_properties_ro_total integer DEFAULT 0 NOT NULL,
    s_mcp_so_from_rub bigint DEFAULT 0 NOT NULL,
    s_mcp_so_from_usd bigint DEFAULT 0 NOT NULL,
    s_mcp_so_from_eur bigint DEFAULT 0 NOT NULL,
    s_mcp_so_to_rub bigint DEFAULT 0 NOT NULL,
    s_mcp_so_to_usd bigint DEFAULT 0 NOT NULL,
    s_mcp_so_to_eur bigint DEFAULT 0 NOT NULL,
    s_mcp_ro_from_rub bigint DEFAULT 0 NOT NULL,
    s_mcp_ro_from_usd bigint DEFAULT 0 NOT NULL,
    s_mcp_ro_from_eur bigint DEFAULT 0 NOT NULL,
    s_mcp_ro_to_rub bigint DEFAULT 0 NOT NULL,
    s_mcp_ro_to_usd bigint DEFAULT 0 NOT NULL,
    s_mcp_ro_to_eur bigint DEFAULT 0 NOT NULL,
    s_properties_total integer DEFAULT 0 NOT NULL,
    d_land_state public.settlement_land_state[] DEFAULT ARRAY[]::public.settlement_land_state[] NOT NULL,
    main_rent_description text,
    satellite_rent_description text,
    meta jsonb,
    CONSTRAINT settlements_kind_dictionary_kind_check1 CHECK ((kind_dictionary_kind = 'settlement_type'::public.dictionary_kind))
)
INHERITS (public.places);


ALTER TABLE public.settlements OWNER TO postgres;

--
-- Name: settlements_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.settlements_view AS
 SELECT settlements.id,
    settlements.name,
    settlements.kind_name,
    settlements.aliases,
    settlements.created_at,
    settlements.updated_at,
    settlements.state,
    settlements.kind_dictionary_kind,
    settlements.kind_dictionary_id,
    settlements.main_sale_description,
    settlements.satellite_sale_description,
    settlements.images,
    settlements.created_by_user_id,
    settlements.updated_by_user_id,
    settlements.l_mkad_distance,
    settlements.l_country_id,
    settlements.l_region_id,
    settlements.l_district_id,
    settlements.l_locality_id,
    settlements.d_foundation_year,
    settlements.d_area,
    settlements.d_power_supply,
    settlements.d_water_supply,
    settlements.d_gas_supply,
    settlements.d_sewerage_supply,
    settlements.l_route_id,
    settlements.pd_so_kind,
    settlements.pd_so_is_bargain,
    settlements.pd_so_is_installment,
    settlements.pd_so_is_mortgage,
    settlements.pd_so_agent_fee,
    settlements.pd_so_agent_fixed_price,
    settlements.pd_so_agent_fixed_price_currency,
    settlements.ru_id,
    settlements.ru_department_id,
    settlements.ru_division_id,
    settlements.l_pos,
    settlements.main_rent_description,
    settlements.satellite_rent_description,
    (ARRAY['individual_housing'::public.settlement_land_state] @> settlements.d_land_state) AS land_state_individual_housing,
    (ARRAY['gardening_partnership'::public.settlement_land_state] @> settlements.d_land_state) AS land_state_gardening_partnership,
    (ARRAY['non_commercial_partnership'::public.settlement_land_state] @> settlements.d_land_state) AS land_state_non_commercial_partnership,
    replace(replace((settlements.d_external_infrastructure)::text, '{'::text, ''::text), '}'::text, ''::text) AS d_external_infrastructure,
    replace(replace((settlements.d_internal_infrastructure)::text, '{'::text, ''::text), '}'::text, ''::text) AS d_internal_infrastructure,
    public.st_x((settlements.l_pos)::public.geometry) AS lat,
    public.st_y((settlements.l_pos)::public.geometry) AS lon
   FROM public.settlements;


ALTER TABLE public.settlements_view OWNER TO postgres;

--
-- Name: sms_notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sms_notifications (
    id integer NOT NULL,
    state public.sms_notification_state NOT NULL,
    reject_reason text,
    text text NOT NULL,
    phone_number character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    sent_at timestamp with time zone
);


ALTER TABLE public.sms_notifications OWNER TO postgres;

--
-- Name: sms_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sms_notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sms_notifications_id_seq OWNER TO postgres;

--
-- Name: sms_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sms_notifications_id_seq OWNED BY public.sms_notifications.id;


--
-- Name: snapshot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snapshot (
    persistence_id character varying(255) NOT NULL,
    sequence_number bigint NOT NULL,
    created bigint NOT NULL,
    snapshot bytea NOT NULL
);


ALTER TABLE public.snapshot OWNER TO postgres;

--
-- Name: staff_user_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_user_documents (
    id uuid DEFAULT public.uuid_generate_v4(),
    user_id integer NOT NULL,
    kind_dictionary_kind public.dictionary_kind DEFAULT 'staff_document_type'::public.dictionary_kind NOT NULL,
    kind_dictionary_id integer,
    CONSTRAINT staff_documents_document_dictionary_kind_check CHECK ((kind_dictionary_kind = 'staff_document_type'::public.dictionary_kind))
)
INHERITS (public.encrypted_documents);


ALTER TABLE public.staff_user_documents OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    state public.user_state NOT NULL,
    password_hash character varying(255),
    photo character varying(255),
    first_name public.citext,
    last_name public.citext,
    work_phone_number character varying(25),
    personal_phone_number character varying(255),
    personal_email character varying(255),
    middle_name character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: staff_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass),
    started_work_at date NOT NULL,
    finished_work_at date,
    department_id integer NOT NULL,
    division_id integer,
    is_manager boolean DEFAULT false NOT NULL,
    role_id integer,
    d_ad_phone_numbers character varying(255)[] DEFAULT ARRAY[]::character varying[] NOT NULL,
    d_notifications public.hstore DEFAULT ''::public.hstore NOT NULL,
    member public.staff_user_member,
    experience_years smallint,
    education character varying(255),
    description text,
    is_public boolean DEFAULT false NOT NULL
)
INHERITS (public.users);


ALTER TABLE public.staff_users OWNER TO postgres;

--
-- Name: sub_localities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_localities (
    id integer DEFAULT nextval('public.places_id_seq'::regclass),
    locality_id integer NOT NULL,
    country_id integer NOT NULL,
    region_id integer NOT NULL,
    district_id integer
)
INHERITS (public.places);


ALTER TABLE public.sub_localities OWNER TO postgres;

--
-- Name: subways; Type: TABLE; Schema: public; Owner: jq
--

CREATE TABLE public.subways (
    id integer DEFAULT nextval('public.places_id_seq'::regclass),
    sub_locality_id integer NOT NULL
)
INHERITS (public.places);


ALTER TABLE public.subways OWNER TO jq;

--
-- Name: task_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_documents (
    id uuid DEFAULT public.uuid_generate_v4(),
    task_id integer NOT NULL,
    archiver_id integer,
    archived_at timestamp with time zone
)
INHERITS (public.encrypted_documents);


ALTER TABLE public.task_documents OWNER TO postgres;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    state public.task_state NOT NULL,
    result text,
    ru_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    d_goal text,
    d_contact_id integer,
    d_property_id integer,
    deadline timestamp with time zone NOT NULL,
    d_archived_document_id uuid,
    kind public.task_kind NOT NULL,
    d_deal_id integer,
    ru_department_id integer,
    ru_division_id integer,
    d_link_kind public.task_link_kind,
    d_client_lead_id integer,
    d_property_category public.property_category,
    d_title character varying(255),
    sd_to_approve public.task_state,
    created_by_user_id integer NOT NULL,
    d_is_document_attached boolean,
    weight smallint NOT NULL,
    reported_by_user_id integer NOT NULL,
    pcd_status public.phone_call_status,
    pcd_duration integer,
    pcd_call_recording_url text,
    pcd_reason character varying(255)
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: applications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);


--
-- Name: city_properties created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: city_properties updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: city_properties images; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties ALTER COLUMN images SET DEFAULT '[]'::json;


--
-- Name: city_properties category; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties ALTER COLUMN category SET DEFAULT 'city'::public.property_category;


--
-- Name: city_properties layout_images; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties ALTER COLUMN layout_images SET DEFAULT '[]'::json;


--
-- Name: city_properties linked_contact_ids; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties ALTER COLUMN linked_contact_ids SET DEFAULT ARRAY[]::integer[];


--
-- Name: client_lead_sources id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_lead_sources ALTER COLUMN id SET DEFAULT nextval('public.client_lead_sources_id_seq'::regclass);


--
-- Name: client_leads id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads ALTER COLUMN id SET DEFAULT nextval('public.client_leads_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: complex_building_documents created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_building_documents ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: complex_building_documents updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_building_documents ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: complex_buildings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings ALTER COLUMN id SET DEFAULT nextval('public.residential_complexes_id_seq'::regclass);


--
-- Name: complexes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complexes ALTER COLUMN id SET DEFAULT nextval('public.complexes_id_seq'::regclass);


--
-- Name: contact_documents created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_documents ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: contact_documents updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_documents ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: countries aliases; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN aliases SET DEFAULT ARRAY[]::public.citext[];


--
-- Name: countries created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: countries updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: countries place_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN place_type SET DEFAULT 'country'::public.place_type;


--
-- Name: countries property_categories; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN property_categories SET DEFAULT ARRAY[]::public.property_category[];


--
-- Name: country_properties created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: country_properties updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: country_properties images; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties ALTER COLUMN images SET DEFAULT '[]'::json;


--
-- Name: country_properties category; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties ALTER COLUMN category SET DEFAULT 'country'::public.property_category;


--
-- Name: country_properties layout_images; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties ALTER COLUMN layout_images SET DEFAULT '[]'::json;


--
-- Name: country_properties linked_contact_ids; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties ALTER COLUMN linked_contact_ids SET DEFAULT ARRAY[]::integer[];


--
-- Name: csi_answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.csi_answers ALTER COLUMN id SET DEFAULT nextval('public.csi_answers_id_seq'::regclass);


--
-- Name: csi_questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.csi_questions ALTER COLUMN id SET DEFAULT nextval('public.csi_questions_id_seq'::regclass);


--
-- Name: daily_duty id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_duty ALTER COLUMN id SET DEFAULT nextval('public.daily_duty_id_seq'::regclass);


--
-- Name: deals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals ALTER COLUMN id SET DEFAULT nextval('public.deals_id_seq'::regclass);


--
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- Name: dictionary_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionary_items ALTER COLUMN id SET DEFAULT nextval('public.dictionary_items_id_seq'::regclass);


--
-- Name: districts aliases; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.districts ALTER COLUMN aliases SET DEFAULT ARRAY[]::public.citext[];


--
-- Name: districts created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.districts ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: districts updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.districts ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: districts place_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.districts ALTER COLUMN place_type SET DEFAULT 'district'::public.place_type;


--
-- Name: districts property_categories; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.districts ALTER COLUMN property_categories SET DEFAULT ARRAY[]::public.property_category[];


--
-- Name: divisions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.divisions ALTER COLUMN id SET DEFAULT nextval('public.divisions_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: export_error_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.export_error_logs ALTER COLUMN id SET DEFAULT nextval('public.export_error_logs_id_seq'::regclass);


--
-- Name: export_locations id; Type: DEFAULT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.export_locations ALTER COLUMN id SET DEFAULT nextval('public.export_locations_id_seq'::regclass);


--
-- Name: export_packages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.export_packages ALTER COLUMN id SET DEFAULT nextval('public.export_packages_id_seq'::regclass);


--
-- Name: images_orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images_orders ALTER COLUMN id SET DEFAULT nextval('public.property_photos_orders_id_seq'::regclass);


--
-- Name: journal ordering; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journal ALTER COLUMN ordering SET DEFAULT nextval('public.journal_ordering_seq'::regclass);


--
-- Name: localities aliases; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities ALTER COLUMN aliases SET DEFAULT ARRAY[]::public.citext[];


--
-- Name: localities created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: localities updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: localities place_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities ALTER COLUMN place_type SET DEFAULT 'locality'::public.place_type;


--
-- Name: localities property_categories; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities ALTER COLUMN property_categories SET DEFAULT ARRAY[]::public.property_category[];


--
-- Name: newsletters id; Type: DEFAULT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.newsletters ALTER COLUMN id SET DEFAULT nextval('public.newsletters_id_seq'::regclass);


--
-- Name: places id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places ALTER COLUMN id SET DEFAULT nextval('public.places_id_seq'::regclass);


--
-- Name: properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties ALTER COLUMN id SET DEFAULT nextval('public.properties_id_seq'::regclass);


--
-- Name: property_badges id; Type: DEFAULT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.property_badges ALTER COLUMN id SET DEFAULT nextval('public.property_badges_id_seq'::regclass);


--
-- Name: property_banners id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_banners ALTER COLUMN id SET DEFAULT nextval('public.property_banners_id_seq'::regclass);


--
-- Name: property_contracts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_contracts ALTER COLUMN id SET DEFAULT public.uuid_generate_v4();


--
-- Name: property_contracts created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_contracts ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: property_contracts updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_contracts ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: property_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_documents ALTER COLUMN id SET DEFAULT public.uuid_generate_v4();


--
-- Name: property_documents created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_documents ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: property_documents updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_documents ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: property_removal_orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_removal_orders ALTER COLUMN id SET DEFAULT nextval('public.property_removal_orders_id_seq'::regclass);


--
-- Name: property_search_orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_search_orders ALTER COLUMN id SET DEFAULT nextval('public.property_search_orders_id_seq'::regclass);


--
-- Name: regions aliases; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions ALTER COLUMN aliases SET DEFAULT ARRAY[]::public.citext[];


--
-- Name: regions created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: regions updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: regions place_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions ALTER COLUMN place_type SET DEFAULT 'administrative_area'::public.place_type;


--
-- Name: regions property_categories; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions ALTER COLUMN property_categories SET DEFAULT ARRAY[]::public.property_category[];


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: routes aliases; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes ALTER COLUMN aliases SET DEFAULT ARRAY[]::public.citext[];


--
-- Name: routes created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: routes updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: routes place_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes ALTER COLUMN place_type SET DEFAULT 'route'::public.place_type;


--
-- Name: routes property_categories; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes ALTER COLUMN property_categories SET DEFAULT ARRAY[]::public.property_category[];


--
-- Name: selections id; Type: DEFAULT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.selections ALTER COLUMN id SET DEFAULT nextval('public.selections_id_seq'::regclass);


--
-- Name: settlement_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlement_documents ALTER COLUMN id SET DEFAULT public.uuid_generate_v4();


--
-- Name: settlement_documents created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlement_documents ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: settlement_documents updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlement_documents ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: settlements aliases; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements ALTER COLUMN aliases SET DEFAULT ARRAY[]::public.citext[];


--
-- Name: settlements created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: settlements updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: settlements property_categories; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements ALTER COLUMN property_categories SET DEFAULT ARRAY[]::public.property_category[];


--
-- Name: sms_notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sms_notifications ALTER COLUMN id SET DEFAULT nextval('public.sms_notifications_id_seq'::regclass);


--
-- Name: staff_user_documents created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_user_documents ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: staff_user_documents updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_user_documents ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: staff_users created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_users ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: staff_users updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_users ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: sub_localities aliases; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities ALTER COLUMN aliases SET DEFAULT ARRAY[]::public.citext[];


--
-- Name: sub_localities created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: sub_localities updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: sub_localities place_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities ALTER COLUMN place_type SET DEFAULT 'sub_locality'::public.place_type;


--
-- Name: sub_localities property_categories; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities ALTER COLUMN property_categories SET DEFAULT ARRAY[]::public.property_category[];


--
-- Name: subways aliases; Type: DEFAULT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.subways ALTER COLUMN aliases SET DEFAULT ARRAY[]::public.citext[];


--
-- Name: subways created_at; Type: DEFAULT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.subways ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: subways updated_at; Type: DEFAULT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.subways ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: subways place_type; Type: DEFAULT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.subways ALTER COLUMN place_type SET DEFAULT 'subway'::public.place_type;


--
-- Name: subways property_categories; Type: DEFAULT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.subways ALTER COLUMN property_categories SET DEFAULT ARRAY[]::public.property_category[];


--
-- Name: task_documents created_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_documents ALTER COLUMN created_at SET DEFAULT now();


--
-- Name: task_documents updated_at; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_documents ALTER COLUMN updated_at SET DEFAULT now();


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.applications (id, name, state, token, role_id, responsible_user_id, created_at, updated_at, created_by_user_id, updated_by_user_id) FROM stdin;
\.


--
-- Data for Name: cian_subways; Type: TABLE DATA; Schema: public; Owner: jq
--

COPY public.cian_subways (id, subway_id) FROM stdin;
\.


--
-- Data for Name: city_properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.city_properties (id, ru_id, state, kind, created_at, updated_at, created_by_user_id, updated_by_user_id, images, client_lead_id, category, layout_images, ro_price, ro_currency, ro_agent_fee, ro_agent_fixed_price, ro_agent_fixed_price_currency, ro_deposit, ro_period, ro_is_allowed_pets, ro_is_allowed_children, so_price, so_currency, so_agent_fee, so_agent_fixed_price, so_agent_fixed_price_currency, so_kind, so_is_bargain, so_is_mortgage, so_is_installment, linked_contact_ids, note, ru_department_id, ru_division_id, removal_order_id, sd_reason, so_is_resale, external_id, l_cadastral_number, badge_id, so_price_delta, ro_price_delta, so_is_disabled, ro_is_disabled, equipment, complex_building_id, s_layout, s_ceil_height, s_total_area, s_living_area, s_rooms, s_wcs, s_loggias, s_balconies, s_floor, s_windows, i_renovate, i_conditioning, i_condition, i_furniture, i_ventilation, l_country_id, l_region_id, l_locality_id, l_sub_locality_id, l_street, l_house, l_housing, l_building, l_flat_number, l_postal_code, l_kladr_id, l_district_id, l_latitude, l_longitude, cbd_house_kind, cbd_built_year, cbd_series, cbd_construction_kind, cbd_floors, cbd_elevators, cbd_freight_elevators, cbd_parkings, cbd_underground_garages, cbd_security, cbd_with_rubbish_chute, s_bedrooms, s_panoramic_glazing, l_entrance, cbd_with_waste_disposal_room, cbd_maintenance_costs, complex_id, l_subway_ids, i_bathroom, s_kitchen_area) FROM stdin;
\.


--
-- Data for Name: client_lead_sources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client_lead_sources (id, title, slug, created_at, updated_at, created_by_user_id, updated_by_user_id) FROM stdin;
\.


--
-- Data for Name: client_leads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client_leads (id, state, request_details, cbu_id, property_id, contact_id, created_at, updated_at, cd_first_name, cd_last_name, cd_phone_number, cd_email, cd_kind_dictionary_kind, cd_kind_dictionary_id, ru_id, kind, client_lead_source_id, note, updated_by_user_id, utms, sd_to_approve, sd_changes, pcd_status, pcd_duration, pcd_call_recording_url, pcd_reason, ru_department_id, ru_division_id, deal_id, request_kind, property_search_order_id, cbu_department_id, cbu_division_id, rd_property_ids, search_query, ua_client_id, call_session_id, sd_reason_id, is_repeated) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, parent_id, state, user_id, text, created_at, object_id, object_klass) FROM stdin;
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, inn, ogrn, registered_at, state, kpp, opf, created_at, updated_at, created_by_user_id, updated_by_user_id, responsible_user_id, address, phone_numbers, image, description) FROM stdin;
\.


--
-- Data for Name: complex_building_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.complex_building_documents (id, state, filename, aes_key, iv_bytes, comment, created_at, updated_at, uploader_id, complex_building_id, kind_dictionary_kind, kind_dictionary_id) FROM stdin;
\.


--
-- Data for Name: complex_buildings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.complex_buildings (id, name, built_year, delivery_quarter, stage, floors, parkings, underground_garages, l_country_id, l_region_id, l_locality_id, l_sub_locality_id, l_street, l_postal_code, created_at, updated_at, l_kladr_id, house_kind, construction_stage, security, construction_kind, l_house, l_housing, l_building, series, elevators, freight_elevators, state, images, created_by_user_id, updated_by_user_id, l_district_id, l_latitude, l_longitude, pd_so_kind, pd_so_is_bargain, pd_so_is_installment, pd_so_is_mortgage, pd_so_agent_fee, pd_so_agent_fixed_price, pd_so_agent_fixed_price_currency, pds_condition, pds_renovate, pds_furniture, pds_conditioning, pds_ventilation, ru_id, ru_department_id, ru_division_id, contract_type, architect, developer_id, contractor_id, with_rubbish_chute, infrastructure_units, complex_id, s_properties_count, s_mcp_from_usd, s_mcp_from_eur, s_mcp_from_rub, s_mcp_to_usd, s_mcp_to_eur, s_mcp_to_rub, with_waste_disposal_room, maintenance_costs, s_properties_area_from, s_properties_area_to, s_properties_count_primary, s_properties_count_resale, s_properties_area_from_primary, s_properties_area_to_primary, s_properties_area_from_resale, s_properties_area_to_resale, s_mcp_from_rub_primary, s_mcp_from_usd_primary, s_mcp_from_eur_primary, s_mcp_to_rub_primary, s_mcp_to_usd_primary, s_mcp_to_eur_primary, s_mcp_from_rub_resale, s_mcp_from_usd_resale, s_mcp_from_eur_resale, s_mcp_to_rub_resale, s_mcp_to_usd_resale, s_mcp_to_eur_resale, flats, l_subway_ids) FROM stdin;
\.


--
-- Data for Name: complexes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.complexes (id, name, images, created_at, updated_at, created_by_user_id, updated_by_user_id, l_country_id, l_region_id, l_locality_id, l_sub_locality_id, l_street, l_house, l_housing, l_building, l_flat_number, l_postal_code, l_kladr_id, l_district_id, l_latitude, l_longitude, ru_id, ru_department_id, ru_division_id, linked_contact_ids, s_properties_count, s_mcp_from_usd, s_mcp_from_eur, s_mcp_from_rub, s_mcp_to_usd, s_mcp_to_eur, s_mcp_to_rub, state, commissioning_quarter, commissioning_year, note, keys_issue_date, accreditors, at_area, at_playgrounds, at_is_allowed_cars, at_is_access_open, at_is_greenery_planted, pc_oral_reservation, pc_agreement_preparation, pc_developer_agreement, pc_state_registration_preparation, pc_signing, pc_state_registration, pc_document_delivery, pc_payment, s_properties_area_from, s_properties_area_to, s_properties_count_primary, s_properties_count_resale, s_properties_area_from_primary, s_properties_area_to_primary, s_properties_area_from_resale, s_properties_area_to_resale, s_mcp_from_rub_primary, s_mcp_from_usd_primary, s_mcp_from_eur_primary, s_mcp_to_rub_primary, s_mcp_to_usd_primary, s_mcp_to_eur_primary, s_mcp_from_rub_resale, s_mcp_from_usd_resale, s_mcp_from_eur_resale, s_mcp_to_rub_resale, s_mcp_to_usd_resale, s_mcp_to_eur_resale, l_subway_ids) FROM stdin;
\.


--
-- Data for Name: contact_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_documents (id, state, filename, aes_key, iv_bytes, comment, created_at, updated_at, uploader_id, contact_id, kind_dictionary_kind, kind_dictionary_id) FROM stdin;
\.


--
-- Data for Name: contact_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_links (contact_id, linked_contact_id, kind_dictionary_kind, kind_dictionary_id, relationship_to_kind_dictionary_id) FROM stdin;
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (id, ru_ids, photo, first_name, last_name, middle_name, phone_number, email, facebook, twitter, instagram, vk, additional_phone_number, additional_email, auto_number, auto_region, company, note, created_at, updated_at, position_dictionary_id, position_dictionary_kind, occupation_dictionary_id, occupation_dictionary_kind, job_role_dictionary_id, job_role_dictionary_kind, auto_model_dictionary_id, auto_model_dictionary_kind, auto_brand_dictionary_id, auto_brand_dictionary_kind, ru_department_ids, ru_division_ids, company_id, state, source, kind) FROM stdin;
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name, kind_name, aliases, created_at, updated_at, place_type, property_categories) FROM stdin;
1	Россия	\N	{}	2016-01-28 10:41:53.791+00	2016-01-28 10:41:53.791+00	country	{country,city}
\.


--
-- Data for Name: country_properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.country_properties (id, ru_id, state, kind, created_at, updated_at, created_by_user_id, updated_by_user_id, images, client_lead_id, category, layout_images, ro_price, ro_currency, ro_agent_fee, ro_agent_fixed_price, ro_agent_fixed_price_currency, ro_deposit, ro_period, ro_is_allowed_pets, ro_is_allowed_children, so_price, so_currency, so_agent_fee, so_agent_fixed_price, so_agent_fixed_price_currency, so_kind, so_is_bargain, so_is_mortgage, so_is_installment, linked_contact_ids, note, ru_department_id, ru_division_id, removal_order_id, sd_reason, so_is_resale, external_id, l_cadastral_number, badge_id, so_price_delta, ro_price_delta, so_is_disabled, ro_is_disabled, equipment, s_spaces, ad_security_house_area, ad_guest_house_area, ad_staff_house_area, ad_spa_area, ad_pool_width, ad_pool_height, ad_parking_area, ad_garage_area, c_power_supply, c_water_supply, c_gas_supply, c_sewerage_supply, ld_landscaping, ld_landscape_kind, ld_area, l_street, l_house, s_bedrooms, s_area, s_wall_material, s_roof_material, s_built_year, s_floors, s_loggias, s_balconies, s_elevators, s_ceiling_height, s_with_conditioning, s_with_ventilation, s_renovate, s_condition, s_furniture, l_settlement_id, l_country_id, l_region_id, l_district_id, l_locality_id, ad_bathhouse_area, l_route_id, l_latitude, l_longitude, s_layouts, s_rooms, s_wcs, s_legacy_layouts) FROM stdin;
30	2	private	house	2016-01-25 22:10:14+00	2018-11-09 13:00:18.520995+00	1	2	[{"id": "PRI30-5c28c34a", "width": 5607, "height": 3729, "comment": null, "isPublic": true}, {"id": "PRI30-774094b7", "width": 5506, "height": 3671, "comment": null, "isPublic": true}, {"id": "PRI30-0b98b5a8", "width": 5605, "height": 3715, "comment": null, "isPublic": true}, {"id": "PRI30-5a5da2ee", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI30-0cac23b1", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI30-98afddd3", "width": 5478, "height": 3653, "comment": null, "isPublic": true}, {"id": "PRI30-ee8c4edf", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI30-40e0f125", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI30-8a8ebb0a", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI30-e75914a1", "width": 1200, "height": 800, "comment": null, "isPublic": true}, {"id": "PRI30-96b0eb0f", "width": 5352, "height": 3568, "comment": null, "isPublic": false}, {"id": "PRI30-675bc409", "width": 1200, "height": 800, "comment": null, "isPublic": true}, {"id": "PRI30-c303daed", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-8879f6e2", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-192b27b0", "width": 1200, "height": 800, "comment": null, "isPublic": true}, {"id": "PRI30-22701a05", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-63ce258a", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-3f93f5ed", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-eb54e40f", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-8c3a375c", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-6c7b8a2d", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-8d1ea4b1", "width": 5608, "height": 3731, "comment": null, "isPublic": false}, {"id": "PRI30-1e01583a", "width": 1200, "height": 799, "comment": null, "isPublic": false}, {"id": "PRI30-33a452ab", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-5dd3bf3a", "width": 5610, "height": 3733, "comment": null, "isPublic": false}, {"id": "PRI30-055ccae5", "width": 5604, "height": 3726, "comment": null, "isPublic": false}, {"id": "PRI30-72fcf19d", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-21637b36", "width": 5608, "height": 3718, "comment": null, "isPublic": false}, {"id": "PRI30-75790005", "width": 5614, "height": 3736, "comment": null, "isPublic": false}, {"id": "PRI30-e1416644", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-7fe7e833", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-939eb4c1", "width": 1200, "height": 799, "comment": null, "isPublic": false}, {"id": "PRI30-30a9d947", "width": 5619, "height": 3726, "comment": null, "isPublic": false}, {"id": "PRI30-a2ffd066", "width": 5606, "height": 3728, "comment": null, "isPublic": false}, {"id": "PRI30-e8b819d8", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-768e562d", "width": 1200, "height": 795, "comment": null, "isPublic": false}, {"id": "PRI30-601fd4a4", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-33781bbb", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-ad12ad1d", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-a3ec562c", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-bf95b4cc", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-0c1816c4", "width": 5545, "height": 3697, "comment": null, "isPublic": false}, {"id": "PRI30-811f0cf6", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-addb5d7d", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-a515f1ad", "width": 5599, "height": 3724, "comment": null, "isPublic": false}, {"id": "PRI30-888d2ae8", "width": 5595, "height": 3723, "comment": null, "isPublic": false}, {"id": "PRI30-3c06de6a", "width": 1200, "height": 799, "comment": null, "isPublic": false}, {"id": "PRI30-48ebd4a2", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-c4ecd945", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-4d5c68b4", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-d4983a04", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-1b6d14b4", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-d0cd4d3e", "width": 5465, "height": 3643, "comment": null, "isPublic": false}, {"id": "PRI30-d50857f8", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-9cf746e6", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-8c7acc09", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-98d31ddc", "width": 1200, "height": 796, "comment": null, "isPublic": false}, {"id": "PRI30-645ed839", "width": 1200, "height": 797, "comment": null, "isPublic": false}, {"id": "PRI30-3aeff8b2", "width": 5613, "height": 3736, "comment": null, "isPublic": false}, {"id": "PRI30-a35bb5d7", "width": 1200, "height": 799, "comment": null, "isPublic": false}, {"id": "PRI30-3784a355", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-693343de", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-171529f8", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-d9e6cc76", "width": 1200, "height": 799, "comment": null, "isPublic": false}, {"id": "PRI30-b0519657", "width": 5615, "height": 3737, "comment": null, "isPublic": false}, {"id": "PRI30-5e1df4a2", "width": 5620, "height": 3741, "comment": null, "isPublic": false}, {"id": "PRI30-e16d96c3", "width": 5599, "height": 3719, "comment": null, "isPublic": false}, {"id": "PRI30-76ab35f6", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-17fb246d", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-1c12748c", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-686193e2", "width": 5620, "height": 3735, "comment": null, "isPublic": false}, {"id": "PRI30-102ff2b7", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-d8a57129", "width": 1200, "height": 799, "comment": null, "isPublic": false}, {"id": "PRI30-571b383c", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-03c98b6d", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-785bee46", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-b670807d", "width": 1200, "height": 796, "comment": null, "isPublic": false}, {"id": "PRI30-c8ca84dc", "width": 5623, "height": 3737, "comment": null, "isPublic": false}, {"id": "PRI30-e01955be", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-e1d0062b", "width": 5466, "height": 3644, "comment": null, "isPublic": false}, {"id": "PRI30-1801bdbe", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-27e81d7f", "width": 5507, "height": 3672, "comment": null, "isPublic": false}, {"id": "PRI30-4505785f", "width": 5623, "height": 3736, "comment": null, "isPublic": false}, {"id": "PRI30-6d1203ff", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-5229e7d6", "width": 5605, "height": 3721, "comment": null, "isPublic": false}, {"id": "PRI30-25ee65fe", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-19648c51", "width": 1200, "height": 797, "comment": null, "isPublic": false}, {"id": "PRI30-94c21745", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-9276d396", "width": 5588, "height": 3715, "comment": null, "isPublic": false}, {"id": "PRI30-8dbd42ea", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-88116530", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-09409b06", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-3daef906", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-1e0559fc", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-ae06ee08", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-be5afd0c", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-079e347b", "width": 5595, "height": 3727, "comment": null, "isPublic": false}, {"id": "PRI30-7f3784f6", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-2c2af149", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-3154209c", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-ad3fda01", "width": 5529, "height": 3686, "comment": null, "isPublic": false}, {"id": "PRI30-6012e2b3", "width": 1200, "height": 796, "comment": null, "isPublic": false}, {"id": "PRI30-98142bca", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-52dc6605", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-0882ce95", "width": 5611, "height": 3737, "comment": null, "isPublic": false}, {"id": "PRI30-43b1d052", "width": 1200, "height": 799, "comment": null, "isPublic": false}, {"id": "PRI30-6b3a0b53", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-01b4a2bd", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-65853b77", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-2c2f475c", "width": 1200, "height": 797, "comment": null, "isPublic": false}, {"id": "PRI30-75b13dc4", "width": 5611, "height": 3725, "comment": null, "isPublic": false}, {"id": "PRI30-606c7013", "width": 5618, "height": 3737, "comment": null, "isPublic": false}, {"id": "PRI30-cff2f252", "width": 5604, "height": 3718, "comment": null, "isPublic": false}, {"id": "PRI30-749fe25a", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-00dfdaf9", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-6b48f3ad", "width": 5614, "height": 3731, "comment": null, "isPublic": false}, {"id": "PRI30-bf25d8dc", "width": 1200, "height": 799, "comment": null, "isPublic": false}, {"id": "PRI30-c2982442", "width": 5617, "height": 3733, "comment": null, "isPublic": false}, {"id": "PRI30-e4484463", "width": 5572, "height": 3708, "comment": null, "isPublic": false}, {"id": "PRI30-0f73dd7b", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-75ee3973", "width": 5473, "height": 3648, "comment": null, "isPublic": false}, {"id": "PRI30-f5291a5d", "width": 1200, "height": 797, "comment": null, "isPublic": false}, {"id": "PRI30-124c4b14", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-954232e9", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-0be8e840", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-8f58b296", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-80e42709", "width": 5442, "height": 3627, "comment": null, "isPublic": false}, {"id": "PRI30-58b6d24b", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-808bad3d", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-4aaf5b1d", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-cd7fb767", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-09b04f23", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-caa2e0ab", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-14accce0", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-ea6d0cbd", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-cd026e3e", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-5457b260", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI30-83049173", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-43327abe", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-80c94840", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI30-cf33e30a", "width": 5620, "height": 3745, "comment": null, "isPublic": false}, {"id": "PRI30-48c85e2c", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI30-37be481d", "width": 5617, "height": 3736, "comment": null, "isPublic": false}, {"id": "PRI30-fadb1f62", "width": 1200, "height": 798, "comment": null, "isPublic": false}]	\N	country	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	5000000	USD	4	\N	\N	direct_sell	t	f	f	[0:1]={24,6507}	живут арендаторы, без права показа, март 2017 г,  irina0208@mailru	14	\N	\N	\N	t	\N	\N	\N	\N	\N	f	\N	{internet,cable_tv,intercom,phone,fridge,tv,washmachine,appliances}	[]	\N	\N	\N	\N	\N	\N	2	\N	20	central	mains	central	t	{forest}	27	\N	4	4	480	brick	tile	2009	2	\N	\N	\N	\N	f	f	full_construction	good	full	1	1	1003	1012	1733	\N	1178	55.712257385253906	37.177146911621094	"office"=>"1", "kitchen"=>"1", "spa_zone"=>"1", "dining_room"=>"1", "living_room"=>"1", "utility_room"=>"1", "dressing_room"=>"3", "technical_room"=>"1"	\N	4	[{"kind": "floor", "items": ["холл", "гардеробная", "су", "кабинет", "кухня-столовая", "гостиная с камином", "комната отдыха", "сауна", "постирочная", "гараж на 2 машины"], "number": 1}, {"kind": "floor", "items": ["холл", "хозяйская спальня с ванной комнатой и гардеробной", "2 спальни", "ванная комната", "гардеробная"], "number": 2}]
31	2	postponed	house	2015-09-24 21:25:23+00	2018-10-05 12:32:44.356556+00	1	2	[{"id": "PRI31-39184f8c", "width": 3919, "height": 2603, "comment": null, "isPublic": true}, {"id": "PRI31-31265a1d", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI31-caa664a8", "width": 5561, "height": 3707, "comment": null, "isPublic": true}, {"id": "PRI31-f0be5c42", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI31-392d4ae3", "width": 1200, "height": 800, "comment": null, "isPublic": true}, {"id": "PRI31-19f8c4b9", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI31-167e598e", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI31-5f277067", "width": 5580, "height": 3720, "comment": null, "isPublic": true}, {"id": "PRI31-32a3d004", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI31-dd6e6d3f", "width": 3911, "height": 2587, "comment": null, "isPublic": false}, {"id": "PRI31-c078b104", "width": 3937, "height": 2601, "comment": null, "isPublic": false}, {"id": "PRI31-46cbd730", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI31-8e1f983f", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI31-34288bcf", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI31-3070779c", "width": 5503, "height": 3668, "comment": null, "isPublic": false}, {"id": "PRI31-a21b1f0c", "width": 1200, "height": 797, "comment": null, "isPublic": false}, {"id": "PRI31-c52b8e65", "width": 5462, "height": 3641, "comment": null, "isPublic": false}, {"id": "PRI31-3af6ce9c", "width": 3953, "height": 2634, "comment": null, "isPublic": true}, {"id": "PRI31-42de536b", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI31-dad85751", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI31-7f14cde4", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI31-281d432c", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI31-49548bad", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI31-49d1498e", "width": 5622, "height": 3736, "comment": null, "isPublic": false}, {"id": "PRI31-5bd4dbcd", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI31-969c32c8", "width": 5604, "height": 3724, "comment": null, "isPublic": false}, {"id": "PRI31-5db99c7b", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI31-ab987f31", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI31-36994e36", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI31-9b5b14f0", "width": 3954, "height": 2631, "comment": null, "isPublic": false}, {"id": "PRI31-b68a5fc5", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI31-af6b08b3", "width": 3949, "height": 2627, "comment": null, "isPublic": false}, {"id": "PRI31-6a6c58a0", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI31-e11904a6", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI31-d038762a", "width": 1200, "height": 800, "comment": null, "isPublic": false}]	\N	country	[]	800000	RUB	50	\N	\N	1	year	t	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	[0:0]={136230}	01/04/2016 Акулова. актуально, торг. телефон супруги: 8-985-220-90-99 Людмила.  11692 klim197707@mail.ru\n\nсупруги нет, а александр не помнит номер дома\n9.08.16 Дрозд.акт.\n\nhttps://www.angel-estate.ru/arendovat-zagorodnyy-kottedzh-v-poselke-kotton-vey-nikologorskiy-5902\\	3	\N	\N	\N	\N	\N	50:20:0050209:262	\N	\N	\N	\N	f	{}	[]	70	200	\N	\N	\N	\N	4	2	15	central	mains	central	t	{forest}	35	Звенигородская	1	5	500	brick	tile	2009	4	\N	\N	\N	\N	f	f	full_construction	good	full	2	1	1003	1012	1104	\N	1178	55.74227523803711	37.044715881347656	"gym"=>"1", "loft"=>"1", "office"=>"1", "kitchen"=>"1", "storage"=>"1", "staff_room"=>"2", "dining_room"=>"1", "living_room"=>"1", "utility_room"=>"1", "dressing_room"=>"2", "winter_garden"=>"1", "technical_room"=>"1"	\N	4	[{"kind": "attic", "items": ["холл", "2 спальни"], "number": null}, {"kind": "base", "items": ["тренажерный зал", "постирочная", "котельная"], "number": null}, {"kind": "floor", "items": ["холл", "су", "гостиная с камином", "зимний сад", "кухня", "столовая", "кабинет", "гараж на 2 машины"], "number": 1}, {"kind": "floor", "items": ["холл", "хозяйская спальня с ванной комнатой и гардеробной", "2 спальни", "гардеробная", "ванная комната"], "number": 2}]
32	2	sold	house	2013-10-01 16:19:56+00	2017-08-05 10:08:12.559+00	2	\N	[{"id": "PRI32-34c4b647", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI32-197c06de", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI32-af1c78a9", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI32-b91ec5dc", "width": 5405, "height": 3604, "comment": null, "isPublic": true}, {"id": "PRI32-e3bf1c0f", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI32-03d17404", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI32-f16451d8", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI32-275780a9", "width": 1200, "height": 799, "comment": null, "isPublic": false}, {"id": "PRI32-90fb10e8", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI32-126a5d43", "width": 5617, "height": 3728, "comment": null, "isPublic": false}, {"id": "PRI32-dc9422ad", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI32-de44833c", "width": 5604, "height": 3728, "comment": null, "isPublic": false}, {"id": "PRI32-35bdb0a4", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI32-d06d038f", "width": 5626, "height": 3745, "comment": null, "isPublic": false}, {"id": "PRI32-bc3e69f2", "width": 1200, "height": 796, "comment": null, "isPublic": false}, {"id": "PRI32-7d0aaeee", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI32-c94e50d0", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI32-f9204fa1", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI32-db732b45", "width": 1200, "height": 800, "comment": null, "isPublic": false}]	\N	country	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	3200000	USD	4	\N	\N	\N	\N	\N	\N	{5259}	Комментарий: нет\\nПримечание: 11698	14	\N	\N	\N	t	\N	\N	\N	\N	\N	\N	\N	{}	[]	\N	\N	\N	\N	7	3	5	2	40	central	mains	central	t	{forest}	30	\N	\N	\N	600	brick	\N	2007	\N	\N	\N	\N	\N	\N	\N	full_construction	\N	\N	3	1	1003	1012	1141	\N	1178	55.712429	37.1474342	"gym"=>"1", "kitchen"=>"1", "spa_zone"=>"2", "game_room"=>"1", "living_room"=>"1", "utility_room"=>"2", "dressing_room"=>"4", "technical_room"=>"2"	\N	2	[{"kind": "base", "items": ["бильярдная", "постирочная", "кинозал", "су", "тех.помещения", "гараж на 2 машины", "кладовая", "тренажерный зал"], "number": null}, {"kind": "floor", "items": ["холл", "гардеробная", "хамам", "котельная", "гостевая спальня", "су", "кухня-столовая", "бассейн", "гостиная с камином"], "number": 1}, {"kind": "floor", "items": ["хозяйская спальня с ванной комнатой и гардеробной", "2 ванные комнаты", "2 гардеробные", "4 спальни", "холл"], "number": 2}]
34	1	sold	house	2014-07-03 02:35:21+00	2017-08-05 10:08:12.628+00	2	\N	[{"id": "PRI34-5932201a", "width": 1200, "height": 798, "comment": null, "isPublic": true}, {"id": "PRI34-574a17e8", "width": 800, "height": 600, "comment": null, "isPublic": true}, {"id": "PRI34-8ff42e36", "width": 1200, "height": 800, "comment": null, "isPublic": true}, {"id": "PRI34-95ceba90", "width": 1200, "height": 800, "comment": null, "isPublic": true}, {"id": "PRI34-3e4169a5", "width": 1200, "height": 800, "comment": null, "isPublic": true}, {"id": "PRI34-80157c2b", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI34-8af894f4", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI34-3a69fbc4", "width": 1200, "height": 798, "comment": null, "isPublic": false}, {"id": "PRI34-f4d6ecd3", "width": 1200, "height": 800, "comment": null, "isPublic": false}, {"id": "PRI34-9f799fae", "width": 1200, "height": 800, "comment": null, "isPublic": false}]	\N	country	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	4900000	USD	6	\N	\N	\N	\N	\N	\N	{6480}	Комментарий: Продан\\nПримечание: СА1664	14	\N	\N	\N	t	\N	\N	\N	\N	\N	\N	\N	{}	[]	140	\N	\N	\N	8	4	3	2	30	central	mains	septic	t	{forest}	30	\N	\N	\N	1130	brick	\N	2007	\N	\N	\N	\N	\N	\N	\N	full_construction	\N	\N	1	1	1003	1008	1163	\N	1186	55.7164688	37.13377	"gym"=>"1", "loft"=>"1", "office"=>"1", "kitchen"=>"1", "spa_zone"=>"2", "game_room"=>"1", "utility_room"=>"2", "dressing_room"=>"4", "technical_room"=>"1"	\N	2	[{"kind": "attic", "items": ["холл", "2 спальни", "2 ванные комнаты", "2 гардеробные", "кабинет"], "number": null}, {"kind": "base", "items": ["бильярдная", "постирочная", "кладовая", "тех.помещения"], "number": null}, {"kind": "floor", "items": ["СПА зона", "су", "кухня-столовая", "холл", "гостиная со вторым светом и камином", "бассейн", "душ", "сауна", "тренажерный зал", "ванная комната"], "number": 1}, {"kind": "floor", "items": ["холл", "хозяйская спальня с ванной комнатой и гардеробной", "комната отдыха", "спальня", "су", "гардеробная"], "number": 2}]
35	1	sold	house	2014-11-12 22:55:56+00	2018-05-17 10:05:12.518077+00	2	1	[{"id": "PRI35-884767e8", "width": 4379, "height": 2909, "comment": null, "isPublic": true}, {"id": "PRI35-50312d31", "width": 4368, "height": 2918, "comment": null, "isPublic": true}, {"id": "PRI35-24aa6b4e", "width": 4203, "height": 2797, "comment": null, "isPublic": true}, {"id": "PRI35-19df0d49", "width": 4141, "height": 2755, "comment": null, "isPublic": true}, {"id": "PRI35-e0983c97", "width": 4145, "height": 2758, "comment": null, "isPublic": true}, {"id": "PRI35-b67d45b9", "width": 4145, "height": 2758, "comment": null, "isPublic": true}, {"id": "PRI35-b9d83cc2", "width": 4368, "height": 2915, "comment": null, "isPublic": true}, {"id": "PRI35-a7593a1a", "width": 4250, "height": 2836, "comment": null, "isPublic": true}, {"id": "PRI35-40d589c2", "width": 4368, "height": 2916, "comment": null, "isPublic": false}, {"id": "PRI35-2a4ae4e0", "width": 4189, "height": 2788, "comment": null, "isPublic": false}, {"id": "PRI35-a72177e0", "width": 4147, "height": 2760, "comment": null, "isPublic": false}, {"id": "PRI35-caff8b2f", "width": 4296, "height": 2650, "comment": null, "isPublic": false}, {"id": "PRI35-ec4b9cfa", "width": 4261, "height": 2813, "comment": null, "isPublic": false}, {"id": "PRI35-bd796941", "width": 4167, "height": 2773, "comment": null, "isPublic": false}, {"id": "PRI35-c2988e2f", "width": 4256, "height": 2832, "comment": null, "isPublic": false}, {"id": "PRI35-2608750e", "width": 4136, "height": 2752, "comment": null, "isPublic": false}, {"id": "PRI35-ce6e463a", "width": 4334, "height": 2892, "comment": null, "isPublic": false}, {"id": "PRI35-96826ef5", "width": 4232, "height": 2816, "comment": null, "isPublic": false}, {"id": "PRI35-b9c09a88", "width": 1000, "height": 667, "comment": null, "isPublic": false}, {"id": "PRI35-e3b5d0a2", "width": 4244, "height": 2824, "comment": null, "isPublic": false}, {"id": "PRI35-22891598", "width": 4262, "height": 2814, "comment": null, "isPublic": false}, {"id": "PRI35-345fb0c2", "width": 3931, "height": 2585, "comment": null, "isPublic": false}, {"id": "PRI35-acbb045c", "width": 4052, "height": 2697, "comment": null, "isPublic": false}, {"id": "PRI35-2d083348", "width": 4073, "height": 2699, "comment": null, "isPublic": false}, {"id": "PRI35-26f49307", "width": 4251, "height": 2829, "comment": null, "isPublic": false}, {"id": "PRI35-87dd68eb", "width": 4129, "height": 2748, "comment": null, "isPublic": false}, {"id": "PRI35-22a471b0", "width": 4181, "height": 2782, "comment": null, "isPublic": false}, {"id": "PRI35-9d3d9aa9", "width": 4368, "height": 2912, "comment": null, "isPublic": false}, {"id": "PRI35-9edf03d5", "width": 4104, "height": 2730, "comment": null, "isPublic": false}, {"id": "PRI35-59809757", "width": 1000, "height": 665, "comment": null, "isPublic": false}, {"id": "PRI35-78557593", "width": 4162, "height": 2770, "comment": null, "isPublic": false}, {"id": "PRI35-8efaccd1", "width": 4114, "height": 2738, "comment": null, "isPublic": false}, {"id": "PRI35-0bd012d7", "width": 4256, "height": 2832, "comment": null, "isPublic": false}, {"id": "PRI35-e62eef2c", "width": 4265, "height": 2829, "comment": null, "isPublic": false}, {"id": "PRI35-7dd8cd74", "width": 4368, "height": 2912, "comment": null, "isPublic": false}, {"id": "PRI35-7897b847", "width": 4234, "height": 2817, "comment": null, "isPublic": false}, {"id": "PRI35-5ba67660", "width": 4355, "height": 2890, "comment": null, "isPublic": false}, {"id": "PRI35-1cd0101d", "width": 4191, "height": 2773, "comment": null, "isPublic": false}, {"id": "PRI35-c9e6c80f", "width": 4080, "height": 2715, "comment": null, "isPublic": false}, {"id": "PRI35-650e2a63", "width": 4256, "height": 2832, "comment": null, "isPublic": false}, {"id": "PRI35-592cad6b", "width": 4115, "height": 2738, "comment": null, "isPublic": false}, {"id": "PRI35-4a040c81", "width": 4211, "height": 2802, "comment": null, "isPublic": false}, {"id": "PRI35-6e98506e", "width": 4174, "height": 2777, "comment": null, "isPublic": false}, {"id": "PRI35-fe6e19ba", "width": 4372, "height": 2908, "comment": null, "isPublic": false}, {"id": "PRI35-727e163e", "width": 4165, "height": 2771, "comment": null, "isPublic": false}, {"id": "PRI35-94a670b2", "width": 4138, "height": 2754, "comment": null, "isPublic": false}, {"id": "PRI35-13a6210f", "width": 4128, "height": 2747, "comment": null, "isPublic": false}, {"id": "PRI35-9eb0acd4", "width": 4273, "height": 2833, "comment": null, "isPublic": false}, {"id": "PRI35-479340b3", "width": 4194, "height": 2791, "comment": null, "isPublic": false}, {"id": "PRI35-86784bbb", "width": 4275, "height": 2834, "comment": null, "isPublic": false}, {"id": "PRI35-277cf945", "width": 4196, "height": 2782, "comment": null, "isPublic": false}, {"id": "PRI35-3ba5a0dd", "width": 4132, "height": 2750, "comment": null, "isPublic": false}, {"id": "PRI35-4289da7b", "width": 4206, "height": 2799, "comment": null, "isPublic": false}, {"id": "PRI35-9779dd93", "width": 4166, "height": 2764, "comment": null, "isPublic": false}, {"id": "PRI35-0d22f329", "width": 4005, "height": 2666, "comment": null, "isPublic": false}, {"id": "PRI35-4e55da2b", "width": 4211, "height": 2802, "comment": null, "isPublic": false}, {"id": "PRI35-f0452894", "width": 4148, "height": 2760, "comment": null, "isPublic": false}, {"id": "PRI35-4ad1072c", "width": 4052, "height": 2707, "comment": null, "isPublic": false}, {"id": "PRI35-80c3cb5b", "width": 1000, "height": 664, "comment": null, "isPublic": false}, {"id": "PRI35-86ee41c4", "width": 4198, "height": 2793, "comment": null, "isPublic": false}, {"id": "PRI35-08eb863d", "width": 4272, "height": 2851, "comment": null, "isPublic": false}, {"id": "PRI35-addc513b", "width": 4370, "height": 2889, "comment": null, "isPublic": false}, {"id": "PRI35-7859c6a4", "width": 3517, "height": 2338, "comment": null, "isPublic": false}, {"id": "PRI35-94085766", "width": 4199, "height": 2794, "comment": null, "isPublic": false}, {"id": "PRI35-77bdff72", "width": 1000, "height": 667, "comment": null, "isPublic": false}, {"id": "PRI35-bc37c7e5", "width": 4242, "height": 2813, "comment": null, "isPublic": false}, {"id": "PRI35-9d07d28f", "width": 4369, "height": 2916, "comment": null, "isPublic": false}, {"id": "PRI35-084db3a8", "width": 4250, "height": 2828, "comment": null, "isPublic": false}, {"id": "PRI35-a8c55737", "width": 4085, "height": 2718, "comment": null, "isPublic": false}, {"id": "PRI35-58627c9d", "width": 4085, "height": 2719, "comment": null, "isPublic": false}, {"id": "PRI35-ea44d9f0", "width": 4265, "height": 2827, "comment": null, "isPublic": false}, {"id": "PRI35-f0eca6cd", "width": 4188, "height": 2787, "comment": null, "isPublic": false}, {"id": "PRI35-2fad7a13", "width": 4256, "height": 2832, "comment": null, "isPublic": false}, {"id": "PRI35-14f170a9", "width": 4368, "height": 2923, "comment": null, "isPublic": false}, {"id": "PRI35-8b2bacea", "width": 4214, "height": 2804, "comment": null, "isPublic": false}, {"id": "PRI35-ce6065dc", "width": 4143, "height": 2756, "comment": null, "isPublic": false}, {"id": "PRI35-c7ceda96", "width": 4147, "height": 2759, "comment": null, "isPublic": false}, {"id": "PRI35-5834adc5", "width": 4382, "height": 2916, "comment": null, "isPublic": false}, {"id": "PRI35-408c8c63", "width": 4101, "height": 2717, "comment": null, "isPublic": false}, {"id": "PRI35-1b430433", "width": 4159, "height": 2767, "comment": null, "isPublic": false}, {"id": "PRI35-fe4c8ffc", "width": 4144, "height": 2742, "comment": null, "isPublic": false}, {"id": "PRI35-37bbeb9a", "width": 4375, "height": 2907, "comment": null, "isPublic": false}, {"id": "PRI35-b0028308", "width": 4134, "height": 2751, "comment": null, "isPublic": false}, {"id": "PRI35-880f3998", "width": 4030, "height": 2682, "comment": null, "isPublic": false}, {"id": "PRI35-c4b74ca8", "width": 3967, "height": 2640, "comment": null, "isPublic": false}, {"id": "PRI35-bdbe8e59", "width": 4250, "height": 2841, "comment": null, "isPublic": false}, {"id": "PRI35-074b3612", "width": 4250, "height": 2810, "comment": null, "isPublic": false}, {"id": "PRI35-1f014ace", "width": 4368, "height": 2912, "comment": null, "isPublic": false}, {"id": "PRI35-4322b632", "width": 4155, "height": 2764, "comment": null, "isPublic": false}, {"id": "PRI35-99d06fee", "width": 1000, "height": 665, "comment": null, "isPublic": false}, {"id": "PRI35-62a84ef8", "width": 4224, "height": 2810, "comment": null, "isPublic": false}, {"id": "PRI35-db41c677", "width": 4196, "height": 2792, "comment": null, "isPublic": false}, {"id": "PRI35-8974465b", "width": 4256, "height": 2832, "comment": null, "isPublic": false}, {"id": "PRI35-eb9646a9", "width": 4118, "height": 2740, "comment": null, "isPublic": false}, {"id": "PRI35-f54df495", "width": 4273, "height": 2825, "comment": null, "isPublic": false}, {"id": "PRI35-ac8d845c", "width": 4368, "height": 2912, "comment": null, "isPublic": false}, {"id": "PRI35-5247068e", "width": 4172, "height": 2776, "comment": null, "isPublic": false}, {"id": "PRI35-29b0b38e", "width": 4259, "height": 2821, "comment": null, "isPublic": false}, {"id": "PRI35-8dc3c72a", "width": 1000, "height": 668, "comment": null, "isPublic": false}, {"id": "PRI35-b10b7faf", "width": 3676, "height": 2439, "comment": null, "isPublic": false}, {"id": "PRI35-bc0467d3", "width": 4368, "height": 2914, "comment": null, "isPublic": false}, {"id": "PRI35-d990dc6b", "width": 4239, "height": 2821, "comment": null, "isPublic": false}, {"id": "PRI35-15b49b46", "width": 4268, "height": 2829, "comment": null, "isPublic": false}, {"id": "PRI35-201042d6", "width": 4380, "height": 2910, "comment": null, "isPublic": false}, {"id": "PRI35-ae522911", "width": 4379, "height": 2896, "comment": null, "isPublic": false}, {"id": "PRI35-a8017276", "width": 4164, "height": 2771, "comment": null, "isPublic": false}, {"id": "PRI35-0d97e80b", "width": 4161, "height": 2769, "comment": null, "isPublic": false}, {"id": "PRI35-52af278b", "width": 4027, "height": 2680, "comment": null, "isPublic": false}, {"id": "PRI35-8fb411b9", "width": 4271, "height": 2834, "comment": null, "isPublic": false}, {"id": "PRI35-05b4f379", "width": 4228, "height": 2813, "comment": null, "isPublic": false}, {"id": "PRI35-1b24c3e3", "width": 4237, "height": 2819, "comment": null, "isPublic": false}, {"id": "PRI35-3fd4e850", "width": 1000, "height": 669, "comment": null, "isPublic": false}, {"id": "PRI35-a75ecf52", "width": 4240, "height": 2810, "comment": null, "isPublic": false}, {"id": "PRI35-46fb7975", "width": 4272, "height": 2837, "comment": null, "isPublic": false}, {"id": "PRI35-6be8c7bd", "width": 4376, "height": 2906, "comment": null, "isPublic": false}, {"id": "PRI35-f61e7cdc", "width": 4370, "height": 2910, "comment": null, "isPublic": false}, {"id": "PRI35-5ed8d71d", "width": 4368, "height": 2912, "comment": null, "isPublic": false}, {"id": "PRI35-c5f231d5", "width": 4134, "height": 2751, "comment": null, "isPublic": false}, {"id": "PRI35-993d90c7", "width": 4216, "height": 2784, "comment": null, "isPublic": false}, {"id": "PRI35-891e15fb", "width": 4206, "height": 2799, "comment": null, "isPublic": false}, {"id": "PRI35-16edb2f6", "width": 4267, "height": 2828, "comment": null, "isPublic": false}, {"id": "PRI35-36969d83", "width": 4368, "height": 2916, "comment": null, "isPublic": false}, {"id": "PRI35-3a60e0db", "width": 4196, "height": 2792, "comment": null, "isPublic": false}, {"id": "PRI35-54869b0e", "width": 1000, "height": 668, "comment": null, "isPublic": false}, {"id": "PRI35-58a887f7", "width": 4139, "height": 2753, "comment": null, "isPublic": false}, {"id": "PRI35-96919215", "width": 4082, "height": 2715, "comment": null, "isPublic": false}, {"id": "PRI35-3789af4e", "width": 4093, "height": 2724, "comment": null, "isPublic": false}, {"id": "PRI35-e918c4f3", "width": 4200, "height": 2800, "comment": null, "isPublic": false}, {"id": "PRI35-276893a8", "width": 4145, "height": 2757, "comment": null, "isPublic": false}, {"id": "PRI35-c4cf4475", "width": 4264, "height": 2832, "comment": null, "isPublic": false}, {"id": "PRI35-919b2d04", "width": 1000, "height": 665, "comment": null, "isPublic": false}, {"id": "PRI35-38e61517", "width": 4187, "height": 2786, "comment": null, "isPublic": false}, {"id": "PRI35-208dbbdd", "width": 4126, "height": 2745, "comment": null, "isPublic": false}, {"id": "PRI35-0a26a075", "width": 4115, "height": 2731, "comment": null, "isPublic": false}, {"id": "PRI35-393966bf", "width": 4245, "height": 2825, "comment": null, "isPublic": false}, {"id": "PRI35-66156f25", "width": 4070, "height": 2708, "comment": null, "isPublic": false}, {"id": "PRI35-ca41b8c4", "width": 4365, "height": 2896, "comment": null, "isPublic": false}]	\N	country	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	10500000	USD	3	\N	\N	\N	\N	\N	\N	{5150}	Комментарий: нет\\nПримечание: СА1214	3	\N	\N	\N	t	\N	\N	\N	\N	\N	\N	\N	{}	[]	200	\N	\N	\N	4	8	6	8	50	central	mains	central	t	{forest}	50	\N	\N	\N	1700	brick	\N	2005	\N	\N	\N	\N	\N	\N	\N	full_construction	\N	\N	2	1	1003	1012	1141	\N	1178	55.7178497	37.1396065	"office"=>"1", "kitchen"=>"2", "spa_zone"=>"1", "game_room"=>"1", "staff_room"=>"1", "dining_room"=>"1", "living_room"=>"1", "utility_room"=>"3", "dressing_room"=>"4"	\N	3	[{"kind": "base", "items": ["холл", "бильярдная", "кинозал", "су", "постирочная", "квартира для персонала", "кладовая", "караоке", "холодильная комната", "кухня"], "number": null}, {"kind": "floor", "items": ["прихожая", "гардеробная", "холл", "гостевой су", "кабинет", "столовая", "кухня", "гостиная", "бассейн", "душ", "су", "терраса"], "number": 1}, {"kind": "floor", "items": ["холл", "2 спальни", "2 ванные комнаты", "2 гардеробные", "хозяйская спальня с ванной комнатой и гардеробной"], "number": 2}]
36	1	public	house	2015-09-24 21:26:48+00	2018-05-31 14:38:20.58355+00	2	1	[{"id": "PRI36-1c044c25", "width": 5588, "height": 3723, "comment": null, "isPublic": true}, {"id": "PRI36-9f4dddb0", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI36-daee0ba0", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI36-15ad4e2a", "width": 5231, "height": 3487, "comment": null, "isPublic": true}, {"id": "PRI36-7e09cd3f", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI36-d30813e5", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI36-b2f5e262", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI36-ca0a759f", "width": 5616, "height": 3744, "comment": null, "isPublic": true}, {"id": "PRI36-3dd98677", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-c57019ae", "width": 5617, "height": 3736, "comment": null, "isPublic": false}, {"id": "PRI36-1ed70362", "width": 5398, "height": 3598, "comment": null, "isPublic": false}, {"id": "PRI36-9e50ffa6", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-ec12be01", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-f9348974", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-ad0315d5", "width": 5595, "height": 3720, "comment": null, "isPublic": false}, {"id": "PRI36-dc607c75", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-a94babf7", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-a14044be", "width": 5600, "height": 3732, "comment": null, "isPublic": false}, {"id": "PRI36-4292817a", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-589b7333", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-914c9487", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-fe546239", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-655be8a7", "width": 5596, "height": 3697, "comment": null, "isPublic": false}, {"id": "PRI36-64e497af", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-b7ad7af1", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-f4802603", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-c8bd5eec", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-6f7995c7", "width": 5527, "height": 3684, "comment": null, "isPublic": false}, {"id": "PRI36-aa6220ee", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-5bab3c49", "width": 5598, "height": 3733, "comment": null, "isPublic": false}, {"id": "PRI36-cbecb433", "width": 5595, "height": 3718, "comment": null, "isPublic": false}, {"id": "PRI36-9f1acaf0", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-2c26b475", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-82acd356", "width": 5615, "height": 3735, "comment": null, "isPublic": false}, {"id": "PRI36-51dc26da", "width": 5578, "height": 3715, "comment": null, "isPublic": false}, {"id": "PRI36-afa8913c", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-53ba9973", "width": 5606, "height": 3734, "comment": null, "isPublic": false}, {"id": "PRI36-a61436a0", "width": 5607, "height": 3742, "comment": null, "isPublic": false}, {"id": "PRI36-d37466fe", "width": 5521, "height": 3681, "comment": null, "isPublic": false}, {"id": "PRI36-422377b8", "width": 728, "height": 484, "comment": null, "isPublic": false}, {"id": "PRI36-76ca52e9", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-883a868c", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-ed7972f3", "width": 5601, "height": 3732, "comment": null, "isPublic": false}, {"id": "PRI36-65f231c1", "width": 5594, "height": 3721, "comment": null, "isPublic": false}, {"id": "PRI36-56eb121a", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-8f7fda23", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-5ba52cc2", "width": 5555, "height": 3703, "comment": null, "isPublic": false}, {"id": "PRI36-aed2b15d", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-90ca2110", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-a112a240", "width": 5610, "height": 3728, "comment": null, "isPublic": false}, {"id": "PRI36-8eda4815", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-7b5f1d37", "width": 5590, "height": 3722, "comment": null, "isPublic": false}, {"id": "PRI36-46f1c267", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-622c1b18", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-c95dec75", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-6a639213", "width": 5608, "height": 3731, "comment": null, "isPublic": false}, {"id": "PRI36-14c6e067", "width": 5588, "height": 3727, "comment": null, "isPublic": false}, {"id": "PRI36-99243255", "width": 728, "height": 484, "comment": null, "isPublic": false}, {"id": "PRI36-48bfabbf", "width": 5614, "height": 3735, "comment": null, "isPublic": false}, {"id": "PRI36-be3e0f2a", "width": 5603, "height": 3719, "comment": null, "isPublic": false}, {"id": "PRI36-614c3599", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-6115d99c", "width": 5612, "height": 3731, "comment": null, "isPublic": false}, {"id": "PRI36-6cc41f0e", "width": 728, "height": 485, "comment": null, "isPublic": false}, {"id": "PRI36-4d02eef7", "width": 5616, "height": 3744, "comment": null, "isPublic": false}, {"id": "PRI36-a639ae1c", "width": 5541, "height": 3694, "comment": null, "isPublic": false}, {"id": "PRI36-1ffdfee4", "width": 5616, "height": 3744, "comment": null, "isPublic": false}]	\N	country	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	4500000	USD	4	\N	\N	direct_sell	f	f	f	[0:0]={5935}	01.04.2016 Акулова. актуально. Рассматривает аренду минимум на 2 года, только компании (не частные лица), цена min 30.000$. 24.09.15 Дрозд.акт.  alex127.kuznetsov@yandex.ru 	14	\N	\N	\N	t	\N	\N	\N	\N	\N	f	\N	{}	[]	\N	\N	\N	\N	4	12	5	3	25	well	mains	septic	t	{field}	30	5 линия	339 Баннер	5	1300	brick	tile	2008	4	\N	\N	\N	\N	f	f	full_construction	good	full	3	1	1003	1012	1141	\N	1178	55.731483459472656	37.14622497558594	"gym"=>"1", "loft"=>"1", "office"=>"1", "kitchen"=>"1", "storage"=>"2", "spa_zone"=>"2", "game_room"=>"2", "wine_room"=>"1", "dining_room"=>"1", "living_room"=>"1", "utility_room"=>"2", "dressing_room"=>"2", "technical_room"=>"2"	\N	7	[{"kind": "attic", "items": ["холл", "кабинет", "спальня", "су", "тех.помещения", "игровая комната"], "number": null}, {"kind": "base", "items": ["холл", "бильярдная", "винный погреб", "тренажерный зал", "су", "постирочная", "кладовая", "котельная"], "number": null}, {"kind": "floor", "items": ["прихожая", "гардеробная", "кухня", "столовая", "гостевая спальня", "бассейн", "сауна", "комната отдыха", "гараж на 3 машины", "ванная комната", "гостиная со вторым светом и камином", "терраса", "су", "гостевой су", "душ"], "number": 1}, {"kind": "floor", "items": ["холл", "2 спальни", "2 ванные комнаты", "хозяйская спальня с ванной комнатой и гардеробной"], "number": 2}]
\.


--
-- Data for Name: csi_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.csi_answers (question_id, object_id, object_klass, rate, id) FROM stdin;
\.


--
-- Data for Name: csi_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.csi_questions (id, text, kind) FROM stdin;
\.


--
-- Data for Name: daily_duty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.daily_duty (id, staff_user_id, start_at, finish_at) FROM stdin;
\.


--
-- Data for Name: deals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deals (id, state, client_lead_id, created_at, updated_at, created_by_user_id, updated_by_user_id, ru_id, ru_department_id, ru_division_id, cd_id, cd_phone_number, cd_email, sd_reason, sd_to_approve, sd_changes, d_offer_kind, d_budget, d_currency, d_expected_finish_date_at, d_expected_agent_fee, d_note, d_property_id, d_expected_agent_fixed_price, d_expected_agent_fixed_price_currency, d_mcaf_rub, d_mcaf_eur, d_mcaf_usd, cd_kind_dictionary_kind, cd_kind_dictionary_id) FROM stdin;
\.


--
-- Data for Name: deleted_to; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deleted_to (persistence_id, deleted_to) FROM stdin;
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, name, manager_staff_user_id, staff_user_ids) FROM stdin;
9	(архив) Департамент загородной недвижимости №3	\N	{}
10	(архив) Департамент по работе с ключевыми клиентами	\N	{}
11	ОП Александровский	\N	{}
1	Управляющая компания	\N	{1,2}
3	Загородный департамент	\N	{1,2}
5	(архив) Технический департамент	\N	{1,2}
6	Городской департамент	\N	{1,2}
7	Хаб	\N	{1,2}
8	(архив) Департамент загородной недвижимости №2	\N	{1,2}
12	Партнеры Хаба	\N	{1,2}
14	Департамент загородной недвижимости jqestate.ru	\N	{1,2}
13	Уволенные	\N	{}
\.


--
-- Data for Name: dictionary_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dictionary_items (id, kind, title, created_at, updated_at, parent_id) FROM stdin;
\.


--
-- Data for Name: districts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.districts (id, name, kind_name, aliases, created_at, updated_at, place_type, property_categories, country_id, region_id) FROM stdin;
1006	Звенигород	городской округ	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1007	Рузский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1008	Истринский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1009	Красногорский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1010	Ступинский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{}	1	1003
1011	Раменский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{}	1	1003
1012	Одинцовский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{city,country}	1	1003
1013	Хорошёво-Мнёвники	\N	{хорошево-мневники}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	2
1014	Конаково	деревня	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1016	Солнечногорский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1017	Можайский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1018	Cтрогино	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1019	Коломенский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{}	1	1003
1718	Краснохолмский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{}	1	1723
1719	Ленинский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1720	Мытищинский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1721	Наро-Фоминский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	1003
1722	Дмитровский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{}	1	1003
1724	ЗАО		{"западный административный округ","западный ао"}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	2
1725	Подольский	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	2
1726	НАО	\N	{"новомосковский административный округ","новомосковский ао"}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	2
1727	ТАО	\N	{"троицкий административный округ","троицикий ао"}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{country}	1	2
1728	Таганьково	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{}	1	1003
1783	Аксиньино	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{}	1	1003
1785	Крылатское	район	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	district	{}	1	2
1792	Мытищи	городской округ	{}	2016-03-03 08:32:54.789+00	2016-03-03 08:32:54.789+00	district	{country}	1	1003
1914	Серпуховский	район	{}	2016-04-07 13:26:54.076+00	2016-04-07 13:27:17.937+00	district	{country}	1	1003
1959	Внуковское	\N	{}	2016-06-01 09:31:20.71+00	2016-06-01 09:31:20.71+00	district	{country}	1	1003
1987	Филимонковское	\N	{}	2016-06-14 12:57:46.712+00	2016-06-14 12:57:46.712+00	district	{country}	1	1003
1989	СЗАО	\N	{}	2016-06-14 13:48:39.435+00	2016-06-14 13:48:39.435+00	district	{country}	1	2
2003	Домодедово	\N	{}	2016-06-20 09:33:54.261+00	2016-06-20 09:33:54.261+00	district	{}	1	1003
\.


--
-- Data for Name: divisions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.divisions (id, department_id, name, manager_staff_user_id, staff_user_ids) FROM stdin;
\.


--
-- Data for Name: encrypted_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.encrypted_documents (id, state, filename, aes_key, iv_bytes, comment, created_at, updated_at, uploader_id) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, object_id, object_klass, kind, details, event_at) FROM stdin;
\.


--
-- Data for Name: export_error_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.export_error_logs (id, package_id, reason, created_at, params, property_ids) FROM stdin;
\.


--
-- Data for Name: export_locations; Type: TABLE DATA; Schema: public; Owner: jq
--

COPY public.export_locations (id, name, pos, format) FROM stdin;
\.


--
-- Data for Name: export_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.export_packages (id, title, format, company_name, company_email, company_phone_number, created_by_user_id, updated_by_user_id, last_export_at, updated_at, created_at, filter, s_properties_count, state, cd_top, cd_premium, cd_highlight, s_ads_count, "limit", sort_order, sort_column, watermark) FROM stdin;
\.


--
-- Data for Name: file_documents; Type: TABLE DATA; Schema: public; Owner: jq
--

COPY public.file_documents (id, state, filename, uploader_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: images_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images_orders (id, object_id, kind, state, description, responsible_user_id, images, created_at, updated_at, created_by_user_id, updated_by_user_id, sd_changes, sd_reason, object_klass) FROM stdin;
\.


--
-- Data for Name: journal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.journal (ordering, persistence_id, sequence_number, deleted, tags, message) FROM stdin;
\.


--
-- Data for Name: localities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.localities (id, name, kind_name, aliases, created_at, updated_at, place_type, property_categories, region_id, district_id, country_id, route_id) FROM stdin;
7	Ленинский	\N	{}	2016-01-29 09:09:54.344+00	2016-01-29 09:09:54.344+00	locality	{}	6	\N	1	\N
10	Ленинск	\N	{}	2016-01-29 10:11:29.643+00	2016-01-29 10:11:29.643+00	locality	{}	9	\N	1	\N
1020	Воронино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1021	Заречье	\N	{}	2016-02-15 16:07:08.916377+00	2018-02-09 09:35:42.077+00	locality	{}	1003	1012	1	1181
1022	Борки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1023	Поливаново1	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-17 09:01:43.843+00	locality	{country}	2	1725	1	1183
1024	Секерино	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1025	Усово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1026	Аносино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1027	Удельная	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1028	Троицк	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-20 09:31:47.539+00	locality	{country}	2	1727	1	1183
1029	Барвиха	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1030	Жуковка	\N	{}	2016-02-15 16:07:08.916377+00	2016-09-20 15:03:35.98+00	locality	{country}	1003	1012	1	1178
1031	Крючково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1032	Красные Горки	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1033	Рассудово	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1034	Столбово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1719	1	1183
1035	Измалково	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	\N	1	\N
1036	Марьино	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-02 13:32:25.489+00	locality	{}	1003	\N	1	1187
1037	Пион	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1011	1	\N
1038	Бузланово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1192
1039	Виноградово	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1040	Захарово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1008	1	1186
1041	Былово	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1042	Москва	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1018	1	1186
1043	Знаменское поле	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1044	Горки-8	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1045	Писково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1046	Стародачный	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1047	Кузнецово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1177
1048	Власово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1721	1	1177
1049	Захарково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1009	1	1192
1050	Бурцево	\N	{}	2016-02-15 16:07:08.916377+00	2017-10-16 08:36:53.876+00	locality	{country}	1003	1987	1	1177
1051	Красная Пахра	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1727	1	1183
1052	Сенькино-Секерино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1177
1053	Быково	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1054	Крекшино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1726	1	1177
1055	Люберцы	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1056	Пестово	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	\N	1	\N
1057	Бачурино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1726	1	1183
1058	Уборы	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1192
1059	Грибаново	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1009	1	1192
1060	Газопровод	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1719	1	1183
1061	Воскресенское	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-17 13:10:12.267+00	locality	{country}	2	1726	1	1183
1062	Беляная Гора	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	\N	1	\N
1063	Новоглаголево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1721	1	1177
1064	Голицыно	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1065	Ларюшино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1066	Солослово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1067	Сосенки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1726	1	1183
1068	Первомайское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1177
1069	Шишкин Лес	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1725	1	1183
1070	Лужки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1008	1	1186
1071	Мамоново	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1179
1072	Лапино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1073	Архангельское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1192
1074	Внуково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1726	1	1179
1075	Серебряный бор	\N	{}	2016-02-15 16:07:08.916377+00	2017-01-24 10:49:29.035+00	locality	{country}	2	1013	1	1186
1076	Поваровка	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1077	Уварово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1177
1078	Ивановское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1079	Немчиново	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1181
1080	Ромашково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1081	Птичное	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1183
1082	Ивановка	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1083	Летово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1726	1	1183
1084	Сареево	\N	{}	2016-02-15 16:07:08.916377+00	2017-11-22 16:24:35.894+00	locality	{}	1003	1012	1	1178
1085	Милюково	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-16 14:02:00.521+00	locality	{country}	2	1727	1	1177
1086	Марфино	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-14 13:00:09.752+00	locality	{country}	1003	1012	1	1179
1087	Рогозинино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1177
1088	Сколково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1181
1089	Фоминское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1727	1	1183
1090	Котово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1008	1	1186
1091	Горки-10	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1092	Дмитровское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1192
1093	Романцево	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1094	Драчёво	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-16 11:00:33.496+00	locality	{country}	1003	1792	1	1185
1095	Грибово	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-17 15:38:59.21+00	locality	{}	1003	\N	1	\N
1096	Ершово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1186
1097	Козино	\N	{}	2016-02-15 16:07:08.916377+00	2018-03-12 12:28:17.86+00	locality	{}	1003	1009	1	1186
1098	Дунино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1099	Пенино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1726	1	1183
1100	Алабино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1721	1	1177
1101	Степановское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1186
1102	Сосенское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1726	1	1183
1103	Тимошкино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1104	Николина гора	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1105	Горышкино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1106	Ватутинки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1726	1	1183
1107	1-ое Успенское шоссе	\N	{}	2016-02-15 16:07:08.916377+00	2016-08-23 09:22:43.472+00	locality	{country}	1003	1012	1	1178
1108	Можайск	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	\N	1	\N
1109	Переделкино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1179
1110	Конаково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1725	1	1183
1111	Боровский	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1722	1	1183
1112	Александровка	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1192
1113	Жодочи	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1114	Борзые	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1115	Одинцово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{city,country}	1003	1012	1	1180
1116	Большое Свинорье	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1117	Шаганино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1719	1	1183
1118	Дубцы	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1192
1119	Сивково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1179
1120	Лайково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1121	Бекасово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1177
1122	Николо-Урюпино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1186
1123	Поздняково	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-23 14:58:11.605+00	locality	{country}	1003	1009	1	1186
1124	Лохино	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1125	Ильинское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1192
1126	Липки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1127	Лечищево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1008	1	1186
1128	Мозжинка	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1129	Мещерское	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1130	Жаворонки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1179
1131	Раздоры	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1132	Кленово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1725	1	1800
1133	Александрово	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-17 14:17:56.797+00	locality	{}	1003	1008	1	1186
1134	Голубое	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-16 16:37:42.951+00	locality	{country}	1003	1016	1	1191
1135	Покровское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1136	Чигасово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1137	2-ое Успенское шоссе	\N	{}	2016-02-15 16:07:08.916377+00	2016-08-23 09:22:26.629+00	locality	{country}	1003	1012	1	1178
1138	Губкино	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1139	Воронки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1186
1140	Козлово	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1141	Горки-2	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1142	Щапово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1725	1	1183
1143	Ликино	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1144	Бузаево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1145	Зименки	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-02 11:58:40.668+00	locality	{country}	2	1726	1	1177
1146	Овсяники	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1007	1	1186
1147	Снегири	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1008	1	\N
1148	Глухово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1192
1149	Трусово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1016	1	1186
1150	Ангелово	\N	{}	2016-02-15 16:07:08.916377+00	2016-05-12 09:49:44.71+00	locality	{country}	1003	1009	1	1191
1151	Михалково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1009	1	1186
1152	Истра	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1153	Веледниково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1154	Петровское	\N	{}	2016-02-15 16:07:08.916377+00	2016-05-19 11:38:19.099+00	locality	{country}	1003	1008	1	1186
1155	Апрелевка	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1721	1	1177
1156	Шульгино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1157	Мякинино	\N	{}	2016-02-15 16:07:08.916377+00	2016-07-04 16:15:52.026+00	locality	{country}	1003	1009	1	1186
1158	Чесноково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1159	Мартемьяново	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1721	1	1177
1160	Лесной Городок	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1179
1161	Обушково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1162	Каменка	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1727	1	1177
1163	Павловская слобода	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1164	Красновидово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1165	Горки-9	\N	{}	2016-02-15 16:07:08.916377+00	2016-06-17 14:36:49.491+00	locality	{country}	1003	1012	1	1178
1166	Красное	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1183
1167	Онуфриево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1008	1	1186
1168	Афинеево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1721	1	1177
1169	Петровский	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	\N
1170	Лопотово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1016	1	1191
1171	Немчиновка	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1179
1172	Свитино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1177
1173	Никульское	\N	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	\N	1	\N
1174	Аксиньино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1175	Раево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1727	1	1183
1176	Петрово-Дальнее	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1192
1729	Таганьково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1730	Подушкино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1732	Иславское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1733	Большое Сареево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1734	Малое Сареево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1737	Успенское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1738	Рождественно	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1741	Маслово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1743	Новодарьино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1744	Лызлово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1745	Матвейково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1746	Ран Новодарьино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1747	Горки-6	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1009	1	1192
1748	Калчуга	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1749	Молоденово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1750	Нахабино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1009	1	1186
1751	Новинки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1753	Никольское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1754	Румянцево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1720	1	1185
1755	Николо-Хованское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1726	1	1183
1756	Милорадово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1726	1	1183
1757	Ямонтово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1726	1	1183
1758	Глаголево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1721	1	1177
1759	Жедочи	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1721	1	1177
1760	НИИ Радио	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1721	1	1179
1761	Лесная поляна	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1179
1762	Бородки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1179
1763	Митькино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1179
1764	Ермолинское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1008	1	1186
1765	Пионерский	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1008	1	1186
1766	Семенково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1767	Юдино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1768	Мещерский	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1724	1	1181
1769	Поведники	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1720	1	1185
1770	Грибки	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1720	1	1185
1771	Кезьмино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1186
1772	Троице Лыково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1724	1	1186
1773	Завидово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1723	1718	1	1186
1774	Лешково	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1008	1	1186
1775	Поварово	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1016	1	1191
1776	Поречье	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	1003	1012	1	1178
1777	Дарьино	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1778	Папушево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1779	Екатериновка	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{country}	2	1724	1	1178
1780	Назарьево	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	1003	1012	1	1178
1781	Большое Покровское	нас. пункт	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	locality	{}	2	1727	1	1183
1793	Вёшки	\N	{}	2016-03-03 08:34:17.071+00	2016-06-16 15:52:47.04+00	locality	{country}	1003	1792	1	1791
1794	Дарна	\N	{}	2016-03-17 12:12:16.115+00	2016-06-17 11:06:59.461+00	locality	{country}	1003	1008	1	1186
1906	Красногорск	город	{}	2016-03-30 11:37:28.523+00	2016-03-30 11:37:28.523+00	locality	{country}	1003	1009	1	1186
1909	Падиково	нас. пункт	{}	2016-03-30 13:58:26.34+00	2016-03-30 13:58:26.34+00	locality	{country}	1003	1008	1	1186
1915	Зиброво	нас. пункт	{}	2016-04-07 13:28:02.021+00	2016-04-07 13:28:02.021+00	locality	{country}	1003	1914	1	1800
1927	Исаково	нас. пункт	{}	2016-04-22 09:04:18.327+00	2016-04-22 09:04:18.327+00	locality	{country}	1003	1009	1	1186
1929	ДНП Полевой стан	нас. пункт	{}	2016-04-22 09:08:44.584+00	2016-04-22 09:08:44.584+00	locality	{country}	1003	1009	1	1189
1931	Супонево	нас. пункт	{}	2016-04-26 09:17:28.792+00	2016-04-26 09:17:28.792+00	locality	{country}	1003	1012	1	1186
1936	Сорокино	нас. пункт	{}	2016-04-27 10:45:37.144+00	2016-04-27 10:45:37.144+00	locality	{country}	1003	1720	1	1935
1945	САО	\N	{}	2016-05-19 11:42:02.909+00	2016-05-19 11:42:02.909+00	locality	{}	1003	\N	1	1185
1946	Новораково	\N	{}	2016-05-19 11:47:19.413+00	2016-05-19 11:47:19.413+00	locality	{}	1003	1008	1	1186
1948	Кострово	\N	{}	2016-05-19 11:48:50.227+00	2016-05-19 11:48:50.227+00	locality	{}	1003	1008	1	1186
1954	Домодедово	\N	{}	2016-05-24 13:47:05.447+00	2016-06-20 09:34:11.057+00	locality	{}	1003	2003	1	1182
1956	Голиково	\N	{}	2016-05-24 13:49:24.535+00	2016-05-24 13:49:24.535+00	locality	{}	1003	1016	1	1715
1960	Рассказовка	\N	{}	2016-06-01 09:31:25.915+00	2016-06-01 12:50:52.816+00	locality	{country}	1003	1959	1	1963
1968	Юрлово	\N	{}	2016-06-03 10:29:45.151+00	2016-08-06 10:25:40.806+00	locality	{country}	1003	1016	1	1191
1973	Аксаково	\N	{}	2016-06-06 15:02:20.503+00	2016-06-06 15:02:20.503+00	locality	{country}	1003	1720	1	1185
1981	Хлябово	\N	{}	2016-06-08 16:26:54.138+00	2016-06-08 16:26:54.138+00	locality	{country}	1003	1720	1	1185
1988	Верхнее Валуево	\N	{}	2016-06-14 12:58:06.586+00	2016-06-14 12:58:06.586+00	locality	{country}	1003	1987	1	1177
1990	Куркино	\N	{}	2016-06-14 13:49:19.965+00	2016-06-14 13:49:19.965+00	locality	{country}	2	1989	1	1187
1991	Новоалександрово	\N	{}	2016-06-14 13:51:09.454+00	2016-06-14 13:51:09.454+00	locality	{country}	1003	1720	1	1185
1992	Лобаново	\N	{}	2016-06-14 15:10:17.749+00	2016-06-14 15:10:17.749+00	locality	{country}	1003	1008	1	1186
1994	Марфино	\N	{}	2016-06-15 11:04:05.593+00	2016-06-15 11:04:05.593+00	locality	{country}	1003	1720	1	1185
1997	Букаревское	\N	{}	2016-06-16 10:37:10.959+00	2016-06-16 10:37:10.959+00	locality	{country}	1003	1008	1	1186
1999	Горетовское	\N	{}	2016-06-17 10:01:32.864+00	2016-06-17 10:01:32.864+00	locality	{country}	1003	1017	1	1180
2000	Марушкинское с/п	\N	{}	2016-06-17 15:30:05.123+00	2016-06-17 15:30:05.123+00	locality	{country}	2	1726	1	1177
2006	Варварино	\N	{}	2016-06-22 09:27:22.025+00	2016-06-22 09:27:22.025+00	locality	{country}	2	1725	1	1183
2007	Юрово	\N	{}	2016-06-22 09:28:35.82+00	2016-06-22 09:28:35.82+00	locality	{}	2	1725	1	1183
2009	Раздоры	\N	{}	2016-06-23 14:09:49.588+00	2016-06-23 14:09:49.588+00	locality	{country}	1003	1012	1	1186
2010	Обушковское с/п	\N	{}	2016-06-23 14:19:50.623+00	2016-06-23 14:19:50.623+00	locality	{country}	1003	1008	1	1186
2011	поселение Краснопахорское 	\N	{}	2016-06-24 10:54:33.423+00	2016-06-24 10:54:33.423+00	locality	{country}	2	1727	1	1183
2012	Глинники	\N	{}	2016-06-24 14:41:31.311+00	2016-06-24 14:41:31.311+00	locality	{country}	1003	1014	1	1715
2017	Ершовское	\N	{}	2016-06-30 10:15:38.231+00	2016-06-30 10:15:38.231+00	locality	{country}	1003	1012	1	1178
2027	Дедовск	\N	{}	2016-07-15 08:45:14.337+00	2016-07-15 08:45:14.337+00	locality	{country}	1003	1008	1	1189
2030	Иволги	\N	{}	2016-07-19 08:16:28.399+00	2016-07-19 13:44:22.97+00	locality	{country}	1003	1008	1	1186
2234	рычково	\N	{}	2016-08-20 15:45:52.071+00	2016-08-20 15:45:52.071+00	locality	{country}	1003	1008	1	1186
2236	Благовещенка	\N	{}	2016-08-23 11:07:37.591+00	2016-08-23 11:07:37.591+00	locality	{}	1003	1016	1	1191
2237	Федоровка	\N	{}	2016-08-23 11:08:03.944+00	2016-08-23 11:08:03.944+00	locality	{}	1003	1016	1	1191
2238	Звенигород	\N	{}	2016-08-23 15:23:15.353+00	2016-08-23 15:23:15.353+00	locality	{country}	1003	1006	1	1186
2263	Верхнее Устье	\N	{}	2017-01-09 13:35:53.88+00	2017-01-09 13:35:53.88+00	locality	{country}	1723	\N	1	1715
2268	Знаменское	\N	{}	2017-02-02 15:14:14.15+00	2017-02-02 15:14:14.15+00	locality	{country}	1003	1012	1	1178
2272	Пучково	\N	{}	2017-02-22 13:30:00.243+00	2017-02-22 13:37:39.26+00	locality	{}	2	\N	1	1183
2273	Селятино	\N	{}	2017-02-22 13:40:40.438+00	2017-02-22 13:40:40.438+00	locality	{country}	1003	1721	1	1177
2275	Коростrино	\N	{}	2017-03-07 10:44:40.279+00	2017-03-07 10:44:40.279+00	locality	{}	1003	\N	1	\N
2285	Прозорово	\N	{}	2017-07-14 16:32:23.529+00	2017-07-14 16:32:23.529+00	locality	{country}	1003	1009	1	1186
2287	Подольниха	\N	{}	2017-08-07 13:56:50.365+00	2017-08-07 13:56:50.365+00	locality	{}	1003	1720	1	1185
2289	Павло-Слободское	\N	{}	2017-08-25 14:27:46.652+00	2017-08-25 14:27:46.652+00	locality	{}	1003	\N	1	1186
2292	Софьино	\N	{}	2017-09-20 09:57:43.397+00	2017-09-20 09:57:43.397+00	locality	{}	1003	\N	1	1183
2294	Поселение Филимонковское	\N	{}	2017-10-10 15:10:52.252+00	2017-10-10 15:10:52.252+00	locality	{}	1003	1987	1	1177
2298	Мансурово	\N	{}	2017-11-01 08:01:04.085+00	2017-11-01 08:01:04.085+00	locality	{}	1003	1008	1	1186
2300	Красный поселок	\N	{}	2017-11-03 09:55:40.806+00	2017-11-03 09:55:40.806+00	locality	{}	1003	1008	1	1186
2307	Москва	\N	{}	2017-12-25 09:01:39.615+00	2017-12-25 09:01:39.615+00	locality	{}	2	\N	1	\N
2310	Манихино	\N	{}	2018-02-12 14:08:26.795+00	2018-02-12 14:08:26.795+00	locality	{}	1003	1008	1	1186
2321	Перхушково	\N	{}	2018-05-14 10:02:01.896835+00	2018-05-14 10:02:01.896835+00	locality	{}	1003	1012	1	1180
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (version, name, body, sha1, applied_at, options) FROM stdin;
\.


--
-- Data for Name: newsletters; Type: TABLE DATA; Schema: public; Owner: jq
--

COPY public.newsletters (id, title, state, template, properties, scheduled_at, created_at, updated_at, sent_at, list_id, mailchimp_campaign_id, from_title, from_email) FROM stdin;
\.


--
-- Data for Name: object_notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.object_notifications (object_id, object_klass, user_id, is_subscribed) FROM stdin;
\.


--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.places (id, name, kind_name, aliases, created_at, updated_at, place_type, property_categories) FROM stdin;
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.properties (id, ru_id, state, kind, created_at, updated_at, created_by_user_id, updated_by_user_id, images, client_lead_id, category, layout_images, ro_price, ro_currency, ro_agent_fee, ro_agent_fixed_price, ro_agent_fixed_price_currency, ro_deposit, ro_period, ro_is_allowed_pets, ro_is_allowed_children, so_price, so_currency, so_agent_fee, so_agent_fixed_price, so_agent_fixed_price_currency, so_kind, so_is_bargain, so_is_mortgage, so_is_installment, linked_contact_ids, note, ru_department_id, ru_division_id, removal_order_id, sd_reason, so_is_resale, external_id, l_cadastral_number, badge_id, so_price_delta, ro_price_delta, so_is_disabled, ro_is_disabled) FROM stdin;
\.


--
-- Data for Name: property_badges; Type: TABLE DATA; Schema: public; Owner: jq
--

COPY public.property_badges (id, title, color, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: property_banners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_banners (id, property_id, state, reason, kind_dictionary_kind, kind_dictionary_id, ru_id, image, expected_date_of_completion, date_of_completion, created_at, created_by_user_id, updated_at) FROM stdin;
\.


--
-- Data for Name: property_contact_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_contact_links (property_id, linked_contact_id, kind_dictionary_kind, kind_dictionary_id) FROM stdin;
\.


--
-- Data for Name: property_contracts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_contracts (id, state, filename, aes_key, iv_bytes, comment, created_at, updated_at, uploader_id, property_id, valid_from, valid_to, signed_by_id, kind_dictionary_kind, kind_dictionary_id) FROM stdin;
\.


--
-- Data for Name: property_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_documents (id, state, filename, aes_key, iv_bytes, comment, created_at, updated_at, uploader_id, property_id, kind_dictionary_kind, kind_dictionary_id) FROM stdin;
\.


--
-- Data for Name: property_offer_price_changes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_offer_price_changes (property_id, kind, change_at, usd, eur, rub) FROM stdin;
\.


--
-- Data for Name: property_removal_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_removal_orders (id, property_id, property_category, original_property_id, state, kind, note, created_at, updated_at, created_by_user_id, updated_by_user_id, sd_reason) FROM stdin;
\.


--
-- Data for Name: property_search_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_search_orders (id, property_category, state, note, ru_id, created_at, updated_at, cbu_id, updated_by_user_id, sd_reason, sd_changes, property_ids, cbu_department_id, cbu_division_id, ru_department_id, ru_division_id) FROM stdin;
\.


--
-- Data for Name: regions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.regions (id, name, kind_name, aliases, created_at, updated_at, place_type, property_categories, country_id) FROM stdin;
2	Москва	\N	{}	2016-01-28 10:41:53.852+00	2016-01-28 10:41:53.852+00	administrative_area	{country,city}	1
6	Башкортостан	\N	{}	2016-01-29 09:09:54.266+00	2016-01-29 09:09:54.266+00	administrative_area	{}	1
9	Волгоградская	\N	{}	2016-01-29 10:11:29.589+00	2016-01-29 10:11:29.589+00	administrative_area	{}	1
1003	Московская область	\N	{}	2016-02-15 16:07:08.916377+00	2016-07-24 09:34:09.326+00	administrative_area	{city,country}	1
1723	Тверская	область	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	administrative_area	{country}	1
\.


--
-- Data for Name: rights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rights (id, name, resource, action, scope) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, permissions, is_admin) FROM stdin;
1	Генеральный директор		t
2	Главный бухгалтер	"deal_show"=>"all", "role_show"=>"none", "division_show"=>"none", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"all", "staff_user_create"=>"none", "staff_user_update"=>"none", "staff_user_documents"=>"none", "staff_user_photo_upload"=>"none"	f
3	Главный юриcконсульт	"task_documents"=>"all", "contact_documents"=>"all", "settlement_documents"=>"none", "complex_building_documents"=>"all", "country_property_documents"=>"all"	f
4	Директор по организационному развитию	"deal_show"=>"all", "role_show"=>"none", "task_show"=>"all", "task_create"=>"none", "division_show"=>"none", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"all", "daily_duty_create"=>"none", "daily_duty_update"=>"none", "daily_duty_destroy"=>"none"	f
5	Директор по продукту		t
6	Коммерческий директор	"deal_show"=>"own", "task_show"=>"own", "deal_create"=>"all", "deal_update"=>"own", "daily_duty_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "client_lead_create"=>"none"	f
7	Маркетолог		f
8	Финансовый директор		t
9	Агент городской недвижимости	"deal_show"=>"own", "role_show"=>"none", "task_show"=>"own", "event_show"=>"none", "deal_create"=>"own", "deal_update"=>"own", "task_create"=>"none", "task_update"=>"own", "contact_show"=>"all", "deal_destroy"=>"own", "task_destroy"=>"own", "contact_links"=>"own", "division_show"=>"none", "task_comments"=>"own", "company_create"=>"none", "company_update"=>"own", "complex_create"=>"none", "complex_update"=>"own", "contact_create"=>"none", "contact_update"=>"own", "task_documents"=>"own", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "contact_documents"=>"own", "city_property_show"=>"all", "client_lead_create"=>"none", "client_lead_update"=>"own", "client_lead_destroy"=>"own", "deal_sensitive_data"=>"own", "city_property_create"=>"none", "city_property_update"=>"all", "complex_image_upload"=>"own", "city_property_destroy"=>"all", "country_property_show"=>"all", "contact_sensitive_data"=>"own", "images_order_city_show"=>"all", "city_property_documents"=>"all", "client_lead_source_show"=>"none", "complex_building_create"=>"none", "complex_building_update"=>"none", "country_property_create"=>"none", "country_property_update"=>"own", "country_property_destroy"=>"own", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "city_property_change_logs"=>"all", "images_order_city_answers"=>"own", "images_order_country_show"=>"own", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"own", "complex_building_documents"=>"none", "country_property_documents"=>"own", "images_order_city_comments"=>"own", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "property_removal_order_show"=>"own", "city_property_initial_update"=>"own", "city_property_sensitive_data"=>"all", "country_property_change_logs"=>"all", "images_order_country_answers"=>"own", "property_export_without_logo"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "complex_building_image_upload"=>"none", "country_property_image_upload"=>"own", "images_order_country_comments"=>"own", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"own", "property_search_order_comments"=>"own", "complex_building_sensitive_data"=>"none", "country_property_initial_update"=>"own", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"own"	f
10	Директор городского департамента	"deal_show"=>"own", "role_show"=>"none", "task_show"=>"own", "deal_create"=>"none", "deal_update"=>"own", "task_create"=>"none", "task_update"=>"own", "contact_show"=>"own", "deal_destroy"=>"own", "task_destroy"=>"own", "contact_links"=>"own", "division_show"=>"none", "task_comments"=>"own", "contact_create"=>"none", "contact_update"=>"own", "task_documents"=>"own", "contact_destroy"=>"own", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "contact_documents"=>"own", "deal_show_archive"=>"none", "city_property_show"=>"all", "client_lead_create"=>"none", "client_lead_update"=>"own", "client_lead_destroy"=>"own", "deal_sensitive_data"=>"own", "city_property_create"=>"none", "city_property_update"=>"all", "country_property_show"=>"all", "contact_sensitive_data"=>"own", "images_order_city_show"=>"own", "city_property_documents"=>"all", "country_property_create"=>"none", "country_property_update"=>"all", "client_lead_show_archive"=>"none", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "city_property_change_logs"=>"all", "images_order_city_answers"=>"own", "images_order_country_show"=>"own", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"own", "country_property_documents"=>"all", "images_order_city_comments"=>"own", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "property_removal_order_show"=>"own", "city_property_sensitive_data"=>"all", "country_property_change_logs"=>"all", "images_order_country_answers"=>"own", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "country_property_image_upload"=>"all", "images_order_country_comments"=>"own", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"all", "property_search_order_comments"=>"own", "country_property_sensitive_data"=>"all"	f
11	Заместитель директора департамента	"deal_show"=>"group", "role_show"=>"none", "task_show"=>"group", "event_show"=>"none", "deal_create"=>"group", "deal_update"=>"group", "task_create"=>"none", "task_update"=>"group", "contact_show"=>"all", "deal_destroy"=>"group", "task_destroy"=>"group", "contact_links"=>"group", "division_show"=>"none", "export_create"=>"none", "export_update"=>"own", "task_comments"=>"group", "complex_create"=>"none", "complex_update"=>"all", "contact_create"=>"all", "contact_update"=>"group", "task_documents"=>"group", "complex_destroy"=>"own", "contact_destroy"=>"group", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"group", "contact_documents"=>"group", "daily_duty_create"=>"none", "daily_duty_update"=>"none", "settlement_create"=>"none", "settlement_update"=>"none", "city_property_show"=>"own", "client_lead_create"=>"none", "client_lead_update"=>"group", "client_lead_destroy"=>"group", "complex_change_logs"=>"own", "deal_sensitive_data"=>"group", "city_property_create"=>"none", "city_property_update"=>"all", "complex_image_upload"=>"own", "contact_photo_upload"=>"group", "settlement_documents"=>"none", "city_property_destroy"=>"all", "country_property_show"=>"own", "contact_sensitive_data"=>"all", "images_order_city_show"=>"all", "settlement_change_logs"=>"none", "city_property_documents"=>"all", "client_lead_source_show"=>"none", "complex_building_create"=>"all", "complex_building_update"=>"all", "country_property_create"=>"group", "country_property_update"=>"all", "settlement_image_upload"=>"none", "complex_building_destroy"=>"all", "country_property_destroy"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"all", "city_property_change_logs"=>"all", "images_order_city_answers"=>"all", "images_order_country_show"=>"all", "settlement_sensitive_data"=>"none", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"group", "complex_building_documents"=>"none", "country_property_documents"=>"all", "images_order_city_comments"=>"all", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"all", "property_removal_order_show"=>"own", "city_property_initial_update"=>"all", "city_property_sensitive_data"=>"all", "complex_building_change_logs"=>"none", "country_property_change_logs"=>"all", "images_order_country_answers"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "complex_building_image_upload"=>"none", "country_property_image_upload"=>"all", "images_order_country_comments"=>"all", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"all", "images_order_city_image_upload"=>"all", "property_search_order_comments"=>"own", "complex_building_sensitive_data"=>"none", "country_property_initial_update"=>"all", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"own", "images_order_country_image_upload"=>"all"	f
12	Координатор городской недвижимости	"deal_show"=>"group", "role_show"=>"none", "task_show"=>"group", "event_show"=>"none", "deal_create"=>"group", "deal_update"=>"group", "task_create"=>"none", "task_update"=>"group", "contact_show"=>"group", "task_destroy"=>"group", "division_show"=>"none", "task_comments"=>"group", "task_documents"=>"group", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"group", "daily_duty_create"=>"none", "daily_duty_update"=>"none", "city_property_show"=>"all", "client_lead_create"=>"none", "client_lead_update"=>"group", "daily_duty_destroy"=>"none", "client_lead_destroy"=>"group", "deal_sensitive_data"=>"group", "city_property_create"=>"none", "city_property_update"=>"all", "images_order_city_show"=>"own", "city_property_documents"=>"all", "complex_building_create"=>"none", "complex_building_update"=>"none", "country_property_create"=>"none", "country_property_update"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "city_property_change_logs"=>"all", "images_order_city_answers"=>"own", "images_order_country_show"=>"own", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"group", "complex_building_documents"=>"none", "country_property_documents"=>"group", "images_order_city_comments"=>"own", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "property_removal_order_show"=>"own", "city_property_sensitive_data"=>"all", "country_property_change_logs"=>"group", "images_order_country_answers"=>"own", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "complex_building_image_upload"=>"none", "country_property_image_upload"=>"group", "images_order_country_comments"=>"own", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"group", "property_search_order_comments"=>"own", "complex_building_sensitive_data"=>"none", "country_property_sensitive_data"=>"group", "property_removal_order_comments"=>"own"	f
13	HR-менеджер	"role_show"=>"none", "role_create"=>"none", "role_update"=>"none", "division_show"=>"none", "department_show"=>"none", "division_create"=>"none", "division_update"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"all", "department_create"=>"none", "department_update"=>"none", "staff_user_create"=>"none", "staff_user_update"=>"none", "client_lead_create"=>"none", "client_lead_update"=>"all", "staff_user_destroy"=>"none", "staff_user_documents"=>"none", "staff_user_photo_upload"=>"none"	f
14	Агент загородной недвижимости	"deal_show"=>"own", "role_show"=>"none", "task_show"=>"own", "event_show"=>"none", "task_update"=>"own", "contact_show"=>"all", "task_destroy"=>"own", "contact_links"=>"all", "division_show"=>"none", "task_comments"=>"own", "company_create"=>"none", "company_update"=>"own", "task_documents"=>"own", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "contact_documents"=>"all", "client_lead_update"=>"own", "deal_sensitive_data"=>"own", "settlement_documents"=>"none", "country_property_show"=>"own", "contact_sensitive_data"=>"all", "images_order_city_show"=>"own", "client_lead_source_show"=>"none", "complex_building_create"=>"none", "complex_building_update"=>"none", "country_property_create"=>"all", "country_property_update"=>"own", "country_property_destroy"=>"own", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "images_order_city_answers"=>"own", "images_order_country_show"=>"own", "settlement_sensitive_data"=>"none", "client_lead_sensitive_data"=>"own", "country_property_documents"=>"all", "images_order_city_comments"=>"own", "property_search_order_show"=>"own", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "property_removal_order_show"=>"own", "country_property_change_logs"=>"all", "images_order_country_answers"=>"own", "property_export_without_logo"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "country_property_image_upload"=>"own", "images_order_country_comments"=>"own", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"own", "property_search_order_comments"=>"own", "country_property_initial_update"=>"own", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"own"	f
15	Руководитель департамента загородной недвижимости	"deal_show"=>"own", "role_show"=>"none", "task_show"=>"own", "task_close"=>"none", "deal_create"=>"none", "deal_update"=>"own", "task_create"=>"none", "task_update"=>"own", "contact_show"=>"all", "deal_destroy"=>"own", "task_destroy"=>"own", "contact_links"=>"all", "division_show"=>"none", "task_comments"=>"own", "contact_create"=>"none", "contact_update"=>"all", "task_documents"=>"own", "contact_destroy"=>"all", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "deal_show_archive"=>"none", "city_property_show"=>"all", "client_lead_create"=>"none", "client_lead_update"=>"own", "client_lead_destroy"=>"own", "deal_sensitive_data"=>"own", "city_property_create"=>"none", "city_property_update"=>"all", "contact_photo_upload"=>"all", "city_property_destroy"=>"all", "country_property_show"=>"all", "contact_sensitive_data"=>"all", "images_order_city_show"=>"own", "city_property_documents"=>"all", "country_property_create"=>"none", "country_property_update"=>"all", "client_lead_show_archive"=>"none", "country_property_destroy"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "city_property_change_logs"=>"all", "images_order_city_answers"=>"own", "images_order_country_show"=>"own", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"own", "country_property_documents"=>"all", "images_order_city_comments"=>"own", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "property_removal_order_show"=>"own", "city_property_initial_update"=>"all", "city_property_sensitive_data"=>"all", "country_property_change_logs"=>"all", "images_order_country_answers"=>"own", "property_export_without_logo"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "country_property_image_upload"=>"all", "images_order_country_comments"=>"own", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"all", "property_search_order_comments"=>"own", "country_property_initial_update"=>"all", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"own"	f
17	Контент-менеджер		f
18	Координатор загородной недвижимости	"deal_show"=>"own", "role_show"=>"none", "task_show"=>"own", "event_show"=>"none", "deal_create"=>"group", "deal_update"=>"own", "task_create"=>"none", "task_update"=>"own", "contact_show"=>"all", "deal_destroy"=>"own", "contact_links"=>"own", "division_show"=>"none", "task_comments"=>"own", "contact_create"=>"none", "contact_update"=>"all", "task_documents"=>"own", "contact_destroy"=>"own", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "contact_documents"=>"own", "hub_chief_country"=>"all", "settlement_create"=>"all", "settlement_update"=>"none", "city_property_show"=>"all", "client_lead_create"=>"none", "client_lead_update"=>"own", "deal_sensitive_data"=>"own", "city_property_create"=>"none", "city_property_update"=>"all", "contact_photo_upload"=>"own", "settlement_documents"=>"none", "city_property_destroy"=>"all", "country_property_show"=>"all", "contact_sensitive_data"=>"own", "hub_supervisor_country"=>"all", "images_order_city_show"=>"own", "settlement_change_logs"=>"none", "city_property_documents"=>"all", "client_lead_source_show"=>"none", "country_property_create"=>"all", "country_property_update"=>"all", "settlement_image_upload"=>"none", "country_property_destroy"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "city_property_change_logs"=>"all", "images_order_city_answers"=>"own", "images_order_country_show"=>"all", "settlement_sensitive_data"=>"none", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"own", "country_property_documents"=>"all", "images_order_city_comments"=>"own", "property_search_order_show"=>"all", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"all", "property_removal_order_show"=>"own", "city_property_sensitive_data"=>"all", "country_property_change_logs"=>"all", "images_order_country_answers"=>"all", "property_export_without_logo"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"all", "country_property_image_upload"=>"all", "images_order_country_comments"=>"all", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"all", "property_search_order_comments"=>"all", "country_property_initial_update"=>"all", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"own", "images_order_country_image_upload"=>"all"	f
19	Старший агент загородной недвижимости	"deal_show"=>"group", "role_show"=>"none", "task_show"=>"own", "event_show"=>"none", "deal_create"=>"own", "deal_update"=>"group", "task_create"=>"none", "task_update"=>"own", "contact_show"=>"all", "contact_links"=>"all", "division_show"=>"none", "task_comments"=>"own", "contact_create"=>"none", "contact_update"=>"all", "task_documents"=>"own", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"group", "contact_documents"=>"all", "daily_duty_create"=>"none", "daily_duty_update"=>"none", "settlement_update"=>"none", "city_property_show"=>"own", "client_lead_create"=>"none", "client_lead_update"=>"group", "daily_duty_destroy"=>"none", "settlement_destroy"=>"none", "deal_sensitive_data"=>"group", "city_property_create"=>"all", "city_property_update"=>"all", "contact_photo_upload"=>"all", "city_property_destroy"=>"all", "country_property_show"=>"own", "contact_sensitive_data"=>"all", "images_order_city_show"=>"own", "city_property_documents"=>"all", "client_lead_source_show"=>"none", "country_property_create"=>"all", "country_property_update"=>"own", "country_property_destroy"=>"own", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "city_property_change_logs"=>"all", "images_order_city_answers"=>"own", "images_order_country_show"=>"own", "settlement_sensitive_data"=>"none", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"group", "country_property_documents"=>"own", "images_order_city_comments"=>"own", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "property_removal_order_show"=>"own", "city_property_sensitive_data"=>"all", "country_property_change_logs"=>"all", "images_order_country_answers"=>"own", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "country_property_image_upload"=>"own", "images_order_country_comments"=>"own", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"own", "property_search_order_comments"=>"own", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"own"	f
20	Фотограф	"role_show"=>"none", "contact_show"=>"all", "division_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "images_order_city_show"=>"own", "images_order_city_update"=>"own", "images_order_country_show"=>"all", "images_order_city_comments"=>"own", "city_property_contact_links"=>"all", "images_order_country_update"=>"all", "images_order_country_comments"=>"all", "country_property_contact_links"=>"all", "images_order_city_image_upload"=>"own", "images_order_country_image_upload"=>"all"	f
21	Бэкэнд-разработчик		t
22	Фронтэнд-разработчик		t
23	Старший агент городской недвижимости	"deal_show"=>"own", "role_show"=>"none", "task_show"=>"own", "event_show"=>"none", "deal_create"=>"own", "deal_update"=>"own", "task_create"=>"none", "task_update"=>"own", "deal_destroy"=>"own", "task_destroy"=>"own", "division_show"=>"none", "task_comments"=>"own", "task_documents"=>"own", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "daily_duty_create"=>"none", "daily_duty_update"=>"none", "deal_show_archive"=>"none", "city_property_show"=>"own", "client_lead_create"=>"none", "client_lead_update"=>"own", "daily_duty_destroy"=>"none", "client_lead_destroy"=>"own", "city_property_create"=>"none", "city_property_update"=>"all", "city_property_destroy"=>"all", "country_property_show"=>"own", "city_property_documents"=>"all", "country_property_create"=>"none", "country_property_update"=>"all", "client_lead_show_archive"=>"none", "country_property_destroy"=>"all", "city_property_change_logs"=>"all", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"own", "country_property_documents"=>"all", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "city_property_sensitive_data"=>"all", "country_property_change_logs"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "country_property_image_upload"=>"all", "country_property_contact_links"=>"all", "property_search_order_comments"=>"own", "country_property_sensitive_data"=>"all"	f
24	Руководитель отдела разработки		t
25	Тестировщик		f
26	Системный администратор	"staff_user_show"=>"none", "country_property_show"=>"all", "country_property_create"=>"none", "country_property_documents"=>"all", "country_property_change_logs"=>"all", "country_property_image_upload"=>"all", "country_property_sensitive_data"=>"all"	f
27	(архив) Ведущий эксперт по работе с партнерами	"deal_show"=>"own", "role_show"=>"none", "task_show"=>"own", "event_show"=>"none", "deal_create"=>"own", "deal_update"=>"own", "task_create"=>"none", "task_update"=>"own", "contact_show"=>"all", "deal_destroy"=>"own", "task_destroy"=>"own", "contact_links"=>"own", "division_show"=>"none", "task_comments"=>"own", "contact_create"=>"none", "contact_update"=>"own", "task_documents"=>"own", "contact_destroy"=>"own", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "contact_documents"=>"own", "city_property_show"=>"own", "client_lead_create"=>"none", "client_lead_update"=>"own", "client_lead_destroy"=>"own", "deal_sensitive_data"=>"own", "city_property_create"=>"none", "city_property_update"=>"all", "city_property_destroy"=>"all", "country_property_show"=>"own", "contact_sensitive_data"=>"own", "images_order_city_show"=>"own", "city_property_documents"=>"all", "country_property_create"=>"none", "country_property_update"=>"all", "country_property_destroy"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "city_property_change_logs"=>"all", "images_order_city_answers"=>"own", "images_order_country_show"=>"own", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"own", "country_property_documents"=>"all", "images_order_city_comments"=>"own", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "property_removal_order_show"=>"own", "city_property_sensitive_data"=>"all", "country_property_change_logs"=>"all", "images_order_country_answers"=>"own", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "country_property_image_upload"=>"all", "images_order_country_comments"=>"own", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"all", "property_search_order_comments"=>"own", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"own"	f
28	Директор Хаба	"deal_show"=>"own", "role_show"=>"none", "task_show"=>"own", "event_show"=>"none", "task_close"=>"none", "deal_create"=>"none", "deal_update"=>"own", "task_create"=>"none", "task_update"=>"own", "contact_show"=>"all", "deal_destroy"=>"own", "task_destroy"=>"own", "contact_links"=>"own", "division_show"=>"none", "task_comments"=>"own", "task_transfer"=>"group", "company_create"=>"none", "company_update"=>"own", "complex_create"=>"none", "complex_update"=>"all", "contact_create"=>"none", "contact_update"=>"own", "hub_chief_city"=>"all", "selection_show"=>"all", "task_documents"=>"own", "complex_destroy"=>"all", "contact_destroy"=>"own", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "selection_create"=>"none", "selection_update"=>"all", "contact_documents"=>"own", "daily_duty_create"=>"none", "daily_duty_update"=>"none", "hub_chief_country"=>"all", "settlement_create"=>"none", "settlement_update"=>"none", "city_property_show"=>"all", "client_lead_create"=>"none", "client_lead_update"=>"own", "daily_duty_destroy"=>"none", "settlement_destroy"=>"none", "client_lead_destroy"=>"own", "complex_change_logs"=>"all", "deal_sensitive_data"=>"own", "hub_supervisor_city"=>"all", "city_property_create"=>"none", "city_property_update"=>"all", "complex_image_upload"=>"all", "contact_photo_upload"=>"own", "settlement_documents"=>"none", "city_property_destroy"=>"all", "country_property_show"=>"all", "contact_sensitive_data"=>"all", "hub_supervisor_country"=>"all", "images_order_city_show"=>"all", "settlement_change_logs"=>"none", "city_property_documents"=>"all", "client_lead_source_show"=>"none", "complex_building_create"=>"none", "complex_building_update"=>"none", "country_property_create"=>"none", "country_property_update"=>"all", "settlement_image_upload"=>"none", "complex_building_destroy"=>"none", "country_property_destroy"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"all", "city_property_change_logs"=>"all", "images_order_city_answers"=>"all", "images_order_country_show"=>"all", "settlement_sensitive_data"=>"none", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"own", "complex_building_documents"=>"none", "country_property_documents"=>"all", "images_order_city_comments"=>"all", "property_search_order_show"=>"all", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"all", "property_removal_order_show"=>"all", "city_property_initial_update"=>"all", "city_property_sensitive_data"=>"all", "complex_building_change_logs"=>"none", "country_property_change_logs"=>"all", "images_order_country_answers"=>"all", "property_export_without_logo"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"all", "complex_building_image_upload"=>"none", "country_property_image_upload"=>"all", "images_order_country_comments"=>"all", "property_removal_order_create"=>"none", "property_removal_order_update"=>"all", "country_property_contact_links"=>"all", "images_order_city_image_upload"=>"all", "property_search_order_comments"=>"all", "complex_building_sensitive_data"=>"none", "country_property_initial_update"=>"all", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"all", "images_order_country_image_upload"=>"all"	f
29	Диспозл	"deal_show"=>"group", "role_show"=>"none", "task_show"=>"group", "deal_create"=>"own", "deal_update"=>"group", "task_create"=>"none", "task_update"=>"group", "contact_show"=>"all", "route_create"=>"all", "route_update"=>"all", "contact_links"=>"all", "division_show"=>"none", "region_create"=>"all", "region_update"=>"all", "task_comments"=>"group", "complex_create"=>"none", "complex_update"=>"all", "contact_create"=>"none", "contact_update"=>"all", "country_create"=>"all", "country_update"=>"all", "hub_chief_city"=>"all", "task_documents"=>"group", "department_show"=>"none", "district_create"=>"all", "district_update"=>"all", "locality_create"=>"all", "locality_update"=>"all", "staff_user_show"=>"none", "client_lead_show"=>"group", "contact_documents"=>"all", "hub_chief_country"=>"all", "settlement_create"=>"none", "settlement_update"=>"none", "city_property_show"=>"own", "client_lead_create"=>"none", "client_lead_update"=>"group", "complex_change_logs"=>"all", "deal_sensitive_data"=>"group", "hub_supervisor_city"=>"all", "sub_locality_create"=>"all", "sub_locality_update"=>"all", "city_property_create"=>"none", "city_property_update"=>"all", "complex_image_upload"=>"all", "contact_photo_upload"=>"all", "settlement_documents"=>"none", "city_property_destroy"=>"all", "country_property_show"=>"own", "contact_sensitive_data"=>"own", "hub_supervisor_country"=>"all", "images_order_city_show"=>"all", "settlement_change_logs"=>"none", "city_property_documents"=>"all", "complex_building_create"=>"none", "complex_building_update"=>"none", "country_property_create"=>"none", "country_property_update"=>"all", "settlement_image_upload"=>"none", "complex_building_destroy"=>"none", "country_property_destroy"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"all", "city_property_change_logs"=>"all", "images_order_city_answers"=>"all", "images_order_country_show"=>"all", "settlement_sensitive_data"=>"none", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"group", "complex_building_documents"=>"none", "country_property_documents"=>"all", "images_order_city_comments"=>"all", "property_search_order_show"=>"all", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"all", "property_removal_order_show"=>"own", "city_property_initial_update"=>"all", "city_property_sensitive_data"=>"all", "complex_building_change_logs"=>"all", "country_property_change_logs"=>"all", "images_order_country_answers"=>"all", "property_export_without_logo"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"all", "complex_building_image_upload"=>"all", "country_property_image_upload"=>"all", "images_order_country_comments"=>"all", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"all", "images_order_city_image_upload"=>"all", "property_search_order_comments"=>"all", "complex_building_sensitive_data"=>"none", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"own", "images_order_country_image_upload"=>"all"	f
30	Аккаунт-менеджер	"role_show"=>"none", "task_show"=>"group", "event_show"=>"none", "task_create"=>"none", "task_update"=>"group", "contact_show"=>"all", "route_create"=>"all", "route_update"=>"all", "task_destroy"=>"group", "contact_links"=>"all", "division_show"=>"none", "region_create"=>"all", "region_update"=>"all", "task_comments"=>"group", "contact_update"=>"all", "country_create"=>"all", "country_update"=>"all", "task_documents"=>"group", "contact_destroy"=>"all", "daily_duty_show"=>"none", "department_show"=>"none", "district_create"=>"all", "district_update"=>"all", "locality_create"=>"all", "locality_update"=>"all", "staff_user_show"=>"none", "client_lead_show"=>"all", "contact_documents"=>"all", "daily_duty_create"=>"none", "daily_duty_update"=>"none", "settlement_create"=>"none", "settlement_update"=>"none", "client_lead_create"=>"none", "client_lead_update"=>"all", "settlement_destroy"=>"none", "client_lead_destroy"=>"all", "sub_locality_create"=>"all", "sub_locality_update"=>"all", "city_property_update"=>"all", "settlement_documents"=>"none", "city_property_destroy"=>"all", "contact_sensitive_data"=>"all", "images_order_city_show"=>"own", "city_property_documents"=>"all", "complex_building_update"=>"none", "country_property_update"=>"all", "settlement_image_upload"=>"none", "complex_building_destroy"=>"none", "country_property_destroy"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "images_order_city_answers"=>"own", "images_order_country_show"=>"own", "settlement_sensitive_data"=>"none", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"all", "complex_building_documents"=>"none", "country_property_documents"=>"all", "images_order_city_comments"=>"own", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "property_removal_order_show"=>"own", "city_property_sensitive_data"=>"all", "images_order_country_answers"=>"own", "property_export_without_logo"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "complex_building_image_upload"=>"none", "country_property_image_upload"=>"all", "images_order_country_comments"=>"own", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"all", "property_search_order_comments"=>"own", "complex_building_sensitive_data"=>"none", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"own"	f
31	Главный дизайнер		f
32	VoxImplant	"staff_user_show"=>"none", "client_lead_show"=>"all", "client_lead_create"=>"none", "client_lead_update"=>"all"	f
33	Архитектор-чертёжник	"role_show"=>"none", "division_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "city_property_update"=>"all", "images_order_city_show"=>"own", "city_property_documents"=>"all", "country_property_update"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "images_order_country_show"=>"own", "city_property_image_upload"=>"all", "country_property_documents"=>"all", "images_order_city_comments"=>"own", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "country_property_image_upload"=>"all", "images_order_country_comments"=>"own", "images_order_city_image_upload"=>"own", "images_order_country_image_upload"=>"own"	f
34	Партнер		t
35	Акционер		t
36	Руководитель отдела маркетинга		t
37	Построение статистики	"deal_show"=>"all", "role_show"=>"none", "task_show"=>"all", "contact_show"=>"all", "division_show"=>"none", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"all"	f
38	Руководитель отдела по работе с собственниками	"deal_show"=>"group", "role_show"=>"none", "task_show"=>"group", "event_show"=>"none", "deal_create"=>"none", "deal_update"=>"group", "task_create"=>"none", "task_update"=>"group", "contact_show"=>"all", "contact_links"=>"all", "division_show"=>"none", "task_comments"=>"group", "complex_create"=>"none", "complex_update"=>"all", "contact_create"=>"none", "contact_update"=>"all", "task_documents"=>"group", "complex_destroy"=>"all", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"group", "contact_documents"=>"all", "daily_duty_create"=>"none", "daily_duty_update"=>"none", "settlement_create"=>"none", "settlement_update"=>"none", "city_property_show"=>"own", "client_lead_create"=>"none", "client_lead_update"=>"group", "complex_change_logs"=>"all", "deal_sensitive_data"=>"group", "hub_supervisor_city"=>"none", "city_property_create"=>"none", "city_property_update"=>"all", "complex_image_upload"=>"all", "contact_photo_upload"=>"all", "settlement_documents"=>"none", "city_property_destroy"=>"all", "country_property_show"=>"own", "contact_sensitive_data"=>"all", "hub_supervisor_country"=>"none", "images_order_city_show"=>"all", "settlement_change_logs"=>"none", "city_property_documents"=>"all", "client_lead_source_show"=>"none", "complex_building_create"=>"all", "complex_building_update"=>"all", "country_property_create"=>"none", "country_property_update"=>"all", "settlement_image_upload"=>"none", "country_property_destroy"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"all", "city_property_change_logs"=>"all", "images_order_city_answers"=>"all", "images_order_country_show"=>"all", "settlement_sensitive_data"=>"none", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"group", "complex_building_documents"=>"all", "country_property_documents"=>"all", "images_order_city_comments"=>"all", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"all", "property_removal_order_show"=>"all", "city_property_initial_update"=>"all", "city_property_sensitive_data"=>"all", "complex_building_change_logs"=>"all", "country_property_change_logs"=>"all", "images_order_country_answers"=>"all", "property_export_without_logo"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "complex_building_image_upload"=>"all", "country_property_image_upload"=>"all", "images_order_country_comments"=>"all", "property_removal_order_create"=>"none", "property_removal_order_update"=>"all", "country_property_contact_links"=>"all", "property_search_order_comments"=>"own", "complex_building_sensitive_data"=>"all", "country_property_sensitive_data"=>"all", "property_removal_order_comments"=>"all"	f
39	Специалист по работе с собственниками и партнерами	"deal_show"=>"own", "role_show"=>"none", "task_show"=>"own", "event_show"=>"none", "deal_create"=>"none", "deal_update"=>"own", "task_create"=>"none", "task_update"=>"own", "contact_show"=>"all", "contact_links"=>"own", "division_show"=>"none", "task_comments"=>"own", "complex_create"=>"none", "complex_update"=>"all", "contact_create"=>"none", "contact_update"=>"own", "task_documents"=>"own", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "client_lead_show"=>"own", "contact_documents"=>"own", "settlement_create"=>"none", "settlement_update"=>"none", "city_property_show"=>"all", "client_lead_create"=>"none", "client_lead_update"=>"all", "deal_sensitive_data"=>"own", "city_property_create"=>"none", "city_property_update"=>"all", "complex_image_upload"=>"all", "settlement_documents"=>"none", "city_property_destroy"=>"all", "country_property_show"=>"all", "contact_sensitive_data"=>"own", "images_order_city_show"=>"own", "settlement_change_logs"=>"none", "city_property_documents"=>"all", "complex_building_create"=>"all", "complex_building_update"=>"all", "country_property_create"=>"none", "country_property_update"=>"all", "settlement_image_upload"=>"none", "country_property_destroy"=>"all", "images_order_city_create"=>"none", "images_order_city_update"=>"own", "city_property_change_logs"=>"all", "images_order_city_answers"=>"own", "images_order_country_show"=>"own", "settlement_sensitive_data"=>"none", "city_property_image_upload"=>"all", "client_lead_sensitive_data"=>"own", "complex_building_documents"=>"all", "country_property_documents"=>"all", "images_order_city_comments"=>"own", "property_search_order_show"=>"own", "city_property_contact_links"=>"all", "images_order_country_create"=>"none", "images_order_country_update"=>"own", "property_removal_order_show"=>"own", "city_property_initial_update"=>"all", "city_property_sensitive_data"=>"own", "country_property_change_logs"=>"all", "images_order_country_answers"=>"own", "property_export_without_logo"=>"all", "property_search_order_create"=>"none", "property_search_order_update"=>"own", "complex_building_image_upload"=>"all", "country_property_image_upload"=>"all", "images_order_country_comments"=>"own", "property_removal_order_create"=>"none", "property_removal_order_update"=>"own", "country_property_contact_links"=>"all", "property_search_order_comments"=>"own", "complex_building_sensitive_data"=>"all", "country_property_initial_update"=>"all", "country_property_sensitive_data"=>"own", "property_removal_order_comments"=>"own"	f
40	iOS-разработчик		t
41	Писатель-редактор		t
42	Личный ассистент		t
43	Оператор колл-центра	"role_show"=>"none", "contact_show"=>"own", "division_show"=>"none", "daily_duty_show"=>"none", "department_show"=>"none", "staff_user_show"=>"none", "application_show"=>"none", "country_property_show"=>"all", "client_lead_source_show"=>"none", "country_property_create"=>"none", "country_property_update"=>"all", "country_property_documents"=>"all", "country_property_change_logs"=>"all", "country_property_image_upload"=>"all", "country_property_contact_links"=>"own"	f
44	SEO-специалист		f
45	Comagic	"comagic"=>"none"	f
46	Уволенный сотрудник		f
47	Консультант	"contact_show"=>"all", "staff_user_show"=>"none", "client_lead_show"=>"all"	f
48	просмотр тиса		t
49	дире		f
51	SEO	"route_update"=>"all", "locality_update"=>"all", "settlement_update"=>"none"	f
54	Full		t
\.


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.routes (id, name, kind_name, aliases, created_at, updated_at, place_type, property_categories, region_id, country_id, meta) FROM stdin;
1177	Киевское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1178	Рублёво-Успенское	шоссе	{рублево-успенское,рублевско-успенское,рублевское,рублевка}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1179	Минское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1180	Можайское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1181	Сколковское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{}	1003	1	\N
1182	Каширское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{}	1003	1	\N
1183	Калужское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1184	Рязанское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{}	1003	1	\N
1185	Дмитровское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1186	Новорижское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1187	Куркинское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1188	Волгоградское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{}	1003	1	\N
1189	Волоколамское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1190	Варшавское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{}	1003	1	\N
1191	Пятницкое	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1192	Ильинское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1713	Новорязанское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{}	1003	1	\N
1714	Егорьевское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{}	1003	1	\N
1715	Ленинградское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{country}	1003	1	\N
1716	Звенигородское	шоссе	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{}	2	1	\N
1717	Дон	а/д	{}	2016-02-15 16:07:08.916377+00	2016-02-15 16:07:08.916377+00	route	{}	1003	1	\N
1791	Алтуфьевское	шоссе	{}	2016-03-03 08:30:33.136+00	2016-03-03 08:30:33.136+00	route	{country}	1003	1	\N
1800	Симферопольское	шоссе	{}	2016-03-22 15:57:54.444538+00	2018-10-28 18:23:23.282726+00	route	{country}	1003	1	\N
1935	Осташковское	шоссе	{}	2016-04-27 10:45:16.385+00	2016-04-27 10:45:16.385+00	route	{country}	1003	1	\N
1963	Боровское	шоссе	{}	2016-06-01 12:50:46.804+00	2018-10-28 18:13:12.033369+00	route	{}	1003	1	\N
\.


--
-- Data for Name: selections; Type: TABLE DATA; Schema: public; Owner: jq
--

COPY public.selections (id, name, site, property_category, property_ids, ru_id, created_by_user_id, created_at, updated_at, pages, photo, updated_by_user_id, state, description, title, offer_kind) FROM stdin;
\.


--
-- Data for Name: settlement_contact_links; Type: TABLE DATA; Schema: public; Owner: jq
--

COPY public.settlement_contact_links (settlement_id, linked_contact_id, kind_id) FROM stdin;
\.


--
-- Data for Name: settlement_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settlement_documents (id, state, filename, aes_key, iv_bytes, comment, created_at, updated_at, uploader_id, settlement_id, kind_dictionary_kind, kind_dictionary_id) FROM stdin;
\.


--
-- Data for Name: settlements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settlements (id, name, kind_name, aliases, created_at, updated_at, place_type, property_categories, state, kind_dictionary_kind, kind_dictionary_id, main_sale_description, satellite_sale_description, images, created_by_user_id, updated_by_user_id, l_linked_locality_ids, l_mkad_distance, l_country_id, l_region_id, l_district_id, l_locality_id, d_foundation_year, d_area, d_power_supply, d_water_supply, d_gas_supply, d_sewerage_supply, d_external_infrastructure, d_internal_infrastructure, l_route_id, pd_so_kind, pd_so_is_bargain, pd_so_is_installment, pd_so_is_mortgage, pd_so_agent_fee, pd_so_agent_fixed_price, pd_so_agent_fixed_price_currency, ru_id, ru_department_id, ru_division_id, l_pos, s_land_area_from, s_land_area_to, s_house_area_from, s_house_area_to, s_properties_so_total, s_properties_so_primary, s_properties_so_resale, s_properties_ro_total, s_mcp_so_from_rub, s_mcp_so_from_usd, s_mcp_so_from_eur, s_mcp_so_to_rub, s_mcp_so_to_usd, s_mcp_so_to_eur, s_mcp_ro_from_rub, s_mcp_ro_from_usd, s_mcp_ro_from_eur, s_mcp_ro_to_rub, s_mcp_ro_to_usd, s_mcp_ro_to_eur, s_properties_total, d_land_state, main_rent_description, satellite_rent_description, meta) FROM stdin;
2	Изумрудный век	\N	{}	2016-02-15 05:07:08.916377+00	2016-02-15 05:07:08.916377+00	settlement	{}	public	settlement_type	\N	Как бы комфортно и красиво не жилось человеку в городе, многие из нас все равно все чаще стремятся вырваться на природу. Кто-то желает просто немного\nотдохнуть, а у кого-то появляется желание навсегда переехать за город, поближе к природе. В Московской области коттеджный поселок «Изумрудный век» признан\nнаиболее живописным из всех вариантов жилья и самым престижным на всей Рублевке.\n\nПопасть в поселок очень просто, для этого есть удобные въезды Горки-2 и Горки-8. Вид на населенный пункт сверху красив, каждый из участков домовладений\nразный по своей площади, но расположены территории относительно друг друга гармонично. При их организации застройщик использовал принцип «золотого\nсечения». Территория, прилегающая к поселку, совсем скоро будет обустроена в рекреационную зону, но и не это самое важное. Вся территория надежно защищена\nполицией, видеонаблюдением по всему периметру, а попасть на нее можно только, когда на КПП предъявить специальный пропуск.\n\nРеспектабельный загородный комплекс расположен по Рублево-Успенскому шоссе и до МКАД ехать всего около 10 минут. Сами домовладения сложно даже назвать\nкоттеджами, настолько они похожи на шикарные усадьбы и роскошные дворцы, участки возле которых тщательно ухожены. Каждый человек, желающий купить здесь\nдом, получает в пользование все необходимые коммуникации, позволяющие сделать жизнь за городом максимально комфортной. Для постоянного проживания поселок\nподходит идеально, ведь тут есть несколько торговых центров, развлекательных заведений и сервисных служб.\n\nОсобенности поселка\n\nЗастройщик предлагает в продажу таунхаусы и квартиры, расположенные на территории в 15 гектаров. В самом начале огромный участок земли разбили на 72\nотдельных территории, которые планировалось продавать для индивидуальной застройки, но потом очень многие домовладельцы стали покупать сразу по несколько\nучастков с целью их объединения. На сегодняшний день «Изумрудный век» имеет роскошные элитные домовладения в количестве 47 единиц, у каждого из которых\nприусадебный надел варьируется в пределах 15-45 соток.\n\nПриобрести жилье в поселке недорого вряд ли получится, потому что владельцами являются состоятельные люди, которые самостоятельно «строили» дома своей\nмечты. Именно этим можно объяснить отсутствие единой концепции в архитектуре поселка. Каждый из них стремился купить современные материалы, использовать\nпередовые технологии и уникальные проекты. Объекты недвижимости возводились из кирпича, имеют прочный монолитный фундамент и кровлю из металлочерепицы.\nБольшая часть владений оснащена дорогими смарт-технологиями, обеспечивающими уют и комфортность проживания.\n\nИнфраструктура КП «Изумрудный век»\n\nСнять жилье в КП «Изумрудный век» Одинцовского района в Подмосковье сегодня очень выгодно, аренда позволяет прочувствовать, подходит квартира или дом под\nиндивидуальные требования или нет. Аренда прекрасно подходит своей доступной ценой каждому, кто желает отдохнуть от Москвы с ее вечным шумом. Покупку\nкоттеджей тут могут себе позволить люди, по-настоящему обеспеченные, которым не важно, что собственной инфраструктуры в поселке нет.\n\nВсе необходимые объекты инфраструктуры расположились поблизости, в соседних Барвихе и Жуковке. Дорога до них занимает всего несколько минут, преодолеть ее\nможно даже велосипедом. Кстати, ценители активного образа жизни, рассматривая фото на сайте застройщика, где указан адрес каждого участка, его стоимость и\nпрочие характеристики, тоже стремятся купить или арендовать тут недвижимость. Судя по многочисленным отзывам, инвестиции в объекты «Изумрудного века»\nперспективные.	Давно мечтали поселиться в живописном элитном месте? Жилой комплекс «Изумрудный век» — прекрасный для этого выбор. Недаром он считается одним из самых\nблагоустроенных и престижных мест для загородного проживания. Расположен поселок на Рублево-Успенском шоссе в 15 километрах от Москвы. Это оптимальное\nрасстояние для круглогодичного размещения. С одной стороны, столица всего в 10 минутах езды, с другой — населенный пункт достаточно удален от мегаполиса.\nОкруженное со всех сторон лесом поселение славится чистым воздухом, живописной природой и тишиной. Территория леса обихожена, здесь имеется собственное\nозеро с рекреационной зоной и лодочной станцией. Отзывы об отдыхе здесь исключительно положительные.\n\nИнфраструктура\n\n«Изумрудный век» полностью готов к комфортному проживанию. Здесь по центральной улице проложена широкая асфальтированная дорога с ответвлениями к частным\nучасткам. Организовано мощное уличное освещение, имеются скверы и парки для спокойных прогулок. Для подрастающего поколения создана детская площадка.\nВзрослые могут отдыхать в ресторане или кафе. В КП действует система центральных коммуникаций. Каждое домовладение подключено к канализации, водоснабжению,\nгазовой магистрали и электрической подстанции. Любой желающий может провести городскую телефонию и получить при этом прямой московский номер.\n\nТорговых центров и магазинов на территории не предусмотрено. Но они имеются в избытке в соседних поселениях, расположенных в непосредственной близости —\nГорки-8 и Горки-2. Через них же осуществляется и въезд в коттеджный поселок. Чуть далее по адресам на Рублевке вы найдете изобилие бутиков, продуктовых\nсупермаркетов, аптек, медицинских клиник, образовательных учреждений. В Одинцовском районе Подмосковья их действительно очень много. Присутствие\nнежелательных лиц вблизи от коттеджей полностью исключено. Для этого к услугам проживающих организованы круглосуточная охрана полицией, видеонаблюдение,\nпропуск через КПП — владельцы домов и таунхаусов могут спать абсолютно спокойно.\n\nЖилье\n\nИзначально планировалось сделать «Изумрудный век» одним из самых крупных коттеджных поселений в Московской области. Подразумевалось строительство 76 типов\nнедвижимости в широком ценовом диапазоне. Но потом по желанию покупателей придомовые территории были существенно увеличены, поэтому получилось всего 47\nдомовладений. На каждом из них построена вилла или резиденция площадью от 350 до 1300 кв м. Единого стилевого решения здесь нет — каждый владелец\nиспользовал собственный проект застройки. Во многих жилищах используются современные смарт-технологии, с помощью которых обеспечивается интеллектуальное\nуправление хозяйством.\n\nСтоимость готовых помещений полностью отделанных и обставленных начинается с отметки в 2 млн. $. Это лучший вариант действительно недорого по цене квартиры\nв столице приобрести загородную резиденцию для отдыха или постоянного проживания. Для тех, кто любит дорого и роскошно, есть предложения за 8 млн. у.е.\nПредварительно ознакомиться с особенностями интерьера и планировки вы можете с помощью представленных фото. Возможна также аренда домов. Цена в таком\nслучае будет составлять не менее 5000$ в месяц. Вариантов снять сегодня действительно много. Это хорошая возможность погрузиться в атмосферу «Изумрудного\nвека», оценить его преимущества и при желании купить один из выставленных на продажу коттеджей.\n\nОзнакомьтесь с картой продаваемых или сдаваемых объектов на нашем сайте. При желании будет организовано посещение понравившегося дома, что поможет вам\nопределиться с выбором.	[{"id": "ST1598-260785f2", "url": "https://s3-eu-west-1.amazonaws.com/jqcem-images/ST1598-260785f2", "isPublic": false}]	2	\N	{}	16	1	1003	1012	1141	2001	20	\N	\N	\N	\N	{}	{}	1178	\N	\N	\N	\N	\N	\N	\N	1	\N	\N	0101000020E6100000000000E030DB4B4000000020DF924240	11	75	311	1200	9	0	9	6	49772550	750000	658819	298635300	4500000	3952916	200000	3014	2647	650000	9795	8604	9	{}	\N	\N	\N
3	Кедры	\N	{}	2016-02-15 05:07:08.916377+00	2016-02-15 05:07:08.916377+00	settlement	{}	draft	settlement_type	\N	Коттеджный поселок «Кедры» расположен в одном из самых чистых районов Подмосковья. На небольшой возвышенности на 12 гектарах земли размещено 50 коттеджей\nбизнес класса. Каждый участок площадью от 14 до 25 соток прекрасно вписывается в окружающий ландшафт.\n\nПолтора километра отделяют поселок от реки Истра, в нескольких минутах езды находится Истринское водохранилище. В непосредственной близости находится\nисторический заповедник, старое русское село Павловская слобода, достоянием которого является семиглавый храм Благовещения. Все постройки –\nадминистративные здания и коттеджи, выполнены в одном стиле.\n\nНепосредственно жилая недвижимость создавалась по шести проектам. Каждый из проектов имеет свои особенности, но все дома одинаково комфортны для\nпостоянного или временного проживания. Первые этажи практически во всех домах имеют свободную планировку. Здесь можно запланировать кухню и столовую,\nгостиную и каминный зал. Три спальни предусмотрены в мансардном этаже, также несколько санузлов. Кабинет имеется в каждом коттедже, практически всегда в\nмансардном этаже. Цокольный этаж вмещает в себя хозяйственные помещения, сауну, бильярдную и кинозал. Гаражи во всех проекта прилегающие. Такая планировка\nпозволяет экономить пространство и не занимать природные просторы.\n\nПоселок находится в непосредственной близости от Новорижского шоссе, поэтому застройщики предусмотрели защиту от шума при планировании участков. Кроме\nтого, что естественный холм отделяет КП от дороги, вдоль трассы возведен забор высотой 3.5 метра с шумопоглощением.\n\nУчасток Московской области вдоль Новой Риги характеризуется наибольшей интенсивностью застройки. Это привело к значительному сокращению лесных насаждений.\nВ «Кедрах» же наоборот большое внимание уделили озеленению территории. Еще до строительства были заложены аллеи лип и берез по периметру поселка. На данный\nмомент, когда основное строительство завершено, дополнительно высажено 3000 хвойных деревьев, завезенных из Сибири. Это наиболее дальновидная программа в\nИстринском районе.\n\nКаждый, кто решит купить недвижимость, получит комфортабельное жилье со всеми необходимыми коммуникациями. Магистральный газ, выделенная линия интернет,\nтелефонная линия, электричество, спутниковое телевидение, канализация. Поселок имеет две собственных скважины, которые обеспечивают водой все проживающее\nнаселение.\n\nИнфраструктура КП «Кедры»\n\nЧерез дорогу от КПП поселка расположен торговый центр «Княжий двор». Здесь имеется супермаркет, медицинский центр, аптека, несколько кафе и ресторанов,\nкомната отдыха для детей. Фирменный мясной магазин находится также в непосредственной близости. На территории самого поселка расположена эксплуатационная\nслужба, гостевая автостоянка, спортивная многопрофильная площадка и площадка для детей. Ознакомившись с фото на сайте, видно, что потенциальными\nпокупателями недвижимости являются семьи и семьи с детьми. Уют, комфорт и безопасность – принципы КП «Кедры».\n\nВблизи КП расположены два населенных пункта • Захарово деревня и Павловская слобода. Здесь имеются школы и детские сады государственные и коммерческие,\nразвита бытовая инфраструктура.\n\nОхрана работает круглосуточно, осуществляется видеонаблюдение, патрулирование и функционирует КПП. При необходимости и желании каждый владелец дома за\nопределенную цену может заказать пульт охраны в дом.\n\nТранспортная развязка\n\nКП «Кедры» находятся в 23 км от Москвы по Новорижскому шоссе. Дорога от поселка до столицы занимает несколько минут. Кроме того, можно воспользоваться\nобщественным транспортом. Метро Щукинская и Княжье озеро соединяются несколькими маршрутами.\n\nЦенность домов в КП объясняется и непосредственной близостью к инфраструктуре Новорижского шоссе, например, торгово-развлекательный комплекс Павлово\nподворье имеет в себе все необходимое для жизни и отдыха. Продажа домов осуществляется уже сегодня. Стоимость зависит от проекта, законченности дома и\nрасположения участка.	Новый коттеджный поселок «Кедры» располагается от МКАД на Новорижском шоссе всего в 24 км. Это расстояние легко преодолимо как на личном, так и на\nобщественном транспорте, поэтому жители могут сочетать жизнь в частном загородном доме и любимую работу в мегаполисе.\n\nДостопримечательности местности\n\nМосковская область богата на леса с сочной зеленью и свежим воздухом. В одном из таких массивов и расположен поселок Кедры. Этот участок слегка возвышен\nнад местностью, благодаря чему открывается обзор на вид древнего селения «Павловская слобода» и семиглавый храм Благовещения.\n\nНеподалеку от КП находится Истринское водохранилище. Если купить дом в поселке, то можно регулярно ездить на рыбалку и отдых. Водохранилище славится\nизобилием нескольких видов рыб, а территория вокруг водоемов облагорожена. Здесь есть детские площадки, песчаные пляжи и места для спортивных игр. В\nИстринском районе это самое замечательное место для отдыха.\n\nСтиль построек\n\nВсе дома, расположенные в поселке Кедры, выполнены в едином стиле. Размер недвижимости можно выбрать по своему вкусу, так как площадь готовых особняков\nсоставляет от 250 до 420 кв.м. Прилегающий земельный участок тоже может отличаться ― от 14 до 25 соток.\n\nГотовый таунхаус имеет 2 встроенных гаража, в которых может легко поместиться два автомобиля, а при необходимости и другой специальный транспорт. На этапе\nпродажи жилье абсолютно готово к эксплуатации, и от этого зависит цена на недвижимость.\n\nБлагоустройство территории\n\nПодмосковье отличается от столицы экологией, поэтому многие стремятся сменить квартиры на загородные дома в тихих поселках. Небольшие элитные поселки,\nрасположенные в лесной зоне, имеют более свежий воздух, а жилье в них стоит относительно недорого, если сравнивать с московскими квартирами. Несмотря на\nэто, застройщиками спроектировано дополнительное озеленение территории. Для этого еще на этапе планирования высажены молодые липы и березы. Эти деревья уже\nсегодня удачно вписываются в дизайн, а в будущем они сделают аллеи тенистыми.\n\nУлицы поселка очень ухожены, на аллеях много деревянных беседок и скамеек, высажены цветы. Если посмотреть фото с изображением улиц, то можно увидеть\nаккуратные тротуары, выложенные плиткой. Территория постоянно дополняется благоустроенными участками. Как показывают отзывы, уже есть несколько детских и\nспортивных площадок с современным оборудованием. После того, как поселок Кедры на шоссе Новая Рига будет полностью достроен, на его территории будет\nвысажено много хвойных деревьев, привезенных из Сибири.\n\nИнфраструктура поселка\n\nТем, кому нравится Москва из-за хорошо развитой инфраструктуры, обязательно понравится и поселок Кедры. Здесь есть детский центр, аптека, медпункт,\nсервисная служба. В пешей доступности располагается Павловская Слобода, в которой есть школы, детские сады, больницы, современные развлекательные центры.\nПреимуществ жизни в благоустроенном загородном поселке достаточно много, тем более что стоимость коттеджа ниже цены на квартиру в центре столицы.\n\nЕсли покупка загородного дома обходится слишком дорого, то можно не приобретать недвижимость, а воспользоваться услугами аренды. Просмотрев на сайте\nварианты коттеджей, можно выбрать адрес на карте, и снять жилье на время. Благодаря близости водоемов и благоустроенной зоне отдыха поселок пользуется\nпопулярностью для летнего отдыха. Поселение круглосуточно охраняется, на въезде располагается КПП, а по всей территории ― системы видеонаблюдения.	[]	1	\N	{}	17	1	1003	1008	1163	2003	5	\N	\N	\N	\N	{}	{}	1186	\N	\N	\N	\N	\N	\N	\N	2	\N	\N	0101000020E610000000000040B5DB4B40000000601F914240	20	20	450	450	1	0	1	1	132726800	2000000	1756852	132726800	2000000	1756852	500000	7534	6618	500000	7534	6618	1	{}	\N	\N	\N
1	Коттон-Вей	\N	{}	2016-02-15 05:07:08.916377+00	2016-04-04 16:24:27.318+00	settlement	{}	public	settlement_type	\N	Вы мечтаете о собственном загородном доме? Возможно Вас заинтересует коттеджный поселок «Коттон-Вей», расположенный в Одинцовском районе МО. Это место\nславится своей превосходной экологической обстановкой и именно здесь предлагается широкий ассортимент недвижимости, выставленной на продажу.\n\nМесторасположение\n\nПоселок «Коттон-Вэй» находится всего лишь в 24-х километрах от МКАД по направлению шоссе Рублево-Успенское. Рассмотрев карту, можно увидеть, что это\nдовольное удачное месторасположение. Тут присутствует удобная транспортная развязка, благодаря чему жители поселка могут без лишних трудностей добираться в\nстолицу.\n\nКроме того, транспортной доступности поселок славится своим уникальным географическим положением. Именно тут находится центр Николиной горы, окруженный\nмноговековыми лесами. В былые времена сосны из здешней местности использовались для строительства кораблей. Сегодня же они наполняют воздух хвойным\nароматом. Также невдалеке от поселка расположены крупные водохранилища – Рублевское и Истринское.\n\nНедвижимость, предлагаемая покупателям\n\nВ поселке на продажу выставлено 250 различных коттеджей, включающих в себя таунхаусы и полноценные частные домовладения. Вся недвижимость является\nчетырехэтажной с площадью от 600 до 800 квадратных метров. Стоимость предлагаемых объектов не завышается.\n\nВсе дома создавались по самым современным строительным технологиям. Застройщиками использовались дорогие и исключительно экологически чистые материалы. Это\nсделало жилье долговечным и безопасным.\n\nБольшая часть строений возведена в классическом стиле. Благодаря этому они идеально вписываются в здешние пейзажи.\n\nКаждый адрес в коттеджном поселке подключен к жизненно важным коммуникациям. Касается это водоснабжения, газификации, канализации, электрификации,\nтелефонной линии и скоростного интернета. Качество коммуникаций на самом высоком уровне. Поэтому здесь также комфортно, как и в городской квартире.\n\nБлагоустройство территории поселка\n\nВся территория поселка является облагороженной. Тут есть широкие улицы, подъезды ко всем участкам, тротуары и освещение в ночное время.\n\nОбщий вид поселка весьма красивый. Коммунальные службы всегда заботятся о чистоте. На территории есть много зеленых насаждений и цветников, а возле каждого\nдома присутствует зеленый газон.\n\nБлагодаря тому, что сразу территорией поселка начинается лес, жители всегда могут порадовать себя прогулками и пикниками. Как таково, возможность тихого\nспокойного отдыха в поселке привлекает многих людей. В виду этого жители мегаполиса часто снимают в аренду коттеджи в здешних местах.\n\nРазвитая инфраструктура\n\nНа многих сайтах сегодня можно прочесть подробную информацию о поселке «Коттон-Вей», изучить отзывы, рассмотреть фото и сравнить цены. В этой местности\nесть все для комфортного проживания. На территории поселка расположено несколько продуктовых и хозяйственных магазинов, в которых можно купить все\nнеобходимое. Также здесь есть различные спортивные площадки и салоны красоты.\n\nУчитывая то, что Рублевка является одним из самых развитых районом Подмосковья, жителям коттеджного поселка доступны многие объекты инфраструктуры,\nнаходящиеся поблизости. Это и образовательные учреждения, и поликлиники, и торгово-развлекательные центры. Для того чтобы хорошо провести время совсем\nнеобязательно выезжать в Москву. Клубы и рестораны в округе ничем не уступают столичным аналогам.\n\nИменно в КП «Коттон-Вей» можно относительно недорого приобрести элитный дом. Московская область славится живописными местами и благополучной экологической\nобстановкой. Коттеджный поселок располагается близко к мегаполису, однако в нем царит спокойствие и умиротворение. А это является залогом комфорта.	Коттеджный поселок «Коттон-Вей» уютно расположился в центре Николиной Горы на общей площади 100 гектар в 24 км от Москвы (МКАД). Адрес, по которому его\nможно найти: поселок Николина Гора, Одинцовский район, Московская область. Это поселение отличается хорошей транспортной доступностью, что видно на карте\nдорог Подмосковья. К нему добраться можно с двух сторон – по Рублево-Успенскому шоссе или Новорижскому.\n\nВ поселке построены 220 элитных кирпичных домовладения. В архитектурном плане все они выполнены по индивидуальным проектам в стиле русского классицизма. На\nфото приведены некоторые из них. Площадь приусадебных участков составляет от 30 до 45 соток, площадь домовладений • от 500 до 800 кв. метров. Стоимость\nдомов варьируется в широких пределах • от относительно недорого (цена $700 тыс.) до дорого ($22,5 млн.).\n\nЭто коттеджное поселение считается одним из наиболее известных на Рублевке. Многочисленные положительные отзывы жителей, гостей на различных сайтах\nсвидетельствуют о высоком уровне условий проживания.\n\nЭкология, ландшафт, благоустройство.\n\nВ экологическом отношении коттеджный комплекс «Коттон-Вэй» имеет ряд заметных преимуществ. Он расположился в лесистой местности в окружении массива из\nвековых сосен, реликтовых елей, произрастающих на Николиной Горе. При строительстве коттеджей учитывалось расположение деревьев с целью их сохранения.\nНеподалеку комплекса застройки протекает Москва-река. Все это вместе взятое формирует живописный ландшафт окружающей природы. Чистый воздух, которым легко\nдышится, тихая, спокойная, размеренная жизнь поселка • естественные факторы, благотворно влияющие на состояние здоровья жителей, гостей поселка.\n\nТерритория поселения вокруг таунхаусов благоустроена. Проведены значительные ландшафтные работы по озеленению. Проложены дороги и тротуары, вымощенные\nплиткой. На всех улицах установлено освещение. По условиям жизни поселок имеет неоспоримое преимущество в сравнении с городской благоустроенной квартирой -\nблизость к природе.\n\nИнфраструктура, коммуникации.\n\nКоттеджное поселение «Коттон-Вей» имеет собственную инфраструктуру. На его территории размещается комплексный центр досуга «Семейный клуб». Он предлагает\nжителям и гостям городка услуги кафе, ресторана, тренажерного зала, джакузи, бани, бассейна. В жилом комплексе построены современная игровая детская\nплощадка, корт, футбольное поле. Функционирует автомойка с кафе-баром на 2 этаже. Доступна также инфраструктура рядом расположенных населенных пунктов\n(пос. Николина Гора, КП «Жуковка», пансионат «Солнце»).\n\nВ поселке проведены все необходимые коммуникации. Подведен магистральный газопровод. К каждому строению подключен электрокабель. Снабжение водой и\nканализация централизованные. Вода подается из водозаборных узлов, стоки очищаются с помощью собственных очистных сооружений. Жителям предлагается\nвысокоскоростной Интернет, стационарная телефонная сеть (московские номера).\n\nБезопасность.\n\nНедвижимость поселка надежно охраняется. Внедрена пропускная система. Вход, въезд возможны только через КПП. Территория обнесена стационарным ограждением\n(каменный забор). Ведется периодическое патрулирование. В современной системе охраны предусмотрено дистанционное видеонаблюдение.\n\nПродажа, аренда\n\nДля желающих поселиться в коттеджном местечке «Коттон-Вей» есть возможность купить понравившийся особняк (предложения на вторичном рынке), а также снять\n(арендовать) домовладение на взаимовыгодных условиях.	[{"id": "ST1318-f480a442", "url": "https://s3-eu-west-1.amazonaws.com/jqcem-images/ST1318-f480a442", "isPublic": true}]	1	2	{}	24	1	1003	1012	1104	2001	100	\N	\N	\N	\N	{}	{}	1178	\N	\N	\N	\N	\N	\N	\N	2	\N	\N	0101000020E6100000000000E002DF4B4000000040B9854240	14	95	260	1573	18	0	18	5	46454380	700000	614898	796360800	12000000	10541110	600000	9041	7942	2500000	37671	33092	20	{}	\N	\N	\N
\.


--
-- Data for Name: sms_notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sms_notifications (id, state, reject_reason, text, phone_number, created_at, sent_at) FROM stdin;
\.


--
-- Data for Name: snapshot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snapshot (persistence_id, sequence_number, created, snapshot) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: staff_user_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff_user_documents (id, state, filename, aes_key, iv_bytes, comment, created_at, updated_at, uploader_id, user_id, kind_dictionary_kind, kind_dictionary_id) FROM stdin;
\.


--
-- Data for Name: staff_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff_users (id, email, state, password_hash, photo, first_name, last_name, work_phone_number, personal_phone_number, personal_email, middle_name, created_at, updated_at, started_work_at, finished_work_at, department_id, division_id, is_manager, role_id, d_ad_phone_numbers, d_notifications, member, experience_years, education, description, is_public) FROM stdin;
2	e.rodionov@sputnikproduction.com	active	$2a$10$p1Tlou04g2pMYISeIsDmZu/beh921MwgjSh0zsNXOoM3SUFfoaKcy	STF2-70314d78	Евгений	Родионов	79998211488	79998211488	e.rodionov@sputnikproduction.com	Викторович	2015-12-16 15:55:18.55+00	2018-12-04 12:10:13.747659+00	2014-07-14	\N	1	\N	f	24	{}	"property_search_order_new"=>"true", "property_search_order_done"=>"true", "property_search_order_approved"=>"true", "property_search_order_assigned"=>"true", "property_search_order_finished"=>"true", "property_search_order_rejected"=>"true", "property_search_order_returned"=>"true"	\N	3	\N	\N	f
1	e.rodionov1@sputnikproduction.com	active	$2a$10$p1Tlou04g2pMYISeIsDmZu/beh921MwgjSh0zsNXOoM3SUFfoaKcy	STF2-70314d78	Евгений	Родионов I	79998211488	79998211488	e.rodionov@sputnikproduction.com	Викторович	2015-12-16 15:55:18.55+00	2018-12-04 12:10:13.747659+00	2014-07-14	\N	1	\N	f	24	{}	"property_search_order_new"=>"true", "property_search_order_done"=>"true", "property_search_order_approved"=>"true", "property_search_order_assigned"=>"true", "property_search_order_finished"=>"true", "property_search_order_rejected"=>"true", "property_search_order_returned"=>"true"	\N	3	\N	\N	f
\.


--
-- Data for Name: sub_localities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sub_localities (id, name, kind_name, aliases, created_at, updated_at, place_type, property_categories, locality_id, country_id, region_id, district_id) FROM stdin;
\.


--
-- Data for Name: subways; Type: TABLE DATA; Schema: public; Owner: jq
--

COPY public.subways (id, name, kind_name, aliases, created_at, updated_at, place_type, property_categories, sub_locality_id) FROM stdin;
\.


--
-- Data for Name: task_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task_documents (id, state, filename, aes_key, iv_bytes, comment, created_at, updated_at, uploader_id, task_id, archiver_id, archived_at) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, state, result, ru_id, created_at, updated_at, d_goal, d_contact_id, d_property_id, deadline, d_archived_document_id, kind, d_deal_id, ru_department_id, ru_division_id, d_link_kind, d_client_lead_id, d_property_category, d_title, sd_to_approve, created_by_user_id, d_is_document_attached, weight, reported_by_user_id, pcd_status, pcd_duration, pcd_call_recording_url, pcd_reason) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, state, password_hash, photo, first_name, last_name, work_phone_number, personal_phone_number, personal_email, middle_name, created_at, updated_at) FROM stdin;
2	e.rodionov@sputnikproduction.com	active	$2a$10$p1Tlou04g2pMYISeIsDmZu/beh921MwgjSh0zsNXOoM3SUFfoaKcy	STF2-70314d78	Евгений	Родионов	79998211488	79998211488	e.rodionov@sputnikproduction.com	Викторович	2015-12-16 15:55:18.55+00	2018-12-04 12:10:13.747659+00
1	e.rodionov1@sputnikproduction.com	active	$2a$10$p1Tlou04g2pMYISeIsDmZu/beh921MwgjSh0zsNXOoM3SUFfoaKcy	STF2-70314d78	Евгений	Родионов I	79998211488	79998211488	e.rodionov@sputnikproduction.com	Викторович	2015-12-16 15:55:18.55+00	2018-12-04 12:10:13.747659+00
\.


--
-- Name: applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.applications_id_seq', 1, false);


--
-- Name: client_lead_sources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_lead_sources_id_seq', 1, false);


--
-- Name: client_leads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_leads_id_seq', 1, false);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_id_seq', 1, false);


--
-- Name: complexes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.complexes_id_seq', 1, false);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 1, false);


--
-- Name: csi_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.csi_answers_id_seq', 1, false);


--
-- Name: csi_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.csi_questions_id_seq', 1, false);


--
-- Name: daily_duty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.daily_duty_id_seq', 1, false);


--
-- Name: deals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deals_id_seq', 1, false);


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 1, false);


--
-- Name: dictionary_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dictionary_items_id_seq', 10000, false);


--
-- Name: divisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.divisions_id_seq', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: export_error_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.export_error_logs_id_seq', 1, false);


--
-- Name: export_locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jq
--

SELECT pg_catalog.setval('public.export_locations_id_seq', 1, false);


--
-- Name: export_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.export_packages_id_seq', 1, false);


--
-- Name: journal_ordering_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.journal_ordering_seq', 1, false);


--
-- Name: newsletters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jq
--

SELECT pg_catalog.setval('public.newsletters_id_seq', 1, false);


--
-- Name: places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.places_id_seq', 3, true);


--
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.properties_id_seq', 1, false);


--
-- Name: property_badges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jq
--

SELECT pg_catalog.setval('public.property_badges_id_seq', 1, false);


--
-- Name: property_banners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_banners_id_seq', 1, false);


--
-- Name: property_photos_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_photos_orders_id_seq', 1, false);


--
-- Name: property_removal_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_removal_orders_id_seq', 1, false);


--
-- Name: property_search_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_search_orders_id_seq', 1, false);


--
-- Name: residential_complexes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.residential_complexes_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: selections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jq
--

SELECT pg_catalog.setval('public.selections_id_seq', 1, false);


--
-- Name: sms_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sms_notifications_id_seq', 1, false);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: regions administrative_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT administrative_areas_pkey PRIMARY KEY (id);


--
-- Name: applications applications_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_name_key UNIQUE (name);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: applications applications_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_token_key UNIQUE (token);


--
-- Name: cian_subways cian_subways_pkey; Type: CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.cian_subways
    ADD CONSTRAINT cian_subways_pkey PRIMARY KEY (id);


--
-- Name: city_properties city_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties
    ADD CONSTRAINT city_properties_pkey PRIMARY KEY (id);


--
-- Name: client_lead_sources client_lead_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_lead_sources
    ADD CONSTRAINT client_lead_sources_pkey PRIMARY KEY (id);


--
-- Name: client_lead_sources client_lead_sources_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_lead_sources
    ADD CONSTRAINT client_lead_sources_slug_key UNIQUE (slug);


--
-- Name: client_leads client_leads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: complexes complexes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complexes
    ADD CONSTRAINT complexes_pkey PRIMARY KEY (id);


--
-- Name: contact_documents contact_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_documents
    ADD CONSTRAINT contact_documents_pkey PRIMARY KEY (id);


--
-- Name: contact_links contact_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_links
    ADD CONSTRAINT contact_links_pkey PRIMARY KEY (contact_id, linked_contact_id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: country_properties country_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties
    ADD CONSTRAINT country_properties_pkey PRIMARY KEY (id);


--
-- Name: csi_answers csi_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.csi_answers
    ADD CONSTRAINT csi_answers_pkey PRIMARY KEY (id);


--
-- Name: csi_questions csi_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.csi_questions
    ADD CONSTRAINT csi_questions_pkey PRIMARY KEY (id);


--
-- Name: daily_duty daily_duty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_duty
    ADD CONSTRAINT daily_duty_pkey PRIMARY KEY (id);


--
-- Name: deals deals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_pkey PRIMARY KEY (id);


--
-- Name: departments departments_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_name_key UNIQUE (name);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: dictionary_items dictionary_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionary_items
    ADD CONSTRAINT dictionary_items_pkey PRIMARY KEY (id);


--
-- Name: districts districts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.districts
    ADD CONSTRAINT districts_pkey PRIMARY KEY (id);


--
-- Name: divisions divisions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.divisions
    ADD CONSTRAINT divisions_name_key UNIQUE (name);


--
-- Name: divisions divisions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.divisions
    ADD CONSTRAINT divisions_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: export_locations export_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.export_locations
    ADD CONSTRAINT export_locations_pkey PRIMARY KEY (id);


--
-- Name: export_packages export_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.export_packages
    ADD CONSTRAINT export_packages_pkey PRIMARY KEY (id);


--
-- Name: encrypted_documents file_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.encrypted_documents
    ADD CONSTRAINT file_documents_pkey PRIMARY KEY (id);


--
-- Name: file_documents file_documents_pkey1; Type: CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.file_documents
    ADD CONSTRAINT file_documents_pkey1 PRIMARY KEY (id);


--
-- Name: journal journal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journal
    ADD CONSTRAINT journal_pkey PRIMARY KEY (ordering, persistence_id, sequence_number);


--
-- Name: localities localities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities
    ADD CONSTRAINT localities_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: newsletters newsletters_pkey; Type: CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.newsletters
    ADD CONSTRAINT newsletters_pkey PRIMARY KEY (id);


--
-- Name: object_notifications object_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.object_notifications
    ADD CONSTRAINT object_notifications_pkey PRIMARY KEY (object_id, object_klass, user_id);


--
-- Name: places places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT places_pkey PRIMARY KEY (id);


--
-- Name: properties properties_client_lead_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_client_lead_id_key UNIQUE (client_lead_id);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: property_badges property_badges_pkey; Type: CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.property_badges
    ADD CONSTRAINT property_badges_pkey PRIMARY KEY (id);


--
-- Name: property_banners property_banners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_banners
    ADD CONSTRAINT property_banners_pkey PRIMARY KEY (id);


--
-- Name: property_contact_links property_contact_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_contact_links
    ADD CONSTRAINT property_contact_links_pkey PRIMARY KEY (property_id, linked_contact_id);


--
-- Name: property_offer_price_changes property_offer_price_changes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_offer_price_changes
    ADD CONSTRAINT property_offer_price_changes_pkey PRIMARY KEY (property_id, change_at, kind);


--
-- Name: images_orders property_photos_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images_orders
    ADD CONSTRAINT property_photos_orders_pkey PRIMARY KEY (id);


--
-- Name: property_removal_orders property_removal_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_removal_orders
    ADD CONSTRAINT property_removal_orders_pkey PRIMARY KEY (id);


--
-- Name: property_search_orders property_search_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_search_orders
    ADD CONSTRAINT property_search_orders_pkey PRIMARY KEY (id);


--
-- Name: complex_building_documents residential_complex_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_building_documents
    ADD CONSTRAINT residential_complex_documents_pkey PRIMARY KEY (id);


--
-- Name: complex_buildings residential_complexes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_pkey PRIMARY KEY (id);


--
-- Name: rights rights_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rights
    ADD CONSTRAINT rights_name_key UNIQUE (name);


--
-- Name: rights rights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rights
    ADD CONSTRAINT rights_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (id);


--
-- Name: selections selections_name_key; Type: CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.selections
    ADD CONSTRAINT selections_name_key UNIQUE (name);


--
-- Name: selections selections_pkey; Type: CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.selections
    ADD CONSTRAINT selections_pkey PRIMARY KEY (id);


--
-- Name: settlement_contact_links settlement_contact_links_pkey; Type: CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.settlement_contact_links
    ADD CONSTRAINT settlement_contact_links_pkey PRIMARY KEY (settlement_id, linked_contact_id);


--
-- Name: settlements settlements_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_pkey1 PRIMARY KEY (id);


--
-- Name: sms_notifications sms_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sms_notifications
    ADD CONSTRAINT sms_notifications_pkey PRIMARY KEY (id);


--
-- Name: snapshot snapshot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot
    ADD CONSTRAINT snapshot_pkey PRIMARY KEY (persistence_id, sequence_number);


--
-- Name: staff_user_documents staff_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_user_documents
    ADD CONSTRAINT staff_documents_pkey PRIMARY KEY (id);


--
-- Name: staff_users staff_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_users
    ADD CONSTRAINT staff_users_pkey PRIMARY KEY (id);


--
-- Name: sub_localities sub_localities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities
    ADD CONSTRAINT sub_localities_pkey PRIMARY KEY (id);


--
-- Name: subways subways_pkey; Type: CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.subways
    ADD CONSTRAINT subways_pkey PRIMARY KEY (id);


--
-- Name: task_documents task_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_documents
    ADD CONSTRAINT task_documents_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: dictionary_items uc_dictionary_items; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionary_items
    ADD CONSTRAINT uc_dictionary_items UNIQUE (id, kind);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: client_leads_cd_phone_number_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX client_leads_cd_phone_number_idx ON public.client_leads USING btree (cd_phone_number);


--
-- Name: client_leads_rd_property_ids_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX client_leads_rd_property_ids_idx ON public.client_leads USING gin (rd_property_ids);


--
-- Name: client_leads_ru_department_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX client_leads_ru_department_id_idx ON public.client_leads USING btree (ru_department_id);


--
-- Name: client_leads_ru_division_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX client_leads_ru_division_id_idx ON public.client_leads USING btree (ru_division_id);


--
-- Name: client_leads_ru_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX client_leads_ru_id_idx ON public.client_leads USING btree (ru_id);


--
-- Name: client_leads_ru_id_idx1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX client_leads_ru_id_idx1 ON public.client_leads USING btree (ru_id);


--
-- Name: comments_object_id_object_klass_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX comments_object_id_object_klass_idx ON public.comments USING btree (object_id, object_klass);


--
-- Name: complex_buildings_complex_id_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX complex_buildings_complex_id_name_idx ON public.complex_buildings USING btree (complex_id, name);


--
-- Name: complexes_l_locality_id_l_sub_locality_id_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX complexes_l_locality_id_l_sub_locality_id_name_idx ON public.complexes USING btree (l_locality_id, l_sub_locality_id, name);


--
-- Name: contacts_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_email_idx ON public.contacts USING btree (email);


--
-- Name: contacts_phone_number_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_phone_number_idx ON public.contacts USING btree (phone_number);


--
-- Name: contacts_ru_department_ids_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_ru_department_ids_idx ON public.contacts USING gin (ru_department_ids);


--
-- Name: contacts_ru_department_ids_idx1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_ru_department_ids_idx1 ON public.contacts USING gin (ru_department_ids);


--
-- Name: contacts_ru_division_ids_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_ru_division_ids_idx ON public.contacts USING gin (ru_division_ids);


--
-- Name: contacts_ru_division_ids_idx1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_ru_division_ids_idx1 ON public.contacts USING gin (ru_division_ids);


--
-- Name: contacts_ru_ids_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_ru_ids_idx ON public.contacts USING gin (ru_ids);


--
-- Name: contacts_ru_ids_idx1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_ru_ids_idx1 ON public.contacts USING gin (ru_ids);


--
-- Name: contacts_state_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_state_idx ON public.contacts USING btree (state);


--
-- Name: countries_lower_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX countries_lower_idx ON public.countries USING btree (lower((name)::text));


--
-- Name: country_properties_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX country_properties_id_idx ON public.country_properties USING gist (((id)::text) public.gist_trgm_ops);


--
-- Name: csi_answers_object_id_object_klass_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX csi_answers_object_id_object_klass_idx ON public.csi_answers USING btree (object_id, object_klass);


--
-- Name: csi_answers_question_id_object_id_object_klass_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX csi_answers_question_id_object_id_object_klass_idx ON public.csi_answers USING btree (question_id, object_id, object_klass);


--
-- Name: deals_cd_phone_number_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX deals_cd_phone_number_idx ON public.deals USING btree (cd_phone_number);


--
-- Name: deals_ru_department_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX deals_ru_department_id_idx ON public.deals USING btree (ru_department_id);


--
-- Name: deals_ru_division_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX deals_ru_division_id_idx ON public.deals USING btree (ru_division_id);


--
-- Name: deals_ru_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX deals_ru_id_idx ON public.deals USING btree (ru_id);


--
-- Name: deals_ru_id_idx1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX deals_ru_id_idx1 ON public.deals USING btree (ru_id);


--
-- Name: departments_manager_staff_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX departments_manager_staff_user_id_idx ON public.departments USING btree (manager_staff_user_id);


--
-- Name: districts_region_id_lower_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX districts_region_id_lower_idx ON public.districts USING btree (region_id, lower((name)::text));


--
-- Name: divisions_manager_staff_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX divisions_manager_staff_user_id_idx ON public.divisions USING btree (manager_staff_user_id);


--
-- Name: events_object_id_object_klass_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_object_id_object_klass_idx ON public.events USING btree (object_id, object_klass);


--
-- Name: export_error_logs_package_id_params_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX export_error_logs_package_id_params_created_at_idx ON public.export_error_logs USING btree (package_id, params, created_at);


--
-- Name: idx_client_leads_call_session_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_client_leads_call_session_id ON public.client_leads USING btree (call_session_id);


--
-- Name: idx_contacts_phone_number; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_contacts_phone_number ON public.contacts USING btree (lower((phone_number)::text));


--
-- Name: idx_dictionary_items_kind_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_dictionary_items_kind_title ON public.dictionary_items USING btree (parent_id, kind, lower((title)::text));


--
-- Name: idx_rights_resource_action_scope; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_rights_resource_action_scope ON public.rights USING btree (resource, action);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_users_email ON public.users USING btree (lower((email)::text));


--
-- Name: properties_ru_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX properties_ru_id_idx ON public.properties USING btree (ru_id);


--
-- Name: property_offer_price_changes_property_id_kind_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX property_offer_price_changes_property_id_kind_idx ON public.property_offer_price_changes USING btree (property_id, kind);


--
-- Name: property_search_orders_ru_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX property_search_orders_ru_id_idx ON public.property_search_orders USING btree (ru_id);


--
-- Name: routes_administrative_area_id_lower_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX routes_administrative_area_id_lower_idx ON public.routes USING btree (region_id, lower((name)::text));


--
-- Name: settlements_l_locality_id_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX settlements_l_locality_id_name_idx ON public.settlements USING btree (l_locality_id, name);


--
-- Name: settlements_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX settlements_name_idx ON public.settlements USING gist (name public.gist_trgm_ops);


--
-- Name: sub_localities_locality_id_lower_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX sub_localities_locality_id_lower_idx ON public.sub_localities USING btree (locality_id, lower((name)::text));


--
-- Name: subways_sub_locality_id_lower_idx; Type: INDEX; Schema: public; Owner: jq
--

CREATE UNIQUE INDEX subways_sub_locality_id_lower_idx ON public.subways USING btree (sub_locality_id, lower((name)::text));


--
-- Name: tasks_ru_department_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tasks_ru_department_id_idx ON public.tasks USING btree (ru_department_id);


--
-- Name: tasks_ru_division_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tasks_ru_division_id_idx ON public.tasks USING btree (ru_division_id);


--
-- Name: tasks_ru_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tasks_ru_id_idx ON public.tasks USING btree (ru_id);


--
-- Name: tasks_ru_id_idx1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tasks_ru_id_idx1 ON public.tasks USING btree (ru_id);


--
-- Name: client_leads_view _RETURN; Type: RULE; Schema: public; Owner: postgres
--

CREATE OR REPLACE VIEW public.client_leads_view AS
 SELECT client_leads.id,
    client_leads.call_session_id,
    client_leads.cbu_id,
    client_leads.cbu_department_id,
    client_leads.cbu_division_id,
    client_leads.cd_email,
    client_leads.cd_first_name,
    client_leads.cd_kind_dictionary_id,
    client_leads.cd_last_name,
    client_leads.cd_phone_number,
    client_leads.client_lead_source_id,
    client_leads.contact_id,
    client_leads.created_at,
    client_leads.deal_id,
    client_leads.is_repeated,
    client_leads.kind,
    client_leads.note,
    client_leads.pcd_call_recording_url,
    client_leads.pcd_duration,
    client_leads.pcd_reason,
    client_leads.pcd_status,
    client_leads.property_id,
    client_leads.request_kind,
    client_leads.ru_id,
    client_leads.ru_department_id,
    client_leads.ru_division_id,
    client_leads.sd_reason_id,
    client_leads.sd_to_approve,
    client_leads.search_query,
    client_leads.state,
    client_leads.ua_client_id,
    client_leads.updated_at,
    client_leads.updated_by_user_id,
    replace(replace((( SELECT array_agg(_.object_id) AS array_agg
           FROM ( SELECT regexp_matches(((client_leads.request_details -> 'objects'::text))::text, '\d+'::text, 'ig'::text) AS object_id) _))::text, '{'::text, ''::text), '}'::text, ''::text) AS rd_objects,
    (client_leads.request_details ->> 'offerKind'::text) AS rd_offer_kind,
    (client_leads.request_details ->> 'category'::text) AS rd_category,
    (client_leads.request_details ->> 'kind'::text) AS rd_kind,
    ((client_leads.request_details -> 'price'::text) -> 'from'::text) AS rd_price_from,
    ((client_leads.request_details -> 'price'::text) -> 'to'::text) AS rd_price_to,
    (client_leads.request_details ->> 'currency'::text) AS rd_currency,
    (client_leads.request_details ->> 'renovate'::text) AS rd_renovate,
    (client_leads.request_details ->> 'condition'::text) AS rd_condition,
    (client_leads.request_details ->> 'furniture'::text) AS rd_furniture,
    (((client_leads.request_details -> 'countryProperty'::text) -> 'area'::text) -> 'from'::text) AS rd_country_area_from,
    (((client_leads.request_details -> 'countryProperty'::text) -> 'area'::text) -> 'to'::text) AS rd_country_area_to,
    (((client_leads.request_details -> 'countryProperty'::text) -> 'bedrooms'::text) -> 'from'::text) AS rd_country_bedrooms_from,
    (((client_leads.request_details -> 'countryProperty'::text) -> 'bedrooms'::text) -> 'to'::text) AS rd_country_bedrooms_to,
    (((client_leads.request_details -> 'countryProperty'::text) -> 'landArea'::text) -> 'from'::text) AS rd_country_land_area_from,
    (((client_leads.request_details -> 'countryProperty'::text) -> 'landArea'::text) -> 'to'::text) AS rd_country_land_area_to,
    (((client_leads.request_details -> 'countryProperty'::text) -> 'location'::text) -> 'routeId'::text) AS rd_country_location_route_id,
    (((client_leads.request_details -> 'countryProperty'::text) -> 'location'::text) -> 'localityId'::text) AS rd_country_location_locality_id,
    (((client_leads.request_details -> 'countryProperty'::text) -> 'location'::text) -> 'settlementId'::text) AS rd_country_location_settlement_id,
    ((((client_leads.request_details -> 'countryProperty'::text) -> 'location'::text) -> 'mkadDistance'::text) -> 'from'::text) AS rd_country_location_mkad_distance_from,
    ((((client_leads.request_details -> 'countryProperty'::text) -> 'location'::text) -> 'mkadDistance'::text) -> 'to'::text) AS rd_country_location_mkad_distance_to,
    ((client_leads.request_details -> 'cityProperty'::text) -> 'complexId'::text) AS rd_city_,
    (((client_leads.request_details -> 'cityProperty'::text) -> 'area'::text) -> 'from'::text) AS rd_city_area_from,
    (((client_leads.request_details -> 'cityProperty'::text) -> 'area'::text) -> 'to'::text) AS rd_city_area_to,
    (((client_leads.request_details -> 'cityProperty'::text) -> 'livingArea'::text) -> 'from'::text) AS rd_city_living_area_from,
    (((client_leads.request_details -> 'cityProperty'::text) -> 'livingArea'::text) -> 'to'::text) AS rd_city_living_area_to,
    (((client_leads.request_details -> 'cityProperty'::text) -> 'rooms'::text) -> 'from'::text) AS rd_city_rooms_from,
    (((client_leads.request_details -> 'cityProperty'::text) -> 'rooms'::text) -> 'to'::text) AS rd_city_rooms_to,
    (((client_leads.request_details -> 'cityProperty'::text) -> 'location'::text) -> 'subLocalityId'::text) AS rd_city_sublocality_id,
    (((client_leads.request_details -> 'cityProperty'::text) -> 'location'::text) -> 'street'::text) AS rd_city_street,
    ((client_leads.request_details -> 'rentOffer'::text) -> 'price'::text) AS rd_rent_offer_price,
    ((client_leads.request_details -> 'rentOffer'::text) -> 'currency'::text) AS rd_rent_offer_currency,
    ((client_leads.request_details -> 'rentOffer'::text) -> 'agentFee'::text) AS rd_rent_offer_agent_fee,
    (((client_leads.request_details -> 'rentOffer'::text) -> 'agentFixedPrice'::text) ->> 'currency'::text) AS rd_rent_offer_agent_fixed_price_currency,
    (((client_leads.request_details -> 'rentOffer'::text) -> 'agentFixedPrice'::text) -> 'price'::text) AS rd_rent_offer_agent_fixed_price_price,
    ((client_leads.request_details -> 'rentOffer'::text) -> 'deposit'::text) AS rd_rent_offer_deposit,
    ((client_leads.request_details -> 'rentOffer'::text) -> 'period'::text) AS rd_rent_offer_period,
    ((client_leads.request_details -> 'rentOffer'::text) -> 'isAllowedPets'::text) AS rd_rent_offer_is_allowed_pets,
    ((client_leads.request_details -> 'rentOffer'::text) -> 'isAllowedChildren'::text) AS rd_rent_offer_is_allowed_children,
    ((client_leads.request_details -> 'saleOffer'::text) -> 'price'::text) AS rd_sale_offer_price,
    ((client_leads.request_details -> 'saleOffer'::text) ->> 'currency'::text) AS rd_sale_offer_currency,
    ((client_leads.request_details -> 'saleOffer'::text) -> 'agentFee'::text) AS rd_sale_offer_agent_fee,
    (((client_leads.request_details -> 'saleOffer'::text) -> 'agentFixedPrice'::text) ->> 'currency'::text) AS rd_sale_offer_agent_fixed_price_currency,
    (((client_leads.request_details -> 'saleOffer'::text) -> 'agentFixedPrice'::text) -> 'price'::text) AS rd_sale_offer_agent_fixed_price_price,
    ((client_leads.request_details -> 'saleOffer'::text) ->> 'kind'::text) AS rd_sale_offer_kind,
    ((client_leads.request_details -> 'saleOffer'::text) -> 'isBargain'::text) AS rd_sale_offer_is_bargain,
    ((client_leads.request_details -> 'saleOffer'::text) -> 'isMortgage'::text) AS rd_sale_offer_is_mortgage,
    ((client_leads.request_details -> 'saleOffer'::text) -> 'isInstallment'::text) AS rd_sale_offer_is_installment,
    ((client_leads.request_details -> 'saleOffer'::text) -> 'isResale'::text) AS rd_sale_offer_is_resale,
    (client_leads.utms ->> 'campaign'::text) AS utm_campaign,
    (client_leads.utms ->> 'source'::text) AS utm_source,
    (client_leads.utms ->> 'term'::text) AS utm_term,
    (client_leads.utms ->> 'content'::text) AS utm_content,
    (client_leads.utms ->> 'medium'::text) AS utm_medium
   FROM public.client_leads
  GROUP BY client_leads.id;


--
-- Name: country_properties_view _RETURN; Type: RULE; Schema: public; Owner: postgres
--

CREATE OR REPLACE VIEW public.country_properties_view AS
 SELECT cp.id,
    cp.ru_id,
    cp.state,
    cp.kind,
    cp.created_at,
    cp.updated_at,
    cp.created_by_user_id,
    cp.updated_by_user_id,
    cp.client_lead_id,
    cp.category,
    cp.ro_price,
    cp.ro_currency,
    cp.ro_agent_fee,
    cp.ro_agent_fixed_price,
    cp.ro_agent_fixed_price_currency,
    cp.ro_deposit,
    cp.ro_period,
    cp.ro_is_allowed_pets,
    cp.ro_is_allowed_children,
    cp.so_price,
    cp.so_currency,
    cp.so_agent_fee,
    cp.so_agent_fixed_price,
    cp.so_agent_fixed_price_currency,
    cp.so_kind,
    cp.so_is_bargain,
    cp.so_is_mortgage,
    cp.so_is_installment,
    cp.note,
    cp.ru_department_id,
    cp.ru_division_id,
    cp.removal_order_id,
    cp.sd_reason,
    cp.so_is_resale,
    cp.external_id,
    cp.l_cadastral_number,
    cp.badge_id,
    cp.so_price_delta,
    cp.ro_price_delta,
    cp.ad_security_house_area,
    cp.ad_guest_house_area,
    cp.ad_staff_house_area,
    cp.ad_spa_area,
    cp.ad_pool_width,
    cp.ad_pool_height,
    cp.ad_parking_area,
    cp.ad_garage_area,
    cp.c_power_supply,
    cp.c_water_supply,
    cp.c_gas_supply,
    cp.c_sewerage_supply,
    cp.ld_landscaping,
    cp.ld_area,
    cp.l_street,
    cp.l_house,
    cp.s_bedrooms,
    cp.s_area,
    cp.s_wall_material,
    cp.s_roof_material,
    cp.s_built_year,
    cp.s_floors,
    cp.s_loggias,
    cp.s_balconies,
    cp.s_elevators,
    cp.s_ceiling_height,
    cp.s_with_conditioning,
    cp.s_with_ventilation,
    cp.s_renovate,
    cp.s_condition,
    cp.s_furniture,
    cp.l_settlement_id,
    cp.l_country_id,
    cp.l_region_id,
    cp.l_district_id,
    cp.l_locality_id,
    cp.ad_bathhouse_area,
    cp.l_route_id,
    cp.l_latitude,
    cp.l_longitude,
    cp.s_rooms,
    cp.s_wcs,
    (ARRAY['internet'::public.property_equipment] @> cp.equipment) AS equipment_internet,
    (ARRAY['phone'::public.property_equipment] @> cp.equipment) AS equipment_phone,
    (ARRAY['tv'::public.property_equipment] @> cp.equipment) AS equipment_tv,
    (ARRAY['security_signaling'::public.property_equipment] @> cp.equipment) AS equipment_security_signaling,
    (ARRAY['cable_tv'::public.property_equipment] @> cp.equipment) AS equipment_cable_tv,
    (ARRAY['washmachine'::public.property_equipment] @> cp.equipment) AS equipment_washmachine,
    (ARRAY['intercom'::public.property_equipment] @> cp.equipment) AS equipment_intercom,
    (ARRAY['fridge'::public.property_equipment] @> cp.equipment) AS equipment_fridge,
    (ARRAY['dishwasher'::public.property_equipment] @> cp.equipment) AS equipment_dishwasher,
    (ARRAY['appliances'::public.property_equipment] @> cp.equipment) AS equipment_appliances,
    replace(replace((cp.ld_landscape_kind)::text, '{'::text, ''::text), '}'::text, ''::text) AS ld_landscape_kind,
    ((cp.s_layouts OPERATOR(public.->) 'wine_room'::text))::integer AS s_layouts_wine_rooms,
    ((cp.s_layouts OPERATOR(public.->) 'dressing_room'::text))::integer AS s_layouts_dressing_rooms,
    ((cp.s_layouts OPERATOR(public.->) 'living_room'::text))::integer AS s_layouts_living_rooms,
    ((cp.s_layouts OPERATOR(public.->) 'childrens_room'::text))::integer AS s_layouts_childrens_rooms,
    ((cp.s_layouts OPERATOR(public.->) 'movie_theater'::text))::integer AS s_layouts_movie_theaters,
    ((cp.s_layouts OPERATOR(public.->) 'winter_garden'::text))::integer AS s_layouts_winter_gardens,
    ((cp.s_layouts OPERATOR(public.->) 'game_room'::text))::integer AS s_layouts_gamerooms,
    ((cp.s_layouts OPERATOR(public.->) 'office'::text))::integer AS s_layouts_offices,
    ((cp.s_layouts OPERATOR(public.->) 'storage'::text))::integer AS s_layouts_storages,
    ((cp.s_layouts OPERATOR(public.->) 'kitchen'::text))::integer AS s_layouts_kitchens,
    ((cp.s_layouts OPERATOR(public.->) 'staff_room'::text))::integer AS s_layouts_staff_rooms,
    ((cp.s_layouts OPERATOR(public.->) 'working_kitchen'::text))::integer AS s_layouts_working_kitchens,
    ((cp.s_layouts OPERATOR(public.->) 'spa_zone'::text))::integer AS s_layouts_spa_zones,
    ((cp.s_layouts OPERATOR(public.->) 'dining_room'::text))::integer AS s_layouts_dining_rooms,
    ((cp.s_layouts OPERATOR(public.->) 'technical_room'::text))::integer AS s_layouts_technical_rooms,
    ((cp.s_layouts OPERATOR(public.->) 'gym'::text))::integer AS s_layouts_gyms,
    ((cp.s_layouts OPERATOR(public.->) 'utility_room'::text))::integer AS s_layouts_utility_rooms,
    ((cp.s_layouts OPERATOR(public.->) 'loft'::text))::integer AS s_layouts_lofts,
    max(ol.linked_contact_id) AS owner_contact_id,
    max(rl.linked_contact_id) AS representative_contact_id,
    replace(replace((( SELECT array_agg((('https://images.jqestate.ru/'::text || x.id) || '-jqestate-1024'::text)) AS array_agg
           FROM jsonb_to_recordset(cp.images) x(id text)))::text, '{'::text, ''::text), '}'::text, ''::text) AS images,
    replace(replace((( SELECT array_agg((('https://images.jqestate.ru/'::text || x.id) || '-jqestate-1024'::text)) AS array_agg
           FROM jsonb_to_recordset(cp.layout_images) x(id text)))::text, '{'::text, ''::text), '}'::text, ''::text) AS layout_images
   FROM ((public.country_properties cp
     LEFT JOIN public.property_contact_links ol ON (((ol.property_id = cp.id) AND (ol.kind_dictionary_id = 41))))
     LEFT JOIN public.property_contact_links rl ON (((rl.property_id = cp.id) AND (rl.kind_dictionary_id = 42))))
  GROUP BY cp.id;


--
-- Name: regions administrative_areas_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT administrative_areas_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: applications applications_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: applications applications_responsible_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_responsible_user_id_fkey FOREIGN KEY (responsible_user_id) REFERENCES public.staff_users(id);


--
-- Name: applications applications_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: applications applications_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: cian_subways cian_subways_subway_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.cian_subways
    ADD CONSTRAINT cian_subways_subway_id_fkey FOREIGN KEY (subway_id) REFERENCES public.subways(id);


--
-- Name: city_properties city_properties_l_administrative_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties
    ADD CONSTRAINT city_properties_l_administrative_area_id_fkey FOREIGN KEY (l_region_id) REFERENCES public.regions(id);


--
-- Name: city_properties city_properties_l_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties
    ADD CONSTRAINT city_properties_l_country_id_fkey FOREIGN KEY (l_country_id) REFERENCES public.countries(id);


--
-- Name: city_properties city_properties_l_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties
    ADD CONSTRAINT city_properties_l_district_id_fkey FOREIGN KEY (l_district_id) REFERENCES public.districts(id);


--
-- Name: city_properties city_properties_l_locality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties
    ADD CONSTRAINT city_properties_l_locality_id_fkey FOREIGN KEY (l_locality_id) REFERENCES public.localities(id);


--
-- Name: city_properties city_properties_l_sub_locality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties
    ADD CONSTRAINT city_properties_l_sub_locality_id_fkey FOREIGN KEY (l_sub_locality_id) REFERENCES public.sub_localities(id);


--
-- Name: city_properties city_properties_residential_complex_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_properties
    ADD CONSTRAINT city_properties_residential_complex_id_fkey FOREIGN KEY (complex_building_id) REFERENCES public.complex_buildings(id);


--
-- Name: client_lead_sources client_lead_sources_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_lead_sources
    ADD CONSTRAINT client_lead_sources_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: client_lead_sources client_lead_sources_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_lead_sources
    ADD CONSTRAINT client_lead_sources_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: client_leads client_leads_cbu_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_cbu_department_id_fkey FOREIGN KEY (cbu_department_id) REFERENCES public.departments(id);


--
-- Name: client_leads client_leads_cbu_division_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_cbu_division_id_fkey FOREIGN KEY (cbu_division_id) REFERENCES public.divisions(id);


--
-- Name: client_leads client_leads_client_lead_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_client_lead_source_id_fkey FOREIGN KEY (client_lead_source_id) REFERENCES public.client_lead_sources(id);


--
-- Name: client_leads client_leads_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(id);


--
-- Name: client_leads client_leads_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_deal_id_fkey FOREIGN KEY (deal_id) REFERENCES public.deals(id);


--
-- Name: client_leads client_leads_kind_dictionary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_kind_dictionary_id_fkey FOREIGN KEY (cd_kind_dictionary_id, cd_kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: client_leads client_leads_property_search_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_property_search_order_id_fkey FOREIGN KEY (property_search_order_id) REFERENCES public.property_search_orders(id);


--
-- Name: client_leads client_leads_responsible_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_responsible_user_id_fkey FOREIGN KEY (cbu_id) REFERENCES public.staff_users(id);


--
-- Name: client_leads client_leads_responsible_user_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_responsible_user_id_fkey1 FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: client_leads client_leads_ru_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_ru_department_id_fkey FOREIGN KEY (ru_department_id) REFERENCES public.departments(id);


--
-- Name: client_leads client_leads_ru_division_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_ru_division_id_fkey FOREIGN KEY (ru_division_id) REFERENCES public.divisions(id);


--
-- Name: client_leads client_leads_sd_reason_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_sd_reason_id_fkey FOREIGN KEY (sd_reason_id) REFERENCES public.dictionary_items(id);


--
-- Name: client_leads client_leads_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_leads
    ADD CONSTRAINT client_leads_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: comments comments_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.comments(id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.staff_users(id);


--
-- Name: companies companies_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: companies companies_responsible_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_responsible_user_id_fkey FOREIGN KEY (responsible_user_id) REFERENCES public.staff_users(id);


--
-- Name: companies companies_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: complex_buildings complex_buildings_complex_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT complex_buildings_complex_id_fkey FOREIGN KEY (complex_id) REFERENCES public.complexes(id);


--
-- Name: complexes complexes_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complexes
    ADD CONSTRAINT complexes_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: complexes complexes_ru_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complexes
    ADD CONSTRAINT complexes_ru_id_fkey FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: complexes complexes_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complexes
    ADD CONSTRAINT complexes_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: contact_documents contact_documents_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_documents
    ADD CONSTRAINT contact_documents_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(id);


--
-- Name: contact_documents contact_documents_dictionary_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_documents
    ADD CONSTRAINT contact_documents_dictionary_fkey FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: contact_links contact_links_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_links
    ADD CONSTRAINT contact_links_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(id) ON DELETE CASCADE;


--
-- Name: contact_links contact_links_document_kind_dictionary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_links
    ADD CONSTRAINT contact_links_document_kind_dictionary_id_fkey FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: contact_links contact_links_kind_dictionary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_links
    ADD CONSTRAINT contact_links_kind_dictionary_id_fkey FOREIGN KEY (relationship_to_kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: contact_links contact_links_linked_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_links
    ADD CONSTRAINT contact_links_linked_contact_id_fkey FOREIGN KEY (linked_contact_id) REFERENCES public.contacts(id) ON DELETE CASCADE;


--
-- Name: contacts contacts_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);


--
-- Name: country_properties country_properties_l_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties
    ADD CONSTRAINT country_properties_l_country_id_fkey FOREIGN KEY (l_country_id) REFERENCES public.countries(id);


--
-- Name: country_properties country_properties_l_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties
    ADD CONSTRAINT country_properties_l_district_id_fkey FOREIGN KEY (l_district_id) REFERENCES public.districts(id);


--
-- Name: country_properties country_properties_l_locality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties
    ADD CONSTRAINT country_properties_l_locality_id_fkey FOREIGN KEY (l_locality_id) REFERENCES public.localities(id);


--
-- Name: country_properties country_properties_l_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties
    ADD CONSTRAINT country_properties_l_region_id_fkey FOREIGN KEY (l_region_id) REFERENCES public.regions(id);


--
-- Name: country_properties country_properties_l_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties
    ADD CONSTRAINT country_properties_l_route_id_fkey FOREIGN KEY (l_route_id) REFERENCES public.routes(id);


--
-- Name: country_properties country_properties_l_settlement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_properties
    ADD CONSTRAINT country_properties_l_settlement_id_fkey FOREIGN KEY (l_settlement_id) REFERENCES public.settlements(id);


--
-- Name: csi_answers csi_answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.csi_answers
    ADD CONSTRAINT csi_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.csi_questions(id);


--
-- Name: daily_duty daily_duty_staff_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_duty
    ADD CONSTRAINT daily_duty_staff_user_id_fkey FOREIGN KEY (staff_user_id) REFERENCES public.staff_users(id);


--
-- Name: deals deals_cd_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_cd_id_fkey FOREIGN KEY (cd_id) REFERENCES public.contacts(id);


--
-- Name: deals deals_client_lead_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_client_lead_id_fkey FOREIGN KEY (client_lead_id) REFERENCES public.client_leads(id);


--
-- Name: deals deals_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: deals deals_kind_dictionary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_kind_dictionary_id_fkey FOREIGN KEY (cd_kind_dictionary_id, cd_kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: deals deals_ru_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_ru_id_fkey FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: deals deals_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: departments departments_manager_staff_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_manager_staff_user_id_fkey FOREIGN KEY (manager_staff_user_id) REFERENCES public.staff_users(id);


--
-- Name: dictionary_items dictionary_items_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionary_items
    ADD CONSTRAINT dictionary_items_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.dictionary_items(id);


--
-- Name: districts districts_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.districts
    ADD CONSTRAINT districts_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: districts districts_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.districts
    ADD CONSTRAINT districts_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id);


--
-- Name: divisions divisions_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.divisions
    ADD CONSTRAINT divisions_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- Name: divisions divisions_manager_staff_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.divisions
    ADD CONSTRAINT divisions_manager_staff_user_id_fkey FOREIGN KEY (manager_staff_user_id) REFERENCES public.staff_users(id);


--
-- Name: encrypted_documents file_documents_uploader_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.encrypted_documents
    ADD CONSTRAINT file_documents_uploader_id_fkey FOREIGN KEY (uploader_id) REFERENCES public.staff_users(id);


--
-- Name: file_documents file_documents_uploader_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.file_documents
    ADD CONSTRAINT file_documents_uploader_id_fkey1 FOREIGN KEY (uploader_id) REFERENCES public.staff_users(id);


--
-- Name: localities localities_administrative_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities
    ADD CONSTRAINT localities_administrative_area_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id);


--
-- Name: localities localities_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities
    ADD CONSTRAINT localities_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: localities localities_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities
    ADD CONSTRAINT localities_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.districts(id);


--
-- Name: localities localities_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localities
    ADD CONSTRAINT localities_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: object_notifications object_notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.object_notifications
    ADD CONSTRAINT object_notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.staff_users(id);


--
-- Name: properties properties_badge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_badge_id_fkey FOREIGN KEY (badge_id) REFERENCES public.property_badges(id);


--
-- Name: properties properties_client_lead_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_client_lead_id_fkey FOREIGN KEY (client_lead_id) REFERENCES public.client_leads(id);


--
-- Name: properties properties_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: properties properties_owner_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_owner_user_id_fkey FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: properties properties_removal_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_removal_order_id_fkey FOREIGN KEY (removal_order_id) REFERENCES public.property_removal_orders(id);


--
-- Name: properties properties_ru_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_ru_department_id_fkey FOREIGN KEY (ru_department_id) REFERENCES public.departments(id);


--
-- Name: properties properties_ru_division_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_ru_division_id_fkey FOREIGN KEY (ru_division_id) REFERENCES public.divisions(id);


--
-- Name: properties properties_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: property_banners property_banners_createdby_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_banners
    ADD CONSTRAINT property_banners_createdby_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: property_banners property_banners_dictionary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_banners
    ADD CONSTRAINT property_banners_dictionary_id_fkey FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: property_banners property_banners_ru_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_banners
    ADD CONSTRAINT property_banners_ru_id_fkey FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: property_contact_links property_contact_links_document_kind_dictionary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_contact_links
    ADD CONSTRAINT property_contact_links_document_kind_dictionary_id_fkey FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: property_contact_links property_contact_links_linked_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_contact_links
    ADD CONSTRAINT property_contact_links_linked_contact_id_fkey FOREIGN KEY (linked_contact_id) REFERENCES public.contacts(id) ON DELETE CASCADE;


--
-- Name: property_contracts property_contracts_dictionary_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_contracts
    ADD CONSTRAINT property_contracts_dictionary_fkey FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: property_contracts property_contracts_signed_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_contracts
    ADD CONSTRAINT property_contracts_signed_by_id_fkey FOREIGN KEY (signed_by_id) REFERENCES public.staff_users(id);


--
-- Name: images_orders property_photos_orders_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images_orders
    ADD CONSTRAINT property_photos_orders_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: images_orders property_photos_orders_responsible_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images_orders
    ADD CONSTRAINT property_photos_orders_responsible_user_id_fkey FOREIGN KEY (responsible_user_id) REFERENCES public.staff_users(id);


--
-- Name: images_orders property_photos_orders_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images_orders
    ADD CONSTRAINT property_photos_orders_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: property_removal_orders property_removal_orders_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_removal_orders
    ADD CONSTRAINT property_removal_orders_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: property_removal_orders property_removal_orders_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_removal_orders
    ADD CONSTRAINT property_removal_orders_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: property_search_orders property_search_orders_cbu_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_search_orders
    ADD CONSTRAINT property_search_orders_cbu_department_id_fkey FOREIGN KEY (cbu_department_id) REFERENCES public.departments(id);


--
-- Name: property_search_orders property_search_orders_cbu_division_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_search_orders
    ADD CONSTRAINT property_search_orders_cbu_division_id_fkey FOREIGN KEY (cbu_division_id) REFERENCES public.divisions(id);


--
-- Name: property_search_orders property_search_orders_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_search_orders
    ADD CONSTRAINT property_search_orders_created_by_user_id_fkey FOREIGN KEY (cbu_id) REFERENCES public.staff_users(id);


--
-- Name: property_search_orders property_search_orders_responsible_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_search_orders
    ADD CONSTRAINT property_search_orders_responsible_user_id_fkey FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: property_search_orders property_search_orders_ru_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_search_orders
    ADD CONSTRAINT property_search_orders_ru_department_id_fkey FOREIGN KEY (ru_department_id) REFERENCES public.departments(id);


--
-- Name: property_search_orders property_search_orders_ru_division_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_search_orders
    ADD CONSTRAINT property_search_orders_ru_division_id_fkey FOREIGN KEY (ru_division_id) REFERENCES public.divisions(id);


--
-- Name: property_search_orders property_search_orders_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_search_orders
    ADD CONSTRAINT property_search_orders_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: complex_building_documents residential_complex_documents_kind_dictionary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_building_documents
    ADD CONSTRAINT residential_complex_documents_kind_dictionary_id_fkey FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: complex_building_documents residential_complex_documents_residential_complex_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_building_documents
    ADD CONSTRAINT residential_complex_documents_residential_complex_id_fkey FOREIGN KEY (complex_building_id) REFERENCES public.complex_buildings(id);


--
-- Name: complex_buildings residential_complexes_administrative_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_administrative_area_id_fkey FOREIGN KEY (l_region_id) REFERENCES public.regions(id);


--
-- Name: complex_buildings residential_complexes_contractor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES public.companies(id);


--
-- Name: complex_buildings residential_complexes_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_country_id_fkey FOREIGN KEY (l_country_id) REFERENCES public.countries(id);


--
-- Name: complex_buildings residential_complexes_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: complex_buildings residential_complexes_developer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_developer_id_fkey FOREIGN KEY (developer_id) REFERENCES public.companies(id);


--
-- Name: complex_buildings residential_complexes_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_district_id_fkey FOREIGN KEY (l_district_id) REFERENCES public.districts(id);


--
-- Name: complex_buildings residential_complexes_locality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_locality_id_fkey FOREIGN KEY (l_locality_id) REFERENCES public.localities(id);


--
-- Name: complex_buildings residential_complexes_ru_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_ru_id_fkey FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: complex_buildings residential_complexes_sub_locality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_sub_locality_id_fkey FOREIGN KEY (l_sub_locality_id) REFERENCES public.sub_localities(id);


--
-- Name: complex_buildings residential_complexes_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complex_buildings
    ADD CONSTRAINT residential_complexes_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: routes routes_administrative_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_administrative_area_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id);


--
-- Name: routes routes_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: selections selections_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.selections
    ADD CONSTRAINT selections_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: selections selections_ru_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.selections
    ADD CONSTRAINT selections_ru_id_fkey FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: selections selections_updated_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.selections
    ADD CONSTRAINT selections_updated_by_user_id_fkey FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: settlement_documents settlement_documents_kind_dictionary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlement_documents
    ADD CONSTRAINT settlement_documents_kind_dictionary_id_fkey FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: settlement_documents settlement_documents_settlement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlement_documents
    ADD CONSTRAINT settlement_documents_settlement_id_fkey FOREIGN KEY (settlement_id) REFERENCES public.settlements(id);


--
-- Name: settlements settlements_created_by_user_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_created_by_user_id_fkey1 FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: settlements settlements_kind_dictionary_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_kind_dictionary_id_fkey1 FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: settlements settlements_l_country_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_l_country_id_fkey1 FOREIGN KEY (l_country_id) REFERENCES public.countries(id);


--
-- Name: settlements settlements_l_district_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_l_district_id_fkey1 FOREIGN KEY (l_district_id) REFERENCES public.districts(id);


--
-- Name: settlements settlements_l_locality_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_l_locality_id_fkey1 FOREIGN KEY (l_locality_id) REFERENCES public.localities(id);


--
-- Name: settlements settlements_l_region_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_l_region_id_fkey1 FOREIGN KEY (l_region_id) REFERENCES public.regions(id);


--
-- Name: settlements settlements_l_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_l_route_id_fkey FOREIGN KEY (l_route_id) REFERENCES public.routes(id);


--
-- Name: settlements settlements_ru_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_ru_id_fkey FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: settlements settlements_updated_by_user_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_updated_by_user_id_fkey1 FOREIGN KEY (updated_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: staff_user_documents staff_documents_dictionary_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_user_documents
    ADD CONSTRAINT staff_documents_dictionary_fkey FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: property_documents staff_documents_dictionary_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_documents
    ADD CONSTRAINT staff_documents_dictionary_fkey FOREIGN KEY (kind_dictionary_id, kind_dictionary_kind) REFERENCES public.dictionary_items(id, kind);


--
-- Name: staff_user_documents staff_documents_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_user_documents
    ADD CONSTRAINT staff_documents_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.staff_users(id) ON DELETE CASCADE;


--
-- Name: staff_users staff_users_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_users
    ADD CONSTRAINT staff_users_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- Name: staff_users staff_users_division_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_users
    ADD CONSTRAINT staff_users_division_id_fkey FOREIGN KEY (division_id) REFERENCES public.divisions(id);


--
-- Name: staff_users staff_users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_users
    ADD CONSTRAINT staff_users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: sub_localities sub_localities_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities
    ADD CONSTRAINT sub_localities_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: sub_localities sub_localities_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities
    ADD CONSTRAINT sub_localities_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.districts(id);


--
-- Name: sub_localities sub_localities_locality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities
    ADD CONSTRAINT sub_localities_locality_id_fkey FOREIGN KEY (locality_id) REFERENCES public.localities(id);


--
-- Name: sub_localities sub_localities_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_localities
    ADD CONSTRAINT sub_localities_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id);


--
-- Name: subways subways_sub_locality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jq
--

ALTER TABLE ONLY public.subways
    ADD CONSTRAINT subways_sub_locality_id_fkey FOREIGN KEY (sub_locality_id) REFERENCES public.sub_localities(id);


--
-- Name: task_documents task_documents_archiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_documents
    ADD CONSTRAINT task_documents_archiver_id_fkey FOREIGN KEY (archiver_id) REFERENCES public.staff_users(id);


--
-- Name: task_documents task_documents_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_documents
    ADD CONSTRAINT task_documents_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- Name: tasks tasks_cd_client_lead_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_cd_client_lead_id_fkey FOREIGN KEY (d_client_lead_id) REFERENCES public.client_leads(id);


--
-- Name: tasks tasks_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.staff_users(id);


--
-- Name: tasks tasks_responsible_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_responsible_user_id_fkey FOREIGN KEY (ru_id) REFERENCES public.staff_users(id);


--
-- Name: tasks tasks_ru_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_ru_department_id_fkey FOREIGN KEY (ru_department_id) REFERENCES public.departments(id);


--
-- Name: tasks tasks_ru_division_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_ru_division_id_fkey FOREIGN KEY (ru_division_id) REFERENCES public.divisions(id);


--
-- Name: tasks tasks_tc_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_tc_contact_id_fkey FOREIGN KEY (d_contact_id) REFERENCES public.contacts(id);


--
-- Name: tasks tasks_tc_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_tc_deal_id_fkey FOREIGN KEY (d_deal_id) REFERENCES public.deals(id);


--
-- Name: tasks tasks_tp_archived_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_tp_archived_document_id_fkey FOREIGN KEY (d_archived_document_id) REFERENCES public.task_documents(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA public TO "jq-ro";


--
-- Name: TABLE applications; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.applications TO "jq-ro";


--
-- Name: SEQUENCE applications_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.applications_id_seq TO "jq-ro";


--
-- Name: TABLE cian_subways; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON TABLE public.cian_subways TO "jq-ro";


--
-- Name: TABLE properties; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.properties TO "jq-ro";


--
-- Name: SEQUENCE properties_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.properties_id_seq TO "jq-ro";


--
-- Name: TABLE city_properties; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.city_properties TO "jq-ro";


--
-- Name: TABLE client_lead_sources; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.client_lead_sources TO "jq-ro";


--
-- Name: SEQUENCE client_lead_sources_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.client_lead_sources_id_seq TO "jq-ro";


--
-- Name: TABLE client_leads; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.client_leads TO "jq-ro";


--
-- Name: SEQUENCE client_leads_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.client_leads_id_seq TO "jq-ro";


--
-- Name: TABLE client_leads_view; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.client_leads_view TO "jq-ro";


--
-- Name: TABLE comments; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.comments TO "jq-ro";


--
-- Name: SEQUENCE comments_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.comments_id_seq TO "jq-ro";


--
-- Name: TABLE companies; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.companies TO "jq-ro";


--
-- Name: SEQUENCE companies_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.companies_id_seq TO "jq-ro";


--
-- Name: TABLE encrypted_documents; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.encrypted_documents TO "jq-ro";


--
-- Name: TABLE complex_building_documents; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.complex_building_documents TO "jq-ro";


--
-- Name: TABLE complex_buildings; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.complex_buildings TO "jq-ro";


--
-- Name: TABLE complexes; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.complexes TO "jq-ro";


--
-- Name: SEQUENCE complexes_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.complexes_id_seq TO "jq-ro";


--
-- Name: TABLE contact_documents; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.contact_documents TO "jq-ro";


--
-- Name: TABLE contact_links; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.contact_links TO "jq-ro";


--
-- Name: TABLE contacts; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.contacts TO "jq-ro";


--
-- Name: SEQUENCE contacts_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.contacts_id_seq TO "jq-ro";


--
-- Name: TABLE places; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.places TO "jq-ro";


--
-- Name: SEQUENCE places_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.places_id_seq TO "jq-ro";


--
-- Name: TABLE countries; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.countries TO "jq-ro";


--
-- Name: TABLE country_properties; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.country_properties TO "jq-ro";


--
-- Name: TABLE country_properties_view; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.country_properties_view TO "jq-ro";


--
-- Name: TABLE csi_answers; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.csi_answers TO "jq-ro";


--
-- Name: SEQUENCE csi_answers_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.csi_answers_id_seq TO "jq-ro";


--
-- Name: TABLE csi_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.csi_questions TO "jq-ro";


--
-- Name: SEQUENCE csi_questions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.csi_questions_id_seq TO "jq-ro";


--
-- Name: TABLE daily_duty; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.daily_duty TO "jq-ro";


--
-- Name: SEQUENCE daily_duty_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.daily_duty_id_seq TO "jq-ro";


--
-- Name: TABLE deals; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.deals TO "jq-ro";


--
-- Name: SEQUENCE deals_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.deals_id_seq TO "jq-ro";


--
-- Name: TABLE deleted_to; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.deleted_to TO "jq-ro";


--
-- Name: TABLE departments; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.departments TO "jq-ro";


--
-- Name: SEQUENCE departments_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.departments_id_seq TO "jq-ro";


--
-- Name: TABLE dictionary_items; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.dictionary_items TO "jq-ro";


--
-- Name: SEQUENCE dictionary_items_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.dictionary_items_id_seq TO "jq-ro";


--
-- Name: TABLE districts; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.districts TO "jq-ro";


--
-- Name: TABLE divisions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.divisions TO "jq-ro";


--
-- Name: SEQUENCE divisions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.divisions_id_seq TO "jq-ro";


--
-- Name: TABLE events; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.events TO "jq-ro";


--
-- Name: SEQUENCE events_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.events_id_seq TO "jq-ro";


--
-- Name: TABLE export_error_logs; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.export_error_logs TO "jq-ro";


--
-- Name: SEQUENCE export_error_logs_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.export_error_logs_id_seq TO "jq-ro";


--
-- Name: TABLE export_locations; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON TABLE public.export_locations TO "jq-ro";


--
-- Name: SEQUENCE export_locations_id_seq; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON SEQUENCE public.export_locations_id_seq TO "jq-ro";


--
-- Name: TABLE export_packages; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.export_packages TO "jq-ro";


--
-- Name: SEQUENCE export_packages_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.export_packages_id_seq TO "jq-ro";


--
-- Name: TABLE file_documents; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON TABLE public.file_documents TO "jq-ro";


--
-- Name: TABLE geography_columns; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.geography_columns TO "jq-ro";


--
-- Name: TABLE geometry_columns; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.geometry_columns TO "jq-ro";


--
-- Name: TABLE images_orders; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.images_orders TO "jq-ro";


--
-- Name: TABLE journal; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.journal TO "jq-ro";


--
-- Name: SEQUENCE journal_ordering_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.journal_ordering_seq TO "jq-ro";


--
-- Name: TABLE localities; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.localities TO "jq-ro";


--
-- Name: TABLE migrations; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.migrations TO "jq-ro";


--
-- Name: TABLE newsletters; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON TABLE public.newsletters TO "jq-ro";


--
-- Name: SEQUENCE newsletters_id_seq; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON SEQUENCE public.newsletters_id_seq TO "jq-ro";


--
-- Name: TABLE object_notifications; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.object_notifications TO "jq-ro";


--
-- Name: TABLE popular_properties; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.popular_properties TO "jq-ro";


--
-- Name: TABLE property_badges; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON TABLE public.property_badges TO "jq-ro";


--
-- Name: SEQUENCE property_badges_id_seq; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON SEQUENCE public.property_badges_id_seq TO "jq-ro";


--
-- Name: TABLE property_banners; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.property_banners TO "jq-ro";


--
-- Name: SEQUENCE property_banners_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.property_banners_id_seq TO "jq-ro";


--
-- Name: TABLE property_contact_links; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.property_contact_links TO "jq-ro";


--
-- Name: TABLE property_contracts; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.property_contracts TO "jq-ro";


--
-- Name: TABLE property_documents; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.property_documents TO "jq-ro";


--
-- Name: TABLE property_offer_price_changes; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.property_offer_price_changes TO "jq-ro";


--
-- Name: SEQUENCE property_photos_orders_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.property_photos_orders_id_seq TO "jq-ro";


--
-- Name: TABLE property_removal_orders; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.property_removal_orders TO "jq-ro";


--
-- Name: SEQUENCE property_removal_orders_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.property_removal_orders_id_seq TO "jq-ro";


--
-- Name: TABLE property_search_orders; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.property_search_orders TO "jq-ro";


--
-- Name: SEQUENCE property_search_orders_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.property_search_orders_id_seq TO "jq-ro";


--
-- Name: TABLE raster_columns; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.raster_columns TO "jq-ro";


--
-- Name: TABLE raster_overviews; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.raster_overviews TO "jq-ro";


--
-- Name: TABLE regions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.regions TO "jq-ro";


--
-- Name: SEQUENCE residential_complexes_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.residential_complexes_id_seq TO "jq-ro";


--
-- Name: TABLE rights; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.rights TO "jq-ro";


--
-- Name: TABLE roles; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.roles TO "jq-ro";


--
-- Name: SEQUENCE roles_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.roles_id_seq TO "jq-ro";


--
-- Name: TABLE routes; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.routes TO "jq-ro";


--
-- Name: TABLE selections; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON TABLE public.selections TO "jq-ro";


--
-- Name: SEQUENCE selections_id_seq; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON SEQUENCE public.selections_id_seq TO "jq-ro";


--
-- Name: TABLE settlement_contact_links; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON TABLE public.settlement_contact_links TO "jq-ro";


--
-- Name: TABLE settlement_documents; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.settlement_documents TO "jq-ro";


--
-- Name: TABLE settlements; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.settlements TO "jq-ro";


--
-- Name: TABLE settlements_view; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.settlements_view TO "jq-ro";


--
-- Name: TABLE sms_notifications; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.sms_notifications TO "jq-ro";


--
-- Name: SEQUENCE sms_notifications_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.sms_notifications_id_seq TO "jq-ro";


--
-- Name: TABLE snapshot; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.snapshot TO "jq-ro";


--
-- Name: TABLE spatial_ref_sys; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.spatial_ref_sys TO "jq-ro";


--
-- Name: TABLE staff_user_documents; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.staff_user_documents TO "jq-ro";


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.users TO "jq-ro";


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.users_id_seq TO "jq-ro";


--
-- Name: TABLE staff_users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.staff_users TO "jq-ro";


--
-- Name: TABLE sub_localities; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.sub_localities TO "jq-ro";


--
-- Name: TABLE subways; Type: ACL; Schema: public; Owner: jq
--

GRANT SELECT ON TABLE public.subways TO "jq-ro";


--
-- Name: TABLE task_documents; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.task_documents TO "jq-ro";


--
-- Name: TABLE tasks; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.tasks TO "jq-ro";


--
-- Name: SEQUENCE tasks_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON SEQUENCE public.tasks_id_seq TO "jq-ro";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON TABLES  FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT ON TABLES  TO "jq-ro";


--
-- PostgreSQL database dump complete
--

