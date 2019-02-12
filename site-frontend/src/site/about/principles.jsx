import React, { Component } from 'react';
import { Motion, spring, presets } from 'react-motion';

import cn from 'classnames';
import UI from 'site/ui';
const {
  Button,
  Icon,
  RetinaImage,
  Grid: { Container, Col, Row },
} = UI;

import s from 'site/styles/about/list';
import sUtils from 'site/styles/utils';

class Principles extends Component {
  state = {
    selected: `selected`,
  };

  render() {
    return (
      <section className={s.principlesContainer}>
        <Container>
          <Col xs="12">
            <h1 className={s.titleLg}>Принципы</h1>
          </Col>
        </Container>

        <div className={sUtils.pushedTopXs2_2Md5_8}>
          <Container>
            <Row>
              <Col xs="12" className={sUtils.pushedTopSm3_2}>
                <div className={cn(s.flex, s.paddingBottomSm6Md10)}>
                  <div className={cn(s.flexItem, s.order1)}>
                    <RetinaImage
                      src="//s3.eu-central-1.amazonaws.com/dt-marketing/assets/about/work"
                      ext="png"
                      className={s.illustration}
                      width="233"
                      height="188"
                    />
                  </div>

                  <div className={cn(s.flexItem, s.order2)}>
                    <h2 className={s.titleSm}>
                      Работаем <br className={sUtils.hideFromSm} /> по
                      стандартам
                    </h2>

                    {/* with animations */}
                    <div
                      className={cn(
                        this.state.selected !== `work` && s.gradient,
                        sUtils.hideFromSm,
                      )}
                    >
                      <Motion
                        style={{
                          height: spring(
                            this.state.selected === `work` ? 500 : 120,
                            presets.noWobble,
                          ),
                        }}
                      >
                        {({ height }) => (
                          <div
                            className={cn(sUtils.pushedTopXs3Sm2_5Md3_8)}
                            style={{
                              maxHeight: `${height}px`,
                              overflow:
                                this.state.selected === `work`
                                  ? `visible`
                                  : `hidden`,
                            }}
                          >
                            <p className={s.textSm}>
                              Чтобы сделать работу системной, мы прописали
                              стандарты. 101 документ – инструкции, рекомендации
                              и правила поведения – используются каждый день и
                              контролируют работу агентов.
                            </p>
                            <p className={s.textSm}>
                              Стандарты дисциплинируют, но не мешают агентам
                              подходить к каждому клиенту индивидуально.
                            </p>
                          </div>
                        )}
                      </Motion>
                    </div>

                    {/* without animations */}
                    <div
                      className={cn(
                        sUtils.pushedTopXs3Sm2_5Md3_8,
                        sUtils.hideXs,
                      )}
                    >
                      <p className={s.textSm}>
                        Чтобы сделать работу системной, мы прописали стандарты.{' '}
                        <br />
                        101 документ – инструкции, рекомендации и правила
                        поведения – используются каждый день и контролируют
                        работу агентов.
                      </p>
                      <p className={s.textSm}>
                        Стандарты дисциплинируют, но не мешают агентам подходить
                        к каждому клиенту индивидуально.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  block
                  className={cn(s.btn, sUtils.hideFromSm)}
                  onClick={() =>
                    this.setState({
                      selected:
                        this.state.selected === `work` ? `selected` : `work`,
                    })
                  }
                >
                  <Icon
                    className={cn(
                      s.iconArrow,
                      this.state.selected === `work` && s.up,
                    )}
                    icon="arrow-wide"
                  />
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        <div className={cn(sUtils.bgWhite, s.paddingTopSm3Md8_3)}>
          <Container>
            <Row>
              <Col xs="12" className={sUtils.pushedTop2_5}>
                <div className={cn(s.flex, s.paddingBottomSm6Md10)}>
                  <div className={s.flexItem}>
                    <RetinaImage
                      src="//s3.eu-central-1.amazonaws.com/dt-marketing/assets/about/customerService"
                      ext="png"
                      className={s.illustration}
                      width="233"
                      height="188"
                    />
                  </div>

                  <div className={s.flexItem}>
                    <h2 className={cn(s.titleSm, s.lineHeight4_5)}>
                      Выстраиваем теплые человеческие отношения{' '}
                      <br className={sUtils.hideFromSm} />с клиентом
                    </h2>

                    {/* with animations */}
                    <div
                      className={cn(
                        this.state.selected !== `customerService` &&
                          s.gradientWhite,
                        sUtils.hideFromSm,
                      )}
                    >
                      <Motion
                        style={{
                          height: spring(
                            this.state.selected === `customerService`
                              ? 500
                              : 125,
                            presets.noWobble,
                          ),
                        }}
                      >
                        {({ height }) => (
                          <div
                            className={sUtils.pushedTop3}
                            style={{
                              maxHeight: `${height}px`,
                              overflow:
                                this.state.selected === `customerService`
                                  ? `visible`
                                  : `hidden`,
                            }}
                          >
                            <p className={s.textSm}>
                              Мы считаем, что агент – не рядовой посредник, а
                              помощник. Он поможет с поисками, посоветует,
                              расскажет о доме и ответит на вопросы всех членов
                              семьи.
                            </p>
                            <p className={s.textSm}>
                              Как правило, агенты продолжают общаться с
                              покупателями и собственниками после сделки:
                              созваниваются, встречаются за чашкой кофе, ходят
                              на свадьбы и юбилеи.
                            </p>
                          </div>
                        )}
                      </Motion>
                    </div>

                    {/* without animations */}
                    <div className={cn(sUtils.pushedTop3, sUtils.hideXs)}>
                      <p className={s.textSm}>
                        Мы считаем, что агент – не рядовой посредник, а
                        помощник. Он поможет{' '}
                        <br className={sUtils.hideFromMd} />с поисками,
                        посоветует, расскажет о доме{' '}
                        <br className={sUtils.hideXsSm} />и ответит на вопросы
                        всех членов семьи.
                      </p>
                      <p className={s.textSm}>
                        Как правило, агенты продолжают общаться с покупателями{' '}
                        <br />и собственниками после сделки: созваниваются,
                        встречаются за чашкой кофе, ходят на свадьбы и юбилеи.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  block
                  className={cn(s.btn, sUtils.hideFromSm)}
                  onClick={() =>
                    this.setState({
                      selected:
                        this.state.selected === `customerService`
                          ? `selected`
                          : `customerService`,
                    })
                  }
                >
                  <Icon
                    className={cn(
                      s.iconArrow,
                      this.state.selected === `customerService` && s.up,
                    )}
                    icon="arrow-wide"
                  />
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        <div className={s.paddingTopSm3Md8_3}>
          <Container>
            <Row>
              <Col xs="12" className={sUtils.pushedTop2_5}>
                <div className={cn(s.flex, s.paddingBottomSm6Md10)}>
                  <div className={cn(s.flexItem, s.order1)}>
                    <RetinaImage
                      src="//s3.eu-central-1.amazonaws.com/dt-marketing/assets/about/sale"
                      ext="png"
                      className={s.illustration}
                      width="233"
                      height="188"
                    />
                  </div>

                  <div className={cn(s.flexItem, s.order2)}>
                    <h2 className={s.titleSm}>
                      Не продаем,
                      <br className={sUtils.hideFromSm} /> а подбираем
                    </h2>

                    <div
                      className={cn(sUtils.pushedTop3, sUtils.pushedBottom6)}
                    >
                      <p className={s.textSm}>
                        Агент подбирает дома, квартиры{' '}
                        <br className={sUtils.hideFromMd} />и участки, опираясь{' '}
                        <br className={sUtils.hideXsSm} />
                        на потребности клиента. Чтобы помочь с выбором,{' '}
                        <br className={sUtils.hideXsSm} />
                        он внимательно слушает, задает вопросы, уточняет{' '}
                        <br className={sUtils.hideXsSm} />и предлагает варианты.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className={cn(sUtils.bgWhite, s.paddingTopSm3Md8_3)}>
          <Container>
            <Row>
              <Col xs="12" className={sUtils.pushedTop2_5}>
                <div className={cn(s.flex, s.paddingBottomSm6Md10)}>
                  <div className={s.flexItem}>
                    <RetinaImage
                      src="//s3.eu-central-1.amazonaws.com/dt-marketing/assets/about/guarantee"
                      ext="png"
                      className={s.illustration}
                      width="233"
                      height="188"
                    />
                  </div>

                  <div className={s.flexItem}>
                    <h2 className={cn(s.titleSm, s.lineHeight4_5)}>
                      Отвечаем за документы
                    </h2>

                    {/* with animations */}
                    <div
                      className={cn(
                        this.state.selected !== `guarantee` && s.gradientWhite,
                        sUtils.hideFromSm,
                      )}
                    >
                      <Motion
                        style={{
                          height: spring(
                            this.state.selected === `guarantee` ? 500 : 140,
                            presets.noWobble,
                          ),
                        }}
                      >
                        {({ height }) => (
                          <div
                            className={sUtils.pushedTop3}
                            style={{
                              maxHeight: `${height}px`,
                              overflow:
                                this.state.selected === `guarantee`
                                  ? `visible`
                                  : `hidden`,
                            }}
                          >
                            <p className={s.textSm}>
                              Наш штатный юрист проверяет документы на
                              подлинность – мы отсеиваем недобросовестных
                              собственников.
                            </p>
                            <p className={s.textSm}>
                              Чтобы соблюдать интересы участников сделки, юрист
                              вместе с агентом составляют договор с учетом
                              требований и условий. Мы не используем готовые
                              договоры – составляем новый документ для каждой
                              сделки.
                            </p>
                          </div>
                        )}
                      </Motion>
                    </div>

                    {/* without animations */}
                    <div className={cn(sUtils.pushedTop3, sUtils.hideXs)}>
                      <p className={s.textSm}>
                        Наш штатный юрист проверяет документы на подлинность{' '}
                        <br className={sUtils.hideXsSm} /> – мы отсеиваем
                        недобросовестных собственников.
                      </p>
                      <p className={s.textSm}>
                        Чтобы соблюдать интересы участников сделки, юрист вместе
                        с агентом составляют договор с учетом требований и
                        условий. Мы не используем готовые договоры – составляем
                        новый документ для каждой сделки.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  block
                  className={cn(s.btn, sUtils.hideFromSm, sUtils.pushedTop1)}
                  onClick={() =>
                    this.setState({
                      selected:
                        this.state.selected === `guarantee`
                          ? `selected`
                          : `guarantee`,
                    })
                  }
                >
                  <Icon
                    className={cn(
                      s.iconArrow,
                      this.state.selected === `guarantee` && s.up,
                    )}
                    icon="arrow-wide"
                  />
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default Principles;
