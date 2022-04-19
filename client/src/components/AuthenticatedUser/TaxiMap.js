import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import axios from "axios";

const taxiIcon = {
  url: require("../../assets/images/taxi.png"),
};

class TaxiMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      location: {
        lat: 0,
        lng: 0,
      },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      isOpen: false,
      taxis: [
        {
          companyName: "",
          address1: "",
          address2: "",
          town: "",
          postcode: "",
          phoneNumber: "",
          email: "",
          coords: {
            lat: "",
            lng: "",
          },
          distance: "",
        },
      ],
    };
  }

  async componentDidMount() {
    const { lat, lng } = await this.getCurrentLocation();
    this.setState((prev) => ({
      fields: {
        ...prev.fields,
        location: {
          lat,
          lng,
        },
      },
      currentLocation: {
        lat,
        lng,
      },
    }));
  }

  getCurrentLocation() {
    this.getNearbyTaxis();
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude,
          });
          this.setState({
            location: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        });
      });
    }
    return {
      lat: 0,
      lng: 0,
    };
  }

  addMarker = (location, map) => {
    this.setState((prev) => ({
      fields: {
        ...prev.fields,
        location,
      },
    }));
    map.panTo(location);
  };

  getNearbyTaxis = () => {
    axios
      .get(
        `https://api.tfl.gov.uk/Cabwise/search?lat=${this.state.location.lat}&lon=${this.state.location.lng}`
      )

      .then((res) => {
        console.log(res)
        res.data.Operators.OperatorList.map((taxi) => {
          this.setState({
            taxis: this.state.taxis.concat({
              companyName: taxi.TradingName,
              address1: taxi.AddressLine1,
              address2: taxi.AddressLine2,
              town: taxi.Town,
              postcode: taxi.Postcode,
              phoneNumber: taxi.BookingsPhoneNumber,
              email: taxi.BookingsEmail,
              coords: {
                lat: taxi.Latitude,
                lng: taxi.Longitude,
              },
              distance: taxi.Distance,
            }),
          });
        });
      });
  };

  handleToggle = () => {
    this.setState({
      isOpen: true,
    });
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <>
        <Map
          google={this.props.google}
          center={this.state.fields.location}
          zoom={14}
          onClick={this.onMapClicked}
          style={{
            margin: "auto",
            width: "95%",
            height: "95%",
            border: "2px solid black",
          }}
        >
          {this.state.taxis
            ? this.state.taxis.map((taxi) => (
                <Marker
                  title={taxi.companyName}
                  name={taxi.companyName}
                  address1={taxi.address1}
                  address2={taxi.address2}
                  town={taxi.town}
                  postcode={taxi.postcode}
                  phoneNumber={taxi.phoneNumber}
                  email={taxi.email}
                  distance={taxi.distance}
                  position={taxi.coords}
                  onClick={this.onMarkerClick}
                  icon={taxiIcon}
                ></Marker>
              ))
            : ""}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h3 className="font-medium underline">
                {this.state.selectedPlace.name}
              </h3>
              <ul>
                <li>
                  {this.state.selectedPlace.address1 === ","
                    ? ""
                    : this.state.selectedPlace.address1}
                </li>
                <li>
                  {this.state.selectedPlace.address2 === ","
                    ? ""
                    : this.state.selectedPlace.address2}
                </li>
                <li>
                  {this.state.selectedPlace.town === ","
                    ? ""
                    : this.state.selectedPlace.town}
                </li>
                <li>
                  {this.state.selectedPlace.postcode === ","
                    ? ""
                    : this.state.selectedPlace.postcode}
                </li>
              </ul>
              <br />

              <p>Phone Number: {this.state.selectedPlace.phoneNumber}</p>
              <a
                target="blank"
                href={"mailto:" + this.state.selectedPlace.phoneNumber}
              >
                Email:{" "}
                <span className="text-blue-500 hover:underline">
                  {this.state.selectedPlace.email}
                </span>
              </a>
              <p>Distance: {this.state.selectedPlace.distance} miles</p>
            </div>
          </InfoWindow>

          <Marker title={"Your Position"} position={this.state.fields.location}>
            <InfoWindow>Your Position</InfoWindow>
          </Marker>
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY,
})(TaxiMap);
