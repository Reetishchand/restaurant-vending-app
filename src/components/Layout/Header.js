import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import diningImage from '../../assets/dining.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Flechazo</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={diningImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
