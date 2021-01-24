import React, { useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import './banner.scss';
import '../../../../theme/effects.scss';
import { Card } from '../../../containers/card';
import { ContainerPage, SubContainerImage, SubContainerInfo } from '../../../containers/container-page/container-page';
import { Text } from '../../../decorators/text';

export const Banner = () => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const urlImage =
    'url(https://images.unsplash.com/photo-1457317680121-ef12e98979e8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybCUyMG9uJTIwcGhvbmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80)';

  return (
    <div className={`banner ${getTheme()}`}>
      <div className="banner-img" style={{ backgroundImage: urlImage }} />
      <Card
        className="card-about"
        title="Crea tus eventos y explora con Organize!"
      >
        <ContainerPage className={`container-about-us`}>
          <SubContainerInfo
            className="sub-container-info"
            info={`Con Organize podrá crear y administrar tus eventos y explorar los que crean tu red de amigos`}
            title={""}
            cost={''} />
        </ContainerPage>
      </Card>
    </div>
  );
};



/*

 <Card
          className="card-about"
          title="Crea tus eventos y explora con Organize!">
          <ContainerPage className={`container-about-us`}>
            <SubContainerInfo
              className="sub-container-info"
              info={`Con Organize podrá crear y administrar tus eventos y explorar los que crean tu red de amigos`}
              title={""}
              cost={''} />
            <SubContainerImage img="https://images.unsplash.com/photo-1457317680121-ef12e98979e8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybCUyMG9uJTIwcGhvbmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
          </ContainerPage>
        </Card>


*/