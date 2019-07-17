import React from 'react';
import { withYMaps } from 'react-yandex-maps';

class TemplateProvider extends React.Component {
    constructor() {
        super();
        this.state = { template: null };
    }

    componentDidMount() {
        const { ymaps } = this.props;

        this.setState({
            template: ymaps.templateLayoutFactory.createClass(
                '<div data-cluster-id="{{ id }}" class="clusterIcon">{{ properties.geoObjects.length }}</div>'
            ),
        });
    }

    render() {
        const { template } = this.state;
        const { children } = this.props;

        return children({ template });
    }
}

export default withYMaps(TemplateProvider, true, ['templateLayoutFactory']);
