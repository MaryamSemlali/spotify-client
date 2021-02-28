import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  makeStyles,
  withStyles,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton
} from '@material-ui/core';
import moment from 'moment';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';
import {Howl, Howler} from 'howler';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  sortButton: {
    textTransform: 'none',
    letterSpacing: 0,
    marginRight: theme.spacing(2)
  },
  table: {
    minWidth: 650,
  }
}));

function Results({ className, tracks, ...rest }) {
  const classes = useStyles();
  const [soundTrack, setSoundTrack] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayTrack = (data) => {

    if (isPlaying) {
      soundTrack.stop();
      setIsPlaying(false);
      setSoundTrack(null);

    } else {
      const sound = new Howl({
        src: [data],
        format: 'mp3'
      });

      setSoundTrack(sound);
      sound.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        container
        spacing={3}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Duration</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks.map((track, id) => (
                  <StyledTableRow key={track.id}>
                    <StyledTableCell component="th" scope="row">
                      {id + 1}
                    </StyledTableCell>
                    <StyledTableCell>{track.name}</StyledTableCell>
                    <StyledTableCell align="right">{
                      moment.duration(track.duration_ms).minutes() + ':' + moment.duration(track.duration_ms).seconds()
                    }</StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                          aria-label="play"
                          onClick={() => handlePlayTrack(track.preview_url)}
                      >
                        <PlayCircleOutlineIcon style={{ color: 'green' }} fontSize="large" />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  tracks: PropTypes.array.isRequired
};

export default Results;
