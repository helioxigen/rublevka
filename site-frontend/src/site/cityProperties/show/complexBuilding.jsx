import React, { Component } from 'react';

// constants
import * as dict from 'site/constants/properties/city/dictionary';

// ui
import UI from 'site/ui';
const {
  Grid: { Container, Row, Col },
} = UI;

// styles
import s from 'site/styles/property/description';
import sUtils from 'site/styles/utils';

class ComplexBuilding extends Component {
  render() {
    const { complexBuildingDetails } = this.props;

    if (complexBuildingDetails) {
      return (
        <Container>
          <Row>
            <Col sm="6" md="4" className={s.pushedBottom3}>
              <h3 className={s.title}>Здание</h3>

              <Row>
                <Col sm="9" className={sUtils.pushedBottomXs2Sm3}>
                  {complexBuildingDetails.constructionKind &&
                    <dl className={s.list}>
                      <dt className={s.listTitle}>Тип:&nbsp;</dt>
                      <dd className={s.listItem}>{dict.constructionKinds[complexBuildingDetails.constructionKind]}</dd>
                    </dl>
                  }
                  <dl className={s.list}>
                    <dt className={s.listTitle}>Год постройки:&nbsp;</dt>
                    <dd className={s.listItem}>{complexBuildingDetails.builtYear ? complexBuildingDetails.builtYear : '–'}</dd>
                  </dl>
                  {complexBuildingDetails.floors &&
                    <dl className={s.list}>
                      <dt className={s.listTitle}>Этажей:&nbsp;</dt>
                      <dd className={s.listItem}>{complexBuildingDetails.floors}</dd>
                    </dl>
                  }
                  {complexBuildingDetails.elevators && (
                    <dl className={s.list}>
                      <dt className={s.listTitle}>Лифтов:&nbsp;</dt>
                      <dd className={s.listItem}>{complexBuildingDetails.elevators}</dd>
                    </dl>
                  )}
                  {complexBuildingDetails.freightElevators && (
                    <dl className={s.list}>
                      <dt className={s.listTitle}>Грузовых лифтов:&nbsp;</dt>
                      <dd className={s.listItem}>{complexBuildingDetails.freightElevators}</dd>
                    </dl>
                  )}
                  {complexBuildingDetails.security &&
                    <dl className={s.list}>
                      <dt className={s.listTitle}>Территория:&nbsp;</dt>
                      <dd className={s.listItem}>{dict.securityKinds[complexBuildingDetails.security]}</dd>
                    </dl>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }

    return null;
    // else if (!complexBuildingDetails) {
    //   return (
    //     <Col sm="6" md="4" className={s.pushedTopXs1_5}>
    //       <h3 className={s.title}>Здание</h3>
    //       <Row>
    //         <Col sm="9" className={sUtils.pushedBottomXs2Sm3}>
    //           {complexDetails.constructionKind &&
    //             <dl className={s.list}>
    //               <dt className={s.listTitle}>Тип:&nbsp;</dt>
    //               <dd className={s.listItem}>{dict.constructionKinds[complexDetails.constructionKind]}</dd>
    //             </dl>
    //           }
    //           <dl className={s.list}>
    //             <dt className={s.listTitle}>Год постройки:&nbsp;</dt>
    //             <dd className={s.listItem}>{complexDetails.builtYear ? complexDetails.builtYear : `–`}</dd>
    //           </dl>
    //           {complexDetails.wallMaterial &&
    //             <dl className={s.list}>
    //               <dt className={s.listTitle}>Материал:&nbsp;</dt>
    //               <dd className={s.listItem}>{dict.wallMaterial[complexDetails.wallMaterial]}</dd>
    //             </dl>
    //           }
    //           {complexDetails.floors &&
    //             <dl className={s.list}>
    //               <dt className={s.listTitle}>Этажей:&nbsp;</dt>
    //               <dd className={s.listItem}>{complexDetails.floors}</dd>
    //             </dl>
    //           }
    //           {complexDetails.elevators && (
    //             <dl className={s.list}>
    //               <dt className={s.listTitle}>Лифтов:&nbsp;</dt>
    //               <dd className={s.listItem}>{complexDetails.elevators}</dd>
    //             </dl>
    //           )}
    //           {complexDetails.freightElevators && (
    //             <dl className={s.list}>
    //               <dt className={s.listTitle}>Грузовых лифтов:&nbsp;</dt>
    //               <dd className={s.listItem}>{complexDetails.freightElevators}</dd>
    //             </dl>
    //           )}
    //           {complexDetails.security &&
    //             <dl className={s.list}>
    //               <dt className={s.listTitle}>Территория:&nbsp;</dt>
    //               <dd className={s.listItem}>{dict.securityKinds[complexDetails.security]}</dd>
    //             </dl>
    //           }
    //         </Col>
    //       </Row>
    //     </Col>
    //   );
    // }
  }
}

export default ComplexBuilding;
