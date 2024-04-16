import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import { FaTimes, FaEdit,FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { useAddNewProductMutation, useGetAllProductsQuery } from "../../features/productSlice";

const ProductsList = () => {
    const {
        data: products,
        isLoading,
        error,
        refetch,
    } = useGetAllProductsQuery();

    // console.log(products);

    const [addNewProduct, {isLoading: addNewPdtLoading }] = useAddNewProductMutation();
    
    const addNewPdtHandler = async () => {
        if (window.confirm("You are about to add a new product, continue?")) {
            try {
                await addNewProduct();

                refetch()

                toast.success("New product added!")
            } catch (error) {
                toast.error(error?.data?.message||error.message)
            }
        }
        
    }

    const deleteProductHandler = async (id) => {
        console.log(id);
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>{products?.count} Products</h1>
                </Col>

                <Col className="text-end">
                    <Button className="btn-sm m-3" onClick={addNewPdtHandler}>
                        {addNewPdtLoading ? (
                            <Spinner animation="border" role="status" />
                        ) : (
                            <>
                                <FaEdit /> Add New Product
                            </>
                        )}
                    </Button>
                </Col>
            </Row>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products?.data?.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>

                                    <td>{product.brand}</td>

                                    <td>
                                        <LinkContainer
                                            to={`/admin/products/${product._id}/edit`}
                                        >
                                            <Button
                                                variant="light"
                                                className="btn-sm mx-2"
                                            >
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>

                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() =>
                                                deleteProductHandler(
                                                    product._id
                                                )
                                            }
                                        >
                                            <FaTrash
                                                style={{ color: "white" }}
                                            />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
};
export default ProductsList;
