import React, { Component } from 'react';
import './Results.css';

class Results extends Component{
    render (){
        const result = this.props.data ? this.props.data.results.docs : [];
        const cls = "result-wrapper".concat(!result.length ? ' no-result' : '');
        return (<div className={cls}>
            {
                result.map((res) => <div key={res.index} className="result">
                       <span>
                            <div>{res.name} {this.category(res)}</div>
                            {this.location(res)}
                        </span>
                        <hr></hr>
                    </div>
                )
            }
        </div>);
    }

    category(res){
        if(!res.bookingId) return '';

        return ''.concat('(', res.bookingId.substr(0, res.bookingId.indexOf('-')), ')');
    }
    location(res){
        let loc = '';
        if(res.region)
            loc =loc.concat(res.region); 
        if(res.country){
            loc = loc.concat(', ', res.country);
        }
        return loc;
    }
}

export default Results;