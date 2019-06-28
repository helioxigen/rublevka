const ifProp = (name, ifTrue, ifFalse) => props => (props[name] ? ifTrue : ifFalse);

export default {
    ifProp,
};
