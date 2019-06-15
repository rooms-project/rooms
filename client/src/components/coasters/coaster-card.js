import React from 'react'
import { Link } from 'react-router-dom'

const CoasterCard = theCoaster => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <article className="card">
                <img className="card-img-top" src={theCoaster.imageUrl} alt={theCoaster.title} />
                <header className="card-body">
                    <h5 className="card-title">{theCoaster.title}</h5>
                    <Link className="btn btn-sm btn-outline-dark" to={`/coasters/${theCoaster._id}`}> Ver detalles </Link>
                </header>
            </article>
        </div>
    )
}

export default CoasterCard