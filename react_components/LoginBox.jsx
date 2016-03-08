var React = require("react");

var LoginBox = React.createClass({
    render: function(){
        return (
            <div className="login-box">
                <h1>Mapify</h1>
                <a className="login-button" href="/auth/spotify" >Login with Spotify</a>;
            </div>
        );
    }
});

module.exports=LoginBox;