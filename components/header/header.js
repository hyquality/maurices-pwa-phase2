import AnnouncementBar from "@components/header/announcement-bar";
import React, {Component} from "react";
import TopBar from "@components/header/top-bar";
import MiddleBar from "@components/header/middle-bar";

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
            <header className="relative mar-header w-full top-0 z-20 border-b border-gray_border border-solid md:border-b-0">
                <AnnouncementBar data={this.state.data.announcement}/>
                <TopBar/>
                <MiddleBar minicart={this.state.data.minicart} data={this.state.data.store} customer={this.state.data.middle_bar.customer}/>
            </header>
        )
    }
}

export default Header;