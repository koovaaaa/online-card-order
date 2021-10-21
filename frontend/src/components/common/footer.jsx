import React from "react";
import '../../assets/css/footer.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <div className={'flex-shrink-0 py-4 main-footer text-white-50'}>
            <div className={'text-center'}>
                <span className={'small'}>Copyright &copy; Milan Коvačević</span>
                <div className={''}>
                    <a href={'https://www.linkedin.com/in/koovaaaa/'}><FontAwesomeIcon
                        icon={faLinkedin}/></a> &nbsp;
                    <a href={'https://github.com/koovaaaa'}><FontAwesomeIcon icon={faGithub}/></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;