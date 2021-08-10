import React, {Component} from 'react';
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render () {
    return (
        <main className="mar-main-content" id="content">
            <div className="mar-grid-container" dangerouslySetInnerHTML={{__html: this.props.mainData}}>
            </div>
        </main>
    )
  }
}
export default MainContent;
