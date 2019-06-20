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
  min-height: 100px;
`;

const Heading = styled.h2`
  font-family: PT Sans;
  font-weight: bold;
  border-bottom: 1px solid #edeff5;
  margin: 0;
  padding-bottom: 10px;
`;

const LoadingDiv = styled.div`
  text-align: center;
  padding: 24px;
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


class ExportResults extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isInfoLoading: false,
            info: {}
        }
    }

    componentDidMount(){
      this.loadInfo();
    }

    async loadInfo(){
      this.setState({
        isInfoLoading: true
      });

      let res = await getLastExportResultRecord();

      this.setState({
        isInfoLoading: false,
        info: res
      })
    }

    render(){

        return (
            <Section>
                <Heading>Статус последнего экспорта XML</Heading>
                {this.state.isInfoLoading && (
                    <LoadingDiv> Загрузка... </LoadingDiv>
                )}

                {!this.state.isInfoLoading && Object.keys(this.state.info).length === 0 && (
                  <LoadingDiv> Произошла ошибка при выполнении запроса </LoadingDiv>
                )}

                {!this.state.isInfoLoading && Object.keys(this.state.info).length !== 0 && (
                  <InfoDiv>
                    Дата выполнения последнего экспорта XML: {this.state.info.createdAt.toDate().toLocaleString()}
                    <br/>
                    Количество объектов в экспорте: {this.state.info.objectsCount}
                    <br/>
                    Во время экспорта произошло <b>{this.state.info.errors.length}</b> ошибок и <b>{this.state.info.warnings.length}</b> предупреждений.
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
                        {this.state.info.errors.map(x => ({...x, type: 'error'}) ).concat(this.state.info.warnings.map(x => ({...x, type: 'warning'}) )).map(item => {
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

export default ExportResults;