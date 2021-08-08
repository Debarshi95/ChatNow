import React from 'react';

const loadable = (cb) => React.lazy(cb);
export default loadable;
