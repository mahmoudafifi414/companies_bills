import React, {Component} from "react"
import {Modal} from 'react-bootstrap';
import SideCompany from "./SideCompany"
import Bills from "./Bills";
import '../../assets/css/modal.css'
export class AddCompanies extends Component {
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.hide}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Add Company with Bills
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <nav className="nav">
                        </nav>
                        <div>
                            <SideCompany/>
                            <Bills/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        )
    }
}