import React,{useState} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


export default function MenuBar() {
    
    const [activeItem,setActiveItem]=useState('anasayfa');
    const handleItemClick=(e,{name})=>setActiveItem(name)
    
    return (
       <Menu secondary size="large" color="orange">
           <Menu.Item name="anasayfa" as={Link} to="/" active={activeItem==='anasayfa'} onClick={handleItemClick}/>
           <Menu.Menu position="right">
           <Menu.Item name="giriş" as={Link} to="/login" active={activeItem==='giriş'} onClick={handleItemClick}/>
           <Menu.Item name="üye ol" as={Link} to="/register" active={activeItem==='üye ol'} onClick={handleItemClick}/>
           <Menu.Item name="blog" as={Link} to="/blog" active={activeItem==='blog'} onClick={handleItemClick}/>
           </Menu.Menu>
       </Menu>
    )
}
