import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

// constants
import { routeKinds } from 'core/places/constants/dictionaries';
import { kinds, renovateKinds } from 'core/countryProperties/constants/dictionaries';

// helpers
import { formatByDictionary, formatByMinMax } from 'site/helpers';

// styles
import s from 'site/styles/components/satellites/filter.css';
import sUtils from 'site/styles/utils.css';
import st from 'site/styles/themes';

// ui
import UI from 'site/ui';

const { Icon, CountIndicator } = UI;

const styles = {
  ...sUtils,
  ...s,
};

const cssOptions = {
  allowMultiple: true,
};

const theme = st.filterSatellites;

// components
const ArrayButton = ({ dictionary, children, reference, onChange, ...props }) => (
  <span className={theme.selected}>
    {formatByDictionary(children, dictionary)}

    <UI.Button className={props.styles.btnTimesSm} onClick={() => onChange(reference, children)}>
      <Icon className={props.styles.iconTimesSm} icon="times" />
    </UI.Button>
  </span>
);

const MinMaxButton = ({ value, reference, onChange, prefix, postfix, ...props }) => (
  <span className={theme.selected} onClick={() => onChange(reference)}>
    {formatByMinMax(value, postfix, prefix)}

    <UI.Button className={props.styles.btnTimesSm}>
      <Icon className={props.styles.iconTimesSm} icon="times" />
    </UI.Button>
  </span>
);

class Selected extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(reference, value) {
    this.props.removeFilter(reference, value);
  }

  render() {
    const { state = {} } = this.props;
    const {
      routeIds = [],
      kind = [],
      sale,
      rent,
      area,
      landArea,
      renovate = [],
      mkadDistance,
      settlements = [],
    } = state;

    const isSaleShown = sale && (!!sale.min || !!sale.max);
    const isRentShown = rent && (!!rent.min || !!rent.max);
    const isAreaShown = area && (!!area.min || !!area.max);
    const isLandAreaShown = landArea && (!!landArea.min || !!landArea.max);
    const isMkadDistanceShown = mkadDistance && (!!mkadDistance.min || !!mkadDistance.max);

    return (
      <span>
        {routeIds.map(value => (
          <ArrayButton
            dictionary={routeKinds}
            reference="routeIds"
            onChange={this.onChange}
            key={value}
            styles={this.props.styles}
          >
            {value}
          </ArrayButton>
        ))}

        {kind.map(value => (
          <ArrayButton
            dictionary={kinds}
            reference="kind"
            onChange={this.onChange}
            key={value}
            styles={this.props.styles}
          >
            {value}
          </ArrayButton>
        ))}

        {isSaleShown && (
          <MinMaxButton
            reference="sale"
            onChange={this.onChange}
            prefix="$"
            postfix=" млн"
            value={sale}
            styles={this.props.styles}
          />
        )}

        {isRentShown && (
          <MinMaxButton
            reference="rent"
            onChange={this.onChange}
            prefix="$"
            postfix=" тыс"
            value={rent}
            styles={this.props.styles}
          />
        )}

        {isAreaShown && (
          <MinMaxButton
            reference="area"
            onChange={this.onChange}
            postfix=" м²"
            value={area}
            styles={this.props.styles}
          />
        )}

        {isLandAreaShown && (
          <MinMaxButton
            reference="landArea"
            onChange={this.onChange}
            postfix=" сот"
            value={landArea}
            styles={this.props.styles}
          />
        )}

        {renovate.map(value => (
          <ArrayButton
            dictionary={renovateKinds}
            reference="renovate"
            onChange={this.onChange}
            key={value}
            styles={this.props.styles}
          >
            {value}
          </ArrayButton>
        ))}

        {isMkadDistanceShown && (
          <MinMaxButton
            reference="mkadDistance"
            onChange={this.onChange}
            postfix=" км"
            value={mkadDistance}
            styles={this.props.styles}
          />
        )}

        {!!settlements.length && (
          <span className={theme.selected}>
            <CountIndicator
              className={s.success}
              count={settlements.length}
              declensionForms={['посёлок', 'посёлка', 'посёлков']}
            />

            <UI.Button className={styles.btnTimesSm} onClick={() => this.onChange('settlements')}>
              <Icon className={styles.iconTimesSm} icon="times" />
            </UI.Button>
          </span>
        )}
      </span>
    );
  }
}

export default CSSModules(Selected, styles, cssOptions);
