import React from 'react';
import styled from 'styled-components';

const Section = ({ className, title, children }) => (
    <section className={className}>
        <header>
            <h2>{title}</h2>
        </header>
        {children}
    </section>
);

export default styled(Section)`
    header {
        margin: 0 0 15px 0;
    }

    h2 {
        font-size: 21px;
        font-weight: bold;
        margin: 0;
    }
`;
