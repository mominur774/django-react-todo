import axios from 'axios'
import {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Edit = () => {

    let navigate = useNavigate();

    const {id} = useParams()
    const[item, setItem] = useState({
        title: "",
        completed: false
    })

    const getCookie = name => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleChange = e => {
        console.log(e.target.name)
        setItem({
            ...item,
            [e.target.name] : e.target.value
        })
    }

    const updateItem = e => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');
        let url = `http://127.0.0.1:8000/api/update/${id}/`
        axios(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            data: item
        }).then(res=>{
            navigate('/')
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(() => {
        const retrieveItem = () => {
            let url = `http://127.0.0.1:8000/api/retrieve/${id}`
            axios.get(url)
            .then(res=>{
                setItem(res.data)
            }).catch(error=>{
                console.log(error)
            })
        };
        retrieveItem();
    }, [id])

    return(
        <>
            <form onSubmit={updateItem} action="" method="post">
                <label htmlFor="title">Title: </label>
                <input type="text" value={item.title} name="title" onChange={handleChange} /> <br />
                <label htmlFor="completed">Completed: </label>
                <input type="checkbox" checked={item.completed} name="completed" onChange={handleChange} /> <br />
                <input type="submit" value="Update" />
            </form>
            <Link to="/">Back</Link>
        </>
    )
}

export default Edit;