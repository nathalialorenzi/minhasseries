import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({match}) => {
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('EDIT')
    const [genres, setGenres] = useState([])

    const [data, setData] = useState({})
    useEffect(() => {
        axios.get('/api/series/' + match.params.id)
        .then(res => {
            setData(res.data)
            setForm(res.data)
        })
    }, [match.params.id])
     
     useEffect(() => {
        axios.get('/api/genres')
        .then(res => {
            setGenres(res.data.data)
        })
     })

    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }
    
    const save = () => {
        axios.post('/api/series', {
            form
        })
        .then(res => {
            setSuccess(true)
        })
    }

    if (success) {
        return <Redirect to='/series'/>
    }
    return (
        <div>
            <header style={masterHeader}>
                <div className= 'h-100' style={{background: 'rgba(0,0,0,0.7'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='imd-fluid img-thumbnail' src={data.poster}/>
                            </div>
                            <div className= 'col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    <Badge color='success'>Assistido</Badge>
                                    <Badge color='warning'>Para assisitir</Badge>
                                    Genero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>   
            <div><br></br>
                <button className='btn btn-dark m-3' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h3>Nova série</h3><br></br>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'><strong>Nome</strong></label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da Série'></input>                 
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'><strong>Comentários</strong></label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Nome da Série'></input>                 
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'><strong>Gênero</strong></label>
                            <select className='form-control'>
                                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>) }
                            </select>
                            </div>
                                <button type='button' onClick={save} className='btn btn-success m-2'>Salvar</button>
                                <button className='btn btn-danger' onClick={() => setMode('INFO')}>Cancelar edição</button>                         
                            <br></br><br></br>        
                    </form>
                </div>
            }
        </div>
    )
}
export default InfoSerie