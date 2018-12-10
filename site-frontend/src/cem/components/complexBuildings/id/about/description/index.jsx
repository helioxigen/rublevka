import React from 'react';

import { reduxForm } from 'redux-form';
import { formSettings } from 'cem/constants/complexBuildings/form';

import Form from './form';

// import Infrastructure from './infrastructure';
// TODO Implement infrastructure section
// <Row>
//   <Col sm="20">
//     <Infrastructure field={fields.details.infrastructureUnits} />
//   </Col>
// </Row>

export default reduxForm(formSettings)(props => <Form {...props} />);
