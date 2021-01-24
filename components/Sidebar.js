import { Accordion, Card } from 'react-bootstrap'

const Sidebar = () => (
    <>
        <Accordion defaultActiveKey="0">
            <Card border="none">
                <Accordion.Toggle as={Card.Header} eventKey="0" className="bg-dark">
                    Click me!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="bg-dark">
                        Hello! I'm the body
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                Click me!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </>
);
  
export default Sidebar;