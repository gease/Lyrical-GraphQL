import {gql} from "@apollo/client";

export const GET_SONGS = gql`
        query GetSongs {
            songs {
                id
                title
            }
        }
`;

export const ADD_SONG = gql`mutation AddSong($title: String!) {
        addSong(title: $title) {
            id
        }
    }`;

export const DELETE_SONG = gql`
        mutation DeleteSong($id: String!) {
          deleteSong(id: $id) {
            id
          }
        }
    `;
