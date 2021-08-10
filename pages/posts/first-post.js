import React, {Component} from "react";
import Head from 'next/head'
import Nav from "@components/navigation/Nav";

class FirstPost extends Component {
    render() {
        return (
            <div className="asc-global-wrapper ">
                <Head>
                    <title>Create Next App tralala</title>
                    <link rel="icon" href="icons/favicon.ico"/>
                </Head>
                <Nav/>
                <h1>First <span>Post</span></h1>
                <p>tralala <span>asdasdasd</span></p>
                <style jsx>{`
                  p {
                    color: red;
                  }
                `}</style>
            </div>

        )
    }
}

export default FirstPost;