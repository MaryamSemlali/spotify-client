import axios from 'axios';
import qs from 'qs';
import {
    SPOTIFY_TOKEN_URI,
    SPOTIFY_REFRESH_TOKEN,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_API_BASE_URI
} from '../config';
import generateAuthHeader from '../utils/generateAuthHeader';

class SpotifyService {
    getAccessToken = () => new Promise((resolve, reject) => {
        const data = qs.stringify({
            refresh_token: SPOTIFY_REFRESH_TOKEN,
            grant_type: 'refresh_token'
        });
        axios({
            method: 'POST',
            url: SPOTIFY_TOKEN_URI,
            headers: {
                Authorization: generateAuthHeader(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        }).then((response) => {
                if (response.data) {
                    resolve(response.data.access_token);
                } else {
                    reject(response.data.error);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });

    getArtistData = (token, name) => new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: SPOTIFY_API_BASE_URI + '/search?type=artist&q=' + name,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((response) => {
            if (response.data) {
                resolve(response.data.artists.items[0]);
            } else {
                reject(response.data.error);
            }
        })
            .catch((error) => {
                reject(error);
            });
    });

    getArtistAlbum = (token, artistId) => new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: SPOTIFY_API_BASE_URI + '/artists/' + artistId + '/albums',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((response) => {
            if (response.data) {
                resolve(response.data.items[0]);
            } else {
                reject(response.data.error);
            }
        })
            .catch((error) => {
                reject(error);
            });
    });

    getAlbumTracks = (token, albumId) => new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: SPOTIFY_API_BASE_URI + '/albums/' + albumId + '/tracks',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((response) => {
            if (response.data) {
                resolve(response.data.items);
            } else {
                reject(response.data.error);
            }
        })
            .catch((error) => {
                reject(error);
            });
    });
}

const spotifyService = new SpotifyService();

export default spotifyService;
