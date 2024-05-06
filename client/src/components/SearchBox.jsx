import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();

    const [keyword, setKeyword] = useState(urlKeyword || "");

    const searchSubmitHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
            setKeyword("")
        } else {
            navigate("/")
            
        }
    }

    return <Form className="d-flex" onSubmit={searchSubmitHandler}>
        <Form.Control type="text" name="q" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter a search term" className="mr-sm-2 ml-sm-5"></Form.Control>
        
        <Button type="submit" variant="outline-light" className="p-2 mx-2">Search</Button>
    </Form>;
};
export default SearchBox;
