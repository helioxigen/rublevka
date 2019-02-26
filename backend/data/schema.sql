--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


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

