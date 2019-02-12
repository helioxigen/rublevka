import React, { Component } from 'react';
import { Link } from 'react-router';

// redux
import { connect } from 'react-redux';
import { dispatch } from 'cem/store';
import loadFunnel from 'cem/_reports/actions/loadFunnel';

// styles
import cn from 'classnames';
import sUtils from 'cem/styles/utils';

// ui
import filterHelper from 'core/decorators/filter';
import DatePickerField from 'cem/helpers/datePickerField';
import UI from 'cem/components/ui';
const {
  Heading,
  Table: {
    Container: Table,
    Heading: TableHeading,
    Row: TableRow,
    Cell: TableCell,
  },
  Grid: { Row, Col },
} = UI;

// constants
import { resourceName } from 'cem/_reports/constants/defaults';

// helpers
import isEqual from 'lodash/isEqual';
import isUpdated from 'core/helpers/isUpdated';

class FunnelTable extends Component {
  state = {
    orderByField: `departmentId`,
    asc: true,
  };

  componentWillMount() {
    this.setGroup(this.props, this.load);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(resourceName, this.props, nextProps)) {
      this.load(nextProps);
    }

    if (!isEqual(this.props.params, nextProps.params)) {
      this.setGroup(nextProps, () => this.load(nextProps));
    }
  }

  setGroup(props, cb) {
    const { departmentId, divisionId, staffUserId } = props.params;

    let group = `funnel`;

    if (departmentId) group = `funnelByDepartmentId`;
    if (divisionId) group = `funnelByDivisionId`;
    if (staffUserId) group = `funnelByStaffUserId`;

    this.setState(
      {
        group,
        resource: `${resourceName}.${group}`,
      },
      cb,
    );
  }

  load(props = this.props) {
    const filter = props.filters[resourceName];
    const { departmentId, divisionId, staffUserId } = props.params;

    dispatch(
      loadFunnel(
        {
          filter: {
            ...filter,
            departmentId,
            divisionId,
            staffUserId,
          },
        },
        this.state.group,
      ),
    );
  }

  updateOrder(orderByField) {
    this.setState({
      orderByField,
      asc: !this.state.asc,
    });
  }

  render() {
    const { fields } = this.props;
    const { items = [], isFetching } =
      this.props._reports[this.state.group] || {};
    const { orderByField } = this.state;

    return (
      <section className={cn(sUtils.section, sUtils.overflowScroll)}>
        <Row>
          <Col sm="14">
            <Heading size="md">Воронка продаж</Heading>
          </Col>
          <Col sm="3">
            <DatePickerField placeholder="дата от" {...fields.createdAtFrom} />
          </Col>
          <Col sm="3">
            <DatePickerField placeholder="дата до" {...fields.createdAtTo} />
          </Col>
        </Row>

        <Table>
          <TableRow>
            <TableHeading rowSpan="2" style={{ whiteSpace: `nowrap` }}>
              {this.state.group === `funnel` && `Департамент`}
              {this.state.group === `funnelByDepartmentId` && `Сотрудник`}
            </TableHeading>
            <TableHeading
              rowSpan="2"
              onClick={() => this.updateOrder(`clientLeadsCount`)}
              style={{
                color: orderByField === `clientLeadsCount` ? `red` : `#757575`,
              }}
            >
              Лидов
            </TableHeading>
            <TableHeading style={{ whiteSpace: `nowrap` }} colSpan="2">
              В работе
            </TableHeading>
            <TableHeading style={{ whiteSpace: `nowrap` }} colSpan="2">
              Показы
            </TableHeading>
            <TableHeading style={{ whiteSpace: `nowrap` }} colSpan="2">
              Переговоры
            </TableHeading>
            <TableHeading style={{ whiteSpace: `nowrap` }} colSpan="2">
              Внесен задаток
            </TableHeading>
            <TableHeading style={{ whiteSpace: `nowrap` }} colSpan="2">
              Заключение договора
            </TableHeading>
            <TableHeading style={{ whiteSpace: `nowrap` }} colSpan="2">
              Успешная сделка
            </TableHeading>
          </TableRow>
          <TableRow>
            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                paddingLeft: `1.5rem`,
                color: orderByField === `inProgressCount` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`inProgressCount`)}
            >
              Кол-во
            </TableHeading>
            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color:
                  orderByField === `inProgressPercentage` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`inProgressPercentage`)}
            >
              Конверсия
            </TableHeading>

            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color:
                  orderByField === `presentationsCount` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`presentationsCount`)}
            >
              Кол-во
            </TableHeading>
            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color:
                  orderByField === `presentationsPercentage`
                    ? `red`
                    : `#757575`,
              }}
              onClick={() => this.updateOrder(`presentationsPercentage`)}
            >
              Конверсия
            </TableHeading>

            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color: orderByField === `negotiationsCount` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`negotiationsCount`)}
            >
              Кол-во
            </TableHeading>
            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color:
                  orderByField === `negotiationsPercentage` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`negotiationsPercentage`)}
            >
              Конверсия
            </TableHeading>

            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color: orderByField === `agreementsCount` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`agreementsCount`)}
            >
              Кол-во
            </TableHeading>
            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color:
                  orderByField === `agreementsPercentage` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`agreementsPercentage`)}
            >
              Конверсия
            </TableHeading>

            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color: orderByField === `depositsCount` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`depositsCount`)}
            >
              Кол-во
            </TableHeading>
            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color:
                  orderByField === `depositsPercentage` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`depositsPercentage`)}
            >
              Конверсия
            </TableHeading>

            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color:
                  orderByField === `successfulDealsCount` ? `red` : `#757575`,
              }}
              onClick={() => this.updateOrder(`successfulDealsCount`)}
            >
              Кол-во
            </TableHeading>
            <TableHeading
              style={{
                whiteSpace: `nowrap`,
                color:
                  orderByField === `successfulDealsPercentage`
                    ? `red`
                    : `#757575`,
              }}
              onClick={() => this.updateOrder(`successfulDealsPercentage`)}
            >
              Конверсия
            </TableHeading>
          </TableRow>

          {!isFetching &&
            items
              .sort((left, right) =>
                this.state.asc
                  ? right[orderByField] - left[orderByField]
                  : left[orderByField] - right[orderByField],
              )
              .map((data, index) => (
                <TableRow key={index}>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {this.state.group === `funnel` && (
                      <Link to={`/reports/funnel/${data.departmentId}`}>
                        {data.departmentName}
                      </Link>
                    )}
                    {this.state.group === `funnelByDepartmentId` &&
                      data.staffUserFullName}
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.clientLeadsCount}
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.inProgressCount}
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.inProgressPercentage.toFixed(2)}%
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.presentationsCount}
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.presentationsPercentage.toFixed(2)}%
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.negotiationsCount}
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.negotiationsPercentage.toFixed(2)}%
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.agreementsCount}
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.agreementsPercentage.toFixed(2)}%
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.depositsCount}
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.depositsPercentage.toFixed(2)}%
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.successfulDealsCount}
                  </TableCell>
                  <TableCell style={{ whiteSpace: `nowrap` }}>
                    {data.successfulDealsPercentage.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
        </Table>
      </section>
    );
  }
}

const pickState = ({ _reports, filters, pagination, order }) => ({
  _reports,
  filters,
  pagination,
  order,
});

const filterFields = [`createdAtFrom`, `createdAtTo`];

export default filterHelper(resourceName, filterFields)(
  connect(pickState)(FunnelTable),
);
