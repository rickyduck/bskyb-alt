import alt from '../libs/alt';
import request from 'superagent';

import config from '../config';


class BillActions {
    loadBill(cb) {
        NProgress.start();
        request.get(config.ajaxUrl, (err, response) => {
            if (err) console.error(err);

            this.actions.updateBill(response.body);

            setTimeout(() => NProgress.done(), 500);

            if(cb) cb();
        })
    }
}
export default alt.createActions(BillActions);