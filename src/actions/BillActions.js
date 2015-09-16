import alt from '../libs/alt';
import request from 'superagent';

import config from '../../config';

import NProgress from 'nprogress';

class BillActions {
    loadBill(cb) {
        NProgress.start();
        request.get(config.AJAX_URL, (err, response) => {
            if (err) console.error(err);

            this.actions.updateBill(response.body);

            setTimeout(() => NProgress.done(), 500);

            if(cb) cb();
        })
    }
}
export default alt.createActions(BillActions);