import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, deletePost } from '../api';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const { data } = await fetchPosts();
            setPosts(data);
        };
        getPosts();
    }, []);

    const handleDelete = async (id) => {
        await deletePost(id);
        setPosts(posts.filter(post => post._id !== id));
    };

    return (
        <Container>
            <h1 className="my-4 text-center">User Post</h1>
            <div className="mb-3 text-end">
                <Link to="/create" className="btn btns">Add New User</Link>
            </div>
            <Row>
                {posts.map(post => (
                    <Col key={post._id} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={`https://crud-application-backend-dvd1.onrender.com/${post.image}`} alt={post.title} />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.description}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/post/${post._id}`} className="btn btns">View</Link>
                                    <Button variant="danger" className='allbtns' onClick={() => handleDelete(post._id)}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PostList;
