import { Carousel,Image } from "react-bootstrap";
import { useGetTopRatedProductsQuery } from "../features/productSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const ProductsCarousel = () => {
    const { data, isLoading, error } = useGetTopRatedProductsQuery();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Carousel pause="hover" className="bg-primary mb-4">
                    {data?.data.map((product) => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/products/${product._id}`}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fluid
                                    d-block
                                    className="carousel-image"
                                />

                                <Carousel.Caption className="carousel-caption">
                                    <h2>
                                        {product.name} {product.price}
                                    </h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </>
    );
};
export default ProductsCarousel;
