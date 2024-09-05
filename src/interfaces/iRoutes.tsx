export interface IRoutes {
    path: string,
    restricted: boolean,
    exact: boolean,
    component: ()=> JSX.Element
}