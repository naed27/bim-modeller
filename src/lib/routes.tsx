import { RouteObject } from 'react-router-dom';
import BimViewer from '@/modules/bim-viewer/bim-viewer';
import PrivateAccessLayout from '@/layouts/private-access-layout/private-access-layout';

const APP_ROUTES: RouteObject[] = [
    {
        path: '/',
        element: <PrivateAccessLayout/>,
        children: [
            {
                path: 'bim-viewer',
                element: <BimViewer/>
            }
        ]
    },
];

export default APP_ROUTES;
