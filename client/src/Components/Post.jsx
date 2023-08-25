import React from 'react'
import { formatISO9075 } from 'date-fns'

function Post({ title, summary, cover, content, createdAt, author }) {
    const Server_URL = process.env.REACT_APP_SERVER_URL;
    return (
        <div>
            <div className="post">
                <div className="image">
                    <img src={`${Server_URL}/${cover}`} alt="" />
                </div>
                <div className="texts">
                    <h2>{title}</h2>
                    <p className="info">
                        <a className="author">{author.username}</a>
                        <time>{formatISO9075(new Date(createdAt))}</time>
                    </p>
                    <p className="summary">{summary}</p>
                </div>
            </div>
        </div>
    )
}

export default Post