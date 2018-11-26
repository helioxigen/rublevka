import React from 'react';

export default function () {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <header>
          <h2>Продажа дома в "Николо-Урюпино"</h2>
          <address>Новорижское ш., 14 км. от МКАД</address>
        </header>

        <main>
          <section>
            <h2>Условия</h2>

            <dl>
              <div className="row">
                <div className="col-xs-4">
                  <dt>Стоимость</dt>
                  <dd>
                    <p>60 000 000 руб.</p>
                    <small>
                      <strong>Стоимость за м²:</strong>
                      <span>200 000 руб.</span>
                    </small>
                  </dd>
                </div>
                <div className="col-xs-4">
                  <dt>Комиссия</dt>
                  <dd>
                    <p>5,0%</p>
                    <small>
                      <strong>Полная комиссия:</strong>
                      <span>3 000 000 руб.</span>
                    </small>
                  </dd>
                </div>
                <div className="col-xs-4">
                  <dt>Текущий статус</dt>
                  <dd>Продан</dd>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-xs-4">
                  <dt>Тип продажи</dt>
                  <dd>Свободная продажа</dd>

                  <dt>Статус продажи</dt>
                  <dd>Вторичная продажа</dd>

                  <dt>Торг</dt>
                  <dd>Отсутствует</dd>
                </div>
                <div className="col-xs-4">
                  <dt>Ипотека</dt>
                  <dd>Невозможна</dd>

                  <dt>Рассрочка</dt>
                  <dd>Невозможна</dd>
                </div>
                <div className="col-xs-4">
                  <dt>Закрытая продажа</dt>
                  <dd>Нет</dd>

                  <dt>Показывать на сайте</dt>
                  <dd>Да</dd>
                </div>
              </div>
            </dl>
          </section>

          <section>
            <hr />
            <h2>Параметры</h2>

            <dl className="row">
              <div className="col-xs-3">
                <dt>Площадь дома</dt>
                <dd>300,00 м²</dd>

                <dt>Этажей</dt>
                <dd>3</dd>
              </div>
              <div className="col-xs-3">
                <dt>Спален</dt>
                <dd>4</dd>

                <dt>Ванных</dt>
                <dd>5</dd>
              </div>
              <div className="col-xs-3">
                <dt>Лоджий</dt>
                <dd>Не указано</dd>

                <dt>Балконов</dt>
                <dd>1</dd>
              </div>
              <div className="col-xs-3">
                <dt>Высота потолков</dt>
                <dd>3</dd>
              </div>
            </dl>
          </section>

          <section>
            <hr />
            <div className="row">
              <div className="col-xs-3">
                <h4>Состояние</h4>
              </div>
              <dl className="col-xs-9">
                <div className="row">
                  <div className="col-xs-4">
                    <dt>Стадия строительства</dt>
                    <dd>Под ключ</dd>
                  </div>
                  <div className="col-xs-4">
                    <dt>Мебель</dt>
                    <dd>С мебелью</dd>
                  </div>
                  <div className="col-xs-4">
                    <dt>Состояние</dt>
                    <dd>Отличное</dd>
                  </div>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <hr />
            <div className="row">
              <div className="col-xs-3">
                <h4>Конструктив</h4>
              </div>
              <dl className="col-xs-9">
                <div className="row">
                  <div className="col-xs-4">
                    <dt>Стены</dt>
                    <dd>Кирпич</dd>

                    <dt>Крыша</dt>
                    <dd>Металлочерепица</dd>
                  </div>
                  <div className="col-xs-4">
                    <dt>Кондиционирование</dt>
                    <dd>Полное</dd>

                    <dt>Вентиляция</dt>
                    <dd>Отсутствует</dd>
                  </div>
                  <div className="col-xs-4">
                    <dt>Год постройки</dt>
                    <dd>2015</dd>
                  </div>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <hr />
            <div className="row">
              <div className="col-xs-3">
                <h4>Участок</h4>
              </div>
              <dl className="col-xs-9">
                <div className="row">
                  <div className="col-xs-4">
                    <dt>Площадь</dt>
                    <dd>8,00 сот.</dd>

                    <dt>Тип участка</dt>
                    <dd>Полевой</dd>
                  </div>
                  <div className="col-xs-4">
                    <dt>Деревья</dt>
                    <dd>Не указано</dd>

                    <dt>Рельеф</dt>
                    <dd>Не указано</dd>
                  </div>
                  <div className="col-xs-4">
                    <dt>Ландшафтные работы</dt>
                    <dd>Нет</dd>
                  </div>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <hr />
            <div className="row">
              <div className="col-xs-3">
                <h4>Парковка</h4>
              </div>
              <dl className="col-xs-9">
                <div className="row">
                  <div className="col-xs-6">
                    <dt>Машиномест в гараже</dt>
                    <dd>Не указано</dd>
                  </div>
                  <div className="col-xs-6">
                    <dt>Машиномест на парковке</dt>
                    <dd>2</dd>
                  </div>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <hr />
            <div className="row">
              <div className="col-xs-3">
                <h4>Коммуникации</h4>
              </div>
              <dl className="col-xs-9">
                <div className="row">
                  <div className="col-xs-6">
                    <dt>Электричество</dt>
                    <dd>15,00 кВт</dd>
                    <dt>Газ</dt>
                    <dd>Магистральный</dd>
                  </div>
                  <div className="col-xs-6">
                    <dt>Водоснабжение</dt>
                    <dd>Магистральный водопровод</dd>
                    <dt>Канализация</dt>
                    <dd>Магистральная канализация</dd>
                  </div>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <hr />
            <h2>Планировка</h2>
            <dl className="row">
              <div className="col-xs-4">
                <span>Детская</span>
              </div>

              <div className="col-xs-4">
                <span>СПА-зона</span>
              </div>

              <div className="col-xs-4">
                <span>Техническое помещение</span>
              </div>

              <div className="col-xs-4">
                <span>Столовая</span>
              </div>

              <div className="col-xs-4">
                <span>Кухня</span>
              </div>

              <div className="col-xs-4">
                <span>Гардеробная (2 шт.)</span>
              </div>

              <div className="col-xs-4">
                <span>Кинотеатр</span>
              </div>

              <div className="col-xs-4">
                <span>Гостиная</span>
              </div>
            </dl>
          </section>

          <section>
            <hr />
            <h2>Расположение</h2>

            <dl>
              <div className="row">
                <div className="col-xs-4">
                  <dt>Населенный пункт</dt>
                  <dd>Николо-Урюпино</dd>
                </div>
                <div className="col-xs-4">
                  <dt>Поселок</dt>
                  <dd>Николо-Урюпино</dd>
                  <div className="is-smaller">
                    <strong>От МКАД:</strong>
                    {' '}
14 км.
                  </div>
                </div>
                <div className="col-xs-4">
                  <dt>Шоссе</dt>
                  <dd>Новорижское ш.</dd>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-4">
                  <dt>Улица</dt>
                  <dd>Не указано</dd>
                </div>
                <div className="col-xs-4">
                  <dt>Номер участка</dt>
                  <dd>15</dd>
                </div>
                <div className="col-xs-4">
                  <dt>Кадастровый номер</dt>
                  <dd>Не указано</dd>
                </div>
              </div>
            </dl>

            <div id="map" />
          </section>

          <section>
            <h2>Примечание</h2>
            <p>
              10/10/16 Попова: Коллеги! Собственник готов продать этот дом. Цену пока не определил,
              если у вас есть клиенты в бюджете 60-70 миллионов рублей под ключ, проинформируйте их!
              Дом в СНТ "Никольское", на длительный срок СТРОГО. Теоретически, готов к животным,
              если это не алабай и не кошачий питомник. Скинет до 250 000, скорее всего. Дом
              абсолютно новый, ремонт только закончен, вся мебель. Качество хорошее - не суперлюкс,
              но местоположение дома с этим очень примиряет, стоит в глубине поселка, очень тихо,
              шум от дороги практически не слышен. Представитель собственника на доме практически
              круглосуточно. Договор подписываю я. Баннер вешать не разрешает, да и смысла нет - дом
              в очень приватной части НОМЕР ДОМА НЕВЕРНЫЙ! Я вписала, чтобы внести изменения, верный
              впишу позднее, когда сверимся с собственником и планом
            </p>
          </section>

          <section>
            <hr />
            <h2>Контакты</h2>
            <div className="row">
              <div className="col-xs-5">
                <h4>Игорь</h4>
                <p className="is-small">Представитель собственника</p>
              </div>
              <div className="col-xs-7">
                <div className="row">
                  <div className="col-xs-6">
                    <dt>Основной телефон</dt>
                    <dd>8 (905) 728-18-33</dd>
                  </div>
                  <div className="col-xs-6">
                    <dt>Электронный адрес</dt>
                    <dd>Не указано</dd>
                  </div>
                </div>
              </div>
            </div>

            <a href="#">Добавить контакт </a>
          </section>

          <section>
            <h4>Ответственный</h4>

            <div className="row">
              <div className="col-xs-6">
                <h5>Зверева Елена</h5>
                <small>Департамент загородной недвижимости</small>
                <small>Руководитель отдела по работе с собственниками</small>
              </div>
              <div className="col-xs-6">
                <div className="row">
                  <div className="col-xs-6">
                    <dt>Телефон</dt>
                    <dd>8 (926) 205-78-14</dd>
                  </div>
                  <div className="col-xs-6">
                    <dt>Электронный адрес</dt>
                    <dd>89645740050@mail.ru</dd>
                  </div>
                </div>
              </div>
            </div>

            <a href="#">Сменить ответственного </a>
          </section>

          <section>
            <h2>Комментарии</h2>

            <div className="row">
              <div className="col-xs-8">
                <div>
                  <div>
                    <img src="/static/core/images/placeholder-contact.svg" />
                    <div>
                      <div className="is-small is-strong">Волочай Александр</div>
                      <div className="is-smaller">25 января 2017 г.</div>
                    </div>
                    <div className="comment">Сдан </div>
                  </div>

                  <div className="commentator">
                    <img src="/static/core/images/placeholder-contact.svg" />
                    <div>
                      <div className="is-small is-strong">Неклега Владислав</div>
                      <div className="is-smaller">1 февраля 2017 г.</div>
                    </div>
                    <div className="comment">Сдан до октября 2017 года. </div>
                  </div>

                  <div className="commentator">
                    <img src="/static/core/images/placeholder-contact.svg" />
                    <div>
                      <div className="is-small is-strong">Продаж Отдел</div>
                      <div className="is-smaller">23 ноября 2017 г.</div>
                    </div>
                    <div className="comment">
                      Актуален на аренду и на продажу. Комиссия на продажу по договоренности.
                    </div>
                  </div>

                  <div className="commentator">
                    <img src="/static/core/images/placeholder-contact.svg" />
                    <div>
                      <div className="is-small is-strong">Раджави Майя</div>
                      <div className="is-smaller">5 июня 2018 г.</div>
                    </div>
                    <div className="comment">
                      Дом актуален. Цена продажи дома 1 млн.$ (старая цена была указана рублях 60
                      млн.) Аренда 250,000 руб.
                      {' '}
                    </div>
                  </div>

                  <div className="commentator">
                    <img src="/static/core/images/placeholder-contact.svg" />
                    <div>
                      <div className="is-small is-strong">Неклега Владислав</div>
                      <div className="is-smaller">21 августа 2018 г.</div>
                    </div>
                    <div className="comment">Еще не сдал, цена 220 тыс. руб. </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
}
