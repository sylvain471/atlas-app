import logo from './logo.svg';
import './App.css';
import {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      notes: []
    }
  }

API_URL = 'http://localhost:5038';

componentDidMount(){
  this.refreshNotes();
}

async refreshNotes(){
  fetch(this.API_URL + '/api/todoapp/GetNotes').then(response => response.json()).then(data => {
    this.setState({
      notes: data
    })
  }
  );
}

async addClick(){
  var newNotes = document.getElementById('newNotes').value;
  console.log(newNotes);
  const data= new FormData();
  data.append('newNotes', newNotes);
  console.log(data);
  fetch(this.API_URL + '/api/todoapp/AddNotes', {
    method: 'POST',
    body: data
  }).then(response => response.json()).then((result) => {
    alert(result);
    this.refreshNotes();
  });
}


async deleteClick(id){
  console.log(id);
  fetch(this.API_URL + '/api/todoapp/DeleteNotes?id=' + id, {
    method: 'DELETE'
  }).then(response => response.json()).then((result) => {
    alert(result);
    this.refreshNotes();
  });
}

render() {
  const {notes} = this.state;
  return (
    <div className="App">
     <h2>Todo App</h2>

    <input id="newNotes"/>&nbsp;
    <button onClick={() => this.addClick()}>Add Notes</button> 

     {notes.map(note => (
       <div key={note.id}>
          <h3>{note.id}</h3>
         <p>{note.description}</p>
         <button onClick={() => this.deleteClick(note.id)}>Delete</button>
       </div>)
      )}


  
    </div>
  );
}

}

export default App;
