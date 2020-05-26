import React, { Component } from 'react';
import '../css/Popup.css';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: JSON.parse(this.props.details)
    }
  }

  renderTableData() {
    console.log(Object.entries(this.state.details));
    return Object.entries(this.state.details).map((entry) => {
      return (
        <tr>
          <td><b>{entry[0]}</b></td>
          <td>{entry[1]}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div>
            <h1 id='title'>Personal information</h1>
            <table id='tables'>
              <tbody>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
          <button id="popupButton" onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}

export default Popup;