import React from 'react';
import { connect } from 'react-redux';
import { FormattedCurrency } from 'react-formatted';
import { offerKindsToRu, propertyCategoryToRu } from 'cem/_newsletters/constants/dictionaries';

const logosBySite = {
  'jq.estate':
    'https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/cf52c1bb-41e8-48ae-995d-b47b71ded749.png',
  'rublevka.ru':
    'https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/9981e1bd-9feb-4310-b7a4-743c47bdc82a.png',
  'riga.ru':
    'https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/9020c3cc-0694-45dc-aa32-d1d47d602cc9.png',
};

const backgroundsBySite = {
  'jq.estate':
    'https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/69483de6-689a-496a-9977-7c1d0482d786.png',
  'rublevka.ru':
    'https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/34c9d3d4-aee3-4d22-bc7a-5d2526fb31c2.png',
  'riga.ru':
    'https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/34c9d3d4-aee3-4d22-bc7a-5d2526fb31c2.png',
};

const Property = ({ values, property, price }) => (
  <div>
    <table
      width="640px"
      cellPadding={0}
      cellSpacing={0}
      border="0px"
      className="wrapper"
      style={{ borderRadius: '4px', backgroundColor: '#ffffff' }}
    >
      <tbody>
        <tr>
          <td
            style={{ height: '20px', fontSize: '10px', lineHeight: '10px' }}
            className="blockPadding"
          />
        </tr>
        <tr>
          <td style={{ textAlign: 'center', verticalAlign: 'top' }}>
            <table width="600px" cellPadding={0} cellSpacing={0} border={0} className="container">
              <tbody>
                <tr>
                  <td
                    width="300px"
                    className="mobile"
                    style={{ textAlign: 'center', verticalAlign: 'top' }}
                  >
                    <a
                      href={`https://${values.site}/${propertyCategoryToRu[
                        property.category
                      ]}/${offerKindsToRu[values.offerKind]}/dom/${property.id}`}
                      target="_blank"
                      className="mailImage"
                    >
                      <img
                        src={`https://images.${values.site}/${property.images[0].id}-thumbnail-512`}
                        border={0}
                        alt="Home Image"
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '200px',
                          border: '0px',
                          objectFit: 'cover',
                          margin: '0 0 20px',
                        }}
                      />
                    </a>
                  </td>
                  <td
                    width="300px"
                    className="mobile"
                    style={{ textAlign: 'left', verticalAlign: 'top' }}
                  >
                    <div className="mailBody">
                      <a
                        href={`https://${values.site}/${propertyCategoryToRu[
                          property.category
                        ]}/${offerKindsToRu[values.offerKind]}/dom/${property.id}`}
                        style={{
                          display: 'block',
                          color: '#000',
                          textDecoration: 'none',
                          backgroundColor: 'transparent',
                          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                          fontWeight: 700,
                          fontSize: '28px',
                          textAlign: 'left',
                          padding: '0 0 0 20px',
                          lineHeight: '34px',
                        }}
                        target="_blank"
                        className="noMobPAdding"
                      >
                        <FormattedCurrency value={price} symbol={values._currency} />
                      </a>
                      <p
                        style={{
                          textAlign: 'left',
                          padding: '0 0 0 20px',
                          fontSize: '15px',
                          marginTop: '10px',
                          color: '#4A4A4A',
                          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        }}
                        className="noMobPAdding"
                      >
                        {property.location.settlementName}
                        , {property.location.mkadDistance} км
                      </p>
                      <table style={{ marginLeft: '20px' }} className="noMobPAdding">
                        <tbody>
                          <tr>
                            <td>
                              <p
                                style={{
                                  margin: '10px 0 50px',
                                  padding: '0 20px 0 0',
                                  fontSize: '15px',
                                  color: '#4A4A4A',
                                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                }}
                              >
                                <img
                                  src="https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/1aa86618-9785-49de-beb2-7446b95ea3ef.png"
                                  style={{
                                    display: 'inline-block',
                                    height: '16px',
                                    verticalAlign: 'top',
                                    marginRight: '5px',
                                  }}
                                  alt="1aa86618-9785-49de-beb2-7446b95ea3ef.png"
                                />
                                {property.landDetails.area}&nbsp;сот
                              </p>
                            </td>
                            <td>
                              <p
                                style={{
                                  margin: '10px 0 50px',
                                  padding: '0 0 0 0',
                                  fontSize: '15px',
                                  color: '#4A4A4A',
                                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                }}
                              >
                                <img
                                  src="https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/afdf200a-715c-475d-9579-006c88699bcb.png"
                                  style={{
                                    display: 'inline-block',
                                    height: '16px',
                                    verticalAlign: 'top',
                                    marginRight: '5px',
                                  }}
                                  alt="afdf200a-715c-475d-9579-006c88699bcb.png"
                                />
                                {property.specification.area}&nbsp;м²
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <a
                        href={`https://${values.site}/${propertyCategoryToRu[
                          property.category
                        ]}/${offerKindsToRu[values.offerKind]}/dom/${property.id}`}
                        style={{
                          display: 'block',
                          backgroundColor: '#00C853',
                          borderRadius: '4px',
                          borderColor: 'transparent',
                          borderWidth: '0px',
                          borderStyle: 'none',
                          color: '#ffffff',
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          fontWeight: 300,
                          fontSize: '16px',
                          lineHeight: '44px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          margin: '0 0 20px 20px',
                        }}
                        target="_blank"
                        className="noMobPAdding"
                      >
                        Подробнее
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table width="640px" cellPadding={0} cellSpacing={0} border="0px" className="wrapper">
      <tbody>
        <tr>
          <td height="20px" />
        </tr>
      </tbody>
    </table>
  </div>
);

