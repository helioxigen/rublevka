import React from 'react';

import * as dicts from 'cem/constants/properties/dictionaries';
const checkmark =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAABGdBTUEAALGPC/xhBQAAAk5JREFUOBFjYKACuK9h5H5PxeDYA01jSZhxjDAGufQ9TUN5hj//zv3/zyDEyMj44D8zm7vyjVO3KDL4voMDx78nH44wMPw3hjuMkfENKxOjJxNcgAzG/2fvp6AYCjLj/3+RP38Z9Ml28T01g5T///7PxnAPI+Ny5dsXoshy8UMNI+P///8DXYsBrnBziqWCREl28RMNM+Fff36d/c/wXx7FWEbGT2wsDCay1y/cBomT5OL/DQ1Mv/7+WoZuKNB1/5kYGeJhhqIYfE/VoOuumkEliivQOPeXbmwEBoEbmjDQ24wdircubEAWB7v4nop+DFBDKcO//233VAwng1yGrAjEvqtq5MPw/181ujjQ1L0Khqq16OKM99SN9Bj+/jsO9B4XTBLogtWKDJKxjHe2/wSJPVIxVv7D8PcMUI0ATA2UfszFwGQseef8azRxBkZgEFwEulYPXQIYr/sFGNgDvoky/f795vsJDDWMDL8YGRlslW5dPIWpFxh5TAxMjcDA/4Ep+d/xI+PPQ0BDF2EYClQMDKs8XIaCzAInt3uqhnbAHLMRi1cx7QNpYmRcqHT7QgJWSaggOJKUbp8/9J+F2Q6o4Rk+xSA5oJoLrCKcmQTVISuAllQ7gCWVBrI4jA303ntmJjYT+Vun78HEcNEoyUrp+vmHbMzsNsBIOYGuAZwJmBhjiDEUpBfFYJCAzI1Tbzn4WJyBft4K4sPAfyaGZoVbF7bB+IRoDINBGqTOnv2mJC0QADR8AYgPdO0OpajARhCbagCYYnIfa1sKkWogAKh8ykLu+sMYAAAAAElFTkSuQmCC';

export default ({ items }) => (
  <div className="about-list-container">
    <h2 className="about-title">Оснащение</h2>
    <ul>
      {items.map(item => (
        <li className="about-equipment-list-item">
          <img
            className="about-equipment-list-item-image"
            src={checkmark}
            alt="checkmark"
            width="9"
            height="8"
          />
          {dicts.equipment[item]}
        </li>
      ))}
    </ul>
  </div>
);
