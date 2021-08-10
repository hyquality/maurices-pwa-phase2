import React, {Component} from 'react';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: this.props.headerData
    }
  }
  render () {
    return (
        <footer className="asc-footer mar-footer">
            <div className="mar-grid-container" dangerouslySetInnerHTML={{__html: this.props.footerData}}>
            </div>
        </footer>
    )
  }
}
export default Footer;
