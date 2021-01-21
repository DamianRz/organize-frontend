import React, { useContext, useEffect, useState } from 'react';
import { ButtonContext } from '../contexts/ButtonsContext';
import { BarberListContext } from '../contexts/BarberListContext';
import { IBarber } from '../types/Barber.type';
import { Toolbar } from '../components/containers/toolbar';
import { BarbersCard } from '../components/pages/index/barbers-card/barber-card';
import { AboutUsCard } from '../components/pages/index/about-us-card';
import { HomeFooter } from '../components/pages/index/home-footer/home-footer';
import { CoursesCard } from '../components/pages/index/courses-card/course-card';
import { Banner } from '../components/pages/index/banner/banner';
import { ServicesCard } from '../components/pages/index/services-card/service-card';
import { pageInfo, services, courses, aboutusPictures } from '../data/index';
import { toolbarButtons } from '../utils/toolbarButtons';
import BarberAction from '../actions/Barber.actions';
import { LoginDialog } from '../components/dialogs/login-dialog';
import { ReserveDialog } from '../components/dialogs/reserve-dialog'
import { PageBase } from '../components/pages/page-base';
import moment from 'moment';
import { UserContext } from '../contexts/UserContext';
import './index.scss';
import { INDEX_PAGE } from '../types/Pages.type';



const IndexPage = () => {

  const [barbers, setBarbers] = useState([]);


  const {
    // @ts-ignore
    setDisabledButton,
    disabled,
  } = useContext(ButtonContext);

  const {
    userIsLogged
  } = useContext(UserContext);


  const {
    // @ts-ignore
    setBarbersList,
    getBarbersList,
  } = useContext(BarberListContext);
  const barberActions = new BarberAction();


  useEffect(() => {
    const fetchData = async () => {
      setDisabledButton(true);
      let resultBarbers = null;
      do {
        resultBarbers = await getBarbers();
      } while (!resultBarbers);
      setBarbersList(resultBarbers); // save in store
      setBarbers(resultBarbers);
      setDisabledButton(false);
    };
    // execute the async function
    fetchData();
  }, []);


  const getBarbers = async () => {
    const response: IBarber[] = await barberActions.getAll();
    if (response) {
      barbers.map((barber: IBarber) => {
        // formatting data
        barber.startDate = moment(barber.startDate)
          .format('DD/MM/YYYY hh:mm:ss')
          .substr(0, 16);
      });
      return response;
    }
    return undefined;
  }

  return (
    <PageBase toolbar={
      <Toolbar
        showLeftMenu={true}
        items={toolbarButtons}
        rightItems={[
          userIsLogged() && <ReserveDialog />,
          <LoginDialog pageRef={INDEX_PAGE} />
        ]} />
    }>

      <div id="banner" className="ref-box" />
      <Banner />

      <div id="about_us" className="ref-box" />
      <AboutUsCard
        title={pageInfo.aboutUsTitle}
        info={pageInfo.aboutUs}
        picture={aboutusPictures[0].url}
      />

      <div id="barbers" className="ref-box" />
      {barbers.length && (
        <BarbersCard
          barbers={barbers}
          title="Nuestros Equipo"
          subTitle={''}
        />
      )}

      <div id="services" className="ref-box" />
      <ServicesCard
        services={services}
        title={pageInfo.servicesTitle}
        subTitle={pageInfo.contactUs}
      />

      <div id="courses" className="ref-box" />
      <CoursesCard
        courses={courses}
        title={pageInfo.coursesTitle}
        subTitle={pageInfo.contactUs}
      />

      <div id="contact" className="ref-box" />
      <HomeFooter
        title={pageInfo.contactUsTitle}
        subtitle={pageInfo.contactUs}
        email={pageInfo.email}
        number={pageInfo.number}
        instagram={pageInfo.instagram}
        facebook={pageInfo.facebook}
        theme="light"
      />
    </PageBase>
  )
}

export default IndexPage;
