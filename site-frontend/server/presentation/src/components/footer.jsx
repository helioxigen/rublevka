import React from 'react';

export default ({ broker }) => {
  return (
    <footer className="footer">
     <div className="footer-logo">
        <img src="https://s3.eu-central-1.amazonaws.com/dt-marketing/logos/jqestate.svg" alt="JQ Estate" title="JQ Estate" width="172" height="25" />
     </div>

     <a className="footer-link" href={`https://jqestate.ru`}>Все фото на сайте jqestate.ru</a>

     <div className="footer-broker-card">
       <div className="footer-broker-info">
         <h3 className="footer-broker-card-title">{broker.firstName} {broker.lastName}</h3>
         <p className="footer-broker-card-phone">
           +7 (495) 105-95-47
          </p>
       </div>
       {!!broker.photo && !!broker.photo.url && <img className="footer-broker-card-image" src={broker.photo.url} alt="" width="61" height="61" />}
     </div>
   </footer>
  );
};
