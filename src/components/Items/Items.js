import { Fragment } from 'react';

import ItemsSummary from './itemsSummary';
import ItemsAvailable from './ItemsAvailable';

const Items = () => {
  return (
    <Fragment>
      <ItemsSummary />
      <ItemsAvailable />
    </Fragment>
  );
};

export default Items;
