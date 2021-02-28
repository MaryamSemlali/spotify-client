import React, {
  useEffect
} from 'react';
import {
  Container,
  Box,
  makeStyles,
  TextField
} from '@material-ui/core';
import Page from './../../components/Page';
import Results from './Results';
import Album from './Album';
import spotifyService from './../../services/spotifyService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  },
  search: {
    alignItems: 'center',
  }
}));

function DashboardView() {
  const classes = useStyles();

  const [nameInput, setNameInput] = React.useState('');
  const [accessToken, setAccessToken] = React.useState('');
  const [artistName, setArtistName] = React.useState('');
  const [albumInfo, setAlbumInfo] = React.useState({});
  const [tracks, setTracks] = React.useState([]);

  const handleChange = (event) => {
    setNameInput(event.target.value);
  };

  useEffect(() => {
    spotifyService.getAccessToken()

        .then((token) => {
          setAccessToken(token);
          return spotifyService.getArtistData(token, nameInput);
        })

        .then((artist) => {
          setArtistName(artist.name);
          return spotifyService.getArtistAlbum(accessToken, artist.id);
        })

        .then((album) => {
          setAlbumInfo({
            albumName: album.name,
            releaseDate: album.release_date,
            songsNumber: album.total_tracks,
            image: album.images[0].url
          });

          return spotifyService.getAlbumTracks(accessToken, album.id);
        })

        .then((tracks) => {
          setTracks(tracks);
        })

        .catch((err) => {
          console.log(err);
        });
  }, [nameInput]);

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <Container
          maxWidth={false}
          className={classes.container}
      >
        <Box mt={3}>
          <TextField
              id="standard-basic"
              label="Search Artist"
              value={nameInput}
              onChange={handleChange}
          />
        </Box>

        {
          artistName.length > 0 ?
              <Box mt={3}>
                <Album albumInfo={albumInfo} artistName={artistName} />
              </Box>
            : null
        }

        <Box mt={6}>
          <Results tracks={tracks} />
        </Box>
      </Container>
    </Page>
  );
}

export default DashboardView;
