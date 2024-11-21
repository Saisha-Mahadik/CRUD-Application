import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost, fetchPosts } from '../api';
import { Form, Button, Container } from 'react-bootstrap';

const PostForm = () => {
    const [formData, setFormData] = useState({ title: '', description: '', image: null });
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchPostDetails = async () => {
                const { data } = await fetchPosts();
                const postToEdit = data.find(post => post._id === id);
                if (postToEdit) {
                    setFormData({ title: postToEdit.title, description: postToEdit.description, image: null });
                }
            };
            fetchPostDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        if (formData.image) form.append('image', formData.image);

        try {
            if (id) {
                await updatePost(id, form);
            } else {
                await createPost(form);
            }
            navigate('/');
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    return (
        <Container>
            <h1 className="my-4 fw-small">{id ? 'Edit User Details' : 'Add User Details'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter post title"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter post description"
                        rows={4}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formImage" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" name="image" accept="image/*" onChange={handleFileChange} />
                </Form.Group>

                <Button className='btns' type="submit">
                    {id ? 'Update Post' : 'Create Post'}
                </Button>
            </Form>
        </Container>
    );
};

export default PostForm;
