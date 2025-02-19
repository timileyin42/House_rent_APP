declare module './swagger/swagger' {
  import { Express } from 'express';
  function swaggerDocs(app: Express): void;
  export default swaggerDocs;
}
