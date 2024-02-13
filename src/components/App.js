import { Layout, Menu } from 'antd';
import Logo from '../assets/images/metro_logo.svg'
import React from 'react';
import Metronome from './Metronome';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Header>
        <div className="logo"> 
          <img className="svg-logo" src={Logo} alt=''></img>
        </div>
        <h1 className='product-name'>MetrOnline</h1>
        <Menu
          theme="dark"
        />
      </Header>
      <Content className="body">
        <Metronome />
      </Content>
      <Footer className="footer">
        ©2024 MetrOnline. All Rights Reserved. Website Made by Yi Shan.
      </Footer>
    </div>
  );
}

export default App;
