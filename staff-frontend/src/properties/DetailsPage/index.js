import React from 'react';
import ObjectEdit from './ObjectEdit';
import ObjectInfo from './ObjectInfo';

// TODO TEMPORARY TEST DATA
const testObjectSettings = {
  type: 1,
  status: 3,
  yes: 1,
};

class PropertyDetailsPage extends React.PureComponent {
  state = {
    editMode: false,
    objectSettings: testObjectSettings,
  };

  render() {
    const { editMode, objectSettings } = this.state;
    const { match } = this.props;
    const { id: propertyId } = match.params;
    return (
      <React.Fragment>
        {editMode ? (
          <ObjectEdit
            objectSettings={objectSettings}
            disableEditMode={() => this.setState({ editMode: false })}
          />
        ) : (
          <ObjectInfo
            propertyId={propertyId}
            enableEditMode={() => this.setState({ editMode: true })}
          />
        )}
      </React.Fragment>
    );
  }
}

export default PropertyDetailsPage;
