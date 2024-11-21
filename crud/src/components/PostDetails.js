import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost } from '../api';
import { Container, Button, Card } from 'react-bootstrap';

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await fetchPosts();
            const foundPost = data.find(post => post._id === id);
            setPost(foundPost);
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        await deletePost(id);
        navigate('/');
    };

    if (!post) return <div>Loading...</div>;

    return (
        <Container>
            <Card className="my-4">
                {post.image && (
                    <Card.Img variant="top" src={`https://crud-application-backend-dvd1.onrender.com/${post.image}`} alt={post.title} />
                )}
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <div className="d-flex justify-content-between">
                        <Button variant="warning" className='allbtns' onClick={() => navigate(`/edit/${post._id}`)}>Edit</Button>
                        <Button variant="danger" className='allbtns' onClick={handleDelete}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PostDetails;
