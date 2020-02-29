import React from 'react'
import './App.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Map from './components/Map'
import LocationsInput from './components/LocationsInput'


class App extends React.Component {

  state = {
    weatherPoints: []
  }

  // When this function is returned from LocationsInput,
  // the objects containing weather data are loaded into state
  countUpdate = count => {
    axios.get(`/api/weather/${count}`)
      .then(response => {
        this.setState({
          weatherPoints: response.data
        })
        console.log(this.state.weatherPoints)
      })
  }

  // The render() method renders the LocationsInput component
  // and the Map component with weather objects as a prop
  render() {
    return (
      <div className="App">
        <Container className="mt-4">
          <Jumbotron className="pt-4 pb-4">
            <h1 className="display-4">Random Weather</h1>
            <hr />
            <p>
              This application displays a number of locations along with weather data from those locations.
              Click on a map marker to display detailed weather information.
            </p>
          </Jumbotron>
          <LocationsInput countUpdate={this.countUpdate} />
        </Container>
          <hr />
          <Map weatherPoints={this.state.weatherPoints} />
          <hr />
        <Container className="mb-5 mt-5">
          <p className="mt-1 mb-1">Map data provided by Mapbox-GL.</p>
          <p className="mt-1 mb-1">Weather data provided by Open Weather Map.</p>
          <p className="mt-1 mb-1">Random number generation provided by www.random.org.</p>
        </Container>
      </div>
    );
  }
}


export default App;
