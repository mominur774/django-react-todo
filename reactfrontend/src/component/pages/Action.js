import {Link} from 'react-router-dom'

const Action = (props) => {
    return(
        <>
            <Link to={`/edit/${props.id}/`}>Edit</Link>
        </>
    )
}

export default Action;