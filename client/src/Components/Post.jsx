import React from 'react'
import { formatISO9075 } from 'date-fns'

function Post({ title, summary, cover, content, createdAt, author }) {
    return (
        <div>
            <div className="post">
                <div className="image">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" alt="" />
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