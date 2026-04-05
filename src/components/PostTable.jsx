import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

export default function PostTable({ posts, onEdit, onDelete }) {
  const [confirmId, setConfirmId] = useState(null);

  if (!posts.length) return <p className="status-msg">No posts found.</p>;

  return (
    <>
      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete this post?"
          onConfirm={() => { onDelete(confirmId); setConfirmId(null); }}
          onCancel={() => setConfirmId(null)}
        />
      )}
      <div className="table-wrapper">
        <table className="posts-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="td-id">{post.id}</td>
                <td className="td-title">{post.title}</td>
                <td className="td-body">{post.body}</td>
                <td className="td-actions">
                  <button className="btn-edit" onClick={() => onEdit(post)}>Edit</button>
                  <button className="btn-delete" onClick={() => setConfirmId(post.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
