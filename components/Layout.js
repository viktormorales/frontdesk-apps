import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = props => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-2 bg-dark">
                <Sidebar />
            </div>
            <div className="col-10">
                <Header />
                {props.children}
            </div>
        </div>
    </div>
);

export default Layout;