import React, { Component } from 'react';

import UI from '../../../../ui/v2019';
import {
  CheckboxWrapper,
  ControlsContainer,
  Title,
  FilterHeader,
  IconReset,
} from './styled';
import Checkbox from './Checkbox';

const {
  Grid: { Container },
  RadioButton,
} = UI;

const key = 'bedrooms';

class Kind extends Component {
  constructor(props) {
    super(props);

    this.onReset = this.onReset.bind(this);
  }

  onUpdate(value) {
    this.props.updateFilter(key, { min: value, max: null });
  }

  onReset() {
    this.props.updateFilter(key, null);
  }

  render() {
    const { selected = {} } = this.props;
    const { kind = [] } = selected;
    const item = selected[key] || { min: null };

    if (!kind.includes('land')) {
      return (
        <section>
          <Container fluid>
            <FilterHeader>
              <Title>СПАЛЕН</Title>
              {item.min !== null && (
                <IconReset onClick={this.onReset} icon="times" />
              )}
            </FilterHeader>
            <ControlsContainer>
              <CheckboxWrapper>
                {[1, 2, 3, 4, 5].map(num => (
                  <RadioButton
                    checked={item.min === num}
                    name={num}
                    handleChange={() => this.onUpdate(num)}
                    text={`${num}+`}
                  />
                ))}
              </CheckboxWrapper>
            </ControlsContainer>
          </Container>
        </section>
      );
    }

    return <div />;
  }
}

export default Kind;
