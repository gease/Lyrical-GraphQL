import React from "react";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {Navigate, Link} from "react-router-dom";

import {GET_SONGS, ADD_SONG} from "../queries";

function AddSong () {
  const [title, setTitle] = useState('');
  const [addSong, { data, loading, error }] = useMutation(ADD_SONG, {refetchQueries: [{query: GET_SONGS}]});

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  if (data) return <Navigate to='/' />

  const onSubmit = event => {
      event.preventDefault();
      addSong({variables: {title}});
  }

  return (
      <div className='container'>
          <Link to='/' className='btn-floating black'><i className='material-icons'>home</i></Link>
          <form onSubmit={onSubmit}>
            <h2>Add a song</h2>
            <input name="title" value={title} onChange={event => setTitle(event.target.value)} />
        </form>
      </div>
      );
}

export default AddSong;
