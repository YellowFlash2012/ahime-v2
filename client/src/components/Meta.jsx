import {Helmet} from "react-helmet-async"

const Meta = ({ title, description, keywords }) => {
    return <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>;
};

Meta.defaultProps = {
    title: "Welcome to Ahime",
    description: "We get you the best deals on popular products",
    keywords:"electronics, buy electronics, best deals"
}
export default Meta;
