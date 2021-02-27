import { Container } from "@material-ui/core"

const Layout = props => (
    <>
        <Container>
            {props.children}
        </Container>
    </>
);

export default Layout;