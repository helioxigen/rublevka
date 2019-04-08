import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

import UI from 'ui';
const {
  Button,
  Checkbox,
  Text,
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'styles/complexes/filter';
import sUtils from 'styles/utils';

const alphabet = `абвгдежзийклмнопрстуфхцчшщэюя`;

const masonryOptions = {
  transitionDuration: 0,
};

class LocationTab extends Component {
  state = {
    tab: `subLocalities`,
  };

  doesSubLocalityStartWith(letter) {
    const { subLocalities = [] } = this.props;

    return !!subLocalities.filter(
      ({ name }) => (name[0] || ``).toLowerCase() === letter,
    ).length;
  }

  handleSubLocalityChange(key, value, name) {
    const { fields } = this.props;

    const selectedItems = {
      subLocalities: fields[`location.subLocalityId`].value || [],
    };

    if (value) {
      fields[`location.subLocalityId`].onChange([
        ...selectedItems.subLocalities,
        { id: key, name },
      ]);
    } else if (
      selectedItems.subLocalities.map(({ id }) => id).indexOf(key) > -1
    ) {
      fields[`location.subLocalityId`].onChange(
        fields[`location.subLocalityId`].value.filter(({ id }) => id !== key),
      );
    }
  }

  handleComplexChange(key, value, name) {
    const { fields } = this.props;

    const selectedItems = {
      complexes: fields[`id`].value || [],
    };

    if (value) {
      fields[`id`].onChange([...selectedItems.complexes, { id: key, name }]);
    } else if (selectedItems.complexes.map(({ id }) => id).indexOf(key) > -1) {
      fields[`id`].onChange(fields[`id`].value.filter(({ id }) => id !== key));
    }
  }

  render() {
    const {
      subLocalities = [],
      complexes = [],
      inputValue,
      fields,
      stateShowList,
    } = this.props;

    const selectedItemsIds = {
      complexes: (fields[`id`].value || []).map(({ id }) => id),
      subLocalities: (fields[`location.subLocalityId`].value || []).map(
        ({ id }) => id,
      ),
    };

    return (
      <Row>
        {!!stateShowList && (
          <Col
            xs="12"
            className={cn(
              !!stateShowList && s.paddingBottomSm4,
              sUtils.pushedTop4,
            )}
          >
            <Row>
              <Col xs="12">
                <div className={s.btnGroupSm}>
                  <Button
                    className={cn(
                      s.btnSm,
                      this.state.tab === `subLocalities` && s.activeSm,
                    )}
                    size="lg"
                    onClick={() => this.setState({ tab: `subLocalities` })}
                  >
                    Районы
                  </Button>
                  <Button
                    className={cn(
                      s.btnSm,
                      this.state.tab === `complexes` && s.activeSm,
                    )}
                    size="lg"
                    onClick={() => this.setState({ tab: `complexes` })}
                  >
                    Жилые комплексы
                  </Button>
                </div>
              </Col>

              <Col xs="12">
                <div>
                  {this.state.tab === `subLocalities` && (
                    <Masonry
                      className={s.grid}
                      elementType={'ul'}
                      options={masonryOptions}
                      disableImagesLoaded={false}
                      updateOnEachImageLoad={false}
                    >
                      {alphabet
                        .split(``)
                        .filter(letter => this.doesSubLocalityStartWith(letter))
                        .map(letter => (
                          <li className={s.column}>
                            <label className={s.label}>
                              {letter.toUpperCase()}
                            </label>
                            {subLocalities
                              .filter(
                                item => item.name[0].toLowerCase() === letter,
                              )
                              .map(item => (
                                <div
                                  key={item.id}
                                  className={sUtils.pushedTop1}
                                >
                                  <Checkbox
                                    className={s.checkbox}
                                    controlClassName={s.checkboxControl}
                                    key={item.id}
                                    reference={item.id}
                                    checked={
                                      selectedItemsIds.subLocalities.indexOf(
                                        item.id,
                                      ) > -1
                                    }
                                    handleChange={(key, value) =>
                                      ::this.handleSubLocalityChange(
                                        key,
                                        value,
                                        item.name,
                                      )
                                    }
                                  >
                                    {item.name || ``}
                                  </Checkbox>
                                </div>
                              ))}
                          </li>
                        ))}
                    </Masonry>
                  )}

                  {this.state.tab === `complexes` && (
                    <Row className={sUtils.pushedTop3}>
                      {complexes.map(item => (
                        <Col key={item.id} sm="6" md="4" lg="3">
                          <div className={sUtils.pushedTop1}>
                            <div key={item.id} className={sUtils.pushedTop1}>
                              <Checkbox
                                className={s.checkbox}
                                controlClassName={s.checkboxControl}
                                key={item.id}
                                reference={item.id}
                                checked={
                                  selectedItemsIds.complexes.indexOf(item.id) >
                                  -1
                                }
                                handleChange={(key, value) =>
                                  ::this.handleComplexChange(
                                    key,
                                    value,
                                    item.name,
                                  )
                                }
                              >
                                {item.name || ``}
                              </Checkbox>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        )}
        {!!inputValue && (
          <Col
            xs="12"
            className={cn(
              !!inputValue && s.paddingBottomSm4,
              sUtils.pushedTop4,
            )}
          >
            <Row>
              <Col xs="12">
                <div className={cn(s.dividerBottom, s.paddingBottom3)}>
                  <label className={s.title}>Районы</label>
                  {subLocalities
                    .filter(item => item.name[0].toLowerCase())
                    .map(item => (
                      <div className={sUtils.pushedTop2} key={item.id}>
                        <Checkbox
                          className={s.checkbox}
                          controlClassName={s.checkboxControl}
                          key={item.id}
                          reference={item.id}
                          checked={
                            selectedItemsIds.subLocalities.indexOf(item.id) > -1
                          }
                          handleChange={(key, value) =>
                            ::this.handleSubLocalityChange(
                              key,
                              value,
                              item.name,
                            )
                          }
                        >
                          <Text truncate={17} ellipsis title="title">
                            {item.name || ``}
                          </Text>
                        </Checkbox>
                      </div>
                    ))}

                  {!subLocalities.length && (
                    <div className={s.textSm}>Ничего не найдено </div>
                  )}
                </div>
              </Col>

              <Col xs="12" className={sUtils.pushedTop4}>
                <label className={s.title}>Жилые комплексы</label>
                {complexes.map(item => (
                  <div className={sUtils.pushedTop2} key={item.id}>
                    <Checkbox
                      className={s.checkbox}
                      controlClassName={s.checkboxControl}
                      key={item.id}
                      reference={item.id}
                      checked={selectedItemsIds.complexes.indexOf(item.id) > -1}
                      handleChange={(key, value) =>
                        ::this.handleComplexChange(key, value, item.name)
                      }
                    >
                      <Text truncate={17} ellipsis title="title">
                        {item.name || ``}
                      </Text>
                    </Checkbox>
                  </div>
                ))}

                {!complexes.length && (
                  <div className={s.textSm}>Ничего не найдено </div>
                )}
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    );
  }
}

export default LocationTab;
