import React from 'react';
import styled from 'styled-components';

import getLastExportResultRecord from './requests/getLastExportResultRecord';

const Section = styled.section`
  background-color: #fff;
  padding: 24px 24px 0;
  margin-bottom: 32px;
  box-shadow: 0px 0px 8px #eaeaea;
  border: 1px solid #eaeaea;
  border-radius: 4px;
`;

const Heading = styled.h2`
  font-family: PT Sans;
  font-weight: bold;
  border-bottom: 1px solid #edeff5;
  margin: 0;
  padding-bottom: 10px;
`;

const HeadingBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeadingBarToggle = styled.div`
  align-self: end;
`;

const InfoDiv = styled.div`
  margin: 5px 0;
`;

const ErrorsWarningsTable = styled.table`
  width: 100%;
  text-align: center;
  border: 1px black;
  margin-top: 24px;
`;


export default class ExportResults extends React.Component {
    state = {
        isInfoLoading: true,
        isInfoVisible: false,
        info: {}
    }

    componentDidMount(){
      this.loadInfo();
    }

    async loadInfo(){
      let res = await getLastExportResultRecord();

      this.setState({
        isInfoLoading: false,
        info: res
      })
    }

    toggleVisibility = () => {
      this.setState((state) => ({
        isInfoVisible: !state.isInfoVisible
      }))
    }

    render(){
      const { isInfoLoading, isInfoVisible, info } = this.state;

      let headingBarErrorsColor = 'green';
      if (Object.keys(info).length !== 0 && (this.state.info.errors.length > 0 || this.state.info.warnings.length > 0) ){
        headingBarErrorsColor = 'orange';
      }

      let headingBarDateColor = 'green';
      let mergedEvents = [];
      if (Object.keys(info).length !== 0){
        let lastExportDifference = Date.now() / 1000 - this.state.info.createdAt.seconds;
        if (lastExportDifference > 10 * 60){
          headingBarDateColor = 'orange';
        }
        mergedEvents = info.errors.map(x => ({...x, type: 'error'}) ).concat(info.warnings.map(x => ({...x, type: 'warning'}) ))
      }


      return (
          <Section>
              <HeadingBar>
                <Heading>Статус последнего экспорта XML</Heading>
                <div>
                  {!isInfoLoading && (
                    <div>
                      <div style={{color: headingBarErrorsColor}}> 
                        <b>{info.errors.length}</b> ошибок и <b>{info.warnings.length}</b> предупреждений
                      </div>
                      <div style={{color: headingBarDateColor}}>
                        {info.createdAt.toDate().toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
                <HeadingBarToggle>
                  <button onClick={this.toggleVisibility}>
                    {isInfoVisible ? 'Свернуть' : 'Развернуть'}
                  </button>
                  </HeadingBarToggle>
              </HeadingBar>

                {!isInfoLoading && isInfoVisible && Object.keys(info).length !== 0 && (
                  <InfoDiv>
                    Дата выполнения последнего экспорта XML: {info.createdAt.toDate().toLocaleString()}
                    <br/>
                    Количество объектов в экспорте: {info.objectsCount}
                    <br/>
                    Во время экспорта произошло <b>{info.errors.length}</b> ошибок и <b>{info.warnings.length}</b> предупреждений.
                    <ErrorsWarningsTable>
                      <caption>Таблица ошибок и предупреждений</caption>
                      <thead>
                        <tr>
                          <th>Тип события</th>
                          <th>ID объекта</th>
                          <th>Сообщение</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mergedEvents.map(item => {
                          return (<tr key={item.id}>
                            <td>{item.type}</td>
                            <td>{item.id}</td>
                            <td>{item.text}</td>
                          </tr>)
                        })}
                      </tbody>
                    </ErrorsWarningsTable>
                  </InfoDiv>
                )}

          </Section>
      )
    }
}