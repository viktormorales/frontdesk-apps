import Link from 'next/link'
import { Nav } from 'react-bootstrap'

const Sidebar = () => (
    <>
        <Nav defaultActiveKey="/admin" className="flex-column">
            <Link href="/admin">
                <Nav.Link href="/admin" className="text-light"><span className="cil-home mr-2" /> Escritorio</Nav.Link>
            </Link>
            <Link href="/admin/guests">
                <Nav.Link href="/admin/guests" className="text-light"><span className="cil-list mr-2" /> Huéspedes</Nav.Link>
            </Link>
            <Link href="/admin/messages">
                <Nav.Link href="/admin/messages" className="text-light" eventKey="link-1"><span className="cil-envelope-closed mr-2" /> Mensajes</Nav.Link>
            </Link>
            <Link href="/admin/breakfast">
                <Nav.Link href="/admin/breakfast" className="text-light" eventKey="link-2"><span className="cil-mug mr-2" /> Desayuno</Nav.Link>
            </Link>
            <Link href="/admin/spa">
                <Nav.Link className="text-light" eventKey="link-2"><span className="cil-pool mr-2" /> Turnos Spa</Nav.Link>
            </Link>
            <Link href="/admin/massages">
                <Nav.Link className="text-light" eventKey="link-2"><span className="cil-spa mr-2" /> Masajes</Nav.Link>
            </Link>
        </Nav>
    </>
);
  
export default Sidebar;