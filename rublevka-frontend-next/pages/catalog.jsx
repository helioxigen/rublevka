import React from 'react';

const CatalogPage = ({ dealType }) => <div>{dealType}</div>;

CatalogPage.getInitialProps = async ({ req }) => {
    return { dealType: req.params.dealType };
};

export default CatalogPage;
