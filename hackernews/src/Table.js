import React, { Component } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import { SORTS }  from './constants/constatnts'
import classNames from 'classnames';
const largeColumn = {
    width: '40%'
}

const midColumn = {
    width: '30%'
}

const smallColumn = {
    width: '10%'
}

const Sort=({ 
    sortKey,
    activeSortKey,
    onSort, 
    children 
    }) => 
    {
            const sortClass = 
            classNames(
                'button-inline',
                { 'button-active': sortKey === activeSortKey }
            );
            return (
                    <Button 
                        onClick={() => onSort(sortKey)}
                        className= {sortClass}
                    >
                        {children}
                    </Button>
                    );
    }

class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
        };
        this.onSort = this.onSort.bind(this);

    }

    onSort(sortKey){
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
        this.setState({ sortKey, isSortReverse }); 
    }

    render() {
        const {
            list, 
            onDismiss, 
        } = this.props;
        const {
            sortKey, 
            onSort, 
            isSortReverse
         } = this.state; 

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse 
        ? sortedList.reverse()
        : sortedList;
        Table.propTypes = {
            list: PropTypes.array.isRequired,
            onDismiss: PropTypes.func.isRequired,
        }
    return( 
        <div className="table">
            {list.length > 0 &&
            <div className="table-header">
                <span style={{ width: '40%' }}>
                    <Sort 
                        sortKey={'TITLE'}
                        onSort={this.onSort}
                        activeSortKey= {sortKey}>Title
                    </Sort>
                </span>
                <span style={{ width: '30%' }}>
                    <Sort 
                        sortKey={'AUTHOR'}
                        onSort={this.onSort}
                        activeSortKey= {sortKey}>Author
                    </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort
                        sortKey={'COMMENTS'}
                        onSort={this.onSort}
                        activeSortKey= {sortKey}>Comments
                    </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort 
                        sortKey={'POINTS'}
                        onSort={this.onSort}
                        activeSortKey= {sortKey}>Points
                    </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    Archive
                </span> 
            </div>
            }
            {reverseSortedList.map(item => 
                <div key={item.objectID} className="table-row">
                    <span style={largeColumn}>
                        <a href={item.url} target="_blank">{item.title}</a>
                    </span>
                    <span style={midColumn}>{item.author}</span>
                    <span style={smallColumn}>{item.num_comments}</span>
                    <span style={smallColumn}>{item.points}</span>
                    <span>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                            className="button-inline"
                        >
                        Delete
                        </Button>
                    </span>
                </div>   
            )}
        </div>
        );
    }
}

export default Table;