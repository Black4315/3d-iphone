
import Banner from './components/Banner'
import Highlights from './components/Highlights'
import Navebar from './components/Navebar'
import Model from './components/Model'
import * as Sentry from '@sentry/react';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {

  return (
    <main className='bg-black'>
        <Navebar />
        <Banner />
        <Highlights />
        <Model />
        <Features />
        <HowItWorks />
        <Footer />
    </main>
  )
}


export default Sentry.withProfiler(App);
