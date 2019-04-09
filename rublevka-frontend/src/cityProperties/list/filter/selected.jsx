import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

// constants
import {
  kinds,
  renovateKinds,
} from 'core/countryProperties/constants/dictionaries';

// helpers
import { formatByDictionary, formatByMinMax } from 'helpers';

// ui
import UI from 'ui';

// ui
const { Icon, CountIndicator } = UI;

// styles
import s from 'styles/components/satellites/filter.css';
import sUtils from 'styles/utils.css';
import st from 'styles/themes';

const styles = {
  ...sUtils,
  ...s,
};

const cssOptions = {
  allowMultiple: true,
};

const theme = st.filterSatellites;

// components
const ArrayButton = ({
  dictionary,
  children,
  reference,
  onChange,
  ...props
}) => (
  <span className={theme.selected}>
    {formatByDictionary(children, dictionary)}

    <UI.Button
      className={props.styles.btnTimesSm}
      onClick={() => onChange(reference, children)}
    >
      <Icon className={props.styles.iconTimesSm} icon="times" />
    </UI.Button>
  </span>
);

const MinMaxButton = ({
  value,
  reference,
  onChange,
  prefix,
  postfix,
  ...props
}) => {
  return (
    <span className={theme.selected} onClick={() => onChange(reference)}>
      {formatByMinMax(value, postfix, prefix)}

      <UI.Button className={props.styles.btnTimesSm}>
        <Icon className={props.styles.iconTimesSm} icon="times" />
      </UI.Button>
    </span>
  );
};

class Selected extends Component {
  onChange(reference, value) {
    this.props.removeFilter(reference, value);
  }

  render() {
    const { state = {} } = this.props;

    const {
      kind = [],
      sale,
      rent,
      rooms,
      totalArea,
      floor,
      renovate = [],
      settlements = [],
    } = state;

    const isSaleShown = sale && (!!sale.min || !!sale.max);
    const isRentShown = rent && (!!rent.min || !!rent.max);
    const isRoomsShown = rooms && (!!rooms.min || !!rooms.max);
    const isTotalAreaShown = totalArea && (!!totalArea.min || !!totalArea.max);
    const isFloorShown = floor && (!!floor.min || !!floor.max);

    return (
      <span>
        {kind.map(value => (
          <ArrayButton
            dictionary={kinds}
            reference="kind"
            onChange={::this.onChange}
            key={value}
            styles={this.props.styles}
          >
            {value}
          </ArrayButton>
        ))}

        {isSaleShown && (
          <MinMaxButton
            reference="sale"
            onChange={::this.onChange}
            prefix="$"
            postfix=" млн"
            value={sale}
            styles={this.props.styles}
          />
        )}

        {isRentShown && (
          <MinMaxButton
            reference="rent"
            onChange={::this.onChange}
            prefix="$"
            postfix=" тыс"
            value={rent}
            styles={this.props.styles}
          />
        )}

        {isRoomsShown && (
          <MinMaxButton
            reference="rooms"
            onChange={::this.onChange}
            postfix=" комнат"
            value={rooms}
            styles={this.props.styles}
          />
        )}

        {isTotalAreaShown && (
          <MinMaxButton
            reference="totalArea"
            onChange={::this.onChange}
            postfix=" м²"
            value={totalArea}
            styles={this.props.styles}
          />
        )}

        {isFloorShown && (
          <MinMaxButton
            reference="floor"
            onChange={::this.onChange}
            postfix=" этаж"
            value={floor}
            styles={this.props.styles}
          />
        )}

        {renovate.map(value => (
          <ArrayButton
            dictionary={renovateKinds}
            reference="renovate"
            onChange={::this.onChange}
            key={value}
            styles={this.props.styles}
          >
            {value}
          </ArrayButton>
        ))}

        {!!settlements.length && (
          <span className={theme.selected}>
            <CountIndicator
              className={s.success}
              count={settlements.length}
              declensionForms={[`посёлок`, `посёлка`, `посёлков`]}
            />

            <UI.Button
              className={styles.btnTimesSm}
              onClick={() => ::this.onChange(`settlements`)}
            >
              <Icon className={styles.iconTimesSm} icon="times" />
            </UI.Button>
          </span>
        )}
      </span>
    );
  }
}

export default CSSModules(Selected, styles, cssOptions);
