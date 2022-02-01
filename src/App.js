import './App.css';
import React, { Component } from 'react'
import * as moment from 'moment'


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {msg: "dgfdg", show: true, cin:'', apiCin:'',DataisLoaded:false};
        this.handleOnClick = this.handleOnClick.bind(this);
        
      }
      
     handleOnClick() {
        const axios = require('axios');
        axios.get("http://localhost:9000/api/citoyens/"+this.state.cin)
        .then( (intResponse) => {
            // handle success
            this.setState({intResponse: intResponse})
            
            })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then( ()=> {
            const axios = require('axios');
            let config = {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json'
                }
              }
        let data = {
        }
        axios.get("http://localhost:8000/polls/show/"+this.state.cin,data,config)
        .then( (finResponse) => {
            // handle success
            console.log(finResponse);
            this.setState({finResponse: finResponse})
            
            })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then( ()=> {
            let intResponse = this.state.intResponse ?this.state.intResponse:false;
            let finResponse = this.state.finResponse ?this.state.finResponse:false;
            let header_html = [];
            let int_html = <div></div>;
            let fin_html = <div></div>;

            if(!intResponse.data.code && !finResponse.data.code) {
                header_html.push(
                    <div  className="boxed_btn_danger2">Numero de carte inexistant</div>

                );
            }
            else{
                 if(intResponse.data.code) {
                let int_item = intResponse.data.data[0];
                let infos = '';
                int_item.infos.forEach(function(info){
                    if(!info.ajust) {
                        infos +='<ul class="danger-border">';
                        infos += `<li>Décision: ${info.recherche}</li>`;
                        infos += `<li>Cause: ${info.cause}</li>`;
                        infos += `<li>Date: ${moment(info.date).format('D/M/yyyy')}</li>`;
                        infos += '</ul>';
                    }
                })

                int_item.infos.forEach(function(info){
                    if(info.ajust) {
                        infos +='<ul class="green-border">';
                        infos += `<li>Décision: ${info.recherche}</li>`;
                        infos += `<li>Cause: ${info.cause}</li>`;
                        infos += `<li>Date: ${moment(info.date).format('D/M/yyyy')}</li>`;
                        infos += '</ul>';
                    }
                })

                 header_html.push(
                            <h2 className="text-center">
                                {int_item.cin}
                            </h2>);
                            header_html.push(<div className="row">
                                <div className="col-xl-3">
                                    <h4>Nom:</h4>
                                </div>
                                <div className="col-xl-3">
                                    <p>{int_item.name}</p>
                                </div>
                            </div>);
                            header_html.push(<div className="row">
                                <div className="col-xl-3">
                                    <h4>Genre:</h4>
                                </div>
                                <div className="col-xl-3">
                                    <p>{int_item.genre}</p>
                                </div>
                            </div>
                        );
                 int_html = <div className="col-xl-6 col-md-6 col-lg-6">
                <div className="single_prising">
                <div  className="boxed_btn_green2">Avis de recherche</div>
                <div>
                    <div dangerouslySetInnerHTML={{__html: infos}}></div>
                </div>
                </div>
            </div>;
    
             
            } else{
                int_html = <div className="col-xl-6 col-md-6 col-lg-6">
                <div className="single_prising">
                <div  className="boxed_btn_danger2">{intResponse.data.message}</div>
                <div>
                </div>
                </div>
            </div>;
            }

            console.log("fin struct", finResponse);
            if(finResponse.data.code) {
                let fin_item = finResponse.data.citoyen[0];
                if(header_html.length === 0) {
                    header_html.push(
                        <div className="row">
                        <div className="col-xl-3">
                            <h4>Nom:</h4>
                        </div>
                        <div className="col-xl-3">
                            <p>{fin_item.nom} {fin_item.prenom}</p>
                        </div>
                        </div>
                    );
                }
                header_html.push(
                    <div className="row">
                    <div className="col-xl-3">
                        <h4>Email:</h4>
                    </div>
                    <div className="col-xl-3">
                        <p>{fin_item.email}</p>
                    </div>
                    </div>
                );
                let infractions = [];
                finResponse.data.infraction.forEach(function(infraction){
                    if(infraction.etat_paiement !== 1) {
                        infractions.push(
                            <ul className="danger-border">
                                <li>Montant: {infraction.montant}</li>
                                <li>Date: {infraction.date_creation}</li>
                            </ul>
                        );

                    }
                })

                finResponse.data.infraction.forEach(function(infraction){
                    if(infraction.etat_paiement === 1) {
                        infractions.push(
                            <ul className="green-border">
                                <li>Montant: {infraction.montant}</li>
                                <li>Date: {infraction.date_creation}</li>
                            </ul>
                        );

                    }
                })
                fin_html = <div className="col-xl-6 col-md-6 col-lg-6">
                <div className="single_prising">
                <div  className="boxed_btn_green2">Infractions</div>
                <div>
                    <div>{infractions}</div>
                </div>
                </div>
            </div>;
            }else{
                fin_html = <div className="col-xl-6 col-md-6 col-lg-6">
                <div className="single_prising">
                <div  className="boxed_btn_danger2">{finResponse.data.message}</div>
                
                </div>
            </div>;
            }
        }

            let content_html = <div className='row'>
                {int_html}
                {fin_html}
            </div>
            header_html = <div className="row">
            <div className="col-xl-12">
            <div className="single_prising">

                {header_html}
                </div>
                </div> 
                </div>;      
            let html = <div className='container' >{header_html}{content_html}</div>;
                this.setState({html: html})
                window.location = '#container'

        })
            
        });
        
        }


        
      
render(){
    
  return (
    <div className="App">
      <div className="slider_area">
        <div className="single_slider d-flex align-items-center justify-content-center slider_bg_1 overlay2">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-9">
                        <div className="slider_text text-center">
                        <h3>Welcome</h3>
                            <div className="find_dowmain">
                            <form action="#" className="find_dowmain_form">
                                <input type="text"  value={this.state.cin}id="cin" placeholder="Type CIN here" onChange={e=> this.setState({cin: e.target.value})}/>
                                <button onClick={this.handleOnClick} id="lookup">Lookup</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div className="prising_area" id="container">
        {this.state.html}
            
    </div>
    </div>
  );
}
}

export default App;
