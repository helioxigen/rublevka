import React, { Component, PropTypes } from 'react';

// helpers
import { formatByMinMax } from 'site/helpers';

// constants
import * as dict from 'site/constants/complexes/complexBuilding';

// styles
import s from 'site/styles/complexes/list';

// ui
import UI from 'site/ui';
const {
  Icon,
  Grid: { Container, Row, Col },
} = UI;

// components
const Button = ({ onChange, reference, children, value, className }) => (
  <li className={className}>
    {children}

    <UI.Button className={s.btnTimes} onClick={() => onChange(reference, value)}>
      <Icon className={s.iconTimes} icon="times" />
    </UI.Button>
  </li>
);

Button.propTypes = {
  onChange: PropTypes.func.isRequired,
  reference: PropTypes.string.isRequired,
  children: PropTypes.string,
};

class Selected extends Component {
  static propTypes = {
    removeFilter: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }

  onChange(reference, value) {
    this.props.removeFilter(reference, value);
  }

  render() {
    const { state = {}, isOpened, className } = this.props;
    const {
      // settlements = [],
      // subLocalities = [],
      // complexes = [],
      area,
      sale,
      rooms = [],
      constructionStage = [],
      constructionKind = [],
      undergroundGarages,
      parkings,
    } = state;

    const isAreaShown = area && (!!area.min || !!area.max);
    const isSaleShown = sale && (!!sale.min || !!sale.max);

    return (
      <Container className={className}>
        <Row sm={!isOpened ? `center` : `start`} className={s.dividerBottomXs}>
          <Col xs="12">
            <ul className={s.list}>
              {isSaleShown && (
                <Button onChange={::this.onChange} reference="sale" className={s.filterItem}>
                  {formatByMinMax(sale, ` млн`, `$`)}
                </Button>
              )}

              {isAreaShown && (
                <Button onChange={::this.onChange} reference="area" className={s.filterItem}>
                  {formatByMinMax(area, ` м²`)}
                </Button>
              )}

              {rooms.map(value => (
                <Button onChange={::this.onChange} reference="rooms" value={value} className={s.filterItem} key={value}>
                  {dict.rooms[value]}
                </Button>
              ))}

              {constructionStage.map(value => (
                <Button onChange={::this.onChange} reference="constructionStage" value={value} className={s.filterItem} key={value}>
                  {dict.constructionStages[value]}
                </Button>
              ))}

              {constructionKind.map(value => (
                <Button onChange={::this.onChange} reference="constructionKind" value={value} className={s.filterItem} key={value}>
                  {dict.constructionKinds[value]}
                </Button>
              ))}

              {parkings && (
                <Button onChange={::this.onChange} reference="parkings" className={s.filterItem}>
                  с паркингом
                </Button>
              )}

              {undergroundGarages && (
                <Button onChange={::this.onChange} reference="undergroundGarages" className={s.filterItem}>
                  с подземным гаражом
                </Button>
              )}

              {/* {subLocalities.length > 5 &&
                <li className={cn(!isOpened ? s.filterItem : s.filterItemInner)}>
                  <CountIndicator count={subLocalities.length} declensionForms={[`район`, `района`, `районов`]} />
                  <Button className={s.btnTimes} type="button" onClick={() => fields[`location.subLocalityId`].onChange([])}>
                    <Icon className={s.iconTimes} icon="times" />
                  </Button>
                </li>
              }
              {subLocalities.length <= 5 && subLocalities.map(({ id, name }) =>
                <li className={cn(!isOpened ? s.filterItem : s.filterItemInner)}>
                  {name}
                  <Button className={s.btnTimes} type="button" onClick={() => fields[`location.subLocalityId`].onChange(fields[`location.subLocalityId`].value.filter(item => item.id !== id))}>
                    <Icon className={s.iconTimes} icon="times" />
                  </Button>
                </li>
              )}
              {complexes.length > 5 &&
                <li className={cn(!isOpened ? s.filterItem : s.filterItemInner)}>
                  <CountIndicator count={complexes.length} declensionForms={[`комплекс`, `комплекса`, `комплексов`]} />
                  <Button className={s.btnTimes} type="button" onClick={() => fields[`id`].onChange([])}>
                    <Icon className={s.iconTimes} icon="times" />
                  </Button>
                </li>
              }
              {complexes.length <= 5 && complexes.map(({ id, name }) =>
                <li className={cn(!isOpened ? s.filterItem : s.filterItemInner)}>
                  {name}
                  <Button className={s.btnTimes} type="button" onClick={() => fields[`id`].onChange(fields[`id`].value.filter(item => item.id !== id))}>
                    <Icon className={s.iconTimes} icon="times" />
                  </Button>
                </li>
              )} */}
              {/* {!!parkings &&
                <li className={cn(!isOpened ? s.filterItem : s.filterItemInner)}>
                  паркинг
                  <Button className={s.btnTimes} type="button" onClick={() => fields[`buildings.details.parkings`].onChange(undefined)}>
                    <Icon className={s.iconTimes} icon="times" />
                  </Button>
                </li>
              }
              {!!undergroundGarages &&
                <li className={cn(!isOpened ? s.filterItem : s.filterItemInner)}>
                  подземный гараж
                  <Button className={s.btnTimes} type="button" onClick={() => fields[`buildings.details.undergroundGarages`].onChange(undefined)}>
                    <Icon className={s.iconTimes} icon="times" />
                  </Button>
                </li>
              } */}
              {/* {!!filterCount &&
                <li className={cn(!isOpened ? s.filterItem : s.filterItemInner, s.textPrimary)} onClick={resetFilter}>
                  Удалить все
                </li>
              } */}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Selected;
