import './App.css';
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import MenuBar from './components/MenuBar'
import  {BrowserRouter as Router,Route} from  'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Blog from './pages/blog.handlebars'

function App() {
  return (
   <Router>
     <Container>
       <MenuBar/>
       <Route exact path="/" component={Home}></Route>
       <Route exact path="/login" component={Login}></Route>
       <Route exact path="/register" component={Register}></Route>
       <Route exact path="/blog" component={Blog}></Route>
     
     
     </Container>
   </Router>
  );
}

export default App;
