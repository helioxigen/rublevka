import React from 'react';

const CatalogPage = () => {
    <div />;
};

CatalogPage.getInitialProps = async ({ req }) => {
    const res = await fetch('https://api.github.com/repos/zeit/next.js');
    const json = await res.json();
    return { stars: json.stargazers_count };
};

export default CatalogPage;
