import { useState, useEffect } from "react";
import { getPosts, createPost, updatePost, deletePost } from "../api/posts";
import PostForm from "./PostForm";
import PostTable from "./PostTable";

export default function PostsCRUD() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPost, setEditPost] = useState(null);

  // GET — with error handling
  useEffect(() => {
    getPosts()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("GET failed:", err);
        setError("Failed to load posts. Please check your connection.");
      })
      .finally(() => setLoading(false));
  }, []);

  // POST — JSONPlaceholder always returns id:101, so generate a unique local id
  const handleCreate = (data) => {
    createPost(data)
      .then((res) => {
        const maxId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) : 0;
        const newPost = {
          ...res.data,
          id: maxId + 1,
          title: data.title,
          body: data.body,
        };
        setPosts((prev) => [newPost, ...prev]);
      })
      .catch((err) => {
        console.error("POST failed:", err);
        alert("Failed to create post.");
      });
  };

  // PUT — merge response with local data since JSONPlaceholder doesn't persist
  const handleUpdate = (data) => {
    updatePost(editPost.id, data)
      .then(() => {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === editPost.id ? { ...p, title: data.title, body: data.body } : p
          )
        );
        setEditPost(null);
      })
      .catch((err) => {
        console.error("PUT failed:", err);
        alert("Failed to update post.");
      });
  };

  // DELETE
  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error("DELETE failed:", err);
        alert("Failed to delete post.");
      });
  };

  if (error) return <p className="error-msg">{error}</p>;

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
