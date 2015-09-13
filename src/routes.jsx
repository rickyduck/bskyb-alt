var routes = (
    <Route name="home" path="/" handler={App}>
        <Route name="dashboard" path="/" handler={Dashboard} />
        <Route name="callCharges" path="/charges" handler={CallCharges} />
    </Route>
);