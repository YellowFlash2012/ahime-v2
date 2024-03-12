import { Col, Row } from "react-bootstrap";
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
                <h2>Loading...</h2>
            ) : error ? (
                <h2>{error?.data?.message||error.error}</h2>
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
