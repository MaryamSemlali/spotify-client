import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    background : '#1db954'
  },
  toolbar: {
    minHeight: 64
  },
  logo: {
    marginBottom: 5,
    marginTop: 5
  }
}));

function TopBar({
  className,
  ...rest
}) {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <img
              className={classes.logo}
              alt="Logo"
              src="/img.png"
              width={'230'}
              height={'70'}
          />
        </RouterLink>
        <Box
          ml={2}
          flexGrow={1}
        />
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
