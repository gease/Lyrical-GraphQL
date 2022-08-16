import {gql} from "@apollo/client";

export const GET_SONGS = gql`
        query GetSongs {
            songs {
                id
                title
            }
        }
`;

export const GET_SONG = gql`
  query GetSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        content
        id
        likes
      }
    }
  }`;

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

export const ADD_LYRIC_TO_SONG = gql`
    mutation AddLyricToSong($id: ID!, $content: String!) {
        addLyricToSong(content: $content, songId: $id) {
          id
          lyrics {
            id
            content
          }
        }
    }`;

export const LIKE_LYRIC = gql`
    mutation LikeLyric($id: ID!) {
        likeLyric(id: $id) {
          id
          likes
        }
    }`;
