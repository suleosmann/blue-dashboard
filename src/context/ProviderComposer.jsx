import React from 'react';

const ProviderComposer = ({ contexts, children }) =>
    contexts.reduceRight(
        (kids, Parent) => React.cloneElement(Parent, { children: kids }),
        children,
    );

export default ProviderComposer;


ProviderComposer;