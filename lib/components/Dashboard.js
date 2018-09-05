import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Text, Link } from '@bpanel/bpanel-ui';

export default class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static get propTypes() {
    return {
      customChildrenBefore: PropTypes.node,
      primaryWidget: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
      bottomWidgets: PropTypes.array,
      customChildrenAfter: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.node,
      ]),
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // eslint-disable-next-line no-console
    console.error(
      `Plugins decorating ${name} has been disabled because of a plugin crash.`,
      error,
      errorInfo
    );
  }

  render() {
    const {
      customChildrenBefore,
      primaryWidget,
      bottomWidgets = [],
      customChildrenAfter,
    } = this.props;
    if (this.state.hasError)
      return <Text type="p">There was a widget error</Text>;
    const hasWidgets =
      primaryWidget ||
      bottomWidgets.length ||
      customChildrenBefore ||
      customChildrenAfter;
    return (
      <div className="dashboard-container container">
        <Header type="h2">bPanel Dashboard</Header>
        {hasWidgets ? (
          ''
        ) : (
          <div>
            <Text type="p">
              This is a simple Dashboard view that can be decorated by widgets.
              Widgets allow you to extend your dashboard according to your
              needs.
            </Text>
            <Text type="p">
              In order to add widgets to this view, you can install any
              compatible widget plugin, or create your own. This allows each
              user to compose their own customized dashboard view! Once you've
              installed your first widget, this intro text will disappear.
            </Text>
            <Text type="p">Some widgets we recommend to get started:</Text>
            <ul>
              <li>@bpanel/recent-blocks</li>
              <li>@bpanel/peers-widget</li>
              <li>@bpanel/mempool-widget</li>
            </ul>
            <Text type="p">
              Use{' '}
              <Link to="https://www.npmjs.com/package/@bpanel/bpanel-cli">
                bpanel-cli
              </Link>{' '}
              to install as many widgets or other plugins as you want!
            </Text>
          </div>
        )}
        <div className="row">{customChildrenBefore}</div>
        <div className="row mt-3">
          {Array.isArray(primaryWidget)
            ? primaryWidget.map((Child, index) => <Child key={index} />)
            : primaryWidget}
        </div>
        <div className="row mt-3">
          {bottomWidgets.map((Widget, index) => (
            <Widget key={index} />
          ))}
        </div>
        <div className="row mt-3">
          {Array.isArray(customChildrenAfter)
            ? customChildrenAfter.map((Child, index) => <Child key={index} />)
            : customChildrenAfter}
        </div>
      </div>
    );
  }
}
