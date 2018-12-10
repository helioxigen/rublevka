import React, { Component } from 'react';

import { fetchDictionary } from 'cem/helpers/autocomplete';
import { bannerStatesPlural } from 'cem/constants/properties/dictionaries';

import * as bannerHeaders from './headers';

import ModalApprove from '../modal/approve';
import ModalReject from '../modal/reject';

import { FormattedDate } from 'react-formatted';
import User from 'cem/containers/common/user';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Button, Icon, Grid, Table, Heading,
  StaticDictionary, Tooltip,
  Table: { Row, Cell },
  Grid: { Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class Banner extends Component {
  update() {
    const {
      propertyId, category, bannerState, actions,
      formKey, values,
    } = this.props;
    actions.updateBanner(propertyId, category, formKey, values)
      .then(() => {
        actions.loadBanners(propertyId, category, bannerState);
        actions.loadBanners(propertyId, category, values.state);
      });
  }

  render() {
    const { bannerState, data, state } = this.props;
    const isUserResponsible = state.auth.id === data.responsibleUserId;

    return (
      <Row>
        {(bannerState === 'ordered' || bannerState === 'active') &&
          <Cell>
            <FormattedDate value={data.dateOfCompletion} mask="dd.mm.yyyy" />
          </Cell>
        }
        {(bannerState === 'denied' || bannerState === 'removed') &&
          <Cell>
            <FormattedDate value={data.createdAt} mask="dd.mm.yyyy" />
          </Cell>
        }
        <Cell>
          <User simple id={data.responsibleUserId} />
        </Cell>
        <Cell>
          <StaticDictionary fetch={fetchDictionary('property_banner')} value={data.kindId} labelKey="title" valueKey="id" />
        </Cell>
        {(bannerState === 'removed' || bannerState === 'denied') &&
          <Cell>{data.reason}</Cell>
        }
        {(bannerState === 'ordered' || bannerState === 'active' || bannerState === 'removed') &&
          <Cell>
            {data.image && (
              <Tooltip title="Посмотреть фотографию" position="top">
                <Button className={sButton.btnTableAction} to={`${data.image.url}-1024`} target="_blank">
                  <Icon className={s.btnIcon} icon="download" />
                </Button>
              </Tooltip>
            )}
            {bannerState === 'ordered' && isUserResponsible && <ModalApprove {...this.props} formKey={data.id} data={data} initialValues={{ ...data, state: 'active' }} />}
            {bannerState === 'active' && isUserResponsible && <ModalReject {...this.props} formKey={data.id} data={data} initialValues={{ ...data, state: 'removed' }} />}
          </Cell>
        }
      </Row>
    );
  }
}

export default class extends Component {
  render() {
    const { bannerState, items } = this.props;

    return (
      <Grid.Row className={sUtils.pushedBottom3}>
        <Col xs="20">
          <Heading size="sm" className={sUtils.resetIndentation}>{bannerStatesPlural[bannerState]}</Heading>
        </Col>
        <Col xs="20">
          {items && !!items.length &&
            <div className={sUtils.scrollX}>
              <Table.Container width="100%" className={cn(sUtils.pushedBottom1, sUtils.width120)}>
                {bannerHeaders[bannerState]}
                {items.map(item =>
                  <Banner key={item.id} id={item.id} data={item} {...this.props} />,
                )}
              </Table.Container>
            </div>
          }
          {!items || !items.length && <span>Нет внешней рекламы</span>}
        </Col>
      </Grid.Row>
    );
  }
}
