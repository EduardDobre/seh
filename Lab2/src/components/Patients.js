import React, { Component } from 'react';
import axios from 'axios';
import "../css/Patients.css";
import { Link } from 'react-router-dom';

class Patients extends Component {
   constructor(props) {
      super(props);
      this.state = {
         patients: [],
         currentPage: 1,
         currentPatients: [],
         patientsPerPage: 20,
         filterStr: "",
         pageCount: 0,
         keys: ['Id', 'Name', 'Gender', 'Birthday', 'Address', "Phone", "Deceased date", 'Marital status', 'Encounters', 'Care plan', 'Appointment', 'Allergy intolerance'],
         show: false
      };
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(event) {
      this.setState({
         currentPage: Number(event.target.id)
      });
   }

   componentDidMount() {
      axios.get('http://hapi.fhir.org/baseR4?_getpages=dce849e3-64a4-43e1-9953-88159e24f492&_getpagesoffset=0&_count=100&_format=json&_pretty=true&_bundletype=searchset')
         .then(data => {
            let response = data.data;
            let totalItemsCount = response.length;
            let pageCount = Math.ceil(totalItemsCount / 5)
            this.setState({
               patients: response.entry,
               pageCount
            });
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
         const resource = patient.resource;
         const firstName = resource.name && resource.name[0] && resource.name[0].given && resource.name[0].given.join(" ");
         const lastName = resource.name && resource.name[0] && resource.name[0].family;
         const city = resource.address && resource.address[0] && resource.address[0].city;
         const state = resource.address && resource.address[0] && resource.address[0].state;
         const country = resource.address && resource.address[0] && resource.address[0].country;
         const telecom = resource.telecom && resource.telecom[0] && resource.telecom[0].value;
         const maritalStatus = resource.maritalStatus && resource.maritalStatus.coding && resource.maritalStatus.coding[0] && resource.maritalStatus.coding[0].display;
         return (
            <tr key={resource.id}>
               <td> {resource.id}</td>
               <td>{firstName + " " + lastName}</td>
               <td>{resource.gender || "-"}</td>
               <td>{resource.birthDate || "-"}</td>
               <td>{(city || "-") + ", " + (state || "-") + ", " + (country || "-")}</td>
               <td>{telecom || "-"}</td>
               <td>{resource.deceasedDateTime || "-"}</td>
               <td>{maritalStatus || "-"}</td>
               <td>
                  <Link to={`/patients/${resource.id}/encounters`}>
                     <button> Show </button>
                  </Link>
               </td>
               <td>
                  <Link to={`/patients/${resource.id}/carePlan`}>
                     <button> Show </button>
                  </Link>
               </td>
               <td>
                  <Link to={`/patients/${resource.id}/appointments`}>
                     <button> Show </button>
                  </Link>
               </td>
               <td>
                  <Link to={`/patients/${resource.id}/allergies`}>
                     <button> Show </button>
                  </Link>
               </td>

            </tr>
         );
      });
   }

   render() {
      const filteredPatients = this.state.patients
         .filter(e => e.resource && e.resource.name && e.resource.name[0]
            && e.resource.name[0].family && (e.resource.name[0].family.toLowerCase().includes(this.state.filterStr) || e.resource.name[0].given.join(" ").toLowerCase().includes(this.state.filterStr)))
      const { currentPage, patientsPerPage } = this.state;
      const indexOfLastPatient = currentPage * patientsPerPage;
      const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
      const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(filteredPatients.length / patientsPerPage); i++) {
         pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
         return (
            <div
               key={number}
               id={number}
               className="page"
               onClick={this.handleClick}
            >
               {number}
            </div>
         );
      });

      return (
         <div>
            <input
               type="text"
               value={this.state.filterStr}
               onChange={e => this.setState({ filterStr: e.target.value })} />
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
export default Patients;
