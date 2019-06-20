import React from 'react';
import ReactDOM from 'react-dom';
import '../map/map.css';
import styles from './map-styles.json'

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    zIndex: -10,
  }
};
export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
    this.styles = styles 

  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
     
      const styledMapType = new google.maps.StyledMapType(this.styles, {name: 'Styled Map'});

      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          disableDefaultUI: true,
          center: center,
          zoom: zoom
        }
      );
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
      
      this.map.mapTypes.set('styled_map', styledMapType);
      this.map.setMapTypeId('styled_map');
    }
  }
  
  randomRoom() {
    const map = this.map
    const google = this.props.google;
    const maps = google.maps
    if (!this.props.randomRoom.location) return null
    const lat = this.props.randomRoom.location.latitude
    const lng = this.props.randomRoom.location.longitude
    if (map) {
      let center = new maps.LatLng(lat, lng);
      map.panTo(center);
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);

    if(this.props.randomRoom){
      this.randomRoom()
    }

    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 3,
  initialCenter: {
    lat: 43.915491,
    lng: 6.972054
  },
  centerAroundCurrentLocation: false,
  visible: true,
};