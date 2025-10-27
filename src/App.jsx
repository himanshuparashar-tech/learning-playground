import React from 'react'
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import TabsViewFancy from './components/pages/tabs';
import './main';

const App = () => {
  return (
    <>
      <Header />
      <TabsViewFancy />
      <Footer />
    </>
  )
}

export default App;