const Header = ({ values }) => (
  <table
    width="640px"
    cellPadding={0}
    cellSpacing={0}
    border="0px"
    className="wrapper"
    style={{
      backgroundImage: `url("${backgroundsBySite[values.site]}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: '#FFFFFF',
    }}
  >
    <tbody>
      {values.site !== 'jq.estate' && (
        <tr>
          <td
            style={{ height: '20px', fontSize: '10px', lineHeight: '10px' }}
            className="blockPadding"
          />
        </tr>
      )}
      <tr>
        <td style={{ textAlign: 'center', verticalAlign: 'top' }}>
          <table width="600px" cellPadding={0} cellSpacing={0} border={0} className="container">
            <tbody>
              <tr>
                <td style={{ textAlign: 'center', verticalAlign: 'top' }}>
                  <a
                    href={`https://${values.site}`}
                    target="_blank"
                    style={{ display: 'block' }}
                    className="headlogo"
                  >
                    <img
                      src={logosBySite[values.site]}
                      style={{
                        display: 'block',
                        margin: `${values.site === 'jq.estate' ? '30px' : '50px'} auto`,
                        width: `${values.site === 'jq.estate' ? '100px' : '250px'}`,
                      }}
                      alt="cf52c1bb-41e8-48ae-995d-b47b71ded749.png"
                    />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          height={values.site === 'jq.estate' ? '5px' : '10px'}
          style={{
            fontSize: values.site === 'jq.estate' ? '5px' : '10px',
            lineHeight: values.site === 'jq.estate' ? '5px' : '10px',
            backgroundColor: values.site === 'jq.estate' && '#FF4C4E',
          }}
        />
      </tr>
    </tbody>
  </table>
);

const Headline = ({ values }) => (
  <table width="640px" cellPadding={0} cellSpacing={0} border={0} className="wrapper">
    <tbody>
      <tr>
        <td height="10px" style={{ fontSize: '10px', lineHeight: '10px' }} />
      </tr>
      <tr>
        <td style={{ textAlign: 'center', verticalAlign: 'top' }}>
          <table width="600px" cellPadding={0} cellSpacing={0} border={0} className="container">
            <tbody>
              <tr>
                <td
                  style={{
                    color: values.site === 'jq.estate' ? '#232323' : '#474E52',
                    display: 'inline',
                    backgroundColor: 'transparent',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial',
                    fontWeight: 300,
                    fontSize: '16px',
                    textAlign: 'center',
                    verticalAlign: 'top',
                  }}
                >
                  <h1 style={{ color: '#232323', fontSize: '26px', margin: '25px 0 12px' }}>
                    {values.name || '...'}
                  </h1>
                  <p style={{ margin: '18px 15px 25px', lineHeight: '24px' }}>
                    {values.subTitle || '...'}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td height="10px" style={{ fontSize: '10px', lineHeight: '10px' }} />
      </tr>
    </tbody>
  </table>
);

const Footer = ({ values }) => (
  <table
    className="mail_footer"
    style={{
      overflow: 'hidden',
      width: '100%',
      background: '#fff',
      margin: '0 auto',
      verticalAlign: 'top',
      borderCollapse: 'collapse',
      textAlign: 'center',
      backgroundColor: 'transparent',
      fontSize: '13px',
    }}
  >
    <tbody>
      <tr>
        <td style={{ verticalAlign: 'top', borderCollapse: 'collapse', padding: '0 20px' }}>
          <a
            target="_blank"
            href={`https://${values.site}`}
            style={{
              display: 'block',
              fontFamily: 'HelveticaNeue, Helvetica, Arial, sans-serif',
              color: '#232323',
              fontSize: '15px',
              textDecoration: 'none',
              margin: '16px 0 0',
            }}
          >
            www.{values.site}
          </a>
          <p
            style={{
              fontFamily: 'HelveticaNeue, Helvetica, Arial, sans-serif',
              color: '#232323',
              fontSize: '13px',
              lineHeight: '25px',
              fontWeight: 400,
              margin: '12px 0',
              letterSpacing: '.2px',
            }}
          >
            +7 (495) 134-26-93
          </p>
          <ul
            className="social"
            style={{ margin: '0 0 16px', padding: 0, listStyle: 'none', display: 'block' }}
          >
            <li style={{ display: 'inline-block', margin: '0 6px' }}>
              <a
                href="https://www.instagram.com/jqestate/"
                style={{ color: '#232323', fontSize: '15px', textDecoration: 'none', margin: 0 }}
              >
                <img
                  src="https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/f0bb1d12-4949-4fe5-ab31-06ac0eedaadc.png"
                  style={{ maxWidth: '100%' }}
                  alt="f0bb1d12-4949-4fe5-ab31-06ac0eedaadc.png"
                />
              </a>
            </li>
            <li style={{ display: 'inline-block', margin: '0 6px' }}>
              <a
                href={`https://www.facebook.com/${values.site}/`}
                style={{ color: '#232323', fontSize: '15px', textDecoration: 'none', margin: 0 }}
              >
                <img
                  src="https://gallery.mailchimp.com/7a0a55f350c9a29b3db4984fa/images/c015d00d-6463-4e59-b605-9891945cb80d.png"
                  style={{ maxWidth: '100%' }}
                  alt="c015d00d-6463-4e59-b605-9891945cb80d.png"
                />
              </a>
            </li>
          </ul>
          <p>
            <a href="*|UNSUB|*" style={{ fontSize: '12px', color: '#aaa' }}>
              Отписаться от рассылки
            </a>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
);

const Template = ({ values, properties = [] }) => (
  <div>
    <span
      style={{ display: 'block', width: '640px !important', maxWidth: '640px', height: '1px' }}
      className="mobileOff"
    />
    <center>
      <table
        width="100%"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        style={{ backgroundColor: '#F2F2F2' }}
      >
        <tbody>
          <tr>
            <td style={{ textAlign: 'center', verticalAlign: 'top' }}>
              <Header values={values} />
              <Headline values={values} />
              {properties.map((property) => {
                const offerKind = property[`${values.offerKind}Offer`] || {
                  multiCurrencyPrice: { usd: 0, eur: 0, rub: 0 },
                };
                const price = offerKind.multiCurrencyPrice[values._currency.toLowerCase()];
                return (
                  <Property
                    id={property.id}
                    values={values}
                    property={property}
                    price={price}
                    key={property.id}
                  />
                );
              })}

              <Footer values={values} />
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </div>
);

const pickState = ({ fetcher }) => ({
  properties: Object.keys(fetcher.properties || {}).map(key => fetcher.properties[key]),
});

export default connect(pickState)(Template);
