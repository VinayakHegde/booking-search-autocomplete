import React, { Component } from 'react';
import './Autocomplete.css';
import SearchApi from  '../../Api/Api';
import Results from '../Results/Results';
import LoadIndicator from '../LoadIndicator/LoadIndicator';

class Autocomplete extends Component{
  state = {
    term : '',
    result : null,
    loading : false
  };

  render(){
    return (
      <div className="searchbox">
        <h2>Where are you going?</h2>
        <label htmlFor="search">Pick-up Location</label>
        <div className="search-wrapper">
          <input id="search" className="search" placeholder="city, airport, station, region and district..."
                onKeyUp={ (evt) => this.onKeyup(evt.target)}
                onChange={ (evt) => this.onChange(evt.target)}
                value={this.state.term}
                autoComplete="off"/>
          { this.state.loading && <LoadIndicator/>}
        </div>
        <Results data={this.state.result}/>
      </div>
    );
  }

  onChange(target){
    this.setState({term : target.value})
  }

  onKeyup = this.debounce(()=>{
    if(this.state.term.trim().length >= 2){
      this.setState({loading : true});
      SearchApi(this.state.term).then((response) => {
        this.setState({loading : false, result : (response.data !== "") ? response.data : {
          results:{
            docs:[{
              index: 1,
              name: "No results found"
            }]
          }
        }});
      }).catch( error => this.setState({loading : false, result : {
        results:{
          docs:[{
            index: 1,
            name: error.message
          }]
        }
      }}));
    } else {
      this.setState({result : null});
    }
  }, 1000);

  debounce(fn, delay){
    let timeoutHandler;

    return (target) => {

        this.onChange(target);

        clearTimeout(timeoutHandler);

        timeoutHandler = setTimeout(() => {
            fn.call(this);
            timeoutHandler = null;

        }, delay);
    }
  }
}

export default Autocomplete;
