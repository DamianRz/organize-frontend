import React, { useEffect, useContext } from 'react';
import { Toolbar } from '../components/containers/toolbar';
import { LoginDialog } from '../components/dialogs/login-dialog';
import { Banner } from '../components/pages/index/banner/banner';
import { PageBase } from '../components/pages/page-base';
import { ButtonContext } from '../contexts/ButtonsContext';
import { INDEX_PAGE } from '../types/Pages.type';


const toolbarButtons = [];

const IndexPage = () => {

    const {
        setDisabledButton
    } = useContext(ButtonContext);

    useEffect(() => {
        setDisabledButton(false)
    }, []);

    return (
        <PageBase toolbar={
            <Toolbar
                showLeftMenu={true}
                items={toolbarButtons}
                rightItems={[
                    // userIsLogged() && <ReserveDialog />,
                    <LoginDialog pageRef={INDEX_PAGE} />
                ]} />
        }>
            <Banner />
            <div></div>
        </PageBase>
    );
}

export default IndexPage;