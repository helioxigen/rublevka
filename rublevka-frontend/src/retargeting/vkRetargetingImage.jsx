import React from 'react';

import UI from 'ui';
const { Image } = UI;

import s from 'styles/base';

export default props => (
  <Image
    className={s.retargetingImage}
    src={`//vk.com/rtrg?r=${props.rKey}`}
    width="1"
    height="1"
    title=""
    alt=""
  />
);
