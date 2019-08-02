/* eslint-disable */
import { useSelector as useReduxSelector } from 'react-redux';
import { initialState } from '../../store';

/**
 * @typedef {typeof initialState} State
 */

/**
 *
 * @template T
 * @param {(state: State) => T} selectorFn
 */
export default function useSelector(selectorFn) {
    return useReduxSelector(selectorFn);
}
