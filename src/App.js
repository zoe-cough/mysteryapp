import React, { Component } from 'react';
import * as d3 from 'd3';
import BarChart from './BarChart';
import Scatterplot from './Scatterplot'
import dataPath from './SampleDataset.csv'

//App.js mostly just contains the children
//BarChart is child1, Scatterplot is child2
//Displays both one above the other

class App extends Component {
  constructor(props){
    super(props)
    this.state = {data:[]}
  }
  componentDidMount(){
    var self = this
    d3.csv(dataPath, function(d){
      return {
        //data cols are:
        //x and y (positive integer values)
        //category (column with 'A' 'B' or 'C')
        x:parseInt(d.x),
        y:parseInt(d.y),
        category:d.category
      }
    }).then(function(csv_data){
      self.setState({data:csv_data},function() {
        //console.log(self.state.data) //to check
      })
      //console.log(csv_data)//to check
    })
    .catch(function(err){
      //console.log(err)
    })
  }
  render() {
    return (
      <div>
        <div className = "BarChart"><BarChart data={this.state.data}></BarChart></div>
      </div>
    );
  }
}
//<div className = "Scatterplot"><Scatterplot data={this.state.data}></Scatterplot></div>
      
export default App;
