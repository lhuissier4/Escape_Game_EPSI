import React, {useEffect, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "js-cookie";
import {Dropdown} from "react-bootstrap";

interface Props {
    username:string
    picture:string
    isConnected:boolean
}
export default function UserDropdown(props:Props) {
    const [isOpen, setOpen] = React.useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    function toggleOpen() {
        setOpen(!isOpen)
    }


    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef}>
            <Dropdown align="end" show={isOpen}>
                <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    className="p-0 border-0 bg-transparent"
                    onClick={toggleOpen}
                >
                    <div className="user-area">
                        <div className="user-clickable">
                            <img
                                className="imguser"
                                src={
                                    props.username && props.picture
                                        ? props.picture
                                        : "icone-profil-avatar-vide.avif"
                                }
                                alt="Image utilisateur"
                            />
                            <span>
                                    <p className="">{props.username || "Utilisateur"}</p>
                                    <p className="status-connection">
                                      {props.isConnected ? "Connecté" : "Non Connecté"}
                                    </p>
                                </span>
                        </div>
                    </div>
                </Dropdown.Toggle>
                {props.isConnected && isOpen ? (
                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={disconnect}>Se déconnecter</Dropdown.Item>

                    </Dropdown.Menu>
                ) : null}

            </Dropdown>
        </div>
    );

}
function disconnect(){
    Cookies.remove('token');
    location.reload();
}