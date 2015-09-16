import moment from 'moment';

export default {
    formatDate(date) {
        return moment(date).format("MMM Do YYYY");
    },
    formatTime(date) {
        return moment(date).format("HH\hmm\mss\s YYYY");
    }
}