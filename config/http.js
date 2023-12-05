require('dotenv').config()
/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {
  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {
    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/

    order: [
      //   'cookieParser',
      //   'session',
      'bodyParser',
      'cors',
      'checkApiKey',
      //   'compress',
      //   'poweredBy',
      //   'router',
      //   'www',
      //   'favicon',
    ],

    cors: require('cors')({
      origin: 'http://localhost:4200',
      credentials: false,
      methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH',
      headers: 'content-type, x-api-key, authorization',
    }),

    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),
    checkApiKey: function (req, res, next) {
      const apiKey = req.headers['x-api-key']
      if (apiKey !== process.env.ESIGN_API_KEY) {
        return res.status(403).json({ error: 'Invalid API key' })
      }

      return next()
    },
  },
}
