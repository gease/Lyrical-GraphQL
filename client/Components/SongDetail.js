import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";

import {GET_SONG, ADD_LYRIC_TO_SONG, LIKE_LYRIC} from "../queries";

const SongDetail = (props) => {
    const {id} = useParams();
    const {data, loading, error} = useQuery(GET_SONG, {variables: {id}});
    const [addLyricToSong, { data: dataAdd, loading: loadingAdd, error: errorAdd }] = useMutation(ADD_LYRIC_TO_SONG);
    const [likeLyric, {data: dataLike, loading: loadingLike, error: errorLike}] = useMutation(LIKE_LYRIC);

    let [content, setContent] = useState();
    if (error) return <div>This song cannot be retrieved</div>
    if (loading) return <div>Please wait</div>

    const submitContent = (event) => {
        event.preventDefault();
        addLyricToSong({variables: {id, content}}).then(() => setContent(''));
    }

    const doLike = (id, likes) => {
        likeLyric({
            variables: {id},
            optimisticResponse: {
                likeLyric: {
                    id: id,
                    likes: likes + 1,
                    __typename: "LyricType"
                }
            }
        });
    }

    const lyricsList = <ul className="collection">{
        data.song.lyrics.map(item =>
            <li key={item.id} className="collection-item row">
                <div className='col s10'>{item.content}</div>
                <div className='col s1'>{item.likes}</div>
                <div className='col s1'><i className='material-icons' onClick={() => doLike(item.id, item.likes)}>thumb_up</i></div>
            </li>
        )}
    </ul>;

    return (
        <div className="container">
            <Link to='/' className='btn-floating black'><i className='material-icons'>home</i></Link>
            <h2>{data.song.title}</h2>
            {lyricsList}
            <form onSubmit={submitContent}>
                <label for="createLyrics">Create Lyrics</label>
                <input name="createLyrics" value={content} onChange={(event) => setContent(event.target.value)} />
            </form>
        </div>
    )
}

export default SongDetail;
