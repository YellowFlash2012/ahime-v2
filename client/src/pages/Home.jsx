import { Col, Row} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Products from "../components/Products";
import { useGetAllProductsQuery } from "../features/productSlice";
// import products from "../products";

const Home = () => {
    const { data, isLoading, error } = useGetAllProductsQuery();

    console.log(data);

    let products = data?.data;

    return (
        <>
            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <h1>Latest Products</h1>

                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Products product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};
export default Home;
