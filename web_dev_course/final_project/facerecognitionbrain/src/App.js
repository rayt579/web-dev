import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';
import Clarifai from 'clarifai'

const app = new Clarifai.App({
 apiKey: 'f2f830d40939451d902424aa0a80280c'
});

const particleOptions = 
{
  particles: {
    number: {
      value: 75, 
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
    console.log(this.state.user);
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width =Number(image.width);
    const height =Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(this.state.box);
  }

  onSubmitButtonClicked = (event) =>{
    this.setState({imageUrl: this.state.input})
    // predict the contents of an image by passing in a url
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if (response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(count => this.setState(Object.assign(this.state.user, {entries: count})));
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    }).catch(err => console.log(err));
  }

  onInputChanged = (event) => {
    this.setState({input : event.target.value});
  }

  onRouteChanged = (route) => {
    if (route === 'signin')
      this.setState({isSignedIn: false})
    else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {box, imageUrl, isSignedIn, route} = this.state;
    return(
      <div>
        <Particles className="particles"
              params={particleOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChanged={this.onRouteChanged}/>
        { 
          this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={ this.state.user.name} entries={this.state.user.entries} /> 
              <ImageLinkForm onSubmitButtonClicked={this.onSubmitButtonClicked} 
                onInputChanged={this.onInputChanged}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (route === 'signin')
           ? <Signin loadUser={this.loadUser} onRouteChanged={this.onRouteChanged}/>
           : <Register loadUser={this.loadUser} onRouteChanged={this.onRouteChanged}/>
        }
      </div>
    );
  }
}

export default App;
