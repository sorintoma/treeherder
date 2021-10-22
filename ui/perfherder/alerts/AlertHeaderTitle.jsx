import React from 'react';
import PropTypes from 'prop-types';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Row, Col, Badge } from 'reactstrap';

import Clipboard from '../../shared/Clipboard';
import { getFrameworkName, getTitle } from '../perf-helpers/helpers';

export default class AlertHeaderTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipboardVisible: false,
    };
  }

  showClipboard = (show) => {
    this.setState({ clipboardVisible: show });
  };

  render() {
    const { alertSummary, frameworks } = this.props;
    const { clipboardVisible } = this.state;
    return (
      <Row
        onMouseEnter={() => this.showClipboard(true)}
        onMouseLeave={() => this.showClipboard(false)}
      >
        <Col className="d-flex align-items-start p-0">
          <Link
            target="_blank"
            className="text-dark mr-1"
            to={`./alerts?id=${alertSummary.id}&hideDwnToInv=0`}
            id={`alert summary ${alertSummary.id.toString()} title`}
            data-testid={`alert summary ${alertSummary.id.toString()} title`}
          >
            <h6 className="font-weight-bold align-middle">
              <Badge className="mr-2">
                {getFrameworkName(frameworks, alertSummary.framework)}
              </Badge>
              Alert #{alertSummary.id} - {alertSummary.repository} -{' '}
              {getTitle(alertSummary)}{' '}
            </h6>
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className="icon-superscript icon-link"
            />
          </Link>
          <Clipboard
            text={`${alertSummary.id}`}
            description="Alert ID"
            visible={clipboardVisible}
            color="transparent"
          />
        </Col>
      </Row>
    );
  }
}

AlertHeaderTitle.propTypes = {
  alertSummary: PropTypes.shape({}).isRequired,
};
