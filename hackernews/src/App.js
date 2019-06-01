import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import logo from './images/logo.svg';
import './styles/App.css';
import SearchComponent from './Search'
import TableComponent from './Table';
import Button from './Button';
import PropTypes from 'prop-types';

import {
  DEFAULT_QUERY,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
  url
} from './constants/constatnts.js'





console.log(url);




const Loading =  () => 
  <div>Loading...</div>;

const withLoading = (Component) => ( { isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />

const ButtonWithLoading = withLoading(Button);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,

    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }


  needsToSearchTopStories(searchTerm){
    return this.state.results ? !this.state.results[searchTerm] : true;
  }

  setSearchTopStories(result){
    const {hits, page} = result;

    this.setState(prevState => {
      const {searchKey, results} = prevState;
  
      const oldHits = results && results[searchKey]
        ? results[searchKey].hits
        : [];
  
      const updatedHits = [
        ...oldHits,
        ...hits
      ];
      return { 
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      },
      isLoading: false
    };
    });
  }
 
  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_QUERY}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({error: e}));
  }
  
  componentDidMount(){
    const { searchTerm } = this.state;
    if(searchTerm){
      this.setState({ searchKey: searchTerm});
      this.fetchSearchTopStories(searchTerm);
    }
  }

  onSearchChange(event){
    this.setState({searchTerm: event.target.value})

  }

  onDismiss(id){
    const {searchKey, results} = this.state;
    const { hits, page} = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedList = hits.filter(isNotId);
    this.setState({
        results: {
          ...results,
          [searchKey]: {hits: updatedList, page}
        }
    });
  }

  onSearchSubmit(event){
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm});
    if(this.needsToSearchTopStories(searchTerm)){
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  render() {
    const { searchTerm,
            results,
            searchKey,
            error,
            isLoading,
            sortKey,
            isSortReverse
          } = this.state; 
    const page = (
      results && 
      results[searchKey] &&
      results[searchKey].page 
      ) || 0;
      const list = (
        results &&
        results[searchKey] &&
        results[searchKey].hits
      ) || [];

    return(
      <div className="page">
        <header className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Search hacker news </h1>
        </header>
        <div className="interactions">
          <SearchComponent 
                value = {searchTerm}
                onChange = {this.onSearchChange}
                onSubmit = {this.onSearchSubmit}
                
          >
            <b>Search</b>
          </SearchComponent>
        </div>
        { error  
        ?     <div className="interactions"> 
                <p className="error">Something went wrong!</p>
              </div>
        : 
        <TableComponent
              list = {list}
              onDismiss = {this.onDismiss}
        />
        }
        <div className="interactions">
         { results && !isLoading && 
           <ButtonWithLoading
               isLoading = {isLoading}
               onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                  More
          </ButtonWithLoading>
         }
         { isLoading &&
          <Loading />
           }
        </div>
      </div>
    );
  }
}

export default App;
export {
  Button,
  SearchComponent,
  TableComponent,
}