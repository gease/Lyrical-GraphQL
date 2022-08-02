import React from "react";
import {useQuery, gql} from "@apollo/client";

function SongsList (props) {
    const GET_SONGS = gql`
        query GetSongs {
            songs {
                id
                title
            }
        }
`;

    const { loading, error, data } = useQuery(GET_SONGS);

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>;
    console.log(data);

    return <ul>
        {data.songs.map((item) => <li key={item.id}>{item.title}</li>)}
    </ul>
}

export default SongsList;
