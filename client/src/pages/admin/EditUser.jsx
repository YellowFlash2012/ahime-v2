
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetOneUserQuery, useUpdateOneUserMutation } from "../../features/authApiSlice";

const EditUser = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { data, isLoading, refetch, error } = useGetOneUserQuery(id);

    // console.log(data);

    const [updateOneUser, { isLoading: loadingUpdate }] = useUpdateOneUserMutation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (data) {
            setName(data?.data?.name);
            setEmail(data?.data?.email);
            setIsAdmin(data?.data?.isAdmin);
            
        } else {
        }
    }, [data]);

    const updateUserHandler = async (e) => {
        e.preventDefault()

        const data = { name, email, isAdmin }
        
        try {
            const res = await updateOneUser({ id, data }).unwrap();

            // console.log(res);

            refetch()

            toast.success(res?.message)

            navigate('/admin/users-list')
        } catch (error) {
            toast.error(error?.data?.message || error?.message);
        }
    }

    return (
        <>
            <Link to={"/admin/users-list"} className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h3>Edit User {id}</h3>

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={updateUserHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>

                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email" className="my-2">
                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="isAdmin">
                            <Form.Check
                                        type="checkbox"
                                        label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        

                        <Button
                            size="lg"
                            className="my-2"
                            variant="success"
                            type="submit"
                            style={{ width: "100%" }}
                        >
                            {loadingUpdate ? (
                                <Spinner animation="border" role="status" />
                            ) : (
                                "Update User"
                            )}
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};
export default EditUser;
