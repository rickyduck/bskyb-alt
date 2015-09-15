import alt from '../libs/alt';

import BillActions from '../actions/BillActions';

class BillStore {
    constructor() {
        this.bindListeners({
            updateBill: BillActions.loadBill
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