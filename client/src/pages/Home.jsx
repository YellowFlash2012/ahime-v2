import { Col, Row} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Products from "../components/Products";
import { useGetAllProductsQuery } from "../features/productSlice";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
// import products from "../products";

const Home = () => {
    const { keyword, pageNumber } = useParams();

    const { data, isLoading, error } = useGetAllProductsQuery({
        keyword, pageNumber,
    });

    // console.log(data);

    let products = data?.data?.products;

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
                            
                            <Paginate pages={data?.data?.pages} page={data?.data?.page} keyword={keyword ? keyword : ""} />
                </>
            )}
        </>
    );
};
export default Home;
