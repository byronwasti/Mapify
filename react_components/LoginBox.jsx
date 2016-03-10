var React = require("react");
var css = ('loginbox.scss');

var LoginBox = React.createClass({
    render: function(){
        return (
            <div className="login-box">
                <h1 className="login-header">Mapify</h1>
                <a className="login-button" href="/auth/spotify" >LOGIN WITH SPOTIFY</a>
            </div>
        );
    }
});

module.exports=LoginBox;