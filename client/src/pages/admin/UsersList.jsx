import { Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDeleteOneUserMutation, useGetAllUsersQuery } from "../../features/authApiSlice";

const UsersList = () => {
    const { data, isLoading, refetch, error } = useGetAllUsersQuery();

    const [deleteOneUser, { isLoading: loadingDelete }] =
        useDeleteOneUserMutation();

    // console.log(data);

    const deleteUserHandler = async (id) => {
        // console.log(id);

        if (window.confirm("You are about to delete this user, are you sure?")) {
            try {
            
                const res = await deleteOneUser(id).unwrap();

                // console.log(res);

                refetch()

                toast.success(res?.message)
            } catch (error) {
                toast.error(error?.data?.message || error?.message);
            }
        }
    }

    return (
        <>
            <h1>{data?.count} Users</h1>

            {isLoading || loadingDelete ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>

                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.data?.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <FaCheck style={{ color: "green" }} />
                                    ) : (
                                        <FaTimes style={{ color: "red" }} />
                                    )}
                                </td>

                                <td>
                                    <LinkContainer
                                        to={`/admin/users/${user._id}/edit`}
                                    >
                                        <Button
                                            className="btn-sm"
                                            variant="light"
                                        >
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                </td>

                                <td>
                                    <Button className="btn-sm" variant="danger"
                                    onClick={()=>deleteUserHandler(user._id)}
                                    >
                                        <FaTrash style={{color:'white'}} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};
export default UsersList;
