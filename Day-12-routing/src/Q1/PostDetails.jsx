import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div style={{ padding: "10px" }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <strong>Tags: </strong>
        {post.tags.map((tag, i) => (
          <span key={i} style={{ marginRight: "8px", color: "blue" }}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PostDetails;
