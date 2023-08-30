const PROXY_CONFIG = [
    {
     context: ['/api'],
     target: 'http://44.204.72.194:80',
     secure: false,
     logLevel: 'debug',
   }
 ];
 module.exports = PROXY_CONFIG;