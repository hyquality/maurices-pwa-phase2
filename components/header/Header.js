import Nav from "@components/navigation/Nav";
import AnnouncementBar from "@components/header/AnnouncementBar";
import React, { Component } from "react";
export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        };
    }
    componentDidMount = () => {
       // this.state.announcementData = this.state.data.HeaderContent.announcement;
    }
    render() {
       // const valuesArray = JSON.parse(this.props.data);
        return (
            <header className="mar-header">
                <AnnouncementBar data={this.state.data.announcement}/>
                <div className="mar-header-main asc-sticky-nav-container">
                    <Nav/>
                </div>
            </header>
        )
    }
}
export default Header;