import {useState, useEffect} from 'react'
import axios from 'axios'
import Action from './Action'

const Home = () => {
    const [title, setTitle] = useState("")
    const [view, setView] = useState([])

    const handleInput = e => {
        setTitle({
            [e.target.name] : e.target.value
        })
    }

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

    const viewTitle = () => {
        let url = "http://127.0.0.1:8000/api/list/"
        axios(url, {
            method : "get"
        }).then(res=> {
            setView(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const addTitle = e => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');
        let url = "http://127.0.0.1:8000/api/create/"
        axios(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            data: title
        }).then(res => {
            console.log(res.data)
            viewTitle()
        }).catch(error => {
            console.log(error)
        })
    }
    

    const handleDelete = (id) => {
        let url = `http://127.0.0.1:8000/api/delete/${id}`
        axios(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=> {
            viewTitle()
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(() => {
        viewTitle()
    }, [])

    return(
        <>
        <form action="post" onSubmit={addTitle}>
            <input type="text" name="title" onChange={handleInput} />
            <input type="submit" value="Add" /> <hr />
            </form>

            {
                view.map((item, i) => {
                    return <li key={i+1}>{item.title} <Action id={item.id} title={item.title} completed={item.completed} /> <span><button type="button" onClick={() => {handleDelete(item.id)}}>Delete</button></span> </li>
                })
            }
        </>
    )
}

export default Home;