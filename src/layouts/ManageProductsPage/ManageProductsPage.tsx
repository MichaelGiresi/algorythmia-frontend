import { useOktaAuth } from '@okta/okta-react'
import { Redirect } from 'react-router-dom';

export const ManageProductsPage = () => {
    const { authState } = useOktaAuth();


    if(authState?.accessToken?.claims.userType === undefined){
        return <Redirect to={'/'}/>
    }

    return (<div>
        <h1 style={{color: 'white', height: '90vh'}}>Admin PAGE</h1>
    </div>);
}