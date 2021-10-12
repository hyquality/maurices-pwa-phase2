import React from 'react';
export default function MainContent ({mainData}) {

    return (
        <main className="mar-main-content" id="content">
            <div className="mar-grid-container" dangerouslySetInnerHTML={{__html: mainData}}>
            </div>
        </main>
    )
}

