import React from "react";
import {Link} from "react-router-dom";
import {useQuery, gql, useMutation} from "@apollo/client";

import {GET_SONGS, DELETE_SONG} from "../queries";

function SongsList (props) {

    const { loading, error, data } = useQuery(GET_SONGS);
    const [deleteSong, { data: dataDelete, loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_SONG, {refetchQueries: [{query: GET_SONGS}]});

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>;

    return <div className='container'>
    <ul className='collection'>
        {data.songs.map((item) => <li key={item.id} className='row collection-item'>
            <div className='col s11'>{item.title} </div>
            <a className='col s1' onClick={() => {deleteSong({variables: {id: item.id}})}}><i className='material-icons'>delete</i></a>
            </li>)}
    </ul>
        <div className='row right-align'>
        <Link to='/songs/add' className='btn-large btn-floating red'><i className='material-icons'>add</i></Link>
        </div>
    </div>
}

export default SongsList;
