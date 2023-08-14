import React from 'react'

function Post() {
    return (
        <div>
            <div className="post">
                <div className="image">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" alt="" />
                </div>
                <div className="texts">
                    <h2>Title of the post</h2>
                    <p className="info">
                        <a className="author">Łukasz Jasionowski</a>
                        <time>2023-08-14 17:55</time>
                    </p>
                    <p className="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum nec risus eu rutrum. Fusce luctus faucibus sollicitudin. Integer et nibh odio. Praesent sodales libero odio, eu tincidunt arcu elementum et. Proin semper volutpat justo quis imperdiet. Sed vel dictum neque. Ut feugiat porta elit, id gravida velit faucibus non. Sed eu euismod purus, ac pharetra libero. Maecenas vehicula est nec pulvinar suscipit. Phasellus in lorem eget sapien ultrices maximus. Aliquam sagittis metus nibh, sit amet interdum sem consequat sed. Cras in orci a tellus rutrum bibendum in vitae ante.</p>
                </div>
            </div>
        </div>
    )
}

export default Post