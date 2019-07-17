import React from 'react';
import styled from 'styled-components';
import Portal from './Portal';
import { useLockBodyScroll } from '@hooks';

export default ({ id, children }) => {
    useLockBodyScroll();

    return <Portal id={id}>{children}</Portal>;
};
