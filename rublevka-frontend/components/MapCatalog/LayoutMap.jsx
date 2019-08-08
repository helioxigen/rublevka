import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import uniqBy from 'lodash/uniqBy';
import { Map, ZoomControl, ObjectManager } from 'react-yandex-maps';
import TemplateProvider from './TemplateProvider';
import { sc, media } from '@utils';
import { setDisplayedItemsIds } from '@store';

const LayoutMap = ({ className, mapMarginLeft, openCardsList, items = [] }) => {
    const [ymap, setYmap] = useState(null);
    const dispatch = useDispatch();
    const features = useMemo(
        () =>
            uniqBy(items, 'id').map(({ location, id }) => ({
                type: 'Feature',
                id,
                geometry: {
                    type: 'Point',
                    coordinates: [location.latitude, location.longitude],
                },
            })),
        [items]
    );

    useEffect(() => {
        if (ymap) {
            ymap.margin.setDefaultMargin([0, 0, 0, mapMarginLeft]);
        }
    }, [mapMarginLeft]);

    // useEffect(() => {
    //     if (!ymap) return;

    //     const currentZoom = ymap.getZoom();

    //     if (!clasterFocused && currentZoom !== defaults.zoom) {
    //         ymap.setCenter(defaults.center, defaults.zoom);
    //     }
    // }, [clasterFocused, ymap]);

    const [objectManager, setObjetManagerRef] = useState(null);

    useEffect(() => {
        if (!objectManager) return () => {};

        const handleObjectClick = e => {
            const id = e.get('objectId');

            const cluster = objectManager.clusters.getById(id);

            if (!cluster || !cluster.features.length || ymap.getZoom() < 15) return;

            dispatch(setDisplayedItemsIds(cluster.features.map(f => f.id), cluster.id));
            openCardsList();
        };

        objectManager.events.add('click', handleObjectClick);

        return () => {
            objectManager.events.remove('click', handleObjectClick);
        };
    }, [objectManager]);

    return (
        <Map
            className={className}
            defaultOptions={{
                maxZoom: 15,
            }}
            defaultState={{
                center: [55.7, 37.1],
                zoom: 11,
                margin: [0, 0, 0, typeof window !== 'undefined' && window.screen.availWidth < 962 ? 0 : mapMarginLeft],
                controls: [],
                // isDef{center: [55.7, 37.1],
                // zoom: 11,}
            }}
            // state={{
            //     center: [55.7, 37.1],
            //     zoom: 11,
            // }}
            width="100%"
            height="100%"
            instanceRef={setYmap}
        >
            <ZoomControl
                options={{
                    position: {
                        left: 'auto',
                        right: 10,
                        top: 108,
                    },
                }}
            />
            <TemplateProvider>
                {({ template }) => (
                    <ObjectManager
                        options={{
                            clusterize: true,
                            gridSize: 64,
                            minClusterSize: 1,
                            // clusterDisableClickZoom: true,
                        }}
                        objects={{
                            preset: 'islands#greenDotIcon',
                        }}
                        clusters={{
                            // preset: 'islands#redClusterIcons',
                            clusterIconLayout: template,
                            clusterIconShape: {
                                type: 'Circle',
                                coordinates: [0, 0],
                                radius: 38,
                            },
                        }}
                        instanceRef={setObjetManagerRef}
                        features={features}
                    />
                )}
            </TemplateProvider>
        </Map>
    );
};

export default styled(LayoutMap)`
    width: 100%;
    height: 100%;

    ${media.desktop.to(
        css => css`
            ymaps[class$='zoom'] {
                display: none;
            }
        `
    )}

    .clusterIcon {
        width: 44px;
        height: 44px;

        display: flex;
        justify-content: center;
        align-items: center;

        border: 3px solid ${sc.theme.colors.red};
        border-radius: 50%;
        box-sizing: border-box;

        background: linear-gradient(0deg, rgba(244, 67, 54, 0.1), rgba(244, 67, 54, 0.1)), rgba(255, 255, 255, 0.75);

        transition: transform 225ms cubic-bezier(0.230, 1.000, 0.320, 1.000);

        &[data-cluster-id="${p => p.clusterId}"] {
            background: white;
            transform: scale(1.2);
        }
    }
`;
