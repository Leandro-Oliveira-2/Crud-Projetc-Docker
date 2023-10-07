import APIConfig from '@config/APIConfig';

import Responses from './Responses';
import Security from './Security';
import Schemas from './Schemas';
import Paths from './Paths';
import Tags from './Tags';

const SwaggerOptions = {
  openapi: '3.0.3',
  info: {
    title: 'Snet Backend',
    version: '1.0.0.',
    description: 'Snet Backend',
    hots: `${APIConfig.url}/api/v1`,
  },
  tagsSorter: 'alpha',
  operationsSorter: 'alpha',
  servers: [{
    url: `${APIConfig.url}/api/v1`,
    description: 'Server',
  }],
  components: {
    securitySchemes: Security,
    responses: Responses,
    schemas: Schemas,
  },
  tags: Tags,
  paths: Paths,
};

export default SwaggerOptions;
