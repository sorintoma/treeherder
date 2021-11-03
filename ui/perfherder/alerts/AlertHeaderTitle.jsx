import React from 'react';
import PropTypes from 'prop-types';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Row, Col, Badge } from 'reactstrap';

import Clipboard from '../../shared/Clipboard';
import ShowMore from '../../shared/ShowMore';
import { getFrameworkName, getTitle } from '../perf-helpers/helpers';

export default class AlertHeaderTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipboardVisible: false,
      shortAlertName: true,
    };
  }

  showClipboard = (show) => {
    this.setState({ clipboardVisible: show });
  };

  showAlertFullTitle = () => {
    this.setState((prevState) => ({
      shortAlertName: !prevState.shortAlertName,
    }));
  };

  render() {
    const { alertSummary, frameworks } = this.props;
    const { clipboardVisible, shortAlertName } = this.state;
    return (
      <Row
        onMouseEnter={() => this.showClipboard(true)}
        onMouseLeave={() => this.showClipboard(false)}
      >
        <Col className="d-flex align-items-start p-0 alert-title-container">
          <Link
            target="_blank"
            className="text-dark mr-1"
            to={`./alerts?id=${alertSummary.id}&hideDwnToInv=0`}
            id={`alert summary ${alertSummary.id.toString()} title`}
            data-testid={`alert summary ${alertSummary.id.toString()} title`}
          >
            <h6 className="long-title">
              <Badge className="mr-2">
                {getFrameworkName(frameworks, alertSummary.framework)}
              </Badge>
              Alert #{alertSummary.id} - {alertSummary.repository} -{' '}
              {getTitle(alertSummary, shortAlertName)}{' '}
            </h6>
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className="icon-superscript icon-link"
            />
          </Link>
          <div className="alert-title-action-container">
            <Clipboard
              text={`${alertSummary.id}`}
              description="Alert ID"
              visible={clipboardVisible}
              color="transparent"
            />
            <ShowMore onClick={this.showAlertFullTitle} show={shortAlertName} />
          </div>
        </Col>
      </Row>
    );
  }
}

AlertHeaderTitle.propTypes = {
  alertSummary: PropTypes.shape({}).isRequired,
};
