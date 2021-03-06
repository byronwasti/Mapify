var React = require("react");
var css = require('./loginbox.scss');

var LoginBox = React.createClass({
    render: function(){
        return (
            <div className="login-box">
            	<img className="logo" src="/images/logo.png" />
                <h1 className="login-header">Mapify</h1>
                <a className="login-button" href="/auth/spotify" >LOGIN WITH SPOTIFY</a>
            </div>
        );
    }
});

module.exports=LoginBox;