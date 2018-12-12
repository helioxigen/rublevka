import React, { Component } from 'react';

import { connect } from 'react-redux';

// import Header from 'cem/components/dashboard/header';
import Content from 'cem/components/dashboard/content';

class Dashboard extends Component {
  render() {
    return (
      <section>
        {/* <Header {...this.props} />*/}
        <Content {...this.props} />
      </section>
    );
  }
}

const pickState = ({ tasks, deals, leads }) => ({
  state: { tasks, deals, leads },
});

export default connect(pickState)(Dashboard);
