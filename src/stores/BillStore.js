import alt from '../libs/alt';

import BillActions from '../actions/BillActions';

class BillStore {
    constructor() {
        super();
        this.bindListeners({
            updateBill: BillActions.UPDATE_BILL
        });
        this.on('init', () => {
            this.bill = null;
        });
    }

    updateBill(bill) {
        this.bill = bill;
    }
}

export default alt.createStore(BillStore, 'BillStore');