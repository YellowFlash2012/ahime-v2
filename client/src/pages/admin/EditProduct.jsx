import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetOneProductQuery, useUpdateProductMutation } from "../../features/productSlice";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInSock] = useState(0);

    const { data:product, isLoading, refetch, error } = useGetOneProductQuery(id);

    const [updateProduct, { data: updatedProduct, isLoading: loadingUpdate }] = useUpdateProductMutation();

    useEffect(() => {
        if (product) {
            setName(product?.data?.name);
            setPrice(product?.data?.price);
            setCountInSock(product?.data?.countInStock);
            setDescription(product?.data?.description);
            setCategory(product?.data?.category);
            setBrand(product?.data?.brand);
            setImage(product?.data?.image);
        } else {
        }
    }, [product]);

    const updateProductHandler = async (e) => {
        e.preventDefault()

        const newProductData = { _id: id, name, brand, category, description, price, image, countInStock };

        const res = await updateProduct(newProductData);

        console.log(res);

        if (res?.error) {
            toast.error(res?.error)
        } else {
            toast.success(res?.data?.message)

            refetch()

            navigate("/admin/products-list")
        }
    }

    return (
        <>
            <Link to={"/admin/products-list"} className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product {id}</h1>

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={updateProductHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>

                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>

                            <Form.Control
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>

                            <Form.Control
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>

                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>

                            <Form.Control
                                type="upload"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>

                            <Form.Control
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock">
                            <Form.Label>Count In Stock</Form.Label>

                            <Form.Control
                                type="number"
                                value={countInStock}
                                onChange={(e) => setCountInSock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                                <Button
                                    size="lg"
                            className="my-2"
                            variant="success"
                                    type="submit"
                                    
                                    style={{width:"100%"}}
                        >
                            {loadingUpdate ? (
                                <Spinner animation="border" role="status" />
                            ) : (
                                "Update Product"
                            )}
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};
export default EditProduct;
