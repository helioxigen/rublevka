import React, { Component } from 'react';

import s from 'landing/styles/components/footer';

class Footer extends Component {
  render() {
    return (
      <div className={s.container}>
        <p>©  2016. JQEstate. <a className={s.link} href={`http://kp-${this.props.link}.ru/`}>{this.props.name}.</a> Все права защищены.</p>
      </div>
    );
  }
}

export default Footer;
