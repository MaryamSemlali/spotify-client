import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Card,
    makeStyles,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: 200
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 200,
    },
}));

function Album({ className, albumInfo, artistName, ...rest }) {
    const classes = useStyles();

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardMedia
                className={classes.cover}
                image={albumInfo.image}
                title="Live from space album cover"
                src={'image'}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="caption">
                        Album
                    </Typography>
                    <Typography component="h5" variant="h5">
                        {albumInfo.albumName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        By {artistName}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                        {albumInfo.releaseDate}, {albumInfo.songsNumber} songs
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
}

Album.propTypes = {
    className: PropTypes.string,
    artistName: PropTypes.string,
    albumInfo: PropTypes.object.isRequired
};

export default Album;
