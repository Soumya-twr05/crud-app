import PostsCRUD from "./components/PostsCRUD";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Posts <span>CRUD</span></h1>
        <span className="badge">JSONPlaceholder API</span>
      </header>
      <main className="content">
        <PostsCRUD />
      </main>
    </div>
  );
}
