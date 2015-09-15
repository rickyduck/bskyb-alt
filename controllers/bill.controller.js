import request from 'superagent';
import config from '../config';

export default {
    bootstrap: function(req, res, next){

        request.get(config.ajaxUrl, function(err, response) {

            if(err) console.error(err);


            res.locals.data = {
                "BillStore" : {
                    "bill" : response.body
                }
            }
            next();
        });
    }
}