import React from 'react';
import EditView from './EditView';
import InfoView from './InfoView';

// TODO TEMPORARY TEST DATA
const testObjectSettings = {
  type: 1,
  status: 3,
  yes: 1,
};

class DetailsPage extends React.PureComponent {
  state = {
    editMode: false,
    objectSettings: testObjectSettings,
  };

  render() {
    const { editMode, objectSettings } = this.state;
    return (
      <React.Fragment>
        {editMode ? (
          <EditView
            objectSettings={objectSettings}
            disableEditMode={() => this.setState({ editMode: false })}
          />
        ) : (
          <InfoView enableEditMode={() => this.setState({ editMode: true })} />
        )}
      </React.Fragment>
    );
  }
}

export default DetailsPage;
