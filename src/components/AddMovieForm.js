import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const AddMovieForm = (props) => {
    const [movie, setMovie] = useState(
        {
            title: '',
            director: '',
            genre: '',
            metascore: 0,
            description: '',
        }
    )
    const { title, director, genre, metascore, description } = movie;
    const { push } = useHistory();
    const { id } = useParams();
    const { setMovies } = props;

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }
    const handleSave = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies/', movie)
        .then(res =>{
            console.log('AddMovieForm.js ln:29 res', res);
            console.log('AddMovieForm.js ln:29 res.data', res.data);
            setMovies(res.data);
            push(`/movies`);
        })
    }
    
    return (
        <div className="col">
            <div className="modal-content">
                <form onSubmit={handleSave}>
                    <div className="modal-header">
                        <h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Director</label>
                            <input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Metascore</label>
                            <input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <input type="submit" className="btn btn-info" value="Save" />
                        <Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMovieForm
