import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/postList';
import PostForm from './components/PostForm';
import PostDetails from './components/PostDetails';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} />
            <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
    </Router>
);

export default App;
