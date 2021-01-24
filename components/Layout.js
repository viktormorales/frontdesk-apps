import Header from "./Header";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap"

const Layout = props => (
    <>
        <Container fluid className="h-100">
            <Row className="h-100">
                <Col md={2} className="bg-dark text-light p-0">
                    <Sidebar />
                </Col>
                <Col md={10} className="">
                    <Header />
                    {props.children}
                </Col>
            </Row>
        </Container>
    </>
);

export default Layout;