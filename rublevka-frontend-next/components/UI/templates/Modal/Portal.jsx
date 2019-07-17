import { createPortal } from 'react-dom';
import { usePortal } from '@hooks';

export default ({ id, children }) => {
    const target = usePortal(id);
    return createPortal(children, target);
};
