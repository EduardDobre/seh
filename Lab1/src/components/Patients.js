import React, { Component } from 'react';
import axios from 'axios';
import Popup from './Popup';

export default class Patients extends Component {
   constructor(props) {
      super(props);
      this.state = {
         patients: [],
         currentPage: 1,
         // currentPatients: [],
         patientsPerPage: 5,
         pageCount: 0,
         keys: ['Id', 'First Name', 'Last Name', 'Email', 'Details'],
         showPopup: false,
      };
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(event) {
      this.setState({
         currentPage: Number(event.target.id)
      });
   }

   componentDidMount() {
      axios.get('https://alexgr.ro/ehealth/patients.json')
         .then(data => {
            let response = data.data;
            let totalItemsCount = response.length;
            let pageCount = Math.ceil(totalItemsCount / 5)
            this.setState({
               patients: response,
               pageCount
            });
         });
   }

   togglePopup() {
      this.setState({
         showPopup: !this.state.showPopup,
      });
   }

   renderTableHeader() {
      let header = this.state.keys;
      return header.map((key, index) => {
         return <th key={index}>{key}</th>;
      });
   }

   renderTableData(tableData) {
      return tableData.map(patient => {
         const { id, first_name, last_name, email } = patient;
         const details = {
            Gender: patient.gender,
            'Diagnosis code': patient.diagnosis_code,
            'Diagnosis description': patient.diagnosis_description,
            'Diagnosis detailed description':
               patient.diagnosis_description_detailed,
            'Administrated drug treatment': patient.administered_drug_treatment,
         };
         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{first_name}</td>
               <td>{last_name}</td>
               <td>{email}</td>
               <td>
                  <button onClick={this.togglePopup.bind(this)}> Show </button>
                  {this.state.showPopup ? (
                     <Popup
                        text="Details"
                        closePopup={this.togglePopup.bind(this)}
                        details={JSON.stringify(details)}
                     ></Popup>
                  ) : null}{' '}
               </td>
            </tr>
         );
      });
   }

   render() {
      const { patients, currentPage, patientsPerPage } = this.state;
      const indexOfLastPatient = currentPage * patientsPerPage;
      const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
      const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(patients.length / patientsPerPage); i++) {
         pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
         return (
            <div
               key={number}
               id={number}
               className = "page"
               onClick={this.handleClick}
            >
               {number}
            </div>
         );
      });
      return (
         <div>
            <h1 id="title">Patients</h1>
            <table id="tables">
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData(currentPatients)}
               </tbody>
            </table>
            <div id="page-numbers">
              {renderPageNumbers}
            </div>
         </div>
      );
   }
}
