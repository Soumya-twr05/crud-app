import { useState, useEffect } from "react";
import { getPosts, createPost, updatePost, deletePost } from "../api/posts";
import PostForm from "./PostForm";
import PostTable from "./PostTable";

export default function PostsCRUD() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPost, setEditPost] = useState(null);

  // GET
  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  // POST
  const handleCreate = (data) => {
    createPost(data).then((res) => {
      setPosts([{ ...res.data, id: posts.length + 1 }, ...posts]);
    });
  };

  // PUT
  const handleUpdate = (data) => {
    updatePost(editPost.id, data).then((res) => {
      setPosts(posts.map((p) => (p.id === editPost.id ? { ...res.data, id: editPost.id } : p)));
      setEditPost(null);
    });
  };

  // DELETE
  const handleDelete = (id) => {
    deletePost(id).then(() => {
      setPosts(posts.filter((p) => p.id !== id));
    });
  };

  return (
    <div>
      <PostForm
        onSubmit={editPost ? handleUpdate : handleCreate}
        editPost={editPost}
        onCancel={() => setEditPost(null)}
      />
      {loading ? (
        <p className="status-msg">Loading...</p>
      ) : (
        <PostTable posts={posts} onEdit={setEditPost} onDelete={handleDelete} />
      )}
    </div>
  );
}
