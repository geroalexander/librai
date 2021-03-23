export default interface Route {
  path: string;
  name: string;
  exact: boolean;
  component: any;
  props?: any;
}