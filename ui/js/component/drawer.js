import lbry from '../lbry.js';
import React from 'react';
import {Link} from './link.js';

var DrawerItem = React.createClass({
  getDefaultProps: function() {
    return {
      subPages: [],
    };
  },
  render: function() {
    var isSelected = (this.props.viewingPage == this.props.href.substr(2) ||
                      this.props.subPages.indexOf(this.props.viewingPage) != -1);
    return <Link {...this.props} className={ 'drawer-item ' + (isSelected ? 'drawer-item-selected' : '') } />
  }
});

var drawerImageStyle = { //@TODO: remove this, img should be properly scaled once size is settled
  height: '36px'
};

var Drawer = React.createClass({
  handleLogoClicked: function(event) {
    if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
      window.location.href = 'index.html?developer'
      event.preventDefault();
    }
  },
  getInitialState: function() {
    return {
      balance: 0,
    };
  },
  componentDidMount: function() {
    lbry.getBalance(function(balance) {
      this.setState({
        balance: balance
      });
    }.bind(this));
  },
  render: function() {
    return (
      <nav id="drawer">
        <div id="drawer-handle">
          <Link title="Close" onClick={this.props.onCloseDrawer} icon="icon-bars" className="close-drawer-link"/>
          <a href="index.html?discover" onMouseUp={this.handleLogoClicked}><img src={lbry.imagePath("lbry-dark-1600x528.png")} style={drawerImageStyle}/></a>
        </div>
        <DrawerItem href='index.html?discover' viewingPage={this.props.viewingPage} label="Discover" icon="icon-search"  />
        <DrawerItem href='index.html?publish' viewingPage={this.props.viewingPage} label="Publish" icon="icon-upload" />
        <DrawerItem href='index.html?downloaded' subPages={['published']} viewingPage={this.props.viewingPage}  label="My Files" icon='icon-cloud-download' />
        <DrawerItem href="index.html?wallet" subPages={['send', 'receive', 'claim', 'referral']} viewingPage={this.props.viewingPage}  label="My Wallet" badge={lbry.formatCredits(this.state.balance) } icon="icon-bank" />
        <DrawerItem href='index.html?settings' viewingPage={this.props.viewingPage}  label="Settings" icon='icon-gear' />
        <DrawerItem href='index.html?help' viewingPage={this.props.viewingPage}  label="Help" icon='icon-question-circle' />
      </nav>
    );
  }
});


export default Drawer;
